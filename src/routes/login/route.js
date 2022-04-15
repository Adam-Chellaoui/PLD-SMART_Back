import { loginQuery } from "./query.js";
import bcrypt from "bcrypt";

const loginRoute = async (connection, req, res) => {
    console.log("Request body", req.body);
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

    if (passwordMatch) {
      res.status(200).json({ id: results[0].id });
    } else {
      res.status(401).send("Wrong password or email.");
    }
};

export default loginRoute;
