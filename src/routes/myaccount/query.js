const getHistoricQuery = () => {
    const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE u.id=e.creator_id and u.id = ?`
    /*    
    const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp<=Now() and u.id=e.creator_id and u.id = ?` */
    return req;
}

const getReviewUserQuery = () => {
    const req = `SELECT R.id, U.name, U.surname, R.score, R.review  
                FROM eve.Review R JOIN eve.User U
                WHERE U.id = R.id and R.creator = ?`
    return req;
}

const getUpcomingEventQuery = () => {
    const req =  `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp >= Now() and u.id=e.creator_id and u.id = ?`
    return req;
}

export { getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery };