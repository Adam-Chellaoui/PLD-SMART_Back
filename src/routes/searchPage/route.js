import { getEventsQuery, getFilteredEventsQuery } from "./query.js";


const getEventsRoute = async(connection, req, res) => {
    console.log("getEventsRoute Request bod: ", req.body)
    const {} = req.body;
    const [results, fields] = await connection.execute(getEventsQuery());
   
    if(results){
        res.send(results);
    }  
}

const getFilteredEventsRoute = async(connection, req, res) => {
    console.log("getFilteredEventsRoute Request bod: ", req.body)
    const {
        category_id,
        date
    } = req.body;

    //Formatting the date 
    const splitted = date.split("/");
    const date_timestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`

    const [results,fields] = await connection.execute(getFilteredEventsQuery(), [category_id,date_timestamp])
   
    if(results){
        res.send(results);
    }  
}

export {getEventsRoute, getFilteredEventsRoute}