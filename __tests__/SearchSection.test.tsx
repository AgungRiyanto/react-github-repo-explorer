import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchSection from "@/components/SearchSection";

describe("SearchSection Component", () => {
  test("updates input value when typing", () => {
    render(<SearchSection onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText("Enter username");

    fireEvent.change(input, { target: { value: "test user" } });

    expect(input).toHaveValue("test user");
  });

  test("calls onSearch when Enter key is pressed", () => {
    const mockOnSearch = jest.fn();
    render(<SearchSection onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Enter username");

    fireEvent.change(input, { target: { value: "test user" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("test user");
  });

  test("calls onSearch when search button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<SearchSection onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Enter username");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "test user" } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("test user");
  });
});
