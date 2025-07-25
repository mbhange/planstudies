import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock components
jest.mock('../components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe('CreateAccount Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
    mockNavigate.mockClear();
  });

  const renderCreateAccount = () => {
    return render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    );
  };

  test('renders create account form correctly', () => {
    renderCreateAccount();
    
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Re-enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderCreateAccount();
    
    const fullNameInput = screen.getByPlaceholderText('Enter your name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const rePasswordInput = screen.getByPlaceholderText('Re-enter your password');
    
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(rePasswordInput, { target: { value: 'Password123!' } });
    
    expect(fullNameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('Password123!');
    expect(rePasswordInput.value).toBe('Password123!');
  });

  test('shows error when passwords do not match', async () => {
    renderCreateAccount();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), {
      target: { value: 'DifferentPassword123!' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match. Please try again.')).toBeInTheDocument();
    });
  });

  test('validates password strength', async () => {
    renderCreateAccount();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'weak' }
    });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), {
      target: { value: 'weak' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters long/)).toBeInTheDocument();
    });
  });

  test('handles successful account creation', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: 'Account created successfully' }
    });
    
    renderCreateAccount();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), {
      target: { value: 'Password123!' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/register', {
        role: 'student',
        fullName: 'John Doe',
        phone_number: '',
        email: 'john@example.com',
        password: 'Password123!'
      });
    });
  });

  test('handles account creation failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: 'Email already exists'
      }
    });
    
    renderCreateAccount();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'existing@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Password123!' }
    });
    fireEvent.change(screen.getByPlaceholderText('Re-enter your password'), {
      target: { value: 'Password123!' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  test('shows error when required fields are missing', async () => {
    renderCreateAccount();
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });

  test('role selection works correctly', () => {
    renderCreateAccount();
    
    const roleSelect = screen.getByDisplayValue('Student');
    fireEvent.change(roleSelect, { target: { value: 'agent' } });
    
    expect(roleSelect.value).toBe('agent');
  });

  test('handles OTP sending for phone verification', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true }
    });
    
    renderCreateAccount();
    
    // Find phone input by placeholder or type
    const phoneInput = screen.getByPlaceholderText('1 (702) 123-4567');
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const sendOtpButton = screen.getByRole('button', { name: /send otp/i });
    fireEvent.click(sendOtpButton);
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/send-mobile-otp', {
        phone: '1234567890'
      });
    });
  });

  // OTP verification test skipped as it requires OTP to be sent first
  // and the OTP input is conditionally rendered
});
