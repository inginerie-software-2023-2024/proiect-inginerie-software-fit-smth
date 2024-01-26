const calculateBMI = (weight, height, unit) => {
  if (!weight || !height || isNaN(weight) || isNaN(height) || height <= 0) {
    throw new Error("Invalid input data");
  }

  let bmi;
  if (unit === 'metric') {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters ** 2);
  } else { // Assumes 'imperial'
    bmi = (weight * 703) / (height ** 2);
  }

  let category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 18.5 && bmi <= 24.9) category = 'Normal weight';
  else if (bmi >= 25 && bmi <= 29.9) category = 'Overweight';
  else category = 'Obesity';

  return { bmi: bmi.toFixed(1), category };
};

export default calculateBMI;
