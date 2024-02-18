


import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BMRCalculator from './BMRCalculator';

// Mock data to be returned by the axios post call
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
  const { getByLabelText, getByText } = render(<BMRCalculator />);
  
  fireEvent.change(getByLabelText(/age/i), { target: { value: '25' } });
  fireEvent.change(getByLabelText(/weight/i), { target: { value: '70' } });
  fireEvent.change(getByLabelText(/height/i), { target: { value: '175' } });
  fireEvent.click(getByText(/calculate bmr/i));
  
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
