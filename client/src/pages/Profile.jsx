// Profile.js

import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";

import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleUpdateProfile = () => {
    axios
      .put("/api/user/profile", { newUsername, newEmail })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  return (
    <div>
      <h1>{userData.name}</h1>
      {/* <p>ID: {userData.iduser}</p> */}
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>

      <h2>Update Profile</h2>
      <label>
        New Username:
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        New Email:
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default Profile;
