import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { resetQuery, saveTokenQuery, newPasswordQuery, saveNewPasswordQuery} from "./query.js";
import nodemailer from 'nodemailer'

function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

const resetPasswordRoute = async (connection, req, res) => {
    console.log("Request body", req.body);
    const { email} = req.body;

    try{
        const [results, fields] = await connection.execute(
            resetQuery(),
            [email]);
    
        const token = generateRandomNumber();

        if(results.length == 0) {
            console.error('email not in database');
            res.status(403).send('email not in db');
        }  else {
                var mydate = new Date();
                mydate.setHours(mydate.getHours() + 4);
                var expiration_sql = mydate.toISOString().slice(0, 19).replace('T', ' ')  
                try{
                    connection.query(saveTokenQuery(),
                    [results[0].id, 
                    token, 
                    expiration_sql 
                    ]);
                    res.status(200).send({message:"Saved Token"});

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'eve.taylorswift@gmail.com',
                        pass: 'Trucmdp123!'
                        }
                    });

                    console.log(token);
                    const mailOptions = {
                        from: 'eve.taylorswift@gmail.com',
                        to: `${results[0].mail}`,
                        subject: 'Link To Reset Password',
                        text:
                            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                            + `${token}`
                            + ' If you did not request this, please ignore this email and your password will remain unchanged.\n',
                    };

                    console.log('sending mail');

                    try{
                        transporter.sendMail(mailOptions, (err, response) => {
                            if (err) {
                              console.error('there was an error: ', err);
                            } else {
                              console.log('here is the res: ', response);
                              res.status(200).json({message :'recovery email sent'});
                            }
                          });
                    }catch(err){
                        console.log(err)
                        res.status(500).json({message: "An error ocurred: "})
                    }
                    

                }catch(err){
                    console.log(err)
                    res.status(500).json({message: "An error ocurred: "})
                }  
        }
    }catch(err){
            console.log(err)
            res.status(500).json({message: "An error ocurred: "})
    } 
    

    
};


const resetPasswordVerifyTokenRoute = async (connection, req, res) => {
    console.log("Request body", req.body);
    const { email ,token, password} = req.body;

    try{
        const [results, fields] = await connection.execute(
            newPasswordQuery(),
            [email]);
        console.log(results[0].token);

        if(results.length == 0) {
            console.error('invalid mail');
            res.status(403).send('invalid mail');
        }
        else {
            if(results[0].token == token) {

                try{
                    connection.query(saveNewPasswordQuery(),[password, email]);
                    console.error('Password modified');
                    res.status(200).send({message:'Password modified'});
                    
                }catch(err){
                    console.log(err)
                    res.status(500).json({message: "An error ocurred: "})
                }
            }
            else {
                console.error('invalid token');
                res.status(401).send('invalid token');
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: "An error ocurred: "})
    }
    
    
};

export {resetPasswordVerifyTokenRoute, resetPasswordRoute};