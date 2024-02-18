import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages/Calculators/CalculatorBMR';
import axios from 'axios';

jest.mock('axios');

describe('BMRCalculator Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        axios.post.mockClear();
    });

    test('updates formData state when an input field changes', () => {
        render(
          <BrowserRouter>
            <BMRCalculator />
          </BrowserRouter>
        );
        const ageInput = screen.getByLabelText(/Age/i);
        fireEvent.change(ageInput, { target: { value: '35' } });
        expect(ageInput.value).toBe('35');
      });
      
    test('calculateBMR sends form data and handles success', async () => {
        const mockBMRResponse = { data: { BMR: { mifflinStJeor: 1800 } } };
        axios.post.mockResolvedValue(mockBMRResponse);

        render(<BMRCalculator />);

        // Assume there are inputs for age, weight, height, and gender in your form
        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), { target: { value: '80' } });
        fireEvent.change(screen.getByLabelText(/Height \(cm\)/i), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            expect(screen.getByText(/Mifflin-St Jeor Equation: 1800.00 kcal/i)).toBeInTheDocument();
        });
    });

    test('calculateBMR handles API errors', async () => {
        axios.post.mockRejectedValue(new Error('API Error'));

        render(<BMRCalculator />);

        // Fill out the form as needed
        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), { target: { value: '80' } });
        fireEvent.change(screen.getByLabelText(/Height \(cm\)/i), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            const errorMessage = screen.getByText(/error calculating BMR/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
