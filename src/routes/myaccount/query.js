const getUserInfoQuery = () => {
    const req = `SELECT name, surname, mail, phone, city, street, street_number, region, zip_code, gender, date_birth, description, photo FROM eve.User WHERE id = ?`
    return req
}

const getHistoricQuery = () => {
    const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE u.id=e.creator_id and u.id = ? and  e.date_timestamp<=Now()`
    /*    
    const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp<=Now() and u.id=e.creator_id and u.id = ?` */
    return req;
}

const getReviewUserQuery = () => {
    const req = `SELECT distinct C.name, C.surname, C.photo, R.score, R.review, E.name as event_name
                FROM eve.Review R, eve.User C, eve.Event E
                WHERE R.target_id=? and C.id=R.writer_id and R.event_id=E.id`
    return req;
} 

const getRatingParticipantQuery = () => {
    const req ='SELECT Round(Avg(R.score),1) as score FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=0'
    return req;
}

const getRatingCreatorQuery = () => {
    const req ='SELECT Round(Avg(R.score),1) as score FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=1'
    return req;
}

const getUpcomingEventQuery = () => {
    const req =  `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp >= Now() and u.id=e.creator_id and u.id = ?`
    return req;
}

const editInfoUser = () => {
    const req = "UPDATE User SET phone=COALESCE(?, phone), city=COALESCE(?, city), street_number=COALESCE(?, street_number), street=COALESCE(?, street), region=COALESCE(?, region), zip_code=COALESCE(?, zip_cOde), address_complement=COALESCE(?, address_complement), gender=COALESCE(?, gender), date_birth=COALESCE(?, date_birth), user_password=COALESCE(?, user_password) where id=?"
    return req;
    
}



export { getUserInfoQuery, getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery, editInfoUser, getRatingParticipantQuery, getRatingCreatorQuery };