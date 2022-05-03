const getEventsQuery = () => {
  const req =
    `select event.name, event.description, event.latitude, event.longitude, event.photo as ImageEvent, s.score, event.id as event_id
    from eve.Event event left outer join eve.ParticipationDemand p  on event.id=p.event_id, ` +
    getEventsRatings() +
    ` where event.date_timestamp>=Now() and event.creator_id=s.id  group by (p.event_id) order by COALESCE(count(p.event_id),0) DESC`;
  return req;
};

const getFilteredEventsQuery = () => {
  const req =
    `select event.name, event.description, event.latitude, event.longitude, event.photo as ImageEvent, s.score,event.id as event_id
    from eve.Event event left outer join eve.ParticipationDemand p  on event.id=p.event_id, ` +
    getEventsRatings() +
    `  where event.category_id=? and event.date_timestamp=? and event.creator_id=s.id group by (p.event_id) order by COALESCE(count(p.event_id),0) DESC`;
  return req;
};

const getEventsRatings = () => {
  const req =
    "(select avg(r.score) as score, u.id as id from eve.Event e, eve.Review r, eve.User u  where r.target_id=u.id and u.id=creator_id  GROUP by (u.id)) as s";
  return req;
};

export { getEventsQuery, getFilteredEventsQuery, getEventsRatings };
