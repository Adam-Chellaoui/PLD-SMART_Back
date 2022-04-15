import { signupQuery } from "./query.js";
import bcrypt from "bcrypt"

const signupRoute = async(connection, req, res) => {
    console.log("Request bod: ", req.body)
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
         description
    } = req.body

    //We hash the password with bcrypt: 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const splitted = birthDate.split("/");
    const birthDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`

    connection.query(
        signupQuery(),
        //We escape the variable to prevent sql injection attacks
        //https://github.com/mysqljs/mysql#escaping-query-values
        [name, 
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
         birthDate, 
         hashedPassword, 
         description],
    (err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        res.send("Signup Sucessfull")
    })
}

export default signupRoute;