import { getPopularEventQuery, getUserInfoQuery, getCategoriesQuery, getEventbyCategoryQuery } from "./query.js";

const getUserInfoRoute = async(connection, req, res) => {
    console.log("getUserInfoRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send(results);
    }
}

const getPopularRoute = async(connection, req, res) => {
    const {} = req.body;
    const [results, fields] = await connection.execute(getPopularEventQuery());
   
    //if (err) throw "SQL ERROR: " + err 
    if(results){
        res.send(results);
    }  
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

const getEventbyCategoryRoute = async(connection, req, res) => {
    console.log(req.body)
    const {id} = req.body
    console.log(id)
    const [results, fields] = await connection.execute(getEventbyCategoryQuery(), [id])
        if(results){
            console.log(results);
            res.send(results);
        }
}


export {getUserInfoRoute, getPopularRoute, getCategoriesRoute, getEventbyCategoryRoute} ;
