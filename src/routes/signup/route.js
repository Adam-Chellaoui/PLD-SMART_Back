import { checkEmailExists, signupQuery, checkMailValid} from "./query.js";
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

    //We hash the password with bcrypt: 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const splitted = birthDate.split("/");
    const birthDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`


    /*connection.query(
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
         async function (error, results, fields) {
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
    });*/
    connection.query(
        signupQuery(name, 
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
         description),
         (error, results, fields) =>{
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
    });
    
}

export default signupRoute;