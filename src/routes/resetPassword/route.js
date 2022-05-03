import crypto from "crypto";
import {
  resetQuery,
  saveTokenQuery,
  newPasswordQuery,
  saveNewPasswordQuery,
} from "./query.js";
import nodemailer from "nodemailer";

const generateRandomNumber = () => crypto.randomBytes(3).toString("hex");

const resetPasswordRoute = async (connection, req, res) => {
  console.log("Request body", req.body);
  const { email } = req.body;

  try {
    const [results, fields] = await connection.execute(resetQuery(), [email]);

    const token = generateRandomNumber();

    if (results.length == 0) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    // saving the session  
    } else {
      var mydate = new Date();
      mydate.setHours(mydate.getHours() + 4);
      const expiration_sql = mydate.toISOString().slice(0, 19).replace("T", " ");
      try {
        // saving the token in the db
        connection.query(saveTokenQuery(), [
          results[0].id,
          token,
          expiration_sql,
        ]);

        // sending the code via email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "eve.taylorswift@gmail.com",
            pass: "Trucmdp123!",
          },
        });

        console.log(token);
        const mailOptions = {
          from: "eve.taylorswift@gmail.com",
          to: `${results[0].mail}`,
          subject: "Link To Reset Password",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please copy this code in the application. This code will expire 3 hours after receiving it :\n\n" +
            `${token}` +
            "\n If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };

        console.log("sending mail");

        try {
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error("there was an error: ", err);
            } else {
              console.log("here is the res: ", response);
              res.status(200).json({ message: "recovery email sent" , id : results[0].id});
              return results[0].id;
            }
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "An error ocurred: " });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error ocurred: " });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error ocurred: " });
  }
};


const resetPasswordVerifyTokenRoute = async (connection, req, res) => {
  console.log("Request body", req.body);
  const { id, token } = req.body;
  const [results, fields] = await connection.execute(newPasswordQuery(), [id]);
  console.log(results[0].token);
  if (token == results[0].token) {
      //connection.query(saveNewPasswordQuery(), [password, email]);
      console.error("Valid Reset Token");
      res.status(200).send({ message: "Valid Reset Token", valid : 1 });
      return 1;
    }
  else {
    console.error("invalid token");
    res.status(401).send("invalid token");
  }
};

const newPasswordRoute = async (connection, req, res) => {
  console.log("Request body", req.body);
  const { id, newpassword} = req.body;
  try {
    connection.query(saveNewPasswordQuery(), [newpassword, id]);
    console.error("New password saved");
    res.status(401).send("New password saved");
  } catch (error) {
    console.error("error");
    res.status(401).send("error");
  }
};

export { resetPasswordVerifyTokenRoute, resetPasswordRoute, newPasswordRoute };
