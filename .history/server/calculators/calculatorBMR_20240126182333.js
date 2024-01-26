// Calculate the BMR value
function calculateBMR(age, gender, weight, height) {
    let BMR;
    // BMR Calculation (Mifflin-St Jeor Equation)

    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return BMR;
}

export default calculateBMR;
