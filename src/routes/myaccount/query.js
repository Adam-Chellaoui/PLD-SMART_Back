const getUserInfoQuery = () => {
  const req = `SELECT u.name, u.surname, u.mail, u.phone, u.city, u.street, u.street_number, u.region, u.zip_code, u.gender, u.date_birth, u.description, u.photo, s.name as school_name,
    COALESCE((select id from eve.Report r where r.user_id=u.id ),-1) as reported
    FROM eve.User u, eve.School s, eve.Report r WHERE u.id = ? and u.school_id=s.id `;
  return req;
};

const getHistoricQuery = () => {
  const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil, e.creator_id as CreatorId, e.id as event_id
                FROM eve.Event e , eve.User u
                WHERE u.id=e.creator_id and u.id = ? and  e.date_timestamp<=Now()`;
  /*    
    const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil  
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp<=Now() and u.id=e.creator_id and u.id = ?` */
  return req;
};

const getReviewUserQuery = () => {
  const req = `SELECT distinct C.name, C.surname, C.photo, R.score, R.review, E.name as event_name, C.id as creator_id
                FROM eve.Review R, eve.User C, eve.Event E
                WHERE R.target_id=? and C.id=R.writer_id and R.event_id=E.id`;
  return req;
};

const getRatingParticipantQuery = () => {
  const req =
    "SELECT Round(Avg(R.score),1) as score FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=0";
  return req;
};

const getRatingCreatorQuery = () => {
  const req =
    "SELECT Round(Avg(R.score),1) as score FROM eve.Review R, eve.User C WHERE R.target_id=? and R.creator=1";
  return req;
};

const getUpcomingEventQuery = () => {
  const req = `SELECT e.name, e.photo as ImageEvent, e.date_timestamp, e.place, u.photo as ImageProfil, e.creator_id as CreatorId, e.id as event_id 
                FROM eve.Event e , eve.User u
                WHERE e.date_timestamp >= Now() and u.id=e.creator_id and u.id = ? and e.status_id=1`;
  return req;
};

const editInfoUser = () => {
  const req =
    "UPDATE User SET phone=COALESCE(?, phone), city=COALESCE(?, city), street_number=COALESCE(?, street_number), street=COALESCE(?, street), region=COALESCE(?, region), zip_code=COALESCE(?, zip_cOde), address_complement=COALESCE(?, address_complement), gender=COALESCE(?, gender), date_birth=COALESCE(?, date_birth), user_password=COALESCE(?, user_password) where id=?";
  return req;
};

const editImageUser = () => {
  const req = "UPDATE User SET photo=? where id=?";
  return req;
};

const getReportTypes = () => {
  const req = "Select * from eve.ReportType";
  return req;
};

const createReport = () => {
  const req = "INSERT into eve.Report (user_id, report_type_id) values (?,?)";
  return req;
};

export {
  getUserInfoQuery,
  getHistoricQuery,
  getReviewUserQuery,
  editImageUser,
  getUpcomingEventQuery,
  editInfoUser,
  getRatingParticipantQuery,
  getRatingCreatorQuery,
  getReportTypes,
  createReport,
};
