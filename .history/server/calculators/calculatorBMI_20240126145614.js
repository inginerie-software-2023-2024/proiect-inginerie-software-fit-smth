const calculateBMI = (weight, height) => {
  console.log(weight, height);
  const bmi = weight / (height * height);
  let condition = '';

  if (bmi < 18.5) {
    condition = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    condition = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    condition = 'Overweight';
  } else {
    condition = 'Obesity';
  }

  return { bmi: bmi.toFixed(2), condition };
};

export default calculateBMI;
