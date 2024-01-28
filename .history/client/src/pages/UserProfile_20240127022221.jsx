import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileForm from "../components/profileComponents/UserProfileForm";
import SidebarMenu from "../components/SidebarMenu";
import "../css/UserProfile.css";

/**
 * UserProfile Component.
 * Renders the user profile page including the sidebar menu and user profile form.
 * It manages the state of the user's data and handles updates to the user profile.
 */

const UserProfile = () => {
  const username = getCurrentUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(username, setUserData);
  }, [username]);

  const handleSaveChanges = async (updatedData) => {
    await updateUserData(username, updatedData, setUserData);
  };

  return (
    <div>
      <SidebarMenu />
      <UserProfileContent userData={userData} onSaveChanges={handleSaveChanges} />
    </div>
  );
};

export default UserProfile;

function getCurrentUser() {
  const auth = localStorage.getItem("currentUser");
  return JSON.parse(auth);
}

async function fetchUserData(username, setData) {
  try {
    const res = await axios.get(`http://localhost:3001/profile/${username}`);
    if (res.data.Status === "Success") {
      setData(res.data.data);
    } else {
      console.error("Error fetching user data:", res.data.Error);
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}

async function updateUserData(username, updatedData, setData) {
  try {
    const response = await axios.put(`http://localhost:3001/profile/update/${username}`, updatedData);
    if (response.data.Status === "Success") {
      setData(updatedData);
    } else {
      console.error("Error updating user data: ", response.data.Error);
    }
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
}

const UserProfileContent = ({ userData, onSaveChanges }) => (
  <div className="userInfo">
    <h1>User Profile</h1>
    {userData ? (
      <UserProfileForm userData={userData} onSaveChanges={onSaveChanges} />
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
