import { getFilteredEventsQuery } from "./query.js";
const getFilteredEventsRoute = async (connection, req, res) => {
  console.log("getFilteredEventsRoute Request bod: ", req.body);
  const { category_id, date } = req.body;

  //Formatting the date
  const splitted = date.split("/");
  const date_timestamp = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`;

  try {
    const [results, fields] = await connection.execute(
      getFilteredEventsQuery(),
      [category_id, date_timestamp]
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export { getFilteredEventsRoute };
