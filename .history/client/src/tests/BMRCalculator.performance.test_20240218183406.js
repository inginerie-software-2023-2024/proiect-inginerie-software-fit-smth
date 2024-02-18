import calculateBMR from "../../../server/calculators/calculatorBMR";

describe('calculateBMR Performance Test', () => {
  it('should complete within acceptable time frame', () => {
    const start = performance.now();

    // Example parameters for the BMR calculation
    calculateBMR(25, 'male', 70, 175, 15); // age, gender, weight(kg), height(cm), body fat(%)

    const end = performance.now();
    const executionTime = end - start;

    console.log(`Execution time: ${executionTime} ms`);

    // Assert that the execution time is less than 5 milliseconds
    expect(executionTime).toBeLessThan(5);
  });
});
