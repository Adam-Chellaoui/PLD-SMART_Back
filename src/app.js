//Packages
import dotenv from "dotenv"
import express from "express"
import {Server, Socket} from "socket.io"
import {createServer} from "http"
import mysql from "mysql2/promise"
//Authentication middleware
import {authenticateToken} from "./middleware/authenticateToken.js"
import {authenticateEventOwner} from "./middleware/authenticateEventOwner.js"
import {authenticateAdmin} from "./middleware/authenticateAdmin.js"
//Routes
import signupRoute from "./routes/signup/route.js"
import loginRoute from "./routes/login/route.js"
import {getPopularRoute, getUserInfoRoute, getCategoriesRoute, getEventsbyCategoryRoute,getEventbyCategoryRoute, getAllInfo} from "./routes/homepage/route.js"
import {getHistoricRoute, getReviewUserRoute, getUpcomingEventRoute, getMyAccountInfo,editInfoUserRoute,editImageProfilRoute,getReportTypesRoute,createReportRoute} from "./routes/myaccount/route.js"
import {getComingEventsRoute, getMyHistoric,getMyFavorite} from "./routes/myEventsPage/route.js"
import {getEventsRoute} from "./routes/searchPage/route.js"
import {cancelEvent, getEventParticipants, getnonReviewedParticipants, modifyEvent, removeParticipant,demanderParticipationRoute,getInfoEvent, getReviewEventRoute, setEventLikeRoute, getLikeRoute, withdrawRoute, getEventParticipantsNotif, addReview, getReviewId} from "./routes/event/route.js"
import { getInfoDemanderNotifRoute,refuseDemandRoute,acceptDemandRoute,signoutDemand } from "./routes/participationDemand/route.js"
import {adminBlockUser, adminDeleteEvent} from "./routes/admin/routes.js";
import {getNotificationsRoute,createNotificationRoute,setNotifDoneRoute} from "./routes/notifications/route.js"
import {getFilteredEventsRoute} from "./routes/Filters/route.js"

import getDateNow from "./utils/formatageDate.js"
//import {getEventbyCategoryRoute} from "./routes/homepage/route.js"

//Env config
dotenv.config();
//Server config
const app = express();
app.use(express.json());
//socket config
const httpServer= createServer(app)
const io = new Server (httpServer)

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
app.post("/demandParticipation", (req, res) => demanderParticipationRoute(connection, req, res))
app.post("/getReviewEvent", (req, res) => getReviewEventRoute(connection, req, res))
app.post("/setLiked", (req, res) => setEventLikeRoute(connection, req, res))
app.post("/getLike", (req, res) => getLikeRoute(connection, req, res))
app.post("/addReview", (req, res) => addReview(connection, req, res))
app.post("/getReviewId", (req, res) => getReviewId(connection, req, res))

//ORGANIZER EVENT
app.post("/getEventParticipants", 
        //(req, res, next) => authenticateToken(connection, req, res, next), 
        //(req, res, next) => authenticateEventOwner(connection, req, res, next), 
        (req, res) =>  getEventParticipants(connection, req, res)
)

app.post("/getnonReviewedParticipants",
        //(req, res, next) => authenticateToken(connection, req, res, next), 
        //(req, res, next) => authenticateEventOwner(connection, req, res, next), 
        (req,res)=> getnonReviewedParticipants(connection, req, res))

app.post("/cancelEvent",
        //(req, res, next) => authenticateToken(connection, req, res, next),
        //(req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => cancelEvent(connection, req, res)
)
app.post("/modifyEvent",
        //(req, res, next) => authenticateToken(connection, req, res, next),
        //(req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => modifyEvent(connection, req, res)
)
app.post("/removeParticipant",
        //authenticateToken,
        //(req, res, next) => authenticateEventOwner(connection, req, res, next),
        (req, res) => withdrawRoute(connection, req, res)
)

app.post("/getInfoEvent", (req, res) => getInfoEvent(connection, req, res));

//SEARCH PAGE
app.get("/getMapEvents", (req, res) => getEventsRoute(connection, req, res));

//FILTERS
app.post("/getFilteredEvents", (req, res) => getFilteredEventsRoute(connection, req, res));


//My Account
app.post("/getMyAccountInfo", (req, res) => getMyAccountInfo(connection, req, res))
app.post("/getHistoric", (req, res) => getHistoricRoute(connection, req, res))
app.post("/getReviewUser", (req, res) => getReviewUserRoute(connection, req, res))
app.post("/getUpcomingEvent", (req, res) => getUpcomingEventRoute(connection, req, res))
app.post("/editProfile", (req, res) => editInfoUserRoute(connection, req, res))
app.post("/editImageProfil", (req, res) => editImageProfilRoute(connection, req, res))
app.get("/getReportTypes", (req, res) => getReportTypesRoute(connection, req, res))
app.post("/createReport", (req, res) => createReportRoute(connection, req, res))

//Participation demand
app.post("/getInfoDemanderNotif",(req,res) => getInfoDemanderNotifRoute(connection,req,res))
app.post("/refuseDemand",(req,res) => refuseDemandRoute(connection,req,res))
app.post("/acceptDemand",(req,res) => acceptDemandRoute(connection,req,res))
app.post("/signoutDemand",(req,res) => signoutDemand(connection,req,res))

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

//Notifications
app.post("/getNotifications",(req,res) => getNotificationsRoute(connection,req,res))
app.post("/setNotifDone",(req,res) => setNotifDoneRoute(connection,req,res))




var storeClient = [];

const getUserSocket = (id)=>{
        console.log(id)
        var sock = ""
        storeClient.map((item)=>{
                if(item.userId===id){
                        sock=item.socketId
                }
        })
        return sock;
}

const addUserSocket = (id,socket_id)=>{
        var exists =-1;
        var socketId = -1
        storeClient.map((item,index)=>{
                if(item.userId===id){
                        exists=index;
                        socketId=item.socketId
                }       
        })
        if(exists!=-1){
                storeClient[exists]={socketId :socket_id, userId: id}
        }else{
                storeClient.push({socketId :socket_id, userId: id})
        }
        console.log(storeClient)
}


io.on('connection',(socket)=>{
        console.log(`connecté au client ${socket.id}`);
        socket.on('userId',(userId)=>{
                
                addUserSocket(userId,socket.id)
        })
        socket.on('message', (message, type, event_id,user_id,review_id,user_targeted_id,participation_demand_id,participants)=>{
                console.log(message.message)
                var date = getDateNow();
                if(message.type===2){
                        console.log("demand accepted")
                        
                }else if(message.type===6){
                        console.log("user reported")
                        
                }else if(message.type===3){
                        console.log("demand rejected")
                }
                
                if(message.type===12){
                        message.participants.map((item)=>{
                                createNotificationRoute(connection,item.user_id,"",1,message.type,message.event_id,message.review_id,message.user_targeted_id,message.participation_demand_id,date)
                                var sock = getUserSocket(item.user_id)
                                if(sock!=""){
                                        io.to(sock).emit('message',(message));
                                }
                                
                        })

                }else{
                        createNotificationRoute(connection,message.user_id,"",1,message.type,message.event_id,message.review_id,message.user_targeted_id,message.participation_demand_id,date)
                        io.to(getUserSocket(message.user_id)).emit('message',(message));
                }
                
                

        })
        socket.on('disconnect', function(){
                console.log("client has disconnected:"+socket.id);
        });
})


httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`EVE's backend app listening on port ${process.env.PORT || 3000}`);
});

