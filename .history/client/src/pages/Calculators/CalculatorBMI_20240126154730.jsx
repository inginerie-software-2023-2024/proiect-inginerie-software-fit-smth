import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom function to load data from local storage
const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('bmiData');
  return storedData ? JSON.parse(storedData) : { height: '', weight: '' };
};

const BMICalculator = () => {
  const [inputs, setInputs] = useState(loadFromLocalStorage()); // Initialize with data from local storage
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('metric'); // Default to metric units


  // Save data to local storage whenever inputs change
  useEffect(() => {
    localStorage.setItem('bmiData', JSON.stringify(inputs));
  }, [inputs]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Log weight and height changes
    if (id === 'weight') {
      console.log(`Weight changed to: ${value} ${selectedUnit === 'imperial' ? 'lbs' : 'kg'}`);
    } else if (id === 'height') {
      console.log(`Height changed to: ${value} ${selectedUnit === 'imperial' ? 'inches' : 'cm'}`);
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };
  
  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput()) {
      setError('Please enter valid height and weight values.');
      setResult(null);
      return;
    }

    try {
      const heightInMeters =
        selectedUnit === 'imperial'
          ? (inputs.feet * 12 + inputs.inches) * 0.0254 // Convert feet and inches to meters
          : inputs.height / 100; // Use metric height if selected

      const weightInKg = selectedUnit === 'imperial' ? inputs.pounds * 0.453592 : inputs.weight;
      console.log(`BMI Calculation Data:
      Height: ${heightInMeters} meters (${selectedUnit === 'imperial' ? `${inputs.feet} feet ${inputs.inches} inches` : `${inputs.height} cm`})
      Weight: ${weightInKg} kg (${selectedUnit === 'imperial' ? `${inputs.pounds} lbs` : `${inputs.weight} kg`})
    `);      const response = await axios.post('http://localhost:3001/calculate-bmi', {
        height: heightInMeters,
        weight: weightInKg,
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
            <div className="mb-3">
              <label htmlFor="unit" className="form-label">
                Select Units:
              </label>
              <select
                id="unit"
                className="form-select"
                value={selectedUnit}
                onChange={handleUnitChange}
              >
                <option value="metric">Metric (cm, kg)</option>
                <option value="imperial">Imperial (ft, in, lbs)</option>
              </select>
            </div>
            {selectedUnit === 'metric' ? (
              <>
                <InputField id="height" label="Height (in cm)" value={inputs.height} onChange={handleInputChange} />
                <InputField id="weight" label="Weight (in kg)" value={inputs.weight} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <InputField id="feet" label="Feet" value={inputs.feet} onChange={handleInputChange} />
                <InputField id="inches" label="Inches" value={inputs.inches} onChange={handleInputChange} />
                <InputField id="pounds" label="Weight (in lbs)" value={inputs.pounds} onChange={handleInputChange} />
              </>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={!isValidInput()}>
                Calculate BMI
              </button>
            </div>
          </form>
          <Result error={error} result={result} selectedUnit={selectedUnit} />
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
