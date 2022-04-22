import jwt from "jsonwebtoken"

/**
 * Middleware function that authenticates an user jwt token.
 * See how middleware works here: https://expressjs.com/en/guide/using-middleware.html
 * See how jwt works here: https://jwt.io
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).send("No authentication token.")

    try{
        const payload = await jwt.verify(token, process.env.SECRET)
        const {userId} = payload
        req.userId = userId;
        next()
    }catch(err){
        return res.status(403).send("Invalid authentication token.")
    }
}