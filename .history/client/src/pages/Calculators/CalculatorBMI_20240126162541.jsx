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
      let heightInMeters, weightInKg;

      if (selectedUnit === 'imperial') {
        // Convert feet and inches to meters
        heightInMeters = (parseInt(inputs.feet) * 12 + parseInt(inputs.inches)) * 0.0254;
        // Convert pounds to kilograms
        weightInKg = parseInt(inputs.pounds) * 0.453592;
      } else {
        // Convert cm to meters
        heightInMeters = parseInt(inputs.height) / 100;
        // Weight is already in kg
        weightInKg = parseInt(inputs.weight);
      }

      console.log(`BMI Calculation Data:
      Height: ${heightInMeters} meters (${selectedUnit === 'imperial' ? `${inputs.feet} feet ${inputs.inches} inches` : `${inputs.height} cm`})
      Weight: ${weightInKg} kg (${selectedUnit === 'imperial' ? `${inputs.pounds} lbs` : `${inputs.weight} kg`})`);

      const response = await axios.post('http://localhost:3001/calculate-bmi', {
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
          <BMIInfo /> {/* New component for BMI information */}
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

const BMIInfo = () => (
  <div className="mt-3 mb-3">
    <h3>What is BMI?</h3>
    <p>
      Body Mass Index (BMI) is a measure calculated using your height and weight to estimate how much body fat you have.
    </p>
    <h4>BMI Categories:</h4>
    <ul>
      <li><strong>Underweight:</strong> BMI is less than 18.5</li>
      <li><strong>Normal weight:</strong> BMI is 18.5 to 24.9</li>
      <li><strong>Overweight:</strong> BMI is 25 to 29.9</li>
      <li><strong>Obesity:</strong> BMI is 30 or more</li>
    </ul>
  </div>
);

const BMIFormulasInfo = () => (
  <div className="mt-3 mb-3">
    <h3>How BMI is Calculated?</h3>
    <p>
      BMI (Body Mass Index) is a simple calculation using a person's height and weight. The formulas to calculate BMI based on the two most commonly used unit systems are:
    </p>
    <ul>
      <li>
        <strong>Metric:</strong> BMI = weight (kg) / (height (m) x height (m))
      </li>
      <li>
        <strong>Imperial:</strong> BMI = weight (lb) / (height (in) x height (in)) x 703
      </li>
    </ul>
    <p>
      The resulting number indicates one of four broad categories: underweight (below 18.5), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or above).
    </p>
  </div>
);
  
const Result = ({ error, result }) => {
  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return 'blue'; // Underweight
    if (bmi >= 18.5 && bmi <= 24.9) return 'green'; // Normal weight
    if (bmi >= 25 && bmi <= 29.9) return 'orange'; // Overweight
    return 'red'; // Obesity
  };

  const bmiColor = result ? getBMIColor(result.bmi) : 'black';

  return (
    <div className="mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      {result && (
        <>
          <p>
            <strong>Your BMI is:</strong> 
            <span style={{ color: bmiColor }}> {result.bmi}</span>
          </p>
          <p>
            <strong>You are currently:</strong> 
            <span style={{ color: bmiColor }}> {result.condition}</span>
          </p>
        </>
      )}
    </div>
  );
};


export default BMICalculator;
