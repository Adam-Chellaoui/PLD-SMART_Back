import { signupQuery } from "./query.js";

const signupRoute = (connection, req, res) => {
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
        description} = req.body

    
    const splitted = birthDate.split("/");
    const birthDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`
    connection.query(
        signupQuery(name, surname, email, city, street, streetNb, region, zipCode, addressComplement, password, confirmedPassword, phone, address, gender, birthDateTimestamp, description),
    (err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        res.send("Signup Sucessfull")
    })
}

export default signupRoute;