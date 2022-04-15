import { getPopularEventQuery } from "./query.js";
import { getUserInfoQuery } from "./query.js";
//import { EventbyCategoryQuery } from "./query.js";
//import { CategoryQuery } from "./query.js";

const getUserInfoRoute = async(connection, req, res) => {
    console.log("getUserInfoRoute Request bod: ", req.body)
    const {id} = req.body
    console.log("getUserInfoRoute userId: ", id)
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send(Ok);
    }
}

const getPopularRoute = async(connection, req, res) => {
    const {} = req.body;
    const [results, fields] = await connection.execute(getPopularEventQuery());
    console.log(results[0].date_timestamp)
    //if (err) throw "SQL ERROR: " + err 
    if(results){
        res.send(results);
    }
    
    
    
}

export {getUserInfoRoute, getPopularRoute} ;