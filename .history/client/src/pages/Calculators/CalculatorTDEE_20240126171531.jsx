import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (light exercise/sports 1-3 days/week)",
    moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days a week)",
    veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

const TDEECalculator = () => {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('tdeeFormData');
        return savedData ? JSON.parse(savedData) : { weight: '', height: '', age: '', gender: 'male', activity: 'sedentary' };
    });
    const [tdee, setTDEE] = useState(null);

    useEffect(() => {
        localStorage.setItem('tdeeFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const isFormValid = () => formData.weight && formData.height && formData.age;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/calculate-tdee', formData);
            setTDEE(response.data.tdee);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">TDEE Calculator</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Weight (kg): </label>
                            <input type="number" name="weight" className="form-control" value={formData.weight} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Height (cm): </label>
                            <input type="number" name="height" className="form-control" value={formData.height} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Age: </label>
                            <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender: </label>
                            <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Activity Level: </label>
                            <select name="activity" className="form-control" value={formData.activity} onChange={handleChange}>
                                {Object.entries(ACTIVITY_LEVELS).map(([key, text]) => (
                                    <option key={key} value={key}>{text}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Calculate</button>
                    </form>
                    {tdee && <div className="mt-3"><h3>Your TDEE: {tdee} calories/day</h3></div>}
                </div>
            </div>
        </div>
    );
};

export default TDEECalculator;
