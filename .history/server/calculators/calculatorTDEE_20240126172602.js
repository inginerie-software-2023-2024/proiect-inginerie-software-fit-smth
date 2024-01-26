const calculateTDEE = (weight, height, age, gender, activityLevel) => {
    // Check if any of the input values are NaN or not provided
    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(activityLevel)) {
        console.error('Invalid input values. Make sure all inputs are numeric.');
        return NaN; // Return NaN to indicate an error
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    const tdee = bmr * activityFactors[activityLevel];
    
    // Check if the result is NaN (e.g., due to invalid input)
    if (isNaN(tdee)) {
        console.error('TDEE calculation resulted in NaN. Check input values.');
        return NaN; // Return NaN to indicate an error
    }

    return tdee.toFixed(2);
};

export default calculateTDEE;
