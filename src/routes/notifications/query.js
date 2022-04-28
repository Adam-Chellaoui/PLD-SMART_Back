const getNotificationsQuery = () => {
    const req = `Select DISTINCT n.id, n.date, t.type, n.type_id, n.event_id, n.review_id , n.user_targeted_id, n.participation_demand_id, 
    COALESCE ((SELECT r.review from eve.Notification noti, eve.Review r where noti.id=n.id and	n.review_id =r.id LIMIT 1),0) as review,
    COALESCE ((SELECT distinct u.surname from eve.Notification noti, eve.Review r, eve.User u, eve.ParticipationDemand pd where noti.id=n.id and 
    ((noti.review_id=r.id and r.writer_id=u.id) or (noti.participation_demand_id=pd.id and pd.user_id =u.id) or (noti.user_targeted_id=u.id)) LIMIT 1),0) as surname,
    COALESCE ((SELECT distinct u.photo from eve.Notification noti, eve.Review r, eve.User u, eve.ParticipationDemand pd where noti.id=n.id and 
    ((noti.review_id=r.id and r.writer_id=u.id) or (noti.participation_demand_id=pd.id and pd.user_id =u.id)or (noti.user_targeted_id=u.id)) LIMIT 1),0) as userPhoto,
    COALESCE ((SELECT e.photo from eve.Notification noti, eve.Event e where noti.id=n.id and n.event_id  =e.id LIMIT 1),0) as event_photo,
    COALESCE ((SELECT e.name from eve.Notification noti, eve.Event e, eve.ParticipationDemand pd where noti.id=n.id and ((n.event_id  =e.id) or ( noti.participation_demand_id=pd.id and pd.event_id=e.id)) LIMIT 1),0) as event_name 
    from eve.Notification n, eve.TypeNotif t 
    where n.receiver_id=? and n.status_id=1 and n.type_id=t.id and n.status_id=1
    Order by date DESC`
    return req
};

const createNotification = ()=>{
    const req = `Insert into eve.Notification (receiver_id,Corps,status_id,type_id,event_id, review_id,user_targeted_id,participation_demand_id,date)
    Values (?,?,?,?,?,?,?,?,?)`
    return req;
}

const setNotificationDone = ()=>{
    const req = 'Update eve.Notification SET status_id=2 where id=?'
    return req
}


export { getNotificationsQuery,createNotification,setNotificationDone};
  
