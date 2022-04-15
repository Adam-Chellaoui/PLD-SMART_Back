import { eventQuery, getUserInfoQuery, getCategoriesQuery } from "./query.js";

//import { EventbyCategoryQuery } from "./query.js";

const getUserInfoRoute = async(connection, req, res) => {
    console.log("getUserInfoRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send("OK");
    }
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

const getCategoriesRoute = async (connection, req, res) => {
    console.log("getCategoriesRoute Request bod: ", req.body)
    const {} = req.body
    const [results, fields] = await connection.execute(`SELECT * FROM eve.Category`,[])
    if(results){
        console.log(results[0]);
        res.send(results);

    }
}

export {getUserInfoRoute, eventRoute, getCategoriesRoute} ;