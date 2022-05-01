const cancelEventQuery = () => "UPDATE Event SET status_id = 2 WHERE id = ?"

const modifyEventQuery = (params) => {
    const setColumns = params.map(x => ` ${x} = ?`).join(",");
    const req = "UPDATE Event SET" + setColumns + " WHERE id = ?"
    return req
}

const removeParticipantQuery = () => "UPDATE Participation SET status_id = 3 WHERE event_id = ? AND user_id = ?"

const getEventsParticipantsQuery = () => 
    "SELECT Participation.user_id, User.name, User.surname, User.photo FROM Participation INNER JOIN User ON User.id=Participation.user_id  WHERE event_id = ?"

const demanderParticipationQuery = () =>{
    const req = `INSERT INTO eve.ParticipationDemand  (user_id, event_id, status_id, date_timestamp)
                    VALUES (?,?,1,?)`
    return req
}

const getPartcipationDemandId = () =>{
    const req = ` Select pd.id from eve.ParticipationDemand pd where pd.user_id=? and pd.event_id=?`
    return req
}

const getEventState = ()=>{
    const req = ` Select event.photo as event_image, event.name as event_name, event.number_person_max as maxcapacity, event.paying, event.description, event.date_timestamp as date, event.place, event.status_id,
    event.city, event.street, event.street_number, event.zip_code, event.latitude, event.longitude, 
    COALESCE ((SELECT Count(part.id) from eve.Participation part where part.event_id = event.id group by(event_id)),0) as nb_registered,
    c.photo as creator_image, c.name as creator_name, c.id as creator_id,
    cat.description as categorie_name, cat.img as categorie_image,
    COALESCE((SELECT p.id from eve.Participation p where event.id=p.event_id and u.id=p.user_id),0) as particip_id,
    IFNULL(c.id=u.id,0) as user_is_creator,
    COALESCE((SELECT l.id from eve.Liked l where l.event_id=event.id and l.user_id=u.id),0) as liked_id,
    COALESCE((SELECT pd.id from eve.ParticipationDemand pd where pd.event_id=event.id and pd.user_id=u.id),0) as demand_id,
     COALESCE((SELECT rep.id from eve.ReportEvent rep where rep.event_id=event.id),-1) as reported
    from eve.Category cat, eve.Event event, eve.User c, eve.User u
    where event.id=? and u.id=? and event.creator_id=c.id and event.category_id=cat.id`
    return req;
}

const getReviewEventQuery = () => {
    const req = `SELECT distinct C.name, C.surname, C.photo, R.score, R.review, C.id as creator_id, R.id as review_id
                FROM eve.Review R, eve.User C
                WHERE R.event_id= ? and C.id=R.writer_id `
    return req;
} 

const getReviewQuery = () => {
    const req = `SELECT distinct R.id
                FROM eve.Review R
                WHERE R.writer_id=? and R.target_id=? and R.event_id=?`
    return req;
} 

const makeReview = () =>{
    const req = `Insert into eve.Review (score, review,creator,writer_id,target_id,event_id) values (?,?,?,?,?,?)`
    return req
}


const setEventLiked = () =>{
    const req = `Insert into eve.Liked (user_id, event_id, date_timestamp) values (?,?,?)`
    return req
}

const deleteLike = () =>{
    const req = `delete from eve.Liked where user_id=? and event_id=?`
    return req
}

const getLike = () =>{
    const req = "Select l.id from eve.Liked l where l.user_id=? and l.event_id=?"
    return req
}

const deleteParticipation = () =>{
    const req = `delete from eve.Participation where user_id=? and event_id=?`
    return req
}

const delteDemand = () =>{
    const req = `delete from eve.ParticipationDemand where user_id=? and event_id=?`
    return req
}

const getReportTypesEvent = () =>{
    const req = 'Select * from eve.ReportTypeEvent'
    return req
}

const createReportEvent = ()=>{
    const req = 'INSERT into eve.ReportEvent (event_id, report_type_id) values (?,?)'
    return req
}

export {getReportTypesEvent,createReportEvent,getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery, modifyEventQuery, demanderParticipationQuery, getEventState, getReviewEventQuery,setEventLiked,getPartcipationDemandId,deleteLike,getLike,deleteParticipation,delteDemand,makeReview,getReviewQuery};

