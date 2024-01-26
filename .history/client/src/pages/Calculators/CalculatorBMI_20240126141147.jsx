import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BMICalculator.css';

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <label>
        {label}:
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function ImperialHeightInput({ feet, inches, onFeetChange, onInchesChange }) {
  return (
    <div>
      <label>
        Height:
        <input
          type="number"
          placeholder="Feet"
          value={feet}
          onChange={e => onFeetChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Inches"
          value={inches}
          onChange={e => onInchesChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (unit === 'imperial' && feet && inches) {
      const totalInches = parseInt(feet) * 12 + parseInt(inches);
      setHeight((totalInches * 2.54).toFixed(2));
    }
  }, [feet, inches, unit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', { weight, height, unit });
      setBmi(`${response.data.bmi} (${response.data.category})`);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error fetching data');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <NumberInput 
          label={unit === 'metric' ? "Weight (kg)" : "Weight (lbs)"} 
          value={weight} 
          onChange={setWeight} 
        />
        {unit === 'metric' ? (
          <NumberInput 
            label="Height (cm)" 
            value={height} 
            onChange={setHeight} 
          />
        ) : (
          <ImperialHeightInput 
            feet={feet} 
            inches={inches} 
            onFeetChange={setFeet} 
            onInchesChange={setInches} 
          />
        )}
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default BMICalculator;
