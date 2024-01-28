import db from "../database.js";

export const getProfile = async (req, res) => {
  const username = req.params.username;
  console.log("Received request for user profile with username:", username);

  try {
    const userProfile = await fetchUserProfile(username);
    if (!userProfile) {
      console.log("User not found for username:", username);
      return res.json({ Status: "Error", Error: "User not found" });
    }
    console.log("User profile successfully fetched:", userProfile);
    return res.json({ Status: "Success", data: userProfile });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.json({
      Status: "Error",
      Error: "Error in database query",
      details: err.message,
    });
  }
};

async function fetchUserProfile(username) {
  const query = `
    SELECT users.mail, userinfo.firstname, userinfo.lastname, userinfo.current_weight, userinfo.goal_weight, userinfo.dateofbirth, userinfo.height
    FROM users  
    INNER JOIN userinfo ON users.iduser = userinfo.iduser
    WHERE users.username = ?
  `;

  const data = await executeQuery(query, [username]);
  if (data.length === 0) return null;

  return {
    username,
    email: data[0].mail,
    firstname: data[0].firstname,
    lastname: data[0].lastname,
    current_weight: data[0].current_weight,
    goal_weight: data[0].goal_weight,
    dateofbirth: data[0].dateofbirth,
    height: data[0].height,
  };
}

export const updateProfile = async (req, res) => {
  const bodyRequired = req.body;
  const username = req.params.username;
  console.log("Body for update" + bodyRequired.username);

  try {
    const iduser = await fetchUserId(username);
    if (!iduser) {
      console.log("User not found for iduser: ", iduser);
      return res.json({ Status: "Error", Error: "User not found." });
    }

    await updateUserProfile(bodyRequired, iduser);
    console.log("User updated successfully.");
  } catch (err) {
    console.log("Error" + err);
    return res.json({ Status: "Error", Error: "Couldn't update the user." });
  }
};

async function fetchUserId(username) {
  const query = 'SELECT iduser FROM users WHERE username = ?';
  const data = await executeQuery(query, [username]);
  return data.length > 0 ? data[0].iduser : null;
}

async function updateUserProfile(userData, userId) {
  const updateQuery = 'UPDATE userinfo SET firstname = ?, lastname = ?, current_weight = ?, goal_weight = ?, dateofbirth = ?, height = ? WHERE iduser = ?';
  await executeQuery(updateQuery, [userData.firstname, userData.lastname, userData.current_weight, userData.goal_weight, userData.dateofbirth, userData.height, userId]);
}

async function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
