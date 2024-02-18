import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'; 
test('renders app component correctly', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const homeLink = screen.getByText(/home/i); 
  expect(homeLink).toBeInTheDocument();
});
