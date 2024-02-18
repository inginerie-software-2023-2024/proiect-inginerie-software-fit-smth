import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileForm from "../components/profileComponents/UserProfileForm";
import SidebarMenu from "../components/SidebarMenu";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import "../css/UserProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const MealRow = ({ meal }) => (
  <tr>
    <td><strong>{meal.name}</strong></td>
    <td>{meal.calories}</td>
    <td>{meal.carbs}</td>
    <td>{meal.fat}</td>
    <td>{meal.protein}</td>
    <td>{meal.quantity}</td>
    <td>{formatDate(meal.date)}</td>
    <td>{meal.meal_type}</td>
  </tr>
);

const MealsTable = ({ meals }) => (
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
        <th scope="col">Meal type</th>
      </tr>
    </thead>
    <tbody>
      {meals.map(meal => <MealRow key={meal.id} meal={meal} />)}
    </tbody>
  </table>
);

const DatePickerInput = ({ selectedDate, setSelectedDate }) => (
  <div className="date-picker-container d-flex align-items-center">
    <FontAwesomeIcon icon={faCalendarAlt} className="fa-lg text-primary" style={{ marginRight: '10px' }} />
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd-MM-yyyy"
      className="form-control"
      onKeyDown={(e) => e.preventDefault()}
    />
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * UserProfile Component.
 * Renders the user profile page including the sidebar menu and user profile form.
 * It manages the state of the user's data and handles updates to the user profile.
 */
const UserProfile = () => {
  const username = getCurrentUser();
  const [userData, setUserData] = useState(null);
  const [userMeals, setUserMeals] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchUserData(username, setUserData);
    getUserMealsData(username)
  }, [selectedDate, username]);

  const handleSaveChanges = async (updatedData) => {
    await updateUserData(username, updatedData, setUserData);
  };

  const filteredMeals = userMeals.filter(meal => {
    return formatDate(meal.date) === formatDate(selectedDate);
  });

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
        <DatePickerInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <MealsTable meals={filteredMeals} />
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
  console.log(`Fetching data for username: ${username}`);
  try {
    const res = await axios.get(`http://localhost:3001/profile/${username}`);
    console.log('Data fetched:', res.data);
    if (res.data.Status === "Success") {
      setData(res.data.data);
      console.log('State should now be updated with:', res.data.data);
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
  console.log(`Updating data for username: ${username}`, updatedData);
  try {
    const response = await axios.put(`http://localhost:3001/profile/update/${username}`, response.data,);
    console.log('updateUserData response:', response.data);
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
