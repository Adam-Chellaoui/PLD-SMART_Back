export const isUserBlockedQuery = () =>
  "SELECT blocked FROM eve.User WHERE id=?";
