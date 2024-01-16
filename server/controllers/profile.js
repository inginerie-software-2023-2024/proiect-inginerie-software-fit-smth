import db from "../database.js";

export const getProfile = (req, res) => {
  const userId = req.user.iduser;

  const query = "SELECT id, username, email FROM users WHERE id = ?";

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.log("Error fetching user profile");
      return res.json({ Status: "Error", Error: "Error in database query" });
    }

    if (data.length === 0) {
      console.log("User not found");
      return res.json({ Status: "Error", Error: "User not found" });
    }

    const userProfile = {
      id: data[0].id,
      username: data[0].username,
      email: data[0].email,
    };

    return res.json({ Status: "Success", data: userProfile });
  });
};

export const updateProfile = (req, res) => {
  const userId = req.user.iduser;
  const { newUsername, newEmail } = req.body;

  const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";

  db.query(query, [newUsername, newEmail, userId], (err, data) => {
    if (err) {
      console.log("Error updating user profile");
      return res.json({ Status: "Error", Error: "Error in database query" });
    }

    return res.json({
      Status: "Success",
      Message: "User profile updated successfully",
    });
  });
};
