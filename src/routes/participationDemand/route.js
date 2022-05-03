import {
  getInfoDemanderNotif,
  setStatus,
  acceptDemand,
  deleteDemand,
  deleteParticipation,
} from "./query.js";
import { setNotificationDone } from "../notifications/query.js";

const getInfoDemanderNotifRoute = async (connection, req, res) => {
  console.log("getEventsRoute Request bod: ", req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(getInfoDemanderNotif(), [
      id,
    ]);
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const refuseDemandRoute = async (connection, req, res) => {
  console.log("setStatusDemand Request bod: ", req.body);
  const { id, notif_id } = req.body;
  try {
    const [results, fields] = await connection.execute(setStatus(), [3, id]);

    try {
      const [results, fields] = await connection.execute(
        setNotificationDone(),
        [notif_id]
      );
      res.status(200).send({ message: "Success " });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error ocurred: " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const acceptDemandRoute = async (connection, req, res) => {
  console.log("setStatusDemand Request bod: ", req.body);
  const { demand_id, user_id, event_id, notif_id } = req.body;

  try {
    const [results, fields] = await connection.execute(setStatus(), [
      2,
      demand_id,
    ]);

    try {
      const [results, fields] = await connection.execute(acceptDemand(), [
        user_id,
        event_id,
      ]);

      try {
        const [results, fields] = await connection.execute(
          setNotificationDone(),
          [notif_id]
        );
        res.status(200).send({ message: "Demand has been accepted " });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error ocurred: " });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error ocurred: " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const signoutDemand = async (connection, req, res) => {
  console.log("signOut Request bod: ", req.body);
  const { demand_id, participation_id } = req.body;

  try {
    const [results, fields] = await connection.execute(deleteDemand(), [
      demand_id,
    ]);

    try {
      const [results, fields] = await connection.execute(
        deleteParticipation(),
        [participation_id]
      );
      res.status(200).send({ message: "Success " });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error ocurred: " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export {
  getInfoDemanderNotifRoute,
  refuseDemandRoute,
  acceptDemandRoute,
  signoutDemand,
};
