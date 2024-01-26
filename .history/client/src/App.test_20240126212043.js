import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';


describe('App with BMRCalculator', () => {
  it('renders BMR calculator', () => {
    render(<App />);
    expect(screen.getByText(/BMR Calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
  });

  it('updates input fields correctly', () => {
    render(<App />);
    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(ageInput.value).toBe('25');

    const weightInput = screen.getByLabelText('Weight (kg)');
    fireEvent.change(weightInput, { target: { value: '70' } });
    expect(weightInput.value).toBe('70');
  });

  it('submits the BMR form and displays results', async () => {
    axios.post.mockResolvedValue({
      data: { BMR: { mifflinStJeor: 1500, harrisBenedict: 1550, schofield: 1600, katchMcArdle: 1450 } }
    });

    render(<App />);
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '70' } });

    fireEvent.click(screen.getByText(/Calculate BMR/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/calculate-bmr', {
        age: '25',
        gender: 'male', // Assuming default value
        weight: '70',
        height: '180',
        bodyFat: '15' // Only include if the field exists
      });
    });


    expect(await screen.findByText('Mifflin-St Jeor Equation: 1500 kcal')).toBeInTheDocument();
    expect(screen.getByText('Harris-Benedict Equation: 1550 kcal')).toBeInTheDocument();
  });
});
