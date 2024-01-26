import db from "../database.js";

export const getProfile = (req, res) => {
  const username = req.params.username; // Use req.params.username to get the value from the URL
  console.log("Received request for user profile with username:", username);

  const query = `
    SELECT users.email, userinfo.firstname, userinfo.lastname, userinfo.current_weight, userinfo.goal_weight, userinfo.dateofbirth, userinfo.height
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
      email: data[0].email,
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
  const username = req.user.username;
  const {
    newUsername,
    newFirstname,
    newLastname,
    newCurrW,
    newGoalW,
    newDob,
    newHeight,
  } = req.body;

  // Arrays to store update values for each table
  const usersUpdateValues = [];
  const userinfoUpdateValues = [];

  // Construct the select query to get the existing data

  // const selectQuery = `
  // SELECT users.email FROM users
  // WHERE users.username = ?
  // `;
  const selectQuery = `
  SELECT users.email, userinfo.firstname, userinfo.lastname, userinfo.current_weight, userinfo.goal_weight, userinfo.dateofbirth, userinfo.height
  FROM users
  INNER JOIN userinfo ON users.iduser = userinfo.iduser
  WHERE users.username = ?
  `;

  let existingData;

  db.query(selectQuery, [username], (selectErr, selectResults) => {
    if (selectErr) {
      console.log("Error fetching existing user data");
      return res.json({ Status: "Error", Error: "Error in database query" });
    }

    if (selectResults.length === 0) {
      console.log("User not found");
      return res.json({ Status: "Error", Error: "User not found" });
    }

    existingData = selectResults[0];
  });

  let changesFlag = 0;

  // Construct the update query for the 'users' table
  let usersUpdateQuery = "UPDATE users SET ";
  if (newUsername !== null && newUsername !== existingData.username) {
    const usernameCheckQuery =
      "SELECT COUNT(*) AS count FROM users WHERE username = ?";

    db.query(
      usernameCheckQuery,
      [newUsername],
      (usernameCheckErr, usernameCheckResults) => {
        if (usernameCheckErr) {
          console.log("Error checking username uniqueness");
          return res.json({
            Status: "Error",
            Error: "Error checking username uniqueness",
          });
        }

        const usernameCount = usernameCheckResults[0].count;

        if (usernameCount !== 0) {
          // The newUsername is not unique
          return res.json({
            Status: "Error",
            Error: "Username already taken!",
          });
        }
      }
    );

    usersUpdateQuery += "username = ?, ";
    usersUpdateValues.push(newUsername);
    changesFlag++;
  }

  // Remove the trailing comma and space
  usersUpdateQuery = usersUpdateQuery.slice(0, -2);

  // Add the WHERE clause
  usersUpdateQuery += " WHERE username = ?";
  usersUpdateValues.push(username);

  // Construct the update query for the 'userinfo' table
  let userinfoUpdateQuery = "UPDATE userinfo SET ";
  if (newFirstname !== null && newFirstname !== existingData.firstname) {
    userinfoUpdateQuery += "firstname = ?, ";
    userinfoUpdateValues.push(newFirstname);
    changesFlag++;
  }
  if (newLastname !== null && newLastname !== existingData.lastname) {
    userinfoUpdateQuery += "lastname = ?, ";
    userinfoUpdateValues.push(newLastname);
    changesFlag++;
  }
  if (newCurrW !== null && newCurrW !== existingData.current_weight) {
    userinfoUpdateQuery += "current_weight = ?, ";
    userinfoUpdateValues.push(newCurrW);
    changesFlag++;
  }
  if (newGoalW !== null && newGoalW !== existingData.goal_weight) {
    userinfoUpdateQuery += "goal_weight = ?, ";
    userinfoUpdateValues.push(newGoalW);
    changesFlag++;
  }
  if (newDob !== null && newDob !== existingData.dateofbirth) {
    userinfoUpdateQuery += "dateofbirth = ?, ";
    userinfoUpdateValues.push(newDob);
    changesFlag++;
  }
  if (newHeight !== null && newHeight !== existingData.height) {
    userinfoUpdateQuery += "height = ?, ";
    userinfoUpdateValues.push(newHeight);
    changesFlag++;
  }

  // Remove the trailing comma and space
  userinfoUpdateQuery = userinfoUpdateQuery.slice(0, -2);

  // Add the WHERE clause
  userinfoUpdateQuery += " WHERE username = ?";
  userinfoUpdateValues.push(username);

  // Execute the 'users' table update query
  if (changesFlag !== 0) {
    db.query(usersUpdateQuery, usersUpdateValues, (usersErr, usersResult) => {
      if (usersErr) {
        console.log("Error updating users table");
        return res.json({
          Status: "Error",
          Error: "Error in users table update query",
        });
      }

      // Execute the 'userinfo' table update query
      db.query(
        userinfoUpdateQuery,
        userinfoUpdateValues,
        (userinfoErr, userinfoResult) => {
          if (userinfoErr) {
            console.log("Error updating userinfo table");
            return res.json({
              Status: "Error",
              Error: "Error in userinfo table update query",
            });
          }

          // Check if any rows were affected in both tables
          if (
            usersResult.affectedRows === 0 &&
            userinfoResult.affectedRows === 0
          ) {
            console.log("User not found");
            return res.json({ Status: "Error", Error: "User not found" });
          }

          return res.json({
            Status: "Success",
            Message: "User profile updated successfully",
            changesFlag: changesFlag,
          });
        }
      );
    });
  } else {
    return res.json({ Status: "Warning", Message: "No modified fields" });
  }
};
