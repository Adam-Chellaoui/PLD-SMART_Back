import { checkEmailExists, signupQuery, checkMailValid} from "./query.js";
import bcrypt from "bcrypt"
import mysql from "mysql2/promise"

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

    const [results,fields] = await connection.execute(checkEmailExists(), [email])


    console.log("User already exists: ", results)
    if(results.length > 0){
        res.status(400).send("Email already exists.")
        return
    }

    const domain = email.substring(email.lastIndexOf("@")+1,email.lastIndexOf("."));
    console.log(domain)
    const [results2,fields2] = await connection.execute(checkMailValid(), [domain])
    if(results2.length===0){
        res.status(401).send("Your school is not on our list")
        return
    }
    console.log("yes")
    res.status(200).send("email has to be sent.")

    /*//We hash the password with bcrypt: 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const splitted = birthDate.split("/");
    const birthDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`


    await connection.query(
        signupQuery(),
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
         birthDateTimestamp, 
         hashedPassword, 
         description],
         (err,result,field)=>{
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
    });

    var [results4,fields4] = await connection.execute(checkEmailExists(), [email]);
    if(results4.length > 0){
        res.status(200).send("succesfully connected.")
        return
    }*/
}

export default signupRoute;