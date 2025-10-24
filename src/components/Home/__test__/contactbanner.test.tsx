import { render, screen } from "@testing-library/react";
import ContactBanner from "./contactbanner";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest"; 

// ✅ Mock Next.js modules
vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

// ✅ Mock custom components
vi.mock("components/contactform", () => ({
  default: () => <div data-testid="mocked-contact-form">Mocked Contact Form</div>,
}));

vi.mock("components/svg/phone", () => ({
  default: (props: any) => <svg data-testid="mocked-phone-icon" {...props} />,
}));

describe("ContactBanner Component", () => {
  beforeAll(() => {
    // ✅ Prevent scroll errors
    window.scrollTo = vi.fn();
  });

  it("renders the main heading text correctly", () => {
    render(<ContactBanner />);
    expect(screen.getByText(/Ready/i)).toBeInTheDocument();
    expect(screen.getByText(/Let's Set It Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Instantly!/i)).toBeInTheDocument();
  });

  it("renders the phone contact link correctly", () => {
    render(<ContactBanner />);
    const phoneLink = screen.getByRole("link", { name: /call now!/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+971 50 597 4531");
    expect(screen.getByText("+971 50 597 4531")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-phone-icon")).toBeInTheDocument();
  });

  it("renders the ContactForm component", () => {
    render(<ContactBanner />);
    expect(screen.getByTestId("mocked-contact-form")).toBeInTheDocument();
  });

  it("renders the mobile image correctly", () => {
    render(<ContactBanner />);
    const mobileImage = screen.getByAltText("callperson");
    expect(mobileImage).toBeInTheDocument();
    expect(mobileImage).toHaveAttribute("src", "/assets/images/phnmbl.webp");
  });
});
