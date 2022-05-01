const resetQuery = () => {
    const req = `SELECT id, mail FROM eve.User WHERE mail=?`;
    return req;
  };

const saveTokenQuery = () => {
    const req = `INSERT INTO eve.ResetToken (user_id, token, expiration_date) VALUES (?, ?, ?)`
    return req;
  };

const newPasswordQuery  = () => {
    const req = `SELECT T.token 
                FROM eve.ResetToken T JOIN eve.User U 
                                    ON T.user_id=U.id
                WHERE U.mail=? AND T.expiration_date>now()`
    return req;
  };

const saveNewPasswordQuery = () => {
    const req = `UPDATE eve.User SET user_password = ? WHERE mail = ?`
    return req;
};

export { resetQuery };
export {saveTokenQuery};
export {newPasswordQuery};
export {saveNewPasswordQuery};
  