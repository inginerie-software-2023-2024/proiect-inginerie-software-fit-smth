import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (light exercise/sports 1-3 days/week)",
    moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days a week)",
    veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

const GENDERS = ['Male', 'Female'];

const defaultFormData = { weight: '', height: '', age: '', gender: 'Male', activity: 'sedentary' };

const TDEECalculator = () => {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('tdeeFormData');
        return savedData ? JSON.parse(savedData) : defaultFormData;
    });
    const [tdee, setTDEE] = useState(null);

    useEffect(() => {
        localStorage.setItem('tdeeFormData', JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (name, value) => setFormData(prevState => ({ ...prevState, [name]: value }));

    const handleChange = (event) => updateFormData(event.target.name, event.target.value);

    const isFormValid = () => formData.weight && formData.height && formData.age;

    const calculateTDEE = async () => {
        try {
            const response = await axios.post('http://localhost:3001/calculate-tdee', formData);
            console.log("TDEE Calculation Response:", response.data); // Log the response data
            return response.data.tdee;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data for TDEE calculation:", formData); // Log the form data
        const calculatedTDEE = await calculateTDEE();
        if (calculatedTDEE) {
            console.log("Calculated TDEE:", calculatedTDEE, "calories/day"); // Log the calculated TDEE
            setTDEE(calculatedTDEE);
        }
    };
    

    const renderTextInput = (label, name) => (
        <div className="form-group">
            <label>{label}: </label>
            <input type="number" name={name} className="form-control" value={formData[name]} onChange={handleChange} />
        </div>
    );

    const renderSelectInput = (label, name, options) => (
        <div className="form-group">
            <label>{label}: </label>
            <select name={name} className="form-control" value={formData[name]} onChange={handleChange}>
                {options.map(option => (
                    <option key={option} value={option}>{name === 'activity' ? ACTIVITY_LEVELS[option] : option}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">TDEE Calculator</h2>
                    <form onSubmit={handleSubmit}>
                        {renderTextInput('Weight (kg)', 'weight')}
                        {renderTextInput('Height (cm)', 'height')}
                        {renderTextInput('Age', 'age')}
                        {renderSelectInput('Gender', 'gender', GENDERS)}
                        {renderSelectInput('Activity Level', 'activity', Object.keys(ACTIVITY_LEVELS))}
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Calculate</button>
                    </form>
                    {tdee && <div className="mt-3"><h3>Your TDEE: {tdee} calories/day</h3></div>}
                </div>
            </div>
        </div>
    );
};

export default TDEECalculator;
