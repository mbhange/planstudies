import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the AIChatbot component to avoid errors
jest.mock('./pages/AIChatbot', () => {
  return function MockAIChatbot() {
    return <div data-testid="ai-chatbot">AI Chatbot</div>;
  };
});

// Mock swiper modules (manual mocks will be used automatically)
jest.mock('swiper/react');
jest.mock('swiper/modules');

test('renders App component without crashing', () => {
  render(<App />);
  
  // Check if AI Chatbot is rendered
  const aiChatbot = screen.getByTestId('ai-chatbot');
  expect(aiChatbot).toBeInTheDocument();
});
