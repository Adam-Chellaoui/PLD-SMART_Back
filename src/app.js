import dotenv from "dotenv"
import express from "express"
import mysql from "mysql2"
import signupRoute from "./routes/signup/route.js"

//Env config
dotenv.config()
//Server config
const app = express()
app.use(express.json())


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect()



app.post("/", (req, res) => signupRoute(connection, req, res))

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