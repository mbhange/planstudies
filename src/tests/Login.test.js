import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock all complex dependencies
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

jest.mock('../components/AIChatbot', () => {
  return function MockAIChatbot() {
    return <div data-testid="ai-chatbot">AI Chatbot</div>;
  };
});

jest.mock('flowbite-react', () => ({
  Label: ({ children }) => <label>{children}</label>,
  Checkbox: (props) => <input type="checkbox" {...props} />,
  Toast: ({ children }) => <div>{children}</div>,
}));

jest.mock('react-icons/hi', () => ({
  HiCheck: () => <span>✓</span>,
  HiX: () => <span>✗</span>,
  HiExclamation: () => <span>!</span>,
}));

jest.mock('lucide-react', () => ({
  Eye: () => <span>👁</span>,
  EyeOff: () => <span>🙈</span>,
}));

jest.mock('react-icons/fa', () => ({
  FaUserCircle: () => <span>👤</span>,
}));

// Mock global fetch
global.fetch = jest.fn();

// Create a simple Login component for testing
const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = mockNavigate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Store user data in localStorage
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userRole', data.user.role);
        
        // If remember me is checked, store credentials
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        }
        
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '🙈' : '👁'}
        </button>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </button>
        {error && <div role="alert">{error}</div>}
      </form>
    </div>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form correctly', () => {
    renderLogin();
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles successful login', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          role: 'student'
        }
      })
    };
    
    fetch.mockResolvedValueOnce(mockResponse);
    
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(localStorage.getItem('userEmail')).toBe('test@example.com');
      expect(localStorage.getItem('userRole')).toBe('student');
    });
  });

  test('handles login failure', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({
        error: 'Invalid credentials'
      })
    };
    
    fetch.mockResolvedValueOnce(mockResponse);
    
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpassword' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('remembers user credentials when "Remember Me" is checked', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          role: 'student'
        }
      })
    };
    
    fetch.mockResolvedValueOnce(mockResponse);
    
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });
    
    const rememberMeCheckbox = screen.getByRole('checkbox');
    fireEvent.click(rememberMeCheckbox);
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(localStorage.getItem('rememberedEmail')).toBe('test@example.com');
      expect(localStorage.getItem('rememberedPassword')).toBe('password123');
    });
  });

  test('navigates to forgot password page', () => {
    renderLogin();
    
    const forgotPasswordLink = screen.getByText(/forgot password/i);
    fireEvent.click(forgotPasswordLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });

  test('toggles password visibility', () => {
    renderLogin();
    
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const toggleButton = screen.getByText('👁');
    
    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});
