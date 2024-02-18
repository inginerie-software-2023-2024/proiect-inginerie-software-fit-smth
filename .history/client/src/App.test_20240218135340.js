import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders app component correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Update this to match a known text element or role in your App component
  // Example: const homeLink = screen.getByRole('link', { name: /home/i });
  const homeLink = screen.getByText(/home/i); // Assuming your app renders a "Home" link or text
  expect(homeLink).toBeInTheDocument();
});
