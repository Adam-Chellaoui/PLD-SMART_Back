const signupQuery = () => {
  //Checker formatation
  const req = `INSERT INTO eve.User (blocked, dateSignupDemand, verified, name, surname, mail, phone, gender, date_birth, user_password, description, admin, school_id, photo)
        VALUES (FALSE, ?, FALSE, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, '')`;
  return req;
};

const getSignupToken = () =>
  `SELECT token, expiration_date FROM SignupToken WHERE user_id=?
  ORDER BY expiration_date DESC`;

const saveTokenQuery = () => {
  const req = `INSERT INTO eve.SignupToken (user_id, token, expiration_date) VALUES (?, ?, ?)`;
  return req;
};

const getUserIdFromEmail = () => `SELECT id FROM eve.User WHERE mail=?`;

const checkEmailExists = () => `SELECT * FROM eve.User WHERE mail=?`;

const verifyUser = () => `UPDATE eve.User SET verified = 1 WHERE id = ?`;

const checkMailValid = () => {
  const req = `Select id from eve.School where domain=?`;
  return req;
};

export {
  getSignupToken,
  signupQuery,
  getUserIdFromEmail,
  checkEmailExists,
  checkMailValid,
  saveTokenQuery,
  verifyUser,
};
