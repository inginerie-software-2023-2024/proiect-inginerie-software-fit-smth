import db from "../database.js";

const calculateBMI = (weight, height) => {
  const bmi = weight / (height * height);
  let condition = '';
  console.log(weight, height);
  if (bmi < 18.5) {
    condition = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    condition = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    condition = 'Overweight';
  } else {
    condition = 'Obesity';
  }

  console.log(bmi, condition);
  return { bmi: bmi.toFixed(2), condition };
};

export default calculateBMI;
