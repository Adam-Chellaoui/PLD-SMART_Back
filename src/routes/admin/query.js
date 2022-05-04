const adminDeleteEventQuery = () => "DELETE FROM Event WHERE id = ?";
const adminBlockUserQuery = () => "UPDATE User SET blocked = true WHERE id = ?";
const getAdminId = () => "Select id from eve.User where admin=1"

export { adminDeleteEventQuery, adminBlockUserQuery,getAdminId };
