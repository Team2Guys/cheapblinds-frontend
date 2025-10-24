import { render, screen } from "@testing-library/react";
import Reviews from "../reviews";

describe("Reviews Component", () => {
  it("renders the 'Excellent' label", () => {
    render(<Reviews />);
    expect(screen.getByText("Excellent")).toBeInTheDocument();
  });

  it("renders five stars", () => {
    render(<Reviews />);
    const stars = screen.getAllByTestId("review-star");
    expect(stars).toHaveLength(5);
  });

  it("renders the desktop-only texts when screen is large", () => {
    render(<Reviews />);
    expect(screen.getByText("Our customers say")).toBeInTheDocument();
    expect(
      screen.getByText("4.7 out of 5 based on 84,290 reviews")
    ).toBeInTheDocument();
  });

  it("does not render desktop-only texts on small screens (simulated by CSS hiding)", () => {
    render(<Reviews />);
    const hiddenText = screen.getByText("Our customers say");
    expect(hiddenText).toHaveClass("hidden");
  });
});
