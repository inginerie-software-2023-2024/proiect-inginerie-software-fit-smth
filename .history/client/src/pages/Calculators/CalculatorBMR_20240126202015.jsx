import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BMRCalculator() {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        bodyFat: '' // Added body fat percentage (optional)
    });
    const [bmrResults, setBmrResults] = useState(null); // Store results from multiple methods

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateBMR = async () => {
        console.log("Sending request to calculate BMR...");

        try {
            const response = await axios.post('http://localhost:3001/calculate-bmr', formData);
            console.log("Received BMR calculation response:", response.data.BMR);
            setBmrResults(response.data.BMR); // Update to handle multiple BMR results
            console.log(bmrResults);
        } catch (error) {
            console.error('Error calculating BMR', error);
        }
    };

    console.log("Rendering BMR Calculator Component", formData);

    function formatBmrLabel(key) {
        switch (key) {
            case 'mifflinStJeor': return 'Mifflin-St Jeor Equation';
            case 'harrisBenedict': return 'Harris-Benedict Equation';
            case 'schofield': return 'Schofield Equation';
            case 'katchMcArdle': return 'Katch-McArdle Formula';
            default: return key;
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-3">BMR Calculator</h2>
            <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} options={["male", "female"]} onChange={handleChange} />
            <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
            <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
            <InputField label="Body Fat Percentage (optional)" name="bodyFat" value={formData.bodyFat} onChange={handleChange} />
            <button className="btn btn-primary" onClick={calculateBMR}>Calculate BMR</button>

            {bmrResults && (
                <div className="mt-3">
                    {Object.entries(bmrResults).map(([key, value]) => (
                        <p key={key} className="alert alert-success">
                            {formatBmrLabel(key)}: {value.toFixed(2)} kcal
                        </p>
                    ))}
                </div>
            )}


        </div>
    );
}

function InputField({ label, name, value, onChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="number" className="form-control" id={name} name={name} value={value} onChange={onChange} />
        </div>
    );
}

function SelectField({ label, name, value, options, onChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select className="form-select" id={name} name={name} value={value} onChange={onChange}>
                {options.map(option => <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)}
            </select>
        </div>
    );
}

function BMRInfoModal() {
    return (
      <div className="modal fade" id="bmrInfoModal" tabIndex="-1" aria-labelledby="bmrInfoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bmrInfoModalLabel">About BMR and Formulas Used</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Basal Metabolic Rate (BMR) is an estimate of how many calories your body needs to function at rest. It represents the minimum amount of energy required to keep your body functioning, including breathing and keeping your heart beating. 
  
              In this calculator, we use the following formulas:
              <ul>
                <li><strong>Mifflin-St Jeor Equation:</strong> A modern formula that considers weight, height, age, and gender.</li>
                <li><strong>Harris-Benedict Equation:</strong> An older formula that also considers weight, height, age, and gender but may overestimate BMR.</li>
                <li><strong>Schofield Equation:</strong> Based on weight and age range.</li>
                <li><strong>Katch-McArdle Formula:</strong> Requires body fat percentage and is based on lean body mass.</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
export default BMRCalculator;
