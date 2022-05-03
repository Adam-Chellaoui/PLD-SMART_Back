export const defaultResponseError = (err, res) => {
  console.log("An error occured: ", err);
  res.status(500).json({ error: "An error occured." });
};
