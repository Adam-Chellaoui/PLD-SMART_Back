//.env Config file
const dotenv = require('dotenv');
dotenv.config()

//Server initialization
const express = require('express')
const app = express()
const port = 3000

//MySql Connection
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

app.get('/', (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM School', (err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        console.log('The users are: ', rows[0])
        res.send(`Hello World, ${rows[0].name}`)
    })
    connection.end()

})

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})