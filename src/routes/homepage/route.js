import { getPopularEventQuery, getUserInfoQuery, getCategoriesQuery, getEventsbyCategoryQuery,getEventbyCategoryQuery } from "./query.js";

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
    console.log("getCategoriesRoute Request bod: ")
    const [results, fields] = await connection.execute(getCategoriesQuery())
    if(results){
        console.log(results[0]);
        res.send(results);

    }
}

const getEventsbyCategoryRoute = async(connection, req, res) => {
    console.log(req.body)
    const {} = req.body
    const [results, fields] = await connection.execute(getEventsbyCategoryQuery())
        if(results){
            console.log(results);
            res.send(results);
        }
}

const getEventbyCategoryRoute = async(connection, req, res) => {
    console.log(req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getEventbyCategoryQuery(),[id])
    if(results){
        console.log(results);
        res.send(results);
    }
}



export {getUserInfoRoute, getPopularRoute, getCategoriesRoute, getEventsbyCategoryRoute,getEventbyCategoryRoute} ;
