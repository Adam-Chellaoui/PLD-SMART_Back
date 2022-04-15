const getUserInfoQuery = () => {
    const req = `SELECT name, photo FROM eve.User WHERE id = ?`
    return req
}

const eventQuery = () => {
        const req = `SELECT * FROM eve.Event where date_timestamp>=Now()  `
        return req
   }

const getEventbyCategoryQuery = () => {
    const req = `SELECT e.name, e.date_timestamp, e.place, e.photo as ImageEvent, u.photo as ImageProfil 
                FROM eve.Event e JOIN eve.User u  
                WHERE e.creator_id = u.id AND e.date_timestamp>=Now() AND e.category_id = ? `
    return req
}

/*const eventbyCategoryQuery = (id) => {
        const req = `SELECT * FROM eve.Event Event WHERE Event.category_id = '${id}' `
        return req
    }

const categoryQuery = () => {
    const req = `SELECT * FROM eve.Category`
}
*/


export {getUserInfoQuery};
export {eventQuery};
export{getEventbyCategoryQuery};
//export {eventbyCategoryQuery};
//export {categoryQuery};