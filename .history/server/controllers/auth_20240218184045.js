import db from "../database.js";
import bycript from "bcrypt";
import { promisify } from "util";
import sendMail from "../helpers/sendMail.js";
import { validationResult } from "express-validator";
import Randomstring from "randomstring";
import jwt from 'jsonwebtoken'
import session from 'express-session'
import express from 'express'

export const login = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [req.body.username], (err, users) => {
        if (err) {
            console.error("Error at login:", err);
            return res.json({ Status: "Error", Error: "Error in database query" });
        }

        if (users.length === 0) {
            console.log("User not found");
            return res.json({ Status: "Error", Error: "Wrong username or password." });
        }

        const user = users[0];
        const isPasswordCorrect = bycript.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            console.log("Wrong username or password!");
            return res.json({ Status: "Error-Login", Message: "Wrong username or password!" });
        }

        if (user.emailVerified == 0) {
            console.log("Email not verified. Check your mails.");
            return res.json({ Status: "Error-Login", Message: "Email not verified. Check your mails." });
        }

        const token = jwt.sign({ id: user.iduser }, "jwtSecretKey");
        return res.json({ Status: "Success", Login: true, token, user });
    });
};

export const logout = (req, res) => {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out.");
  };

export const RegisterSendVerification = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const query = promisify(db.query).bind(db);

    const result = await query(
      "SELECT * from users where LOWER(mail) = LOWER(?)",
      [req.body.email]
    );

    if (result && result.length) {
      return res.status(409).send({
        msg: 'This user is already in use!',
      });
    }

    const hash = await promisify(bycript.hash)(req.body.password, 10);
    const image = 'icon-user.png';
    const emailverified = 0;

    const insertResult = await query(
      "INSERT INTO users (username, mail, password, profileimage, emailVerified) VALUES (?,?,?,?,?)",
      [req.body.username, req.body.email, hash, image, emailverified]
    );

    const mailSubject = 'Mail Verification';
    const randomToken = Randomstring.generate();
    console.log(randomToken);
    const content = `<p>Hii ${req.body.username}, Please <a href="http://localhost:3000/verify-mail?token=${randomToken}">verify your email</a></p>`;

    await sendMail(req.body.email, mailSubject, content);

    await query(
      'UPDATE users set tokenEmail = ? where mail = ?',
      [randomToken, req.body.email]
    );

    console.log('User has been created');
    db.query("Select iduser from users where username = ?", [req.body.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        else{
            db.query("INSERT INTO userinfo (iduser) VALUES (?)", data[0].iduser, (err, data) =>{
                if(err) {
                    console.log(err);
                    return res.json(err);
                }
                else {
                     console.log("Insert in userinfo succesful")
                }
            })
        }
     })
    return res.json({ Status: 'Success', message:'Check you gmail for verification' });
  } catch (error) {
    console.error('Error in RegisterSendVerification:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyMail = (req, res) => {

    const token= req.body.token;
    console.log(token);
    const query = "UPDATE users set emailVerified = 1 where tokenEmail = ?"
    db.query(query, [token], (err, data) => {
        if(err) {
            console.log(err)
        }
        else
        {
            res.json({Status: "Success"})
        }
    })
}

export const forgetpassword = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        const data = await new Promise((resolve, reject) => {
            db.query("SELECT iduser FROM users WHERE mail = ?", [email], (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (data.length === 0) {
            console.log("User not found");
            return res.json({ Status: "Error", Error: "Wrong username" });
        }

        const mailSubject = 'Change password';
        const randomToken = Randomstring.generate();
        db.query("UPDATE users set tokenPassword = ? where iduser = ?", [randomToken, data[0].iduser], (err, result) => {
             if(err) {
                res.json({Status: "Error", Error: "Eroare update tokenPassword"})
             }
             else
                console.log("Succes la update database tokenPassword");
        })
        console.log(randomToken);

        const content = `<p> Please, click <a href="http://localhost:3000/changepassword?token=${randomToken}">here</a> to change your password</p>`;

        await sendMail(req.body.email, mailSubject, content);

        return res.json({ Status: "Success" }); // Send the success response here
    } catch (error) {
        console.log("Error sending mail for change password");
        return res.json({ Status: "Error", Error: "Internal server error" }); // Send an error response
    }
};

export const changepassword = (req, res) => {
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    const token = req.body.token;
    console.log("change password with token: " + token + ' '+ newpassword)

    if(typeof newpassword == 'undefined')
        return res.json({Status: "Error", Error: "Please enter new password!"});

    if(typeof confirmpassword == 'undefined')
        return res.json({Status: "Error", Error: "Please confirm password!"});

    if(newpassword != confirmpassword)
        return res.json({Status: "Error", Error: "Passwords don't match"});

    if(newpassword < 6)
        return res.json({Status: "Error", Error: "Password must have minimum 6 characters!"});
    
    const salt = bycript.genSaltSync(10);
    const hash = bycript.hashSync(newpassword, salt);

    db.query("UPDATE users set password = ? where tokenPassword = ?", [hash, token], (err, data) => {
        if(err)
           {
            console.log(err);
            return res.json({Status: "Error", Error: "Error database"});
           }
        else {
            console.log("Succes la updatarea parolei")
            return res.json({Status: "Success"});
            
        }
           

    })

}
