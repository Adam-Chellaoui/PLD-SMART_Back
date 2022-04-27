import { getNotificationsQuery} from "./query.js";


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

export {getNotificationsRoute};
