const signupQuery = () => {
        //Checker formatation
        const req = `INSERT INTO eve.User (name, surname, mail, phone, city, street, street_number, region, zip_code, address_complement, gender, date_birth, user_password, description, admin, school_id, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, 1, '')`
        return req
   }

const checkEmailExists = (email) => {
    const req = `SELECT * FROM eve.User WHERE mail='${email}'`
}


export {signupQuery};