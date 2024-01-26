import React, { useState } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (light exercise/sports 1-3 days/week)",
    moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days a week)",
    veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

const InputField = ({ label, name, value, onChange }) => (
    <div>
        <label>{label}: </label>
        <input type="number" name={name} value={value} onChange={onChange} />
    </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
    <div>
        <label>{label}: </label>
        <select name={name} value={value} onChange={onChange}>
            {Object.entries(options).map(([key, text]) => (
                <option key={key} value={key}>{text}</option>
            ))}
        </select>
    </div>
);

const TDEECalculator = () => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        gender: 'male',
        activity: 'sedentary'
    });
    const [tdee, setTDEE] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => {
            const updatedState = { ...prevState, [name]: value };
            console.log(`Form Data Updated - ${name}: `, updatedState);
            return updatedState;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting TDEE Calculation with Data:', formData);

        try {
            const response = await axios.post('http://localhost:3001/calculate-tdee', formData);
            setTDEE(response.data.tdee);
            console.log('TDEE Calculation Response:', response.data);
        } catch (error) {
            console.error('Error in TDEE Calculation:', error);
        }
    };

const isFormValid = () => formData.weight && formData.height && formData.age;

return (
    <div>
        <h2>TDEE Calculator</h2>
        <form onSubmit={handleSubmit}>
            <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
            <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
            <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={{ male: 'Male', female: 'Female' }} />
            <SelectField label="Activity Level" name="activity" value={formData.activity} onChange={handleChange} options={ACTIVITY_LEVELS} />
            <button type="submit" disabled={!isFormValid()}>Calculate</button>
        </form>
        {tdee && <div><h3>Your TDEE: {tdee} calories/day</h3></div>}
    </div>
);
};

export default TDEECalculator;
