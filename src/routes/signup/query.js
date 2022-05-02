const signupQuery = () => {
  //Checker formatation
  const req = `INSERT INTO eve.User (dateSignupDemand, verified, name, surname, mail, phone, city, street, street_number, region, zip_code, address_complement, gender, date_birth, user_password, description, admin, school_id, photo)
        VALUES (?, FALSE, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, '')`;
  return req;
};

const checkEmailExists = () => `SELECT * FROM eve.User WHERE mail=?`;

const verifyUser = () => `UPDATE eve.User SET verified = 1 WHERE user_id = ?`;

const checkMailValid = () => {
  const req = `Select id from eve.School where domain=?`;
  return req;
};

export { verifyUser, signupQuery, checkEmailExists, checkMailValid };
