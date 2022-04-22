import { comingEventsQuery } from "./query.js";
import { myHistoric } from "./query.js";
import { myFavorite } from "./query.js";

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

const getMyHistoricRoute = async (connection, req, res) => {
    console.log("historiqueRequest body", req.body);
    const { id } = req.body;

    const [results, fields] = await connection.execute(
        myHistoric(),
        [id]);

    if(results){
        res.send(results);
    }
};

const getMyFavoriteRoute = async (connection, req, res) => {
    console.log("favoriteRequest body", req.body);
    const { id } = req.body;

    const [results, fields] = await connection.execute(
        myFavorite(),
        [id]);

    if(results){
        res.send(results);
    }
};

export {getComingEventsRoute};
export {getMyHistoricRoute};
export {getMyFavoriteRoute};
