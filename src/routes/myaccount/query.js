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



export { getHistoricQuery, getReviewUserQuery, getUpcomingEventQuery, editInfoUser };