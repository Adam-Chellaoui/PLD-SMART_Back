import { getEventsParticipantsQuery } from "./query.js"

const cancelEvent = async(connection, req, res) => {}

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
    console.log(req.query)
    const {eventId} = req.query
    try{
        const[results, field] = await connection.execute(getEventsParticipantsQuery(), [eventId]);
        res.status(200).json({ data: results });
    }
    catch(err){
        res.status(500).json({message: "An error ocurred: " + err})
    }
}

export {getEventParticipants};