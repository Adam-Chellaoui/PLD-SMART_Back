//.env Config file
const dotenv = require('dotenv');
dotenv.config()

//Server initialization
const express = require('express')
const app = express()
app.use(express.json())


//MySql Connection
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect()


app.get('/', (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM School', (err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        console.log('The users are: ', rows[0])
        res.send(`Hello World, ${rows[0].name}`)
    })
    connection.end()

})

app.post("/signup", (req, res) => {
    console.log("Request body: ", req.body)
    const {name,
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
        wholeResult} = req.body

    const splitted = birthDate.split("/");
    const birtDateTimestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`
    connection.query(`
    INSERT INTO eve.User (name, surname, mail, phone, city, street, street_number, region, zip_code, address_complement, gender, date_birth, user_password, description, admin, school_id, photo)
    VALUES ('${name}', '${surname}', '${email}', '${phone}','${city}', '${street}', '${streetNb}', '${region}', '${zipCode}', '${addressComplement}', '${gender}', '${birtDateTimestamp}', '${password}', '${description}', FALSE, 1, '')`,
    (err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        console.log("Succesfull")
    })


    res.send("Response: " + name)
})

app.get("/login", (req, res) => {
    console.log("Request body: ", req.body)
    const {mail,
         password} = req.body

    connection.query(`SELECT user_password FROM eve.User WHERE mail= '${mail}' `,
    
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

})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})