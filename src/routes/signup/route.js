import { checkEmailExists, signupQuery, checkMailValid } from "./query.js";
import bcrypt from "bcrypt";

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

    console.log("User already exists: ", results);
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

    const [result3, fields3] = await connection.execute(signupQuery(), [
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

    const [results4, fields4] = await connection.execute(checkEmailExists(), [
      email,
    ]);
    if (results4.length != 0) {
      res.status(200).send(results);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export default signupRoute;
