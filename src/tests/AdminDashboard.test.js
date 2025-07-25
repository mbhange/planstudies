import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios;

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock components
jest.mock("../components/NavbarStudent", () => {
  return function MockNavbarStudent() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock("../components/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock("../components/AIChatbot", () => {
  return function MockAIChatbot() {
    return <div data-testid="ai-chatbot">AI Chatbot</div>;
  };
});

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    // Mock axios methods to return resolved promises
    mockedAxios.get.mockResolvedValue({ data: [] });
    mockedAxios.post.mockResolvedValue({ data: {} });
    mockedAxios.put.mockResolvedValue({ data: {} });
    mockedAxios.delete.mockResolvedValue({ data: {} });
    mockNavigate.mockClear();
    
    // Mock fetch for other API calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderAdminDashboard = async () => {
    let component;
    await act(async () => {
      component = render(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );
    });
    return component;
  };

  test("renders admin dashboard correctly", async () => {
    await renderAdminDashboard();

    expect(screen.getByText((content, element) => content.includes("Admin Dashboard"))).toBeInTheDocument();
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Agents Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Students Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Total Payments")).toBeInTheDocument();
  });

  test("handles search functionality", async () => {
    await renderAdminDashboard();

    const searchInput = screen.getByPlaceholderText("Search by name...");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(searchInput.value).toBe("John");
  });

  test("displays role filter select", async () => {
    await renderAdminDashboard();

    const roleSelect = screen.getByDisplayValue("All Roles");
    expect(roleSelect).toBeInTheDocument();
    
    fireEvent.change(roleSelect, { target: { value: "student" } });
    expect(roleSelect.value).toBe("student");
  });
});
