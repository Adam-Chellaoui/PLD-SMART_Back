const cancelEventQuery = () => "UPDATE Event SET status_id = 2 WHERE id = ?"

const modifyEventQuery = (params) => {
    const setColumns = params.map(x => ` ${x} = ?`).join(",");
    const req = "UPDATE Event SET" + setColumns + " WHERE id = ?"
    return req
}

const removeParticipantQuery = () => "UPDATE Participation SET status_id = 3 WHERE event_id = ? AND user_id = ?"

const getEventsParticipantsQuery = () => 
    "SELECT Participation.user_id, User.name, User.surname FROM Participation INNER JOIN User ON User.id=Participation.user_id  WHERE event_id = ?"

export {getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery, modifyEventQuery};