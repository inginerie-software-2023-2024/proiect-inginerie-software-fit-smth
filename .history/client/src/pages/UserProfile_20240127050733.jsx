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

/**
 * Retrieves the current user's username from local storage.
 *
 * @returns {string} The username of the current user.
 */
function getCurrentUser() {
  const auth = localStorage.getItem("currentUser");
  return JSON.parse(auth);
}

/**
 * Fetches user data from the server.
 * It makes an API call to retrieve the user's data based on the username and sets the data to state.
 *
 * @param {string} username - The username of the user whose data is to be fetched.
 * @param {function} setData - The state setter function for userData.
 */
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

/**
 * Updates the user's data on the server.
 * It sends an API request to update user data and updates the local state upon successful response.
 *
 * @param {string} username - The username of the user whose data is to be updated.
 * @param {object} updatedData - The updated user data to be sent to the server.
 * @param {function} setData - The state setter function for userData.
 */
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

/**
 * UserProfileContent Component.
 * Displays the user profile content including a form for viewing and editing user data.
 * It renders the user profile form if data is available, otherwise displays a loading message.
 *
 * @param {object} props - Component props.
 * @param {object} props.userData - Data of the user to be displayed and edited.
 * @param {function} props.onSaveChanges - Handler function to be called when saving changes in the form.
 */
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
