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
          onChange={e => onChange(parseFloat(e.target.value))}
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

  // Handle unit change and convert values
  useEffect(() => {
    if (unit === 'imperial') {
      // Convert metric to imperial
      setWeight(prevWeight => (prevWeight / 0.45359237).toFixed(2));
      setHeight(prevHeight => (prevHeight / 2.54).toFixed(2));
      setFeet('');
      setInches('');
    } else {
      // Convert imperial to metric (using feet and inches for height)
      const totalInches = parseInt(feet) * 12 + parseInt(inches);
      setWeight(prevWeight => (prevWeight * 0.45359237).toFixed(2));
      setHeight(totalInches ? (totalInches * 2.54).toFixed(2) : '');
    }
    setBmi('');
  }, [unit, feet, inches]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = {
        weight: unit === 'imperial' ? weight / 2.20462 : weight, // Convert weight to kg if imperial
        height: unit === 'imperial' ? (parseInt(feet) * 12 + parseInt(inches)) * 0.0254 : height / 100, // Convert height to meters
      };
      const response = await axios.post('http://localhost:3001/calculate-bmi', payload);
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
        <div>
          <label>
            Unit:
            <select value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft, in)</option>
            </select>
          </label>
        </div>

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
          <div>
            <NumberInput 
              label="Feet" 
              value={feet} 
              onChange={setFeet} 
            />
            <NumberInput 
              label="Inches" 
              value={inches} 
              onChange={setInches} 
            />
          </div>
        )}

        <button type="submit">Calculate BMI</button>
      </form>

      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default BMICalculator;
