import { eventQuery } from "./query.js";
import { getUserInfoQuery } from "./query.js";
//import { EventbyCategoryQuery } from "./query.js";
//import { CategoryQuery } from "./query.js";

const getUserInfoRoute = (connection, req, res) => {
    console.log("getUserInfoRoute Request bod: ", req.body)
    const {id} = req.body
    console.log("getUserInfoRoute userId: ", id)
    connection.query(
        getUserInfoQuery(id),
    (err, results, fields) => {
        if (err) throw "SQL ERROR: " + err 
        else {
            console.log(results[0]);
            res.send("OK");
        }
    })
}

const eventRoute = (connection, req, res) => {
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
}

export {getUserInfoRoute, eventRoute} ;