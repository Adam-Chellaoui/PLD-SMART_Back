const getInfoDemanderNotif = () => {
    const req = `select e.name as event_name, e.date_timestamp as date, e.photo as event_photo, e.id as event_id,u.name, u.surname, u.photo, u.id as user_id, Round(Avg(R.score),1) as score, P.id as demand_id from eve.User u, eve.Review R, eve.Notification N, eve.ParticipationDemand P, eve.Event e where N.id=? and P.id=N.participation_demand_id and P.user_id=u.id and P.event_id=e.id  and R.target_id=u.id and R.creator=0`
    return req
}

const setStatus = () => {
    const req = 'Update ParticipationDemand set status_id=? where id=?'
    return req
}

const acceptDemand = () => {
    const req = 'Insert into Participation (user_id, event_id,status_id) VALUES (?,?,0)'
    return req
}

export {getInfoDemanderNotif, setStatus, acceptDemand};