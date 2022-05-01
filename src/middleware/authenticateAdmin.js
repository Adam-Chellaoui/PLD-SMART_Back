/**
 * Middleware that authenticates an admin.
 * Expects a POST call with the eventId inside the body.
 * @param {*} connection 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 export const authenticateAdmin = async(connection, req, res, next) => {
    //Get the queried event id.
    const isAdmin = req.isAdmin; 

    if(!isAdmin)
        return res.status(501).json({error: "Unauthorized: not an administrator."})
        
    next()
}