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

function UnitSelect({ value, onChange }) {
  return (
    <div>
      <label>
        Unit:
        <select value={value} onChange={e => onChange(e.target.value)}>
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </label>
    </div>
  );
}

function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (weight && height) {
      if (unit === 'imperial') {
        setWeight((prevWeight) => (parseFloat(prevWeight) / 2.20462).toFixed(2));
        setHeight((prevHeight) => (parseFloat(prevHeight) / 0.393701).toFixed(2));
      } else {
        setWeight((prevWeight) => (parseFloat(prevWeight) * 2.20462).toFixed(2));
        setHeight((prevHeight) => (parseFloat(prevHeight) * 0.393701).toFixed(2));
      }
    }
  }, [unit]);

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
        <UnitSelect value={unit} onChange={setUnit} />
        <NumberInput label={unit === 'metric' ? "Weight (kg)" : "Weight (lbs)"} value={weight} onChange={setWeight} />
        <NumberInput label={unit === 'metric' ? "Height (cm)" : "Height (inches)"} value={height} onChange={setHeight} />
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default BMICalculator;
