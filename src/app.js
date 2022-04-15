import dotenv from "dotenv"
import express from "express"
import mysql from "mysql2/promise"
import signupRoute from "./routes/signup/route.js"
import loginRoute from "./routes/login/route.js"
import {eventRoute} from "./routes/homepage/route.js"
import {getUserInfoRoute} from "./routes/homepage/route.js"
//import {getEventbyCategoryRoute} from "./routes/homepage/route.js"

//Env config
dotenv.config();
//Server config
const app = express();
app.use(express.json());

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

app.get("/", (req, res) =>
  res.send("Bienvenue au backend du meilleur hexanome de l'INSA.")
);
app.post("/signup", (req, res) => signupRoute(connection, req, res));
app.post("/login", (req, res) => loginRoute(connection, req, res));
app.post("/getUserInfo", (req, res) => getUserInfoRoute(connection, req, res))
app.get("/event", (req, res) => eventRoute(connection, req, res))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`);
});
