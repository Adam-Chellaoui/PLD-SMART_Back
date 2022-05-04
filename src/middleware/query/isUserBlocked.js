export const isUserBlockedQuery = () =>
  "SELECT blocked, verified FROM eve.User WHERE id=?";
