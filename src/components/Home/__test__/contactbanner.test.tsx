import { render, screen } from "@testing-library/react";
import React from "react";
import ContactBanner from "../contactbanner";
import { vi } from "vitest";

// Mock next/image and next/link to prevent Next.js warnings
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));
vi.mock("components/contactform", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));
vi.mock("components/svg/phone", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} data-testid="phone-icon" />,
}));

describe("ContactBanner Component", () => {
  it("renders the main heading text correctly", () => {
    render(<ContactBanner />);

      const heading = screen.getByText((content) =>
      content.replace(/[‘’']/g, "'").includes("Let's Set It Up")
    );

    expect(heading).toBeInTheDocument();
  });

  it("renders the call now link with correct phone number", () => {
    render(<ContactBanner />);
    const link = screen.getByRole("link", { name: /call now!/i });
    expect(link).toHaveAttribute("href", "tel:+971 50 597 4531");
  });

  it("renders the ContactForm component", () => {
    render(<ContactBanner />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("renders the mobile image with correct alt text", () => {
    render(<ContactBanner />);
    const image = screen.getByAltText("callperson");
    expect(image).toHaveAttribute("src", "/assets/images/phnmbl.webp");
  });
});
