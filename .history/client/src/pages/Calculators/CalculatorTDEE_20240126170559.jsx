import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTDEEForm } from '../../hooks/useTDEEForm'; // Custom hook for form logic
import { InputField, SelectField } from './components/FormFields'; // Extracted form fields components

const TDEECalculator = () => {
    const { formData, handleChange, handleSubmit, isFormValid, tdee } = useTDEEForm();

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">TDEE Calculator</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
                        <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                        <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
                        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={{ male: 'Male', female: 'Female' }} />
                        <SelectField label="Activity Level" name="activity" value={formData.activity} onChange={handleChange} options={ACTIVITY_LEVELS} />
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Calculate</button>
                    </form>
                    {tdee && <div className="mt-3"><h3>Your TDEE: {tdee} calories/day</h3></div>}
                </div>
            </div>
        </div>
    );
};

export default TDEECalculator;
