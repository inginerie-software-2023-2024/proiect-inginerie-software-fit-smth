import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (light exercise/sports 1-3 days/week)",
    moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days a week)",
    veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

const defaultFormData = { weight: '', height: '', age: '', gender: 'male', activity: 'sedentary' };

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
            return response.data.tdee;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const calculatedTDEE = await calculateTDEE();
        if (calculatedTDEE) setTDEE(calculatedTDEE);
    };

    const renderFormInput = (label, name, type = 'number') => (
        <div className="form-group">
            <label>{label}: </label>
            <input type={type} name={name} className="form-control" value={formData[name]} onChange={handleChange} />
        </div>
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">TDEE Calculator</h2>
                    <form onSubmit={handleSubmit}>
                        {renderFormInput('Weight (kg)', 'weight')}
                        {renderFormInput('Height (cm)', 'height')}
                        {renderFormInput('Age', 'age')}
                        {renderFormInput('Gender', 'gender', 'select')}
                        {renderFormInput('Activity Level', 'activity', 'select')}
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Calculate</button>
                    </form>
                    {tdee && <div className="mt-3"><h3>Your TDEE: {tdee} calories/day</h3></div>}
                </div>
            </div>
        </div>
    );
};

export default TDEECalculator;
