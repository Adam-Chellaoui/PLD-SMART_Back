import {
  getUserInfoQuery,
  getHistoricQuery,
  getReviewUserQuery,
  getUpcomingEventQuery,
  getRatingParticipantQuery,
  getRatingCreatorQuery,
  editInfoUser,
  editImageUser,
  getReportTypes,
  createReport,
  editUserBlockStatus,
} from "./query.js";

const getMyAccountInfo = async (connection, req, res) => {
  console.log("getHistoricRoute Request bod: ", req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(getUserInfoQuery(), [
      id,
    ]);

    try {
      const [results2, fields2] = await connection.execute(
        getRatingParticipantQuery(),
        [id]
      );

      try {
        const [results3, fields3] = await connection.execute(
          getRatingCreatorQuery(),
          [id]
        );
        var infos = {
          global_infos: results,
          participant_rating: results2,
          creator_rating: results3,
        };
        console.log(infos);
        res.status(200).send(infos);
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

const getHistoricRoute = async (connection, req, res) => {
  console.log("getHistoricRoute Request bod: ", req.body);
  const { id } = req.body;
  try {
    const [results, fields] = await connection.execute(getHistoricQuery(), [
      id,
    ]);
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getReviewUserRoute = async (connection, req, res) => {
  console.log("getReviewUserRoute Request bod: ", req.body);
  const { id } = req.body;
  try {
    const [results, fields] = await connection.execute(getReviewUserQuery(), [
      id,
    ]);
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getUpcomingEventRoute = async (connection, req, res) => {
  console.log("getUpcomingEventRoute Request bod: ", req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(
      getUpcomingEventQuery(),
      [id]
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const editInfoUserRoute = async (connection, req, res) => {
  console.log("getUpcomingEventRoute Request bod: ", req.body);
  const {
    phone,
    city,
    streetNumber,
    street,
    region,
    zipCode,
    adressComplement,
    gender,
    dateBirth,
    userPassword,
    id,
  } = req.body;

  try {
    const [results, fields] = await connection.execute(editInfoUser(), [
      phone,
      city,
      streetNumber,
      street,
      region,
      zipCode,
      adressComplement,
      gender,
      dateBirth,
      userPassword,
      id,
    ]);
    res.status(200).send({ message: "Success " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const editImageProfilRoute = async (connection, req, res) => {
  console.log("getUpcomingEventRoute Request bod: ", req.body);
  const { photo, id } = req.body;

  try {
    const [results, fields] = await connection.execute(editImageUser(), [
      photo,
      id,
    ]);
    res.status(200).send({ message: "Success " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getReportTypesRoute = async (connection, req, res) => {
  console.log("getReportTypesRoute Request bod: ", req.body);
  const {} = req.body;

  try {
    const [results, fields] = await connection.execute(getReportTypes());
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const createReportRoute = async (connection, req, res) => {
  console.log("createReport Request bod: ", req.body);
  const { user_id, type_id } = req.body;

  try {
    const [results, fields] = await connection.execute(createReport(), [
      user_id,
      type_id,
    ]);
    res.status(200).send({ message: "Success " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};


const editUserBlockStatusRoute = async (connection, req, res) => {
  console.log("editUserBlockRoute Request bod: ", req.body);
  const { id, block_status } = req.body;

  try {
    const [results, fields] = await connection.execute(editUserBlockStatus(), [ block_status, id ]);
    res.status(200).send({ message: "Success " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};


export {
  getHistoricRoute,
  getReviewUserRoute,
  getUpcomingEventRoute,
  getMyAccountInfo,
  editInfoUserRoute,
  editImageProfilRoute,
  getReportTypesRoute,
  createReportRoute,
  editUserBlockStatusRoute,
};
