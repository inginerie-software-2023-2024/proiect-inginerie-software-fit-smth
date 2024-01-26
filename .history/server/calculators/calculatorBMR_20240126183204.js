// BMR Calculation Logic with Multiple Formulas
function calculateBMR(age, gender, weight, height, bodyFat = null) {
    let bmrResults = {};

    // Mifflin-St Jeor Equation
    bmrResults.mifflinStJeor = gender === 'male' 
        ? 10 * weight + 6.25 * height - 5 * age + 5 
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // Harris-Benedict Equation
    bmrResults.harrisBenedict = gender === 'male' 
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) 
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    // Schofield's Equation (based on age range)
    if (gender === 'male') {
        if (age >= 10 && age <= 17) {
            bmrResults.schofield = 17.686 * weight + 658.2;
        } else if (age >= 18 && age <= 29) {
            bmrResults.schofield = 15.057 * weight + 692.2;
        } else if (age >= 30) {
            bmrResults.schofield = 11.472 * weight + 873.1;
        }
    } else {
        if (age >= 10 && age <= 17) {
            bmrResults.schofield = 13.384 * weight + 692.6;
        } else if (age >= 18 && age <= 29) {
            bmrResults.schofield = 14.818 * weight + 486.6;
        } else if (age >= 30) {
            bmrResults.schofield = 8.126 * weight + 845.6;
        }
    }

    // Katch-McArdle Formula (requires body fat percentage)
    if (bodyFat != null) {
        const leanMass = weight * (1 - bodyFat / 100);
        bmrResults.katchMcArdle = 370 + (21.6 * leanMass);
    }

    return bmrResults;
}

export default calculateBMR;
