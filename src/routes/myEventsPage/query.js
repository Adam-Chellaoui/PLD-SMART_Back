const comingEventsQuery = () => {
    const req = `SELECT event.name, event.photo as ImageEvent, event.date_timestamp, event.place, creator.photo as ImageProfil  FROM eve.Event as event, eve.User as creator, eve.Participation as p  where event.date_timestamp>=Now() and creator.id=event.creator_id and event.id=p.event_id and p.user_id=? order by event.date_timestamp`
    return req
};
  
export { comingEventsQuery };
  