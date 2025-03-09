import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "@/components/Spinner";

describe("Spinner Component", () => {
  test("renders the spinner element", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
