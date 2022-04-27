import { getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery, modifyEventQuery, demanderParticipationQuery } from "./query.js"


const cancelEvent = async(connection, req, res) => {
    const eventId = req.eventId; 

    try{
        const [results, fields] = await connection.execute(cancelEventQuery(), [eventId])
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
    const eventId = req.eventId;
    
    try{
        const[results, field] = await connection.execute(getEventsParticipantsQuery(), [eventId]);
        res.status(200).json({ participants: results });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
}

const demanderParticipationRoute = async(connection, req, res) => {
    console.log("demanderParticipationRoute Request bod: ", req.body)
    const {user_id, event_id, date_timestamp} = req.body;
    const [results, fields] = await connection.execute(demanderParticipationQuery(),[user_id, event_id, date_timestamp]);
   
    if(results){
        console.log(results)
        res.send(results);
    }  
}

export {getEventParticipants, cancelEvent, removeParticipant, modifyEvent, demanderParticipationRoute}