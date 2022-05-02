import {
  getPopularEventQuery,
  getUserInfoQuery,
  getCategoriesQuery,
  getEventsbyCategoryQuery,
  getEventbyCategoryQuery,
} from "./query.js";

const getUserInfoRoute = async (connection, req, res) => {
  console.log("getUserInfoRoute Request bod: ", req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(getUserInfoQuery(), [
      id,
    ]);
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getPopularRoute = async (connection, req, res) => {
  const {} = req.body;

  try {
    const [results, fields] = await connection.execute(getPopularEventQuery());
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getCategoriesRoute = async (connection, req, res) => {
  console.log("getCategoriesRoute Request bod: ");

  try {
    const [results, fields] = await connection.execute(getCategoriesQuery());
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getEventsbyCategoryRoute = async (connection, req, res) => {
  console.log(req.body);
  const {} = req.body;

  try {
    const [results, fields] = await connection.execute(
      getEventsbyCategoryQuery()
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getEventbyCategoryRoute = async (connection, req, res) => {
  console.log(req.body);
  const { id } = req.body;

  try {
    const [results, fields] = await connection.execute(
      getEventbyCategoryQuery(),
      [id]
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

const getAllInfo = async (connection, req, res) => {
  console.log(req.body);

  try {
    const [results4, fields4] = await connection.execute(
      getEventsbyCategoryQuery()
    );
    try {
      const [results3, fields3] = await connection.execute(
        getCategoriesQuery()
      );

      try {
        const [results2, fields2] = await connection.execute(
          getPopularEventQuery()
        );
        var total = {
          popular: results2,
          categories: results3,
          eventsByCat: results4,
        };
        console.log(total);
        res.status(200).send(total);
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

export {
  getUserInfoRoute,
  getPopularRoute,
  getCategoriesRoute,
  getEventsbyCategoryRoute,
  getEventbyCategoryRoute,
  getAllInfo,
};
