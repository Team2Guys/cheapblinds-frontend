import React from "react";
import { render, screen } from "@testing-library/react";
import Reviews from "../reviews";

describe("Reviews Component", () => {
  it("renders five stars", () => {
    render(<Reviews />);
    const stars = screen.getAllByTestId("review-star");
    expect(stars).toHaveLength(5);
  });

  it("displays correct static text", () => {
    render(<Reviews />);
    expect(screen.getByText(/Our customers say/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellent/i)).toBeInTheDocument();
    expect(screen.getByText(/4.7 out of 5 based on 84,290 reviews/i)).toBeInTheDocument();
  });
});
