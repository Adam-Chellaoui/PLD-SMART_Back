/**
 * Middleware that authenticates that the user doing the requests is the event owner.
 * Expects a POST call with the eventId inside the body.
 * @param {*} connection
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authenticateEventOwner = async (connection, req, res, next) => {
  //Get the queried event id.
  const { eventId } = req.body;

  if (!eventId) return res.status(400).json({ error: "Bad or empty eventId" });

  //Have to check that the user authenticated is the event creator
  const [results, fields] = await connection.execute(
    "SELECT creator_id FROM Event WHERE id = ?",
    [eventId]
  );
  //Check if an event with the id was found.
  if (results.length == 0)
    return res.status(400).json({ error: "Event not found." });

  const { creator_id } = results[0];
  //Check if the creator id is the user doing the request.
  if (creator_id !== req.userId) {
    return res
      .status(401)
      .json({ error: "User is not authorized to this event." });
  }
  //Add the eventId to the request params.
  req.eventId = eventId;
  next();
};
