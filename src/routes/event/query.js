const cancelEventQuery = () => "UPDATE Event SET status_id = 2 WHERE id = ?"

const modifyEventQuery = (params) => {
    const setColumns = params.map(x => ` ${x} = ?`).join(",");
    const req = "UPDATE Event SET" + setColumns + " WHERE id = ?"
    return req
}

const removeParticipantQuery = () => "UPDATE Participation SET status_id = 3 WHERE event_id = ? AND user_id = ?"

const getEventsParticipantsQuery = () => 
    "SELECT Participation.user_id, User.name, User.surname FROM Participation INNER JOIN User ON User.id=Participation.user_id  WHERE event_id = ?"

const demanderParticipationQuery = () =>{
    const req = `INSERT INTO eve.ParticipationDemand  (user_id, event_id, status_id, date_timestamp)
                    VALUES (?,?,1,?)`
    return req
}

const getEventState = ()=>{
    const req = ` Select event.photo as event_image, event.name as event_name, event.number_person_max as maxcapacity, event.paying, event.description, event.date_timestamp as date, event.place, event.status_id,
    c.photo as creator_image, c.name as creator_name, c.id as creator_id,
    cat.description as categorie_name, cat.img as categorie_image,
    COALESCE((SELECT p.id from eve.Participation p where event.id=p.event_id and u.id=p.id and NOW()>=event.date_timestamp),0) as particip_id,
    IFNULL(c.id=u.id,0) as user_is_creator
    from eve.Category cat, eve.Event event, eve.User c, eve.User u
    where event.id=? and u.id=? and event.creator_id=c.id and event.category_id=cat.id`
    return req;
}

const getReviewEventQuery = () => {
    const req = `SELECT distinct C.name, C.surname, C.photo, R.score, R.review
                FROM eve.Review R, eve.User C
                WHERE R.event_id= ? and C.id=R.writer_id `
    return req;
} 

export {getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery, modifyEventQuery, demanderParticipationQuery, getEventState, getReviewEventQuery};

