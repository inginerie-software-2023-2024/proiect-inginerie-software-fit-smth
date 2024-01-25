// calculators/bmiCalculator.js

const calculateBMI = (weight, height) => {
  if (!weight || !height || isNaN(weight) || isNaN(height) || height <= 0) {
    throw new Error("Invalid input data");
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ** 2);
  return bmi.toFixed(2);
};

module.exports = calculateBMI;
