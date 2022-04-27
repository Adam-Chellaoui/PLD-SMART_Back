import { adminDeleteEventQuery, adminBlockUserQuery } from "./query.js";
import { checkUserExistsQuery } from "../../helpers/query/checkUserExists.js";

const adminDeleteEvent = async(connection, req, res) => {
    const {eventId} = req.body;

    if(!eventId)
        res.status(400).json({error: "Param eventId empty."})

    try{
        const [results, fields] = await connection.execute(adminDeleteEventQuery(), [eventId])
        res.status(200).json({message: "Event successfully deleted."})
    }
    catch(err){
        console.log("An error occurred: ", err)
        res.status(500).json({error: "An error occured. Check if the eventId exists."})
    }
}

const adminBlockUser = async(connection, req, res) => {
    const {targetUserId} = req.body;
    if(!targetUserId)
        res.status(400).json({error: "Empty userId."})

    //Check if user id exists
    try{
        const [results, fields] = await connection.execute(checkUserExistsQuery(), [targetUserId])
        if(!results)
            return res.status(400).json({error: "Target user id does not exists."})
    }
    catch(err){
        console.log("An error occurred: ", err)
        return res.status(500).json({error: "An error occured."})
    }

    try{
        const [results, fields] = await connection.execute(adminBlockUserQuery(), [targetUserId])
        return res.status(200).json({message: "User succesfully blocked."})
    }
    catch(err){
        console.log("An error occurred: ", err)
        return res.status(500).json({error: "An error occured."})
    }

}


export {adminDeleteEvent, adminBlockUser};