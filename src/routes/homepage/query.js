const getUserInfoQuery = () => {
    const req = `SELECT surname, photo FROM eve.User WHERE id = ?`
    return req
}

const getPopularEventQuery = () => {
        const req = `select event.name, event.photo as ImageEvent, event.date_timestamp, event.place
        , creator.photo as ImageProfil, event.creator_id as CreatorId  from eve.Participation p, eve.Event event, eve.User as creator where event.date_timestamp>=Now() and creator.id=event.creator_id and event.id =p.event_id GROUP BY p.event_id ORDER BY count(p.event_id) DESC`
        return req
}

const getCategoriesQuery = () => {
    const req = `SELECT distinct c.* FROM eve.Category c, eve.Event e where e.category_id=c.id`
    return req
}

const getEventsbyCategoryQuery = () => {
    const req = `SELECT e.name, e.date_timestamp, e.place, e.photo as ImageEvent, u.photo as ImageProfil, e.category_id , c.description, e.creator_id as CreatorId
                FROM eve.Event e JOIN eve.User u, eve.Category as c 
                WHERE e.creator_id = u.id AND e.date_timestamp>=Now() and c.id=category_id
                ORDER BY e.category_id`
    return req
}

const getEventbyCategoryQuery = () => {
    const req = `SELECT e.name, e.date_timestamp, e.place, e.photo as ImageEvent, u.photo as ImageProfil, e.category_id , c.description, e.creator_id as CreatorId 
                FROM eve.Event e JOIN eve.User u,eve.Category c WHERE e.creator_id = u.id AND e.date_timestamp>=Now() AND e.category_id =? and c.id=e.category_id`
    return req
}


export {getUserInfoQuery};
export {getPopularEventQuery};
export {getCategoriesQuery};
export{getEventsbyCategoryQuery};
export {getEventbyCategoryQuery};
