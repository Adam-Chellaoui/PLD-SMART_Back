import {
  getNotificationsQuery,
  createNotification,
  setNotificationDone,
} from "./query.js";

const getNotificationsRoute = async (connection, req, res) => {
  console.log("notifications body", req.body);
  const { id } = req.body;
  try {
    const [results, fields] = await connection.execute(
      getNotificationsQuery(),
      [id]
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const createNotificationRoute = async (
  connection,
  receiver_id,
  Corps,
  status_id,
  type_id,
  event_id,
  review_id,
  user_targeted_id,
  participation_demand_id,
  date
) => {
  console.log("liked");
  try {
    const [results, fields] = await connection.execute(createNotification(), [
      receiver_id,
      Corps,
      status_id,
      type_id,
      event_id,
      review_id,
      user_targeted_id,
      participation_demand_id,
      date,
    ]);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

const setNotifDoneRoute = async (connection, req, res) => {
  console.log("done body", req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(setNotificationDone(), [
      id,
    ]);
    res.status(200).send({ message: "Success " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export { getNotificationsRoute, createNotificationRoute, setNotifDoneRoute };
