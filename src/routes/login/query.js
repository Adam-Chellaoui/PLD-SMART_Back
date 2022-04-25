const loginQuery = () => {
  const req = `SELECT id, user_password, admin FROM eve.User WHERE mail=?`;
  return req;
};

export { loginQuery };
