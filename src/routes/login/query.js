const loginQuery = () => {
  const req = `SELECT id, user_password, admin, blocked FROM eve.User WHERE mail=?`;
  return req;
};

export { loginQuery };
