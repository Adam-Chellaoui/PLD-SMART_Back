import { getEventsParticipantsQuery, cancelEventQuery } from "./query.js"


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

const modifyEvent = async(connection, req, res) => {
    const {name, city, categoryId, numberPersonMax, paying, photo} = req.body


    try{

    }catch(err){
        res.send(500).json({error: "An error occured" + err})
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

export {getEventParticipants, cancelEvent}