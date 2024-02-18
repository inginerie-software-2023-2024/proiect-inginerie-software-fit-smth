import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BMRCalculator from './BMRCalculator';
import axios from 'axios'; // To be mocked later

jest.mock('axios'); // Enable mocking of axios

describe('BMRCalculator', () => {
    test('updates formData state when an input field changes', () => {
        render(<BMRCalculator />);

        const ageInput = screen.getByLabelText('Age');
        fireEvent.change(ageInput, { target: { value: '35' } }); // Simulate age entry

        // Using screen.debug() helps visualize the component state if needed
        // screen.debug()  

        expect(ageInput.value).toBe('35'); // Check the input field's 'value' prop
    });

    test('calculateBMR sends form data and handles success', async () => {
        const mockBMRResponse = { data: { BMR: { mifflinStJeor: 1800 } } };
        axios.post.mockResolvedValue(mockBMRResponse); 

        render(<BMRCalculator />);

        // Fill out some form values  (adjust as needed)
        const weightInput = screen.getByLabelText('Weight (kg)');
        fireEvent.change(weightInput, { target: { value: '80' } });
        // ... (Similar actions for other fields)

        const calculateButton = screen.getByRole('button', { name: 'Calculate BMR' });
        fireEvent.click(calculateButton); // Simulate clicking the button

        await waitFor(() => {  // Wait for async updates or promises to resolve 
            const bmrResult = screen.getByText('Mifflin-St Jeor Equation: 1800.00 kcal');
            expect(bmrResult).toBeInTheDocument();
        });
    });

    test('calculateBMR handles API errors', async () => {
        axios.post.mockRejectedValue(new Error('API Error')); // Simulate failure

        render(<BMRCalculator />);

        // ... Filling out the form ...

        const calculateButton = screen.getByRole('button', { name: 'Calculate BMR' });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            // Here, you'd find an error message displayed to the user
            // e.g., const errorMessage = screen.getByText('Error calculating BMR');
            // (Your UI element might vary)
        });
    });
});
