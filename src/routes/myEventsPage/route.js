import { comingEventsQuery } from "./query.js";
import { myHistoric } from "./query.js";
import { myFavorite } from "./query.js";

const getComingEventsRoute = async (connection, req, res) => {
    console.log("Request body", req.body);
    const { id } = req.body;

    
    try{
        const [results, fields] = await connection.execute(
            comingEventsQuery(),
            [id]);
    
        res.status(200).send(results);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
};

const getMyHistoric = async (connection, req, res) => {
    console.log("historiqueRequest body", req.body);
    const { id } = req.body;

    try{
        const [results, fields] = await connection.execute(
            myHistoric(),
            [id]);
        res.status(200).send(results);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
};

const getMyFavorite = async (connection, req, res) => {
    console.log("favoriteRequest body", req.body);
    const { id } = req.body;

   
    try{
        const [results, fields] = await connection.execute(
            myFavorite(),
            [id]);
        res.status(200).send(results);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
};

export {getComingEventsRoute};
export {getMyHistoric};
export {getMyFavorite};
