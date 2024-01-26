import React, { useState } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (light exercise/sports 1-3 days/week)",
  moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
  active: "Active (hard exercise/sports 6-7 days a week)",
  veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

const TDEECalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [tdee, setTDEE] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/calculate-tdee', { weight, height, age, gender, activity });
      setTDEE(response.data.tdee);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isFormValid = () => weight && height && age;

  return (
    <div>
      <h2>TDEE Calculator</h2>
      <form onSubmit={handleSubmit}>
        {/* Weight Input */}
        <div>
          <label>Weight (kg): </label>
          <input type="number" name="weight" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>

        {/* Height Input */}
        <div>
          <label>Height (cm): </label>
          <input type="number" name="height" value={height} onChange={e => setHeight(e.target.value)} />
        </div>

        {/* Age Input */}
        <div>
          <label>Age: </label>
          <input type="number" name="age" value={age} onChange={e => setAge(e.target.value)} />
        </div>

        {/* Gender Select */}
        <div>
          <label>Gender: </label>
          <select name="gender" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Activity Level Select */}
        <div>
          <label>Activity Level: </label>
          <select name="activity" value={activity} onChange={e => setActivity(e.target.value)}>
            {Object.entries(ACTIVITY_LEVELS).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={!isFormValid()}>Calculate</button>
      </form>

      {/* TDEE Result */}
      {tdee && <div><h3>Your TDEE: {tdee} calories/day</h3></div>}
    </div>
  );
};

export default TDEECalculator;
