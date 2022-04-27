import { getInfoDemanderNotif, setStatus, acceptDemand,deleteDemand, deleteParticipation} from "./query.js";


const getInfoDemanderNotifRoute = async(connection, req, res) => {
    console.log("getEventsRoute Request bod: ", req.body)
    const {id} = req.body;
    const [results, fields] = await connection.execute(getInfoDemanderNotif(),[id]);
   
    if(results){
        console.log(results)
        res.send(results);
    }  
}

const refuseDemandRoute = async(connection, req, res) => {
    console.log("setStatusDemand Request bod: ", req.body)
    const {id} = req.body;
    connection.query(setStatus(),[2, id],(err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        res.status(200).send("success: demand has been refused")
    });
}

const acceptDemandRoute = async(connection, req, res) => {

    console.log("setStatusDemand Request bod: ", req.body)
    const {demand_id, user_id, event_id} = req.body;
    connection.query(setStatus(),[1, demand_id],(err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
    });

    console.log("acceptDemand Request bod: ", req.body)
    connection.query(acceptDemand(),[user_id,event_id],(err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        res.status(200).send("success: demand has been accepted")
    });
}

const signoutDemand = async(connection, req, res) => {

    console.log("signOut Request bod: ", req.body)
    const {demand_id, participation_id} = req.body;
    connection.query(deleteDemand,[demand_id],(err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
    });

    console.log("delete participation Request bod: ", req.body)
    connection.query(deleteParticipation(),[participation_id],(err, rows, fields) => {
        if (err) throw "SQL ERROR: " + err  
        res.status(200).send("success: sign out successfull")
    });
}


export {getInfoDemanderNotifRoute, refuseDemandRoute,acceptDemandRoute, signoutDemand}