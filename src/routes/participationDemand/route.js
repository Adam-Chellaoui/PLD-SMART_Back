import { getInfoDemanderNotif} from "./query.js";


const getInfoDemanderNotifRoute = async(connection, req, res) => {
    console.log("getEventsRoute Request bod: ", req.body)
    const {id} = req.body;
    const [results, fields] = await connection.execute(getInfoDemanderNotif(),[id]);
   
    if(results){
        console.log(results)
        res.send(results);
    }  
}


export {getInfoDemanderNotifRoute}