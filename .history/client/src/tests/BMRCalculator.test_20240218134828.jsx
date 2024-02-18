import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'
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

    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '175' } });
    fireEvent.click(screen.getByText(/calculate bmr/i));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/calculate-bmr', {
            age: '25',
            gender: 'male', // default value
            weight: '70',
            height: '175',
            bodyFat: '' // empty since not provided
        });
    });
});
