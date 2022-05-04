import jwt from "jsonwebtoken";
import { isUserBlockedQuery } from "./query/isUserBlocked.js";

/**
 * Middleware function that authenticates an user jwt token.
 * See how middleware works here: https://expressjs.com/en/guide/using-middleware.html
 * See how jwt works here: https://jwt.io
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authenticateToken = async (connection, req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Empty authentication token." });

  try {
    const payload = await jwt.verify(token, process.env.SECRET);
    const { userId, isAdmin } = payload;
    req.userId = userId;
    req.isAdmin = isAdmin;
  } catch (err) {
    return res.status(403).json({ error: "Invalid authentication token." });
  }

  try {
    const [results, fields] = await connection.execute(isUserBlockedQuery(), [
      req.userId,
    ]);
    const { blocked , verified} = results[0];
    if (blocked == 1 || verified==0)
      return res.status(401).json({ error: "The user is curently blocked." });
  } catch (err) {
    console.log("SQL ERROR: ", err);
    return res.status(500).json({ error: "An error occured." });
  }

  next();
};
