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
  const [userMeals, setUserMeals] = useState([])

  useEffect(() => {
    fetchUserData(username, setUserData);
    getUserMealsData(username)
  }, [username]);

  const handleSaveChanges = async (updatedData) => {
    await updateUserData(username, updatedData, setUserData);
  };

  async function getUserMealsData(username) {
    try {
      const response = await axios.get(`http://localhost:3001/food/getUserMeals/${username}`);
      if (response.data.Status === 'Error') {
        setUserMeals([]);
      } else {
        // Check if response.data is an array  (for robustness)
        if (Array.isArray(response.data)) {
          setUserMeals(response.data);
        } else {
          console.error('Expected an array for user meals, but got:', typeof response.data);
          setUserMeals([]);
        }
      }
    } catch (error) {
      console.error("Fetching user meals failed:", error);
      setUserMeals([]);
    }
  }




  return (
    <div>
      <SidebarMenu />
      <UserProfileContent userData={userData} onSaveChanges={handleSaveChanges} />
      <h1 className="title-hmu">User meals history</h1>
      <div className="meals-history">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Calories</th>
              <th scope="col">Carbs</th>
              <th scope="col">Fat</th>
              <th scope="col">Protein</th>
              <th scope="col">Grams</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              userMeals.map(meal => (
                <tr key={meal.id}>
                  <td><strong>{meal.name}</strong></td>
                  <td>{meal.calories}</td>
                  <td>{meal.carbs}</td>
                  <td>{meal.fat}</td>
                  <td>{meal.protein}</td>
                  <td>{meal.grame}</td>
                  <td>{meal.date}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
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
      <>
        <UserProfileForm userData={userData} onSaveChanges={onSaveChanges} />
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);