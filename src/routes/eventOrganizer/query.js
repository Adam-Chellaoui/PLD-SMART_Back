const cancelEventQuery = () => ""

const getEventsParticipantsQuery = () => 
    "SELECT Participation.user_id, User.name, User.surname FROM Participation INNER JOIN User ON User.id=Participation.user_id  WHERE event_id = ?"

export {getEventsParticipantsQuery};