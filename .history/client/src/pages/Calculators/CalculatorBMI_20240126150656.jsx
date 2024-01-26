import React, { useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const BMICalculator = () => {
  const [inputs, setInputs] = useState({ height: '', weight: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => {
      const updatedInputs = { ...prev, [id]: value };
      if (id === 'height') {
        // Convert height from cm to m for calculation
        updatedInputs.height = value / 100;
      }
      return updatedInputs;
    });
    debounceCalculateBMI();
  };
  

  const isValidInput = () => inputs.height > 0 && inputs.weight > 0;

  const postBMI = async () => {
    if (!isValidInput()) {
      setResult(null);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/calculate-bmi', inputs);
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Error calculating BMI. Please try again.');
      console.error('Error calculating BMI:', err);
    }
  };

  const debounceCalculateBMI = debounce(postBMI, 500);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h2 className="text-center">BMI Calculator</h2>
          <BMIForm inputs={inputs} handleInputChange={handleInputChange} />
          <Result error={error} result={result} />
        </div>
      </div>
    </div>
  );
};

const BMIForm = ({ inputs, handleInputChange }) => (
  <form onSubmit={(e) => e.preventDefault()} className="mt-4">
    {['height', 'weight'].map((input) => (
      <InputField
        key={input}
        id={input}
        label={`${input.charAt(0).toUpperCase() + input.slice(1)} (in ${input === 'height' ? 'cm' : 'kg'})`}
        value={inputs[input]}
        onChange={handleInputChange}
      />
    ))}
    <div className="text-center">
      <button type="submit" className="btn btn-primary">Calculate BMI</button>
    </div>
  </form>
);

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

const Result = ({ error, result }) => (
  <div className="mt-3">
    {error && <div className="alert alert-danger">{error}</div>}
    {result && (
      <>
        <p><strong>Your BMI is:</strong> {result.bmi}</p>
        <p><strong>You are currently:</strong> {result.condition}</p>
      </>
    )}
  </div>
);

export default BMICalculator;
