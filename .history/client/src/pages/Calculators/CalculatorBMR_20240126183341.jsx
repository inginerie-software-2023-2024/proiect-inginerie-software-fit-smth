import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BMRCalculator() {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: ''
    });
    const [bmrResult, setBmrResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateBMR = async () => {
        console.log("Sending request to calculate BMR...");

        try {
            const response = await axios.post('http://localhost:3001/calculate-bmr', formData);
            console.log("Received BMR calculation response:", response.data);
            setBmrResult(response.data.BMR);
        } catch (error) {
            console.error('Error calculating BMR', error);
        }
    };

    console.log("Rendering BMR Calculator Component", formData);

    return (
        <div className="container mt-5">
            <h2 className="mb-3">BMR Calculator</h2>
            <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} options={["male", "female"]} onChange={handleChange} />
            <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
            <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
            <button className="btn btn-primary" onClick={calculateBMR}>Calculate BMR</button>

            {bmrResult && <div className="alert alert-success mt-3">Your BMR is: {bmrResult} kcal</div>}
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

export default BMRCalculator;
