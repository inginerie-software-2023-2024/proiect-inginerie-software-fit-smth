import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileForm from "../components/profileComponents/UserProfileForm";
import SidebarMenu from "../components/SidebarMenu";
import "../css/UserProfile.css";

const UserProfile = () => {
  var auth = localStorage.getItem("currentUser");
  var username = JSON.parse(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/profile/${username}`
        );

        if (res.data.Status === "Success") {
          setUserData(res.data.data);
        } else if (res.data.Status === "Error") {
          console.error("err: ", res.data.Error);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, [username]);

  const handleSaveChanges = async (updatedData) => {
    try {
      const response = await axios.put(`/profile/${username}`, updatedData);
      const data = response.data;
      if (data.Status === "Success") {
        setUserData(updatedData);
      } else if (data.Status === "Error") {
        console.error("err: ", data.Error);
      } else {
        console.error("Error saving data changes");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  return (
    <div>
      <SidebarMenu />
      <h1>User Profile</h1>
      {userData ? (
        <UserProfileForm
          userData={userData}
          onSaveChanges={handleSaveChanges}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
