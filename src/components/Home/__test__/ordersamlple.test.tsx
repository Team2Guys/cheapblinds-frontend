import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OrderSectionProps } from "types/common";
import OrderSection from "../ordersample";

// ✅ Type-safe mock for Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
        alt={(alt as string) || "mocked image"}
      />
    );
  },
}));

// ✅ Type-safe mock for Next.js Link
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

describe("OrderSection Component", () => {
  const defaultProps: OrderSectionProps = {
    reverse: false,
    image1: "/test1.jpg",
    image2: "/test2.jpg",
    btnText: "Order Now",
    btnLink: "/shop",
    samplesection: false,
  };

  it("renders both images correctly", () => {
    render(<OrderSection {...defaultProps} />);
    const mainImage = screen.getByAltText("order section main");
    const secondaryImage = screen.getByAltText("order section secondary");

    expect(mainImage).toBeInTheDocument();
    expect(secondaryImage).toBeInTheDocument();
  });

  it("renders the correct button text and link", () => {
    render(<OrderSection {...defaultProps} />);
    const button = screen.getByRole("link", { name: /order now/i });
    expect(button).toHaveAttribute("href", "/shop");
  });

  it("applies reversed layout when reverse is true", () => {
    render(<OrderSection {...defaultProps} reverse />);
    const container = screen
      .getByRole("link", { name: /order now/i })
      .closest("div");
    expect(container?.className).toContain("sm:flex-row-reverse");
  });

  it("uses white button style when samplesection is true", () => {
    render(<OrderSection {...defaultProps} samplesection />);
    const button = screen.getByRole("link", { name: /order now/i });
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-black");
  });

  it("uses black button style when samplesection is false", () => {
    render(<OrderSection {...defaultProps} samplesection={false} />);
    const button = screen.getByRole("link", { name: /order now/i });
    expect(button).toHaveClass("bg-black");
    expect(button).toHaveClass("text-white");
  });
});
