import React, { useState } from 'react';

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
      const response = await fetch('http://localhost:3000/calculate-bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight, height }),
      });
      
      console.log(body);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBmi(data.bmi);
    } catch (err) {
      setError(err.message || 'Error fetching data');
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
