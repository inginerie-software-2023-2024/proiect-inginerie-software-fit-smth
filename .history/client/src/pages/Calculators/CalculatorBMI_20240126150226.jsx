import React, { useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const BMICalculator = () => {
  const [inputs, setInputs] = useState({ height: '', weight: '' });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: value }));
    calculateBMI();
  };

  const isValidInput = () => inputs.height > 0 && inputs.weight > 0;

  const postBMI = async () => {
    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', inputs);
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Error calculating BMI. Please try again.');
      console.error('Error calculating BMI:', err);
    }
  };

  const calculateBMI = debounce(postBMI, 500);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h2 className="text-center">BMI Calculator</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4">
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
              <button type="submit" className="btn btn-primary">Calculate BMI</button>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {result && <ResultDisplay result={result} />}
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">{label}:</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id={id}
      value={value}
      onChange={onChange}
    />
  </div>
);

const ResultDisplay = ({ result }) => (
  <div className="mt-3">
    <p><strong>Your BMI is:</strong> {result.bmi}</p>
    <p><strong>You are currently:</strong> {result.condition}</p>
  </div>
);

export default BMICalculator;
