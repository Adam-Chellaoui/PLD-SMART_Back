const loginQuery = () => {
  const req = `SELECT id, user_password FROM eve.User WHERE mail=?`;
  return req;
};

export { loginQuery };
