import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages/Calculators/CalculatorBMR';
import calculateBMR from '../../../server/calculators/calculatorBMR';
import axios from 'axios';

jest.mock('axios');

describe('BMRCalculator Component', () => {
    beforeEach(() => {
        // Clear mocks before each test
        axios.post.mockClear();
    });

    afterEach(() => {
        // Cleanup after each test
        cleanup();
    });

    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    // Integration test: Checks if input fields update the component's state correctly
    test('updates formData state when an input field changes', () => {
        renderWithRouter(<BMRCalculator />);
        const ageInput = screen.getByTestId('age-input');
        fireEvent.change(ageInput, { target: { value: '35' } });
        expect(ageInput.value).toBe('35');
    });

    // Integration test: Simulates form submission and checks if BMR calculation succeeds
    test('calculateBMR sends form data and handles success', async () => {
        const mockBMRResponse = { data: { BMR: { mifflinStJeor: 1800 } } };
        axios.post.mockResolvedValue(mockBMRResponse);

        renderWithRouter(<BMRCalculator />);

        fireEvent.change(screen.getByTestId('age-input'), { target: { value: '30' } });
        fireEvent.change(screen.getByTestId('weight-input'), { target: { value: '80' } });
        fireEvent.change(screen.getByTestId('height-input'), { target: { value: '180' } });
        fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            expect(screen.getByText(/Mifflin-St Jeor Equation: 1800.00 kcal/i)).toBeInTheDocument();
        });
    });

    // Integration test: Checks how the component handles API errors during BMR calculation
    test('calculateBMR handles API errors', async () => {
        axios.post.mockRejectedValue(new Error('API Error'));

        renderWithRouter(<BMRCalculator />);

        fireEvent.change(screen.getByTestId('age-input'), { target: { value: '30' } });
        fireEvent.change(screen.getByTestId('weight-input'), { target: { value: '80' } });
        fireEvent.change(screen.getByTestId('height-input'), { target: { value: '180' } });
        fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            const errorMessage = screen.getByTestId('error-message');
            expect(errorMessage).toBeInTheDocument();
        });
    });

});


import calculateBMR from '../path/to/calculateBMR';

describe('calculateBMR Function', () => {
  // Unit test for Mifflin-St Jeor Equation for males
  test('correctly calculates BMR using Mifflin-St Jeor for males', () => {
    const result = calculateBMR(25, 'male', 70, 175);
    expect(result.mifflinStJeor).toBeCloseTo(10 * 70 + 6.25 * 175 - 5 * 25 + 5);
  });

  // Unit test for Mifflin-St Jeor Equation for females
  test('correctly calculates BMR using Mifflin-St Jeor for females', () => {
    const result = calculateBMR(25, 'female', 70, 175);
    expect(result.mifflinStJeor).toBeCloseTo(10 * 70 + 6.25 * 175 - 5 * 25 - 161);
  });

  // Unit test for Harris-Benedict Equation for males
  test('correctly calculates BMR using Harris-Benedict for males', () => {
    const result = calculateBMR(30, 'male', 80, 180);
    expect(result.harrisBenedict).toBeCloseTo(88.362 + (13.397 * 80) + (4.799 * 180) - (5.677 * 30));
  });

  // Unit test for Harris-Benedict Equation for females
  test('correctly calculates BMR using Harris-Benedict for females', () => {
    const result = calculateBMR(30, 'female', 80, 180);
    expect(result.harrisBenedict).toBeCloseTo(447.593 + (9.247 * 80) + (3.098 * 180) - (4.330 * 30));
  });

  // Unit test for Katch-McArdle Formula with body fat percentage
  test('correctly calculates BMR using Katch-McArdle with body fat', () => {
    const bodyFat = 20; // 20% body fat
    const weight = 80; // 80kg
    const leanMass = weight * (1 - bodyFat / 100);
    const result = calculateBMR(25, 'male', weight, 180, bodyFat);
    expect(result.katchMcArdle).toBeCloseTo(370 + (21.6 * leanMass));
  });

});
