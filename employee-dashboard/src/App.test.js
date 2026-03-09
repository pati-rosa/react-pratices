import React from "react";
import App from "./App";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const jsdomAlert = window.alert; // remember the jsdom alert

beforeEach(() => {
  window.alert = () => {};
});

afterEach(() => {
  window.alert = jsdomAlert;
  cleanup();
});

describe("Employee Directory App", () => {
  test("1. Initially all inputs to be empty and no employees shown", () => {
    render(<App />);

    // inputs empty
    expect(screen.getByTestId("name-input").value).toBe("");
    expect(screen.getByTestId("role-input").value).toBe("");
    expect(screen.getByTestId("department-select").value).toBe("");
    expect(screen.getByTestId("contact-input").value).toBe("");
    // filter dropdown empty
    expect(screen.getByTestId("filter-select").value).toBe("");
    // no employees message
    expect(screen.getByText("No Employees Added.")).toBeInTheDocument();
  });

  test("2. Adds a new employee", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    // Assert the new employee is displayed in the list
    const employeeList = screen.getByTestId("employee-list");
    expect(employeeList).toHaveTextContent("John Doe");
    expect(employeeList).toHaveTextContent("Developer");
    expect(employeeList).toHaveTextContent("(IT)");
    expect(employeeList).toHaveTextContent("john.doe@example.com");
  });

  test("3. Does not add employee if required fields are missing and shows alert", () => {
    // spy on alert
    const alertMock = jest.fn();
    window.alert = alertMock;

    render(<App />);

    // leave name empty
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    // expect alert called
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith("All fields are required!");

    // still no employees
    expect(screen.getByText("No Employees Added.")).toBeInTheDocument();
    expect(screen.queryByTestId("employee-list")).not.toBeInTheDocument();
  });

  test("4. No user to be shown for non-existent role", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Tester" },
    });

    expect(screen.getByText("No Employees Added.")).toBeInTheDocument();
    expect(screen.queryByTestId("employee-list")).not.toBeInTheDocument();
  });

  test("5. No user to be shown for department whose entry is not added", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("filter-select"), {
      target: { value: "Design" },
    });

    expect(screen.getByText("No Employees Added.")).toBeInTheDocument();
    expect(screen.queryByTestId("employee-list")).not.toBeInTheDocument();
  });

  test("6. Filters employees by department", () => {
    render(<App />);

    // Add employees
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Designer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "Design" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    // Filter by IT department
    fireEvent.change(screen.getByTestId("filter-select"), {
      target: { value: "IT" },
    });

    // Assert only IT employee is shown
    const employeeList = screen.getByTestId("employee-list");
    expect(employeeList).toHaveTextContent("John Doe");
    expect(employeeList).toHaveTextContent("Developer");
    expect(employeeList).toHaveTextContent("(IT)");
    expect(employeeList).toHaveTextContent("john.doe@example.com");

    expect(employeeList).not.toHaveTextContent("Jane Smith");
    expect(employeeList).not.toHaveTextContent("Designer");
    expect(employeeList).not.toHaveTextContent("(Design)");
    expect(employeeList).not.toHaveTextContent("jane.smith@example.com");
  });

  test("7. Searches employees by role", () => {
    render(<App />);

    // Add employees
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Designer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "Design" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    // Search for Developer role
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Developer" },
    });

    // Assert only Developer employee is shown
    const employeeList = screen.getByTestId("employee-list");
    expect(employeeList).toHaveTextContent("John Doe");
    expect(employeeList).toHaveTextContent("Developer");
    expect(employeeList).toHaveTextContent("(IT)");
    expect(employeeList).toHaveTextContent("john.doe@example.com");

    expect(employeeList).not.toHaveTextContent("Jane Smith");
    expect(employeeList).not.toHaveTextContent("Designer");
    expect(employeeList).not.toHaveTextContent("(Design)");
    expect(employeeList).not.toHaveTextContent("jane.smith@example.com");
  });

  test("8. Search and filter work simultaneously", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Engineer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "alice@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Bob" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "bob@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("filter-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Manager" },
    });

    // Assert only Manager employee is shown
    const employeeList = screen.getByTestId("employee-list");
    expect(employeeList).toHaveTextContent("Bob");
    expect(employeeList).toHaveTextContent("bob@example.com");

    expect(employeeList).not.toHaveTextContent("Alice");
    expect(employeeList).not.toHaveTextContent("alice@example.com");
  });

  test("9. Search users for text partially matching the role", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Charlie" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Analyst" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "charlie@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Ana" },
    });

    const employeeList = screen.getByTestId("employee-list");
    expect(employeeList).toHaveTextContent("Charlie");
    expect(employeeList).toHaveTextContent("Analyst");
    expect(employeeList).toHaveTextContent("(IT)");
    expect(employeeList).toHaveTextContent("charlie@example.com");
  });

  test("10. Removes an employee", () => {
    render(<App />);

    // Add an employee
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("role-input"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByTestId("department-select"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByTestId("contact-input"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    // Remove the employee
    fireEvent.click(screen.getByTestId("remove-button"));

    // Assert the employee is removed
    expect(screen.queryByTestId("employee-list")).not.toBeInTheDocument();
    expect(screen.getByText("No Employees Added.")).toBeInTheDocument();
  });
});