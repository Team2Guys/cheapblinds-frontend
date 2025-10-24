import { render, screen } from "@testing-library/react";
import OrderSection from "./ordersample";
import "@testing-library/jest-dom"; // for toBeInTheDocument(), etc.
import React from "react";
import { vi } from "vitest"; // ✅ Vitest mock functions

// ✅ Mock Next.js Image and Link components
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, ...props }: any) => <a href={href} {...props} />,
}));


describe("OrderSection Component", () => {
  const defaultProps = {
    image1: "/assets/Home/blindimg.webp",
    image2: "/assets/Home/zebraimg.webp",
    btnText: "Explore More",
    btnLink: "/category",
  };

  it("renders images and button correctly", () => {
    render(<OrderSection {...defaultProps} />);

    // ✅ Check both images render
    const mainImage = screen.getByAltText("order section main");
    const secondaryImage = screen.getByAltText("order section secondary");
    expect(mainImage).toBeInTheDocument();
    expect(secondaryImage).toBeInTheDocument();

    // ✅ Check button text
    const button = screen.getByRole("link", { name: /explore more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/category");
  });

it("applies sample section styling when samplesection is true", () => {
  render(<OrderSection {...defaultProps} samplesection={true} />);
  const button = screen.getByRole("link", { name: /explore more/i });
  expect(button).toHaveClass("bg-white");
  expect(button).toHaveClass("text-black");
});

it("applies normal styling when samplesection is false", () => {
  render(<OrderSection {...defaultProps} samplesection={false} />);
  const button = screen.getByRole("link", { name: /explore more/i });
  expect(button).toHaveClass("bg-black");
  expect(button).toHaveClass("text-white");
});


  it("applies reverse layout when reverse is true", () => {
    const { container } = render(<OrderSection {...defaultProps} reverse />);
    const wrapperDiv = container.querySelector("div.container");

    expect(wrapperDiv?.className).toContain("sm:flex-row-reverse");
  });

  it("applies normal layout when reverse is false", () => {
    const { container } = render(<OrderSection {...defaultProps} reverse={false} />);
    const wrapperDiv = container.querySelector("div.container");

    expect(wrapperDiv?.className).toContain("sm:flex-row");
  });
});
