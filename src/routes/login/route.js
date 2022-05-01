import { loginQuery } from "./query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoute = async (connection, req, res) => {
    const { email, password } = req.body;

    const [results, fields] = await connection.execute(
        loginQuery(),
        [email]);

    if(results.length == 0){
        res.status(400).send("Could not find an user with this email.")
        return
    }
    //if (err) throw "SQL ERROR: " + err
    const passwordMatch = await bcrypt.compare(password,results[0].user_password)
  ;
    if (passwordMatch) {
      const token = jwt.sign({ userId: results[0].id, isAdmin: results[0].admin == 1 ? true : false }, process.env.SECRET, { expiresIn: '3 hours' })
      res.status(200).json({ id: results[0].id, token: token });
    } else {
      res.status(401).send("Wrong password or email.");
    }
};

export default loginRoute;
