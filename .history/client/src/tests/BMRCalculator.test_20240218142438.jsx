import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages/Calculators/CalculatorBMR';
import axios from 'axios';

jest.mock('axios');

describe('BMRCalculator Component', () => {
    // Clear mocks before each test
    beforeEach(() => {
        axios.post.mockClear();
    });

    // Cleanup after each test
    afterEach(cleanup);

    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test('updates formData state when an input field changes', () => {
        renderWithRouter(<BMRCalculator />);
        const ageInput = screen.getByLabelText(/Age/i);
        fireEvent.change(ageInput, { target: { value: '35' } });
        expect(ageInput.value).toBe('35');

        // Debug output if needed
        // screen.debug(ageInput);
    });

    test('calculateBMR sends form data and handles success', async () => {
        const mockBMRResponse = { data: { BMR: { mifflinStJeor: 1800 } } };
        axios.post.mockResolvedValue(mockBMRResponse);

        renderWithRouter(<BMRCalculator />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), { target: { value: '80' } });
        fireEvent.change(screen.getByLabelText(/Height \(cm\)/i), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            expect(screen.getByText(/Mifflin-St Jeor Equation: 1800.00 kcal/i)).toBeInTheDocument();
        });

        // Debug output if needed
        // screen.debug();
    });

    test('calculateBMR handles API errors', async () => {
        axios.post.mockRejectedValue(new Error('API Error'));

        renderWithRouter(<BMRCalculator />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Weight \(kg\)/i), { target: { value: '80' } });
        fireEvent.change(screen.getByLabelText(/Height \(cm\)/i), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Calculate BMR/i }));

        await waitFor(() => {
            const errorMessage = screen.getByText(/error calculating BMR/i);
            expect(errorMessage).toBeInTheDocument();
        });

        // Debug output if needed
        // eslint-disable-next-line testing-library/no-debugging-utils
screen.debug();
    });
});
