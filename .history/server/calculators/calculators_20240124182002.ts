// calculators/bmiCalculator.ts

const calculateBMI = (weight: number, height: number): string => {
    if (!weight || !height || isNaN(weight) || isNaN(height) || height <= 0) {
      throw new Error("Invalid input data");
    }
  
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
    return bmi.toFixed(2);
  };
  
  export default calculateBMI;
  