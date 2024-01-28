import db from "../database.js";

/**
 * Handles the HTTP request to get a user's profile.
 * Retrieves a user profile based on the username provided in the request parameters.
 * 
 * @param {object} req - The HTTP request object, containing the username in req.params.
 * @param {object} res - The HTTP response object used to send back the response.
 * 
 * @returns A JSON response with the user profile if successful, or an error message if not.
 */

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

/**
 * Fetches user profile data from the database based on the provided username.
 * Queries the database to retrieve user details like email, name, weight, etc.
 * 
 * @param {string} username - The username of the user whose profile is to be fetched.
 * 
 * @returns An object containing the user's profile data if found, otherwise null.
 */
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

/**
 * Handles the HTTP request to update a user's profile.
 * Updates user profile information based on the provided request body and username.
 * 
 * @param {object} req - The HTTP request object, containing the username and update data.
 * @param {object} res - The HTTP response object used to send back the response.
 * 
 * @returns A JSON response indicating the success or failure of the update operation.
 */

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
