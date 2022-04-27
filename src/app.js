//Packages
import dotenv from "dotenv"
import express from "express"
import mysql from "mysql2/promise"
//Authentication middleware
import {authenticateToken} from "./middleware/authenticateToken.js"
import {authenticateEventOwner} from "./middleware/authenticateEventOwner.js"
import {authenticateAdmin} from "./middleware/authenticateAdmin.js"
//Routes
import signupRoute from "./routes/signup/route.js"
import loginRoute from "./routes/login/route.js"
import {getPopularRoute, getUserInfoRoute, getCategoriesRoute, getEventsbyCategoryRoute,getEventbyCategoryRoute} from "./routes/homepage/route.js"
import {getHistoricRoute, getReviewUserRoute, getUpcomingEventRoute, getMyAccountInfo,editInfoUserRoute,editImageProfilRoute} from "./routes/myaccount/route.js"
import {getComingEventsRoute, getMyHistoric,getMyFavorite} from "./routes/myEventsPage/route.js"
import {getEventsRoute, getFilteredEventsRoute} from "./routes/searchPage/route.js"
import {cancelEvent, getEventParticipants, modifyEvent, removeParticipant,demanderParticipationRoute} from "./routes/event/route.js"
import { getInfoDemanderNotifRoute,refuseDemandRoute,acceptDemandRoute } from "./routes/participationDemand/route.js"
import {adminBlockUser, adminDeleteEvent} from "./routes/admin/routes.js";
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
app.post("/getUserInfo",  (req, res, next) => authenticateToken(connection, req, res, next), (req, res) => getUserInfoRoute(connection, req, res))

app.post("/getEventByCategory", (req, res) => getEventbyCategoryRoute(connection, req, res))
app.get("/getEventsByCategory", (req, res) => getEventsbyCategoryRoute(connection, req, res))
app.post("/getComingEvents", (req, res) => getComingEventsRoute(connection, req, res))
app.post("/getMyHistoric", (req, res) => getMyHistoric(connection, req, res))
app.post("/getMyFavorite", (req, res) => getMyFavorite(connection, req, res))

//PARTICIPANT EVENT
app.post("/getDemandParticipation", (req, res) => demanderParticipationRoute(connection, req, res))

//ORGANIZER EVENT
app.post("/getEventParticipants", 
        (req, res, next) => authenticateToken(connection, req, res, next), 
        (req, res, next) => authenticateEventOwner(connection, req, res, next), 
        (req, res) =>  getEventParticipants(connection, req, res)
)
app.post("/cancelEvent",
        (req, res, next) => authenticateToken(connection, req, res, next),
        (req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => cancelEvent(connection, req, res)
)
app.post("/modifyEvent",
        (req, res, next) => authenticateToken(connection, req, res, next),
        (req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => modifyEvent(connection, req, res)
)
app.post("/removeParticipant",
        authenticateToken,
        (req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => removeParticipant(connection, req, res)
)

//SEARCH PAGE
app.get("/getMapEvents", (req, res) => getEventsRoute(connection, req, res));
app.post("/getFilteredEvents", (req, res) => getFilteredEventsRoute(connection, req, res));


//My Account
app.post("/getMyAccountInfo", (req, res) => getMyAccountInfo(connection, req, res))
app.post("/getHistoric", (req, res) => getHistoricRoute(connection, req, res))
app.post("/getReviewUser", (req, res) => getReviewUserRoute(connection, req, res))
app.post("/getUpcomingEvent", (req, res) => getUpcomingEventRoute(connection, req, res))
app.post("/editProfile", (req, res) => editInfoUserRoute(connection, req, res))
app.post("/editImageProfil", (req, res) => editImageProfilRoute(connection, req, res))

//Participation demand
app.post("/getInfoDemanderNotif",(req,res) => getInfoDemanderNotifRoute(connection,req,res))
app.post("/refuseDemand",(req,res) => refuseDemandRoute(connection,req,res))
app.post("/acceptDemand",(req,res) => acceptDemandRoute(connection,req,res))

//ADMIN
app.delete(
        "/adminDeleteEvent", 
        (req, res, next) => authenticateToken(connection, req, res, next), 
        authenticateAdmin, 
        (req, res) => adminDeleteEvent(connection, req, res)
        )
app.post(
        "/adminBlockUser", 
        (req, res, next) => authenticateToken(connection, req, res, next), 
        authenticateAdmin, 
        (req, res) => adminBlockUser(connection, req, res)
)

app.listen(process.env.PORT || 3000, () => {
  console.log(`EVE's backend app listening on port ${process.env.PORT || 3000}`);
});
