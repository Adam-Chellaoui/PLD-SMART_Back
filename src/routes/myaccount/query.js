const getUserInfoQuery = () => {
    const req = `SELECT name, surname, mail, phone, city, street, street_number, region, zip_code, gender, date_birth, description, photo FROM eve.User WHERE id = ?`
    return req
}

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
    const req = `SELECT distinct C.name, C.surname, R.score, R.review  
                FROM eve.Review R, eve.User C
                WHERE R.target_id=? and C.id=R.writer_id`
    return req;
}

const getRatingParticipantQuery = () => {
    const req ='SELECT Avg(R.score) FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=0'
    return req;
}

const getRatingCreatorQuery = () => {
    const req ='SELECT Avg(R.score) FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=1'
    return req;
}

const getUpcomingEventQuery = () => {
    const req =  `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp >= Now() and u.id=e.creator_id and u.id = ?`
    return req;
}

const editInfoUser = () => {
    (phone, city, streetNumber, street, region, zipCode, adressComplement, gender, dateBirth, userPassword, photo) => {
        const params = [{phone: phone}, {city: city}, {streetNumber: streetNumber}, {street: street}, {region: region},
            {zipCode: zipCode}, {adressComplement: adressComplement}, {gender: gender}, {dateBirth: dateBirth},
            {userPassword: userPassword}, {photo: photo}]
        const setColumns = params.filter(x => x.length > 0).map(x => "x = ")
        const req = "UPDATE User SET " + setColumns()
    }
return req;
}



export { getUserInfoQuery, getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery, editInfoUser, getRatingParticipantQuery, getRatingCreatorQuery };