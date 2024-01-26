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

function UnitSelect({ selectedUnit, onUnitChange }) {
  return (
    <div>
      <label>
        Unit:
        <select value={selectedUnit} onChange={e => onUnitChange(e.target.value)}>
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, ft, in)</option>
        </select>
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
    if (unit === 'imperial') {
      const totalInches = parseInt(feet) * 12 + parseInt(inches);
      setHeight((totalInches * 2.54).toFixed(2)); // Convert to cm for calculation
    }
  }, [feet, inches, unit]);

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    // Reset values when unit changes
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setBmi('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = unit === 'metric' ? { weight, height } : { weight, height: parseInt(feet) * 12 + parseInt(inches) };
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
        <UnitSelect selectedUnit={unit} onUnitChange={handleUnitChange} />

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
