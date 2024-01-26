import { useState, useEffect } from 'react';
import axios from 'axios';

const ACTIVITY_LEVELS = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Lightly active (light exercise/sports 1-3 days/week)",
    moderate: "Moderately active (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days a week)",
    veryActive: "Very active (very hard exercise & physical job or 2x training)"
};

export const useTDEEForm = () => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/calculate-tdee', formData);
            setTDEE(response.data.tdee);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isFormValid = () => formData.weight && formData.height && formData.age;

    return { formData, handleChange, handleSubmit, isFormValid, tdee };
};
