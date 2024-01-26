import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BMRCalculator() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmrResult, setBmrResult] = useState(null);

    const calculateBMR = async () => {
        console.log("Sending request to calculate BMR...");

        try {
            const response = await axios.post('http://localhost:3001/calculate-bmr', {
                age,
                gender,
                weight,
                height
            });
            console.log("Received BMR calculation response:", response.data);
            setBmrResult(response.data.BMR);
        } catch (error) {
            console.error('Error calculating BMR', error);
        }
    };

    console.log("Rendering BMR Calculator Component", { age, gender, weight, height, bmrResult });

    return (
        <div className="container mt-5">
            <h2 className="mb-3">BMR Calculator</h2>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select className="form-select" id="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input type="number" className="form-control" id="weight" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="height" className="form-label">Height (cm)</label>
                <input type="number" className="form-control" id="height" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={calculateBMR}>Calculate BMR</button>

            {bmrResult && <div className="alert alert-success mt-3">Your BMR is: {bmrResult}</div>}
        </div>
    );
}

export default BMRCalculator;
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

            {bmrResult && <div className="alert alert-success mt-3">Your BMR is: {bmrResult}</div>}
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
