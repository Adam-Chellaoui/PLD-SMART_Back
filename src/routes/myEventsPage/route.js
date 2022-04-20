import { comingEventsQuery } from "./query.js";

const getComingEventsRoute = async (connection, req, res) => {
    console.log("Request body", req.body);
    const { id } = req.body;

    const [results, fields] = await connection.execute(
        comingEventsQuery(),
        [id]);

    //if no results => front = no coming events
    //else
    if(results){
        res.send(results);
    }
};

export {getComingEventsRoute};
