const loginQuery = (mail) => {
  console.log("Mail is: ", mail);
  const req = `SELECT id, user_password FROM eve.User WHERE mail='${mail}' `;
  return req;
};

export { loginQuery };
