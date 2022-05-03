import {
  getSignupToken,
  checkEmailExists,
  signupQuery,
  checkMailValid,
  saveTokenQuery,
} from "./query.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { generateRandomNumber } from "../../helpers/utils/token.js";

const signup = async (connection, req, res) => {
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
    const signupDateString = signupDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
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

    // We create a token and save it in the database
    const token = generateRandomNumber();

    var mydate = new Date();
    mydate.setHours(mydate.getHours() + 4);
    const expiration_sql = mydate.toISOString().slice(0, 19).replace("T", " ");

    const [resultToken, fieldsToken] = await connection.execute(
      saveTokenQuery(),
      [result3[0], token, expiration_sql]
    );
    res.status(200).send({ message: "Saved Token" });

    // We send a verification code on the email
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
        `${token}` +
        "\n If you did not request this, please ignore this email.\n",
    };

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
        return res
          .status(200)
          .json({ message: "signup email sent", preAuthToken: token });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const verifyAccount = async (connection, req, res) => {
  const { verificationToken, preAuthToken } = req.body;

  if (!preAuthToken)
    return res.status(401).json({ error: "Empty authentication token." });

  try {
    const payload = await jwt.verify(preAuthToken, process.env.SECRET);
    const { userId, isAdmin } = payload;
    req.userId = userId;
    req.isAdmin = isAdmin;
  } catch (err) {
    return res.status(403).json({ error: "Invalid authentication token." });
  }
  try {
    const [results, fields] = await connection.execute(getSignupToken(), [
      userId,
    ]);
  } catch (e) {
    return defaultResponseError(e, res);
  }

  const token = results[0];
  if (!token) return res.status(400).json({ error: "Token not found." });

  if (token !== verificationToken)
    return res.status(401).json({ error: "Invalid verification token." });

  try {
    const [results, fields] = await connection.execute(verifyUser(), [
      req.userId,
    ]);
  } catch (e) {
    return defaultResponseError(e, res);
  }

  return res.status(200).json({ message: "User verified." });
};

export { signup, verifyAccount };
