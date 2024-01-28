import db from "../database.js";

export const getProfile = (req, res) => {
  const username = req.params.username; // Use req.params.username to get the value from the URL
  console.log("Received request for user profile with username:", username);

  const query = `
    SELECT users.mail, userinfo.firstname, userinfo.lastname, userinfo.current_weight, userinfo.goal_weight, userinfo.dateofbirth, userinfo.height
    FROM users  
    INNER JOIN userinfo ON users.iduser = userinfo.iduser
    WHERE users.username = ?
  `;

  db.query(query, [username], (err, data) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.json({
        Status: "Error",
        Error: "Error in database query",
        details: err.message,
      });
    }

    if (data.length === 0) {
      console.log("User not found for username:", username);
      return res.json({ Status: "Error", Error: "User not found" });
    }

    const userProfile = {
      username: username,
      email: data[0].mail,
      firstname: data[0].firstname,
      lastname: data[0].lastname,
      current_weight: data[0].current_weight,
      goal_weight: data[0].goal_weight,
      dateofbirth: data[0].dateofbirth,
      height: data[0].height,
    };

    console.log("User profile successfully fetched:", userProfile);

    return res.json({ Status: "Success", data: userProfile });
  });
};

export const updateProfile = (req, res) => {
  const bodyRequired = req.body;
  const username = req.params.username
  console.log("Body for update" + bodyRequired.username)
  var iduser;

  db.query('Select iduser from users where username = ? ', [username], (err, data) => {
    if (err) {
      console.log("User not found for iduser: ", iduser);
      return res.json({ Status: "Error", Error: "User not found." });
    }
    else if (data) {
      iduser = data[0].iduser;
      db.query('Update userinfo set firstname = ?, lastname = ?, current_weight = ?, goal_weight = ?, dateofbirth = ?, height = ? where iduser = ?',
        [bodyRequired.firstname, bodyRequired.lastname, bodyRequired.current_weight, bodyRequired.goal_weight, bodyRequired.dateofbirth,
        bodyRequired.height, iduser], (err, result) => {
          if (err) {
            console.log("Eroare" + err)
            return res.json({ Status: "Error", Error: "Couldn't update the user." });
          }
          else
            console.log("User updated successfully.")
        })
    }
  })
}

