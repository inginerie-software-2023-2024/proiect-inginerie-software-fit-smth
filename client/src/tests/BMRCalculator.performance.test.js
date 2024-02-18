import calculateBMR from "../../../server/calculators/calculatorBMR";

describe('calculateBMR Performance Test', () => {
    const testCases = [
        { age: 25, gender: 'male', weight: 70, height: 175, bodyFat: 15 },
        { age: 30, gender: 'female', weight: 60, height: 165, bodyFat: 20 },
        { age: 40, gender: 'male', weight: 80, height: 180, bodyFat: 10 },
        { age: 55, gender: 'female', weight: 65, height: 160, bodyFat: 25 },
    ];

    const repeatCount = 10; 
    const acceptableThresholds = [5, 10]; 

    testCases.forEach(({ age, gender, weight, height, bodyFat }, index) => {
        it(`should complete within acceptable time frame for test case #${index + 1}`, () => {
            let totalExecutionTime = 0;

            for (let i = 0; i < repeatCount; i++) {
                const start = performance.now();
                calculateBMR(age, gender, weight, height, bodyFat);
                const end = performance.now();
                totalExecutionTime += end - start;
            }

            const averageExecutionTime = totalExecutionTime / repeatCount;
            console.log(`Average execution time for test case #${index + 1}: ${averageExecutionTime} ms`);

            acceptableThresholds.forEach((threshold) => {
                expect(averageExecutionTime).toBeLessThan(threshold);
            });
        });
    });
});
