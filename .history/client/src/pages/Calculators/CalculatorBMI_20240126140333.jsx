import React, { useState } from 'react';
import axios from 'axios';
import '../../css/BMICalculator.css'; // Ensure this path matches your file structure

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

function UnitSelect({ onChange }) {
  return (
    <div>
      <label>
        Unit:
        <select onChange={e => onChange(e.target.value)}>
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </label>
    </div>
  );
}

function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');

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
        <UnitSelect onChange={setUnit} />
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
