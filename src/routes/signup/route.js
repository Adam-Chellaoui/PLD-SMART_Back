import { checkEmailExists, signupQuery, checkMailValid } from "./query.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const signupRoute = async (connection, req, res) => {
  console.log("Request bod: ", req.body);
  const {
    name,
    surname,
    email,
    city,
    street,
    streetNb,
    region,
    zipCode,
    addressComplement,
    password,
    confirmedPassword,
    phone,
    address,
    gender,
    birthDate,
    description,
  } = req.body;

  try {
    const [results, fields] = await connection.execute(checkEmailExists(), [
      email,
    ]);

    if (results.length > 0) {
      res.status(400).send("Email already exists.");
      return;
    }
    const domain = email.substring(email.lastIndexOf("@") + 1);
    console.log(domain);

    const [results2, fields2] = await connection.execute(checkMailValid(), [
      domain,
    ]);
    if (results2.length === 0) {
      res.status(401).send("Your school is not on our list");
      return;
    }

    const school_id = results2[0].id;
    console.log(school_id);

    //We hash the password with bcrypt:
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const splitted = birthDate.split("/");
    const birthDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`;
    const signupDate = new Date();
    const signupDateString = signupDate.toISOString().slice(0, 19).replace('T', ' ');
    const [result3, fields3] = await connection.execute(signupQuery(), [
      signupDateString,
      name,
      surname,
      email,
      phone,
      city,
      street,
      streetNb,
      region,
      zipCode,
      addressComplement,
      gender,
      birthDateTimestamp,
      hashedPassword,
      description,
      school_id,
    ]);

    // We send a verification code on the email
    const generateRandomNumber = () => crypto.randomBytes(3).toString("hex");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "eve.taylorswift@gmail.com",
        pass: "Trucmdp123!",
      },
    });

    console.log("Before sending mail");

    const mailOptions = {
      from: "eve.taylorswift@gmail.com",
      to: `${email}`,
      subject: "Verify your account",
      text:
        "You are receiving this because you (or someone else) have requested to signup to eve.\n\n" +
        "Please verify this code into the application in order to confirm your inscription :\n\n" +
        `${generateRandomNumber()}` +
        "\n If you did not request this, please ignore this email.\n",
    }

    console.log("sending mail");

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.SECRET,
          { expiresIn: "3 hours" }
        );
        console.log("here is the res: ", response);
        return res.status(200).json({ message: "signup email sent", preAuthToken : token });
      }
    })
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export default signupRoute;
