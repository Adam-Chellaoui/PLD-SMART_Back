const getFilteredEventsQuery = () => {
    const req = `select event.name, event.description, event.latitude, event.longitude, event.photo as ImageEvent from eve.Participation p, eve.Event event  where event.category_id=? and event.date_timestamp=? and event.id =p.event_id GROUP BY p.event_id ORDER BY count(p.event_id) DESC`
    return req
}

export {getFilteredEventsQuery};