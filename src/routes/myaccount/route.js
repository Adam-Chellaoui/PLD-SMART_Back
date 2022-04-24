import { getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery } from "./query.js";

const getHistoricRoute = async (connection, req, res) => {
    console.log("getHistoricRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getHistoricQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send(results);
    }
}

const getReviewUserRoute = async (connection, req, res) => {
    console.log("getReviewUserRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getReviewUserQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send(results);
    }
}

const getUpcomingEventRoute = async (connection, req, res) => {
    console.log("getUpcomingEventRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getUpcomingEventQuery(), [id])

    if(results){
        console.log(results[0]);
        res.send(results);
    }
}

export {getHistoricRoute, getReviewUserRoute, getUpcomingEventRoute };