import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BMICalculator = () => {
  const [inputs, setInputs] = useState({ height: '', weight: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('bmiData');
    if (storedData) {
      setInputs(JSON.parse(storedData));
    }
  }, []);

  // Save data to local storage whenever inputs change
  useEffect(() => {
    localStorage.setItem('bmiData', JSON.stringify(inputs));
  }, [inputs]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput()) {
      setError('Please enter valid height and weight values.');
      setResult(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', {
        height: inputs.height / 100, // Convert cm to meters
        weight: inputs.weight,
      });
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Error calculating BMI. Please try again.');
      console.error('Error calculating BMI:', err);
    }
  };

  const isValidInput = () => inputs.height > 0 && inputs.weight > 0;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h2 className="text-center">BMI Calculator</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <InputField
              id="height"
              label="Height (in cm)"
              value={inputs.height}
              onChange={handleInputChange}
            />
            <InputField
              id="weight"
              label="Weight (in kg)"
              value={inputs.weight}
              onChange={handleInputChange}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={!isValidInput()}>
                Calculate BMI
              </button>
            </div>
          </form>
          <Result error={error} result={result} />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}:
    </label>
    <input
      type="number"
      className="form-control form-control-sm"
      id={id}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Result = ({ error, result }) => (
  <div className="mt-3">
    {error && <div className="alert alert-danger">{error}</div>}
    {result && (
      <>
        <p>
          <strong>Your BMI is:</strong> {result.bmi}
        </p>
        <p>
          <strong>You are currently:</strong> {result.condition}
        </p>
      </>
    )}
  </div>
);

export default BMICalculator;
