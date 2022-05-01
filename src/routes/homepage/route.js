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


const getAllInfo = async(connection, req, res) => {
    console.log(req.body)
    const [results2, fields2] = await connection.execute(getPopularEventQuery());
    const [results3, fields3] = await connection.execute(getCategoriesQuery())
    const [results4, fields4] = await connection.execute(getEventsbyCategoryQuery())
    if(results2 && results3 && results4){
        
        var total = {
            popular : results2,
            categories: results3,
            eventsByCat: results4
        }
        console.log(total)
        res.send(total);
    }
}


export {getUserInfoRoute, getPopularRoute, getCategoriesRoute, getEventsbyCategoryRoute,getEventbyCategoryRoute,getAllInfo} ;
