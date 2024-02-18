import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages/Calculators/CalculatorBMR';
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
