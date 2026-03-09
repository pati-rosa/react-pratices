import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroceryManager from "./components/GroceryManager";

afterEach(() => {
  cleanup();
});

describe("GroceryManager Component", () => {
  test("1. Initial state: inputs empty/default and Unpurchased heading with no items", () => {
    render(<GroceryManager />);

    const nameInput     = screen.getByTestId("input-name");
    const quantityInput = screen.getByTestId("input-quantity");
    const heading       = screen.getByTestId("list-heading");
    const items         = screen.queryAllByTestId("grocery-item");

    expect(nameInput.value).toBe("");
    expect(quantityInput.value).toBe("1");
    expect(heading).toHaveTextContent("Unpurchased Items");
    expect(items).toHaveLength(0);
  });

  test("2. Adds a new grocery item", () => {
    render(<GroceryManager />);
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Milk" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    const groceryItems = screen.getAllByTestId("grocery-item");
    expect(groceryItems).toHaveLength(1);
    expect(screen.getByText("Milk - 2")).toBeInTheDocument();
  });

  test("3. Marks an item as purchased", () => {
    render(<GroceryManager />);
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Bread" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    fireEvent.click(screen.getByTestId("mark-purchased"));
    expect(screen.queryAllByTestId("grocery-item")).toHaveLength(0);

    fireEvent.click(screen.getByTestId("filter-purchased"));
    expect(screen.getByTestId("list-heading")).toHaveTextContent("Purchased Items");
    expect(screen.getAllByTestId("grocery-item")).toHaveLength(1);
  });

  test("4. Filters items by purchased status *and* toggles heading text", () => {
    render(<GroceryManager />);
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Milk" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByTestId("mark-purchased"));

    // Unpurchased view
    fireEvent.click(screen.getByTestId("filter-unpurchased"));
    expect(screen.getByTestId("list-heading")).toHaveTextContent("Unpurchased Items");
    expect(screen.queryByText("Milk - 2")).not.toBeInTheDocument();

    // Purchased view
    fireEvent.click(screen.getByTestId("filter-purchased"));
    expect(screen.getByTestId("list-heading")).toHaveTextContent("Purchased Items");
    expect(screen.getByText("Milk - 2")).toBeInTheDocument();
  });

  test("5. Shows error when item name is empty", () => {
    render(<GroceryManager />);
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    const err = screen.getByTestId("error-message");
    expect(err).toHaveTextContent("Item name cannot be empty.");
  });

  test("6. Shows error when quantity is not a positive number", () => {
    render(<GroceryManager />);
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Milk" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    const err = screen.getByTestId("error-message");
    expect(err).toHaveTextContent("Quantity must be a positive number.");
  });

  test("7. Clears error message when valid input is submitted after an error", () => {
    render(<GroceryManager />);

    // Trigger an error
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("error-message")).toBeInTheDocument();

    // Now submit valid input
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Eggs" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "12" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.queryByTestId("error-message")).toBeNull();
    expect(screen.getByText("Eggs - 12")).toBeInTheDocument();
  });

  test("8. Adds an item with an existing item in the unpurchased list", () => {
    render(<GroceryManager />);

    // Add first item
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Milk" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    // Try to add the same item again
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Apple" },
    });
    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByTestId("add-button"));

    const groceryItems = screen.getAllByTestId("grocery-item");
    expect(groceryItems).toHaveLength(2);
  });

  test("9. Moves multiple items from unpurchased to purchased and checks in purchased list", () => {
    render(<GroceryManager />);

    const addItem = (name, qty) => {
      fireEvent.change(screen.getByTestId("input-name"), {
        target: { value: name },
      });
      fireEvent.change(screen.getByTestId("input-quantity"), {
        target: { value: String(qty) },
      });
      fireEvent.click(screen.getByTestId("add-button"));
    };

    addItem("Milk", 2);
    addItem("Bread", 1);
    addItem("Eggs", 12);

    const markBtns = screen.getAllByTestId("mark-purchased");
    fireEvent.click(markBtns[0]); // Milk
    fireEvent.click(markBtns[1]); // Bread

    fireEvent.click(screen.getByTestId("filter-purchased"));
    const purchasedItems = screen.getAllByTestId("grocery-item");
    expect(purchasedItems).toHaveLength(2);
    expect(screen.getByText("Milk - 2")).toBeInTheDocument();
    expect(screen.getByText("Bread - 1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("filter-unpurchased"));
    expect(screen.getByText("Eggs - 12")).toBeInTheDocument();
  });
});
