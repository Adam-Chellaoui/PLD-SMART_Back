import { loginQuery } from "./query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoute = async (connection, req, res) => {
  const { email, password } = req.body;

  try {
    const [results, fields] = await connection.execute(loginQuery(), [email]);

    if (results.length == 0) {
      res.status(400).send("Could not find an user with this email.");
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      results[0].user_password
    );

    try {
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userId: results[0].id,
            isAdmin: results[0].admin == 1 ? true : false,
          },
          process.env.SECRET,
          { expiresIn: "3 hours" }
        );
        
        if(results[0].blocked===1){
          res.status(402).send("You have been blocked by an admin. You can't access the application anymore");
        }else{
          console.log(results[0].blocked)
          res.status(200).json({ id: results[0].id, token: token });
        }
        
      } else {
        res.status(401).send("Wrong password or email.");
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

export default loginRoute;
