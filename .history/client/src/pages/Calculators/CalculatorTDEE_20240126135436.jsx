import React, { useState } from 'react';
import axios from 'axios';

const TDEECalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: 'sedentary'
  });
  const [tdee, setTDEE] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTDEE = () => {
    axios.post('http://localhost:3000/calculate-tdee', formData)
      .then(response => setTDEE(response.data.tdee))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>TDEE Calculator</h2>
      <div>
        <label>Weight (kg): </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Height (cm): </label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender: </label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Activity Level: </label>
        <select name="activity" value={formData.activity} onChange={handleChange}>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="light">Lightly active (light exercise/sports 1-3 days/week)</option>
          <option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</option>
          <option value="active">Active (hard exercise/sports 6-7 days a week)</option>
          <option value="veryActive">Very active (very hard exercise & physical job or 2x training)</option>
        </select>
      </div>
      <button onClick={calculateTDEE}>Calculate</button>

      {tdee && (
        <div>
          <h3>Your TDEE: {tdee} calories/day</h3>
        </div>
      )}
    </div>
  );
};

export default TDEECalculator;
