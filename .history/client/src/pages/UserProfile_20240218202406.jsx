import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileForm from "../components/profileComponents/UserProfileForm";
import SidebarMenu from "../components/SidebarMenu";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUtensils } from '@fortawesome/free-solid-svg-icons'; // Import faUtensils for meal type
import "react-datepicker/dist/react-datepicker.css";
import "../css/UserProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const MealRow = ({ meal }) => {
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1).toLowerCase();

  return (
    <tr>
      <td><strong>{meal.name}</strong></td>
      <td>{meal.calories}</td>
      <td>{meal.carbs}</td>
      <td>{meal.fat}</td>
      <td>{meal.protein}</td>
      <td>{meal.quantity}</td>
      <td>{formatDate(meal.date)}</td>
      <td>{capitalize(meal.meal_type)}</td> {/* Apply capitalize function */}
    </tr>
  );
};

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

const CustomInput = React.forwardRef(({ value, onClick, onFocus, onBlur }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  // Apply focused style conditionally
  const inputClassName = `form-control ${isFocused ? 'focused' : ''}`;

  return (
    <button 
      className={inputClassName} 
      onClick={onClick} 
      onFocus={() => {
        setIsFocused(true);
        if (onFocus) onFocus();
      }}
      onBlur={() => {
        setIsFocused(false);
        if (onBlur) onBlur();
      }}
      ref={ref}
      style={{ textAlign: 'left' }} 
    >
      {value}
    </button>
  );
});

const DatePickerInput = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="date-picker-container d-flex align-items-center">
      <FontAwesomeIcon icon={faCalendarAlt} className="fa-lg text-primary" style={{ marginRight: '10px' }} />
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="dd-MM-yyyy"
        customInput={<CustomInput />}
        onKeyDown={e => e.preventDefault()}
      />
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const UserProfile = () => {
  const username = getCurrentUser();
  const [userData, setUserData] = useState(null);
  const [userMeals, setUserMeals] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMealType, setSelectedMealType] = useState('All'); // New state for selected meal type

  useEffect(() => {
    fetchUserData(username, setUserData);
    getUserMealsData(username);
  }, [selectedDate, username, selectedMealType]);


  const handleSaveChanges = async (updatedData) => {
    await updateUserData(username, updatedData, setUserData);
  };

  const filteredMeals = userMeals.filter(meal => {
    return formatDate(meal.date) === formatDate(selectedDate) && (selectedMealType === 'All' || meal.meal_type === selectedMealType);
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


const renderMealTypeSelector = () => (
  <div className="meal-type-selector d-flex align-items-center mt-3">
    <FontAwesomeIcon icon={faUtensils} className="fa-lg text-primary" style={{ marginRight: '10px' }} />
    <select id="mealType" value={selectedMealType} onChange={e => setSelectedMealType(e.target.value)} className="form-control form-control-sm custom-dropdown">
      <option value="All">All</option>
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="snack">Snack</option>
    </select>
  </div>
);


  return (
    <div>
      <SidebarMenu />
      <UserProfileContent userData={userData} onSaveChanges={handleSaveChanges} />
      <h1 className="title-hmu">User meals history</h1>
      <div className="meals-history">
        <DatePickerInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {renderMealTypeSelector()} {/* Render meal type selector */}
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
    console.log('fetchUserData response:', res.data);
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
  console.log(`Updating data for username: ${username}`, updatedData);
  try {
    const response = await axios.put(`http://localhost:3001/profile/update/${username}`, updatedData);
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
