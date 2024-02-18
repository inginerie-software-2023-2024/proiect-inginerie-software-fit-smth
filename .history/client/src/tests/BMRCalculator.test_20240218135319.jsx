import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import BMRCalculator from '../pages/Calculators/CalculatorBMR.jsx';

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

axios.post.mockResolvedValue(mockBMRResponse);

test('calculates BMR on button click', async () => {
    render(
        <BrowserRouter>
            <BMRCalculator />
        </BrowserRouter>
    );

    const ageInput = screen.getByLabelText(/age/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);

    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate bmr/i }));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/calculate-bmr', {
            age: '25',
            gender: 'male', // Assuming gender is set to 'male' by default
            weight: '70',
            height: '175',
            bodyFat: '' // Assuming body fat is optional and not provided
        });
    });
});
