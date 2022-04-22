import dotenv from "dotenv"
import express from "express"
import mysql from "mysql2/promise"
import signupRoute from "./routes/signup/route.js"
import loginRoute from "./routes/login/route.js"
import {getPopularRoute, getUserInfoRoute, getCategoriesRoute, getEventsbyCategoryRoute} from "./routes/homepage/route.js"
import {authenticateToken} from "./middleware/authenticateToken.js"
import {getComingEventsRoute} from "./routes/myEventsPage/route.js"
import {getEventsRoute} from "./routes/searchPage/route.js"
import {getEventParticipants} from "./routes/eventOrganizer/route.js"
import {authenticateEventOwner} from "./middleware/authenticateEventOwner.js"
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

//Root API welcome message :)
app.get("/", (req, res) =>
  res.send("Bienvenue au backend du meilleur hexanome de l'INSA.")
);
//LOGIN AND SIGNUP
app.post("/signup", (req, res) => signupRoute(connection, req, res));
app.post("/login", (req, res) => loginRoute(connection, req, res));

//HOMEPAGE
app.get("/getPopular", (req, res) => getPopularRoute(connection, req, res));
app.get("/getCategories", (req, res) => getCategoriesRoute(connection, req, res))
app.post("/getUserInfo", authenticateToken, (req, res) => getUserInfoRoute(connection, req, res))

app.get("/getEventsByCategory", (req, res) => getEventsbyCategoryRoute(connection, req, res))
app.get("/getAllEvents", (req, res) => getEventsRoute(connection, req, res));
app.post("/getComingEvents", (req, res) => getComingEventsRoute(connection, req, res))

//ORGANIZER EVENT
app.post("/getEventParticipants", 
        authenticateToken, 
        (req, res, next) => authenticateEventOwner(connection, req, res, next), 
        (req, res) =>  getEventParticipants(connection, req, res)
)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`);
});
