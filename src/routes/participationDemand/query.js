const getInfoDemanderNotif = () => {
    const req = `select e.name as event_name, e.date_timestamp as date, u.name, u.surname, u.photo, Round(Avg(R.score),1) as score from eve.User u, eve.Review R, eve.Notification N, eve.ParticipationDemand P, eve.Event e where N.id=? and P.id=N.participation_demand_id and P.user_id=u.id and P.event_id=e.id  and R.target_id=u.id and R.creator=0`
    return req
}

export {getInfoDemanderNotif};