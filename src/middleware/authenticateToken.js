import jwt from "jsonwebtoken"

export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).send("No authentication token.")

    try{
        const payload = await jwt.verify(token, process.env.SECRET)
        console.log("Payload: ", payload)

        next()
    }catch(err){
        return res.status(403).send("Invalid authentication token.")
    }
    
}