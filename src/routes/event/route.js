import { getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery, modifyEventQuery,
         demanderParticipationQuery,getEventState, getReviewEventQuery, setEventLiked,getPartcipationDemandId,
        deleteLike,getLike,deleteParticipation,delteDemand,makeReview, getReviewQuery, getnonReviewedParticipantsQuery } from "./query.js"

import getDateNow from "../../utils/formatageDate.js";
const getInfoEvent = async(connection, req, res) => {
    //console.log("getInfoevent Request bod: ", req.body)
    const {event_id,user_id} = req.body;
    const [results, fields] = await connection.execute(getEventState(),[event_id,user_id]);
   
    if(results){
        //console.log(results)
        res.send(results);
    }  
}

const cancelEvent = async(connection, req, res) => {
    console.log("getParti Request bod: ", req.body)
    const {event_id} = req.body;

    try{
        const [results, fields] = await connection.execute(cancelEventQuery(), [event_id])
        res.status(200).json({message: "Event successfully cancelled."})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error occured."})
    }
}

const removeParticipant = async(connection, req, res) => {
    const eventId = req.eventId;
    const {participantId} = req.body;

    console.log("Hello: ", eventId)

    try{
        const [results, fields] = await connection.execute(removeParticipantQuery(), [eventId, participantId])
        res.status(200).json({message: "Particpant successfully removed."})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error occured"})
    }
}

const modifyEvent = async(connection, req, res) => {
    const eventId = req.eventId;
    const {name, city, categoryId, numberPersonMax, paying, photo} = req.body
    const params = [
        {row: "name", value: name}, 
        {row: "city", value: city}, 
        {row: "categoryId", value: categoryId}, 
        {row: "numberPersonMax", value: numberPersonMax},
        {row: "paying", value: paying},
        {row: "photo", value: photo}
    ]
    console.log("Params: ", params)

    const filteredParams = params.filter(x => x.value)
    const filteredParamsRows = filteredParams.map(x => x.row)
    const filteredParamsValues = filteredParams.map(x => x.value)
    if(filteredParams.length == 0)
        return res.status(400).send("All params to be modified are empty")

    try{
          //Concatenate the values with the eventId for the query
        const query = modifyEventQuery(filteredParamsRows)
        const queryValues = filteredParamsValues.concat([eventId])
        console.log("Query is: ", query)
        console.log("Query Params is: ", filteredParams)
        console.log("Query values is: ", queryValues)
        const [results, fields] = await connection.execute(
            query,
            queryValues
            )
        res.status(200).json({message: "Event successfully modified."})

    }catch(err){
        console.log("Error: ", err)
        res.status(500).json({error: "An error occured"})
    }
}

/**
 * Route gets event participants for a specific event.
 * Expects an eventId query param specyfing the queried param.
 * Returns a json object "message" as an array of participants.
 * 
 * @param {*} connection 
 * @param {*} req 
 * @param {eventId: number} res 
 * 
 * @returns {message: [{user_id: number, name: string, surname: string}] }
 * 
 */
const getEventParticipants = async(connection, req, res) => {
    console.log("getParti Request bod: ", req.body)
    const {event_id} = req.body;
    
    try{
        const[results, field] = await connection.execute(getEventsParticipantsQuery(), [event_id]);
        res.status(200).json({ participants: results });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const getnonReviewedParticipants = async(connection, req, res) => {
    console.log("getnonReviewedParti Request bod: ", req.body)
    const {event_id} = req.body;
    
    try{
        const[results, field] = await connection.execute(getnonReviewedParticipantsQuery(), [event_id]);
        res.status(200).json({ participants: results });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const getEventParticipantsNotif = async(connection, event_id) => {
    
    try{
        const[results, field] = await connection.execute(getEventsParticipantsQuery(), [event_id]);
        return results
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const demanderParticipationRoute = async(connection, req, res) => {
    console.log("demanderParticipationRoute Request bod: ", req.body)
    const {user_id, event_id} = req.body;
    const date = getDateNow();
    connection.query(demanderParticipationQuery(),[user_id, event_id, date]);

    try{
        const[results, field] = await connection.execute(getPartcipationDemandId(), [user_id,event_id]);
        res.status(200).send(results);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const setEventLikeRoute = async(connection, req, res) => {
    console.log("demanderParticipationRoute Request bod: ", req.body)
    const {user_id, event_id, liked} = req.body;
    if(liked===0){
        connection.query(deleteLike(),[user_id, event_id]);
        res.send("successfully deleted");
    }else{
        const date = getDateNow();
        connection.query(setEventLiked(),[user_id, event_id,date]);
        res.send("successfully liked");
    }  

}

const getLikeRoute = async(connection, req, res) => {
    console.log("getLike Request bod: ", req.body)
    const {user_id, event_id} = req.body;

    try{
        const[results, field] = await connection.execute(getLike(), [user_id,event_id]);
        res.status(200).send(results);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const getReviewEventRoute = async(connection, req, res) => {
    const event_id = req.body.event_id;
    try{
        const[results, field] = await connection.execute(getReviewEventQuery(), [event_id]);
        res.status(200).json({ reviews: results });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const withdrawRoute = async(connection, req, res) => {
    console.log("withdraw Request bod: ", req.body)
    const {user_id, event_id} = req.body;
    connection.query(deleteParticipation(),[user_id, event_id]);
    connection.query(delteDemand(),[user_id, event_id]);
    res.send("successfully deleted");

}

const addReview = async(connection, req, res) => {
    console.log("addReview Request bod: ", req.body)
    const {score,review,creator,writer_id,target_id,event_id} = req.body;

    try{
        const [results, fields] = await connection.execute(makeReview(), [score,review,creator,writer_id,target_id,event_id])
        
        try{
            const[results, field] = await connection.execute(getReviewQuery(), [event_id,writer_id,target_id]);
            res.status(200).send(results);
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: "An error ocurred: "})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error occured."})
    }
}


const getReviewId = async(connection, req, res) => {
    console.log("getReview Request bod: ", req.body)
    const {writer_id,target_id,event_id} = req.body;
    try{
        const[results, field] = await connection.execute(getReviewQuery(), [writer_id,target_id,event_id]);
        if(results.length!=0){
            res.status(200).send(results);
        }else{
            var resp = [{id: -1}]
            res.status(200).send(resp)
        }
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

export {getEventParticipants, cancelEvent, removeParticipant, modifyEvent, 
        demanderParticipationRoute,getInfoEvent, getReviewEventRoute,setEventLikeRoute,
        getLikeRoute,withdrawRoute,getEventParticipantsNotif,addReview,getReviewId,
        getnonReviewedParticipants}
