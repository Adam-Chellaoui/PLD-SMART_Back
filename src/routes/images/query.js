const getImgEvent = () => {
  const req = `SELECT id, mail FROM eve.User WHERE mail=?`;
  return req;
};


export { getImgEvent };
