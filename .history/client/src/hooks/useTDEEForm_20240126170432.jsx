import { useState, useEffect } from 'react';
import axios from 'axios';

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
