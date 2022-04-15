import { loginQuery } from "./query.js";
import bcrypt from "bcrypt";

const loginRoute = async(connection, req, res) => {
    console.log("Request bod: ", req.body)
    const {
        mail,
        password} = req.body

    connection.query(
        loginQuery(mail),
    async(err, results, fields) => {
        if (err) throw "SQL ERROR: " + err
        const passwordMatch = await bcrypt.compare(password,results[0].user_password)

        if(passwordMatch)  {
            res.status(200).json({id: results[0].id})
        }
        else {
            res.status(401).send("Wrong password or email.")
        }
    })
}

export default loginRoute;