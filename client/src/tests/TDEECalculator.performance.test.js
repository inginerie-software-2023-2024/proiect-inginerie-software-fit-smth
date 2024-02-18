import calculateTDEE from "../../../server/calculators/calculatorTDEE";

describe('calculateTDEE Performance', () => {
  it('should complete within acceptable time frame', () => {
    const start = performance.now(); // Start timer

    // Define your test input
    const input = { weight: 70, height: 175, age: 25, gender: 'Male', activityLevel: 'moderate' };

    // Example test loop - adjust iteration count as needed
    for (let i = 0; i < 1000; i++) {
      calculateTDEE(input.weight, input.height, input.age, input.gender, input.activityLevel);
    }

    const end = performance.now(); // End timer
    const duration = end - start;

    const maxDuration = 200; // Maximum duration in milliseconds
    expect(duration).toBeLessThan(maxDuration);
  });
});
