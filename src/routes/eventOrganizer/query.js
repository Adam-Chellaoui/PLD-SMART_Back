const cancelEventQuery = () => "UPDATE Event SET status_id = 2 WHERE id = ?"

const modifyEventQuery = (name, city, categoryId, numberPersonMax, paying, photo) => {
    const params = [{name: name}, {city: city}, {categoryId: categoryId}, numberPersonMax, paying, photo]
    const setColumns = params.filter(x => x.length > 0).map(x => "x = ")
    const req = "UPDATE Event SET " + setColumns()
}

const removeParticipantQuery = () => "UPDATE Participation SET status_id = 3 WHERE event_id = ? AND user_id = ?"

const getEventsParticipantsQuery = () => 
    "SELECT Participation.user_id, User.name, User.surname FROM Participation INNER JOIN User ON User.id=Participation.user_id  WHERE event_id = ?"

export {getEventsParticipantsQuery, cancelEventQuery, removeParticipantQuery};