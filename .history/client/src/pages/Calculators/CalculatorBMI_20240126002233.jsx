import React, { useState } from 'react';
import axios from 'axios';
import './BMICalculator.css'; // Import the CSS file here

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
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', { weight, height });
      setBmi(response.data.bmi);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error fetching data');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <NumberInput label="Weight (kg)" value={weight} onChange={setWeight} />
        <NumberInput label="Height (cm)" value={height} onChange={setHeight} />
        <button type="submit" style={{ marginTop: '10px' }}>Calculate BMI</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default BMICalculator;
