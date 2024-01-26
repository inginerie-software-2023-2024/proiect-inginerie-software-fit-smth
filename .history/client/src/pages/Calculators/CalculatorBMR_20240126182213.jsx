import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>BMR Calculator</h2>
            <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
            <select value={gender} onChange={e => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
            <input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />
            <button onClick={calculateBMR}>Calculate BMR</button>

            {bmrResult && <p>Your BMR is: {bmrResult}</p>}
        </div>
    );
}

export default BMRCalculator;
