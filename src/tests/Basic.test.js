import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Simple test component
const TestComponent = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <h1>Test Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

describe('Basic Component Tests', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders test component', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments count on button click', () => {
    render(<TestComponent />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('can render with router', () => {
    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
