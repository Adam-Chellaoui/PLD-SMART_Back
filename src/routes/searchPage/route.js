import { getEventsQuery } from "./query.js";


const getEventsRoute = async(connection, req, res) => {
    const {} = req.body;
    const [results, fields] = await connection.execute(getEventsQuery());
   
    if(results){
        res.send(results);
    }  
}


export {getEventsRoute}