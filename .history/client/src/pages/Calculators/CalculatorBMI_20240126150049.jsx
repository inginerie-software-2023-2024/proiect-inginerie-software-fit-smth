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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h2 className="text-center">BMI Calculator</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4">
            <div className="mb-3">
              <label htmlFor="height" className="form-label">Height (in cm):</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="height"
                value={height}
                onChange={e => { setHeight(e.target.value); calculateBMI(); }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">Weight (in kg):</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="weight"
                value={weight}
                onChange={e => { setWeight(e.target.value); calculateBMI(); }}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Calculate BMI</button>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {result && <div className="mt-3">
              <p><strong>Your BMI is:</strong> {result.bmi}</p>
              <p><strong>You are currently:</strong> {result.condition}</p>
            </div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
