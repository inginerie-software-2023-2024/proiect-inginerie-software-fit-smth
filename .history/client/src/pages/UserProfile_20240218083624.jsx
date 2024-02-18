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
    const loadData = async () => {
      await fetchUserData(username, setUserData);
    };
    loadData();
    getUserMealsData(username)
  }, [selectedDate, username]);

  useEffect(() => {
    console.log('UserData updated:', userData);
  }, [userData]);

  const handleSaveChanges = async (updatedData) => {
    console.log(`Handle changes for ${username}`);

    const success = await updateUserData(username, updatedData);
    if (success) {
      console.log('Refreshing user data after successful update...');
      setUserData(updatedData);
      await fetchUserData(username, setUserData);
    } else {
      console.error("Failed to update user data.");
    }
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

function getCurrentUser() {
  const auth = localStorage.getItem("currentUser");
  return JSON.parse(auth);
}



async function fetchUserData(username, setData) {
  console.log(`Fetching data for username: ${username}`);
  try {
    const res = await axios.get(`http://localhost:3001/profile/${username}`);
    console.log('Data fetched:', res.data);
    if (res.data.Status === "Success") {
      setData(prevData => {
        if (JSON.stringify(prevData) !== JSON.stringify(res.data.data)) {
          return { ...res.data.data };
        }
        return prevData;
      });
      console.log('State should now be updated with:', res.data.data);
    } else {
      console.error("Error fetching user data:", res.data.Error);
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}

async function updateUserData(username, updatedData) {
  try {
    const response = await axios.put(`http://localhost:3001/profile/update/${username}`, updatedData);
    if (response.data.Status === "Success") {
      console.log('Data updated successfully in backend');
      return true; 
    } else {
      console.error("Error updating user data: ", response.data.Error);
      return false; 
    }
  } catch (error) {
    console.error("Error updating user data: ", error);
    return false; 
  }
}
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
