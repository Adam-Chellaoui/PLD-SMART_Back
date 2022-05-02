import {
  checkEmailExists,
  signupQuery,
  checkMailValid,
  verifyUser,
} from "./query.js";
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
      res.status(200).send(results4);
    }
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

export default signupRoute;
