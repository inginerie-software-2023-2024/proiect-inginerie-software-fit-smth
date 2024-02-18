const calculateTDEE = (weight, height, age, gender, activityLevel) => {
    // Efficient input validation
    if (isNaN(weight) || isNaN(height) || isNaN(age) || typeof activityLevel !== 'string' || activityLevel.trim() === '') {
        // Consider using a more silent error handling in production, e.g., error logging to a server
        if (process.env.NODE_ENV === 'development') {
            console.error('Invalid input values. Make sure all inputs are numeric and activityLevel is a non-empty string.');
        }
        return NaN; // Return NaN to indicate an error
    }

    // Direct BMR calculation without intermediate logging
    const bmr = gender === 'Male' ? (10 * weight + 6.25 * height - 5 * age + 5) : (10 * weight + 6.25 * height - 5 * age - 161);

    // Predefined activity factors
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    // Direct TDEE calculation without intermediate logging
    const tdee = bmr * activityFactors[activityLevel.toLowerCase()]; // Ensure activityLevel is case-insensitive

    // Return the TDEE value as a number, keeping the precision handling (e.g., rounding) to the display logic
    if (isNaN(tdee)) {
        if (process.env.NODE_ENV === 'development') {
            console.error('TDEE calculation resulted in NaN. Check input values.');
        }
        return NaN; // Return NaN to indicate an error
    }

    return parseFloat(tdee.toFixed(2)); // Convert the string back to a number with two decimal places for precision
};

export default calculateTDEE;
