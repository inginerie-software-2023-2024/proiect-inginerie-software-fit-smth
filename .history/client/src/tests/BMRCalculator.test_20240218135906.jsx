import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages//Calculators/CalculatorBMR'; // Adjust the import path as necessary

// Mock axios to prevent actual API calls
jest.mock('axios');

const mockBMRResponse = {
    data: {
        BMR: {
            mifflinStJeor: 1500,
            harrisBenedict: 1550,
            schofield: 1600,
            katchMcArdle: 1650,
        },
    },
};

describe('BMRCalculator Component', () => {
    beforeEach(() => {
        // Setup the mock to resolve with the mock response
        axios.post.mockResolvedValue(mockBMRResponse);
    });

    test('renders BMRCalculator and calculates BMR on form submission', async () => {
        render(
            <BrowserRouter>
                <BMRCalculator />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByRole('spinbutton', { name: /Age/i }), { target: { value: '25' } });
        fireEvent.change(screen.getByRole('combobox', { name: /Gender/i }), { target: { value: 'male' } });
        fireEvent.change(screen.getByRole('spinbutton', { name: /Weight \(kg\)/i }), { target: { value: '70' } });
        fireEvent.change(screen.getByRole('spinbutton', { name: /Height \(cm\)/i }), { target: { value: '175' } });
        fireEvent.change(screen.getByLabelText(/Body Fat Percentage \(optional\)/i), { target: { value: '15' } });

        // Simulate form submission by clicking the calculate button
        fireEvent.click(screen.getByText(/Calculate BMR/i));

        // Assertion: Check if axios.post was called with the correct data
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/calculate-bmr', {
            age: '25',
            gender: 'male',
            weight: '70',
            height: '175',
            bodyFat: '15',
        });

        // Optional: Wait for and assert the result display if needed
        // Example: await screen.findByText('Mifflin-St Jeor Equation: 1500 kcal');
    });
});
