import { eventQuery } from "./query.js";
import { getUserInfoQuery } from "./query.js";
import { getEventbyCategoryQuery } from "./query.js";
//import { CategoryQuery } from "./query.js";

const getUserInfoRoute = async(connection, req, res) => {
    console.log("getUserInfoRoute Request bod: ", req.body)
    const {id} = req.body
    console.log("getUserInfoRoute userId: ", id)
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send("OK");
    }
}

const eventRoute = async(connection, req, res) => {
    const {} = req.body
    // checks if the request has a query (parameters) 
    if(!Object.keys(req.query).length){
            const {} = req.body
            connection.query(
                eventQuery(),
            (err, results, fields) => {
                if (err) throw "SQL ERROR: " + err 
                else {
                    console.log(results[0].name);
                    res.send("OK");
                }
            })
        }else{
            const [results, fields] = await connection.execute(getEventbyCategoryQuery(), [req.query.category])
            if(results){
                console.log(results);
                res.send("OK");
            }
        }
}

export {getUserInfoRoute, eventRoute} ;