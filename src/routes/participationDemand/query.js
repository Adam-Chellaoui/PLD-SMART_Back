const getInfoDemanderNotif = () => {
  const req = `select e.name as event_name, e.date_timestamp as date, e.photo as event_photo, e.id as event_id,u.name, u.surname, u.photo, u.id as user_id, P.id as demand_id, 
  COALESCE ((Select p.id from eve.Participation p where p.user_id=u.id and p.event_id=e.id),0) as particip_id
  from eve.User u, eve.Notification N, eve.ParticipationDemand P, eve.Event e where N.id=? and P.id=N.participation_demand_id and P.user_id=u.id and P.event_id=e.id`;
  return req;
};

const setStatus = () => {
  const req = "Update ParticipationDemand set status_id=? where id=?";
  return req;
};

const acceptDemand = () => {
  const req =
    "Insert into Participation (user_id, event_id,status_id) VALUES (?,?,0)";
  return req;
};

const deleteDemand = () => {
  const req = "Delete from eve.ParticipationDemand where id=?";
  return req;
};

const deleteParticipation = () => {
  const req = "Delete from eve.Participation where id=?";
  return req;
};

export {
  getInfoDemanderNotif,
  setStatus,
  acceptDemand,
  deleteDemand,
  deleteParticipation,
};
