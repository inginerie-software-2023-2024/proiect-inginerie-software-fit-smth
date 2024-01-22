import db from "../database.js";
import bycript from "bcrypt";


export const register = (req, res) => {

    //Check existing user
    const query = "SELECT * from users where username = ?"

    db.query(query, [req.body.username], (err, data) => {

        if (err) {
            return res.json(err)
        }
        if (data.length) {
            return res.json({ Status: "Error", Error: "Username already exists!" });
        }

        const query2 = "SELECT * from users where email = ?"

        db.query(query2, [req.body.email], (err, data) => {

            if (err) {

                return res.json(err)
            }
            if (data.length) {
                console.log(req.body.email)
                return res.json({ Status: "Error", Error: "Email already used!" });
            }


            /// hash the password and create the user
            const salt = bycript.genSaltSync(10);
            const hash = bycript.hashSync(req.body.password, salt);
            if (req.body.password.length < 6)
                return res.json({ Status: "Error", Error: "Password must have minimum 6 characters!" });

            /// verify if the req.body.email is an email
            const regex = /@yahoo\.com|@gmail\.com/;
            if (regex.test(req.body.email) == 0)
                return res.json({ Status: "Error", Error: "Introduce a valid mail" });

            /// if user doesn't exist insert user
            const query =
                "INSERT INTO users (username, email, password) VALUES (?,?,?)";
            console.log(req.body.username, req.body.email, hash);

            db.query(query, [req.body.username, req.body.email, hash], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json(err);
                }
                else {
                    console.log("User has been created")
                    return res.status(200).json("User has been created");

                }

            })
        });
    })
}

export const login = (req, res) => {
    ///CHECK USER

    const query = "SELECT * from users where username = ?"
    db.query(query, [req.body.username], (err, data) => {
        if (err) {
            console.log("Eroare la login");
            return res.json({ Status: "Error", Error: "Error in database query" });
        }

        if (data.length === 0) {
            console.log("User not found");
            return res.json({ Status: "Error", Error: "Wrong username" });
        }

        /// get crypted password
        const isPasswordCorrect = bycript.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
        else {
            return res.json({ Status: "Success" })
        }


    });
}

export const logout = (req, res) => {
    res
        .clearCookie("access_token", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .json("User has been logged out.");
};