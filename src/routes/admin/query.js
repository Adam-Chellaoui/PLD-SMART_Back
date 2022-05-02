const adminDeleteEventQuery = () => "DELETE FROM Event WHERE id = ?";
const adminBlockUserQuery = () => "UPDATE User SET blocked = true WHERE id = ?";

export { adminDeleteEventQuery, adminBlockUserQuery };
