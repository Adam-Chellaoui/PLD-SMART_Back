

const getImage = async (req, res) => {
  console.log("Request body", req.body);
  const { img } = req.body;

  try {
    const file = fs.readFileSync(path.join("./images/",img));
    res.sendFile(file)

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};

export { getImage };
