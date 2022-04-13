import { loginQuery } from "./query.js";

const loginRoute = (connection, req, res) => {
    console.log("Request bod: ", req.body)
    const {
        mail,
        password} = req.body

    connection.query(
        loginQuery(mail),
    (err, results, fields) => {
        if (err) throw "SQL ERROR: " + err
        if (`${password}`==results[0].user_password)  {
            console.log("Ok")
            res.send("Ok")
        }
        else {
            console.log("Pas Ok")
            res.status(401).send("Bad password")
        }
    })
}

export default loginRoute;