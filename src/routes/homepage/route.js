import { eventQuery } from "./query.js";
import { EventbyCategoryQuery } from "./query";
import { CategoryQuery } from "./query";

const eventRoute = (connection, req, res) => {
    const {} = req.body
    connection.query(
        eventQuery(),
    (err, results, fields) => {
        if (err) throw "SQL ERROR: " + err 
        /*if (`${password}`==results[0].user_password)  {
            console.log("Ok")
            res.send("Ok")
        }*/
        else {
            console.log(results[0].name);
            res.send("OK");
            //res.status(401).send("Bad password")
        }
    })
}

export default eventRoute;