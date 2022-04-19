const getUserInfoQuery = () => {
    const req = `SELECT surname, photo FROM eve.User WHERE id = ?`
    return req
}

const getPopularEventQuery = () => {
        const req = `SELECT event.name, event.photo as ImageEvent, event.date_timestamp, event.place, user.photo as ImageProfil  
                    FROM eve.Event as event, eve.User as user  
                    where event.date_timestamp>=Now() and user.id=event.creator_id `
        return req
   }

const getCategoriesQuery = () => {
    const req = `SELECT * FROM eve.Category`
    return req
}

const getEventsbyCategoryQuery = () => {
    const req = `SELECT e.name, e.date_timestamp, e.place, e.photo as ImageEvent, u.photo as ImageProfil, e.category_id , c.description
                FROM eve.Event e JOIN eve.User u, eve.Category as c 
                WHERE e.creator_id = u.id AND e.date_timestamp>=Now() and c.id=category_id
                ORDER BY e.category_id`
    return req
}

/*const getEventbyCategoryQuery = () => {
    const req = `SELECT e.name, e.date_timestamp, e.place, e.photo as ImageEvent, u.photo as ImageProfil 
                FROM eve.Event e JOIN eve.User u  
                WHERE e.creator_id = u.id AND e.date_timestamp>=Now() AND e.category_id = ? `
    return req
}*/

/*const eventbyCategoryQuery = (id) => {
        const req = `SELECT * FROM eve.Event Event WHERE Event.category_id = '${id}' `
        return req
    }
*/


export {getUserInfoQuery};
export {getPopularEventQuery};
export {getCategoriesQuery};
export{getEventsbyCategoryQuery};
//export {eventbyCategoryQuery};
