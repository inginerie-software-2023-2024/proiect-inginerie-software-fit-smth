import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SidebarMenu from '../path/to/SidebarMenu';
import '@testing-library/jest-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Import and spread the actual module
    useNavigate: () => jest.fn(), // Mock useNavigate to avoid actual navigation
}));

describe('SidebarMenu Component', () => {
    beforeEach(() => {
        const user = { username: 'testUser' };
        Storage.prototype.getItem = jest.fn(() => JSON.stringify(user)); // Mock localStorage for user data
    });

    const renderSidebarMenu = () =>
        render(
            <BrowserRouter>
                <SidebarMenu />
            </BrowserRouter>
        );

    test('renders correctly', () => {
        // Unit Test: Checks if the component renders correctly within its intended environment
        renderSidebarMenu();
        expect(screen.getByText('Home')).toBeInTheDocument(); // Asserts that the "Home" link is present, indicating correct rendering
    });

    test('navigates to Profile on button click', () => {
        // Unit Test: Simulates user interaction to verify navigation behavior
        renderSidebarMenu();
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);
        // This test would ideally check if navigation to the profile occurred, which requires further mocking or integration testing setup
    });

    test('logs out and navigates to login on logout button click', () => {
        // Unit Test: Tests the logout functionality and ensures navigation to the login page
        Storage.prototype.removeItem = jest.fn(); // Mock localStorage.removeItem for logout functionality

        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate, // Mock useNavigate to track calls
        }));

        renderSidebarMenu();
        const logoutButton = screen.getByText('Log out');
        fireEvent.click(logoutButton); // Simulate logout button click

        expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser'); // Verify that user data is cleared from localStorage
        expect(mockNavigate).toHaveBeenCalledWith('/login'); // Assert navigation to login page
    });

    // Add more tests as needed for other links and functionalities
});
