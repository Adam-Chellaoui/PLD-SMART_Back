
import { getNotificationsQuery, createNotification} from "./query.js";


const getNotificationsRoute = async (connection, req, res) => {
    console.log("notifications body", req.body);
    const { id } = req.body;

    const [results, fields] = await connection.execute(
        getNotificationsQuery(),
        [id]);
    console.log(results)

    if(results){
        res.send(results);
    }
};

const createNotificationRoute = async (connection,receiver_id,Corps,status_id,type_id,event_id, review_id,user_targeted_id,participation_demand_id,date)=>{
    connection.query(
        createNotification(),
        [receiver_id,Corps,status_id,type_id,event_id, review_id,user_targeted_id,participation_demand_id,date],
        (err, rows, fields) => {
            if (err) throw "SQL ERROR: " + err  
        })
}

export {getNotificationsRoute,createNotificationRoute};
