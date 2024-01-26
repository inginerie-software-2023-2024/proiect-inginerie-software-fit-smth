import React, { useState, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const isValidInput = useMemo(() => height > 0 && weight > 0, [height, weight]);

  const calculateBMI = debounce(async () => {
    if (!isValidInput) return;
    
    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', { weight, height });
      setResult(response.data);
      setError('');
    } catch (error) {
      setError('Error calculating BMI. Please try again.');
      console.error('Error calculating BMI:', error);
    }
  }, 500);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Height (in meters):
          <input type="number" value={height} onChange={e => { setHeight(e.target.value); calculateBMI(); }} />
        </label>
        <br />
        <label>
          Weight (in kilograms):
          <input type="number" value={weight} onChange={e => { setWeight(e.target.value); calculateBMI(); }} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && <div>
          <p>Your BMI is: {result.bmi}</p>
          <p>You are currently: {result.condition}</p>
        </div>}
      </form>
    </div>
  );
};

export default BMIForm;
