const signupQuery = (
    name,
    surname, 
    email, 
    city,
    street,
    streetNb,
    region,
    zipCode,
    addressComplement,
    password, 
    phone, 
    gender,
    birthDateTimestamp,
    description
    ) => {
        //Checker formatation
        const req = `INSERT INTO eve.User (name, surname, mail, phone, city, street, street_number, region, zip_code, address_complement, gender, date_birth, user_password, description, admin, school_id, photo)
        VALUES ('${name}', '${surname}', '${email}', '${phone}','${city}', '${street}', '${streetNb}', '${region}', '${zipCode}', '${addressComplement}', '${gender}', '${birthDateTimestamp}', '${password}', '${description}', FALSE, 1, '')`
        return req
   }


export {signupQuery};