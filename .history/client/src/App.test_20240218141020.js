import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders app component correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const homeLink = screen.getByText(/home/i); 
  expect(homeLink).toBeInTheDocument();
});
