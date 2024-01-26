// BMR Calculation Logic
function calculateBMR(age, gender, weight, height) {
    let BMR;
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return BMR;
}
export default calculateBMR;
