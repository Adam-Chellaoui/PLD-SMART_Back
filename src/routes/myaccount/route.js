import { getUserInfoQuery,getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery,getRatingParticipantQuery, getRatingCreatorQuery, editInfoUser,editImageUser } from "./query.js";


const getMyAccountInfo = async (connection, req, res) => {
    console.log("getHistoricRoute Request bod: ", req.body)
    const {id} = req.body
    const [results, fields] = await connection.execute(getUserInfoQuery(), [id])
    const [results2, fields2] = await connection.execute(getRatingParticipantQuery(), [id])
    const [results3, fields3] = await connection.execute(getRatingCreatorQuery(), [id])
    if(results){
        console.log(results[0]);
        var infos = {
            "global_infos":results,
            "participant_rating":results2,
            "creator_rating":results3
        }
        console.log(infos)
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
        console.log(results);
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

const editInfoUserRoute = async (connection, req, res) => {
    console.log("getUpcomingEventRoute Request bod: ", req.body)
    const {phone, city, streetNumber, street,  region,  zipCode, adressComplement, gender, dateBirth,  userPassword, id} = req.body
    connection.query(editInfoUser(), [phone, city, streetNumber, street,  region,  zipCode, adressComplement, gender, dateBirth,  userPassword, id])
    res.send("lala")
   /* if(results){
        console.log(results[0]);
        res.send(results);
    }*/
}

const editImageProfilRoute = async (connection, req, res) => {
    console.log("getUpcomingEventRoute Request bod: ", req.body)
    const {photo, id} = req.body
    connection.query(editImageUser(), [photo, id])
    res.send("lala")
}

export {getHistoricRoute, getReviewUserRoute, getUpcomingEventRoute,getMyAccountInfo, editInfoUserRoute,editImageProfilRoute};