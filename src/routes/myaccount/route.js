import { getUserInfoQuery,getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery,getRatingParticipantQuery, getRatingCreatorQuery } from "./query.js";


const getMyAccountInfo = async (connection, req, res) => {
    console.log("getHistoricRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])
    const [results2, fields2] = await connection.execute(getRatingParticipantQuery(), [id])
    const [results3, fields3] = await connection.execute(getRatingCreatorQuery(), [id])
    if(results){
        console.log(results[0]);
        var infos = {
            "global infos":results,
            "participant rating":results2,
            "creator rating":results3
        }
        res.send(infos);
    }
}

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
        
    }
    res.send(results);
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

export {getHistoricRoute, getReviewUserRoute, getUpcomingEventRoute,getMyAccountInfo };