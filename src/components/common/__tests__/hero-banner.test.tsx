import { render, screen } from "@testing-library/react";
import Herobanner from "../hero-banner";
import React from "react";
import { vi } from "vitest";

// ✅ Strongly type mock props
interface MockImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
}

// ✅ Use vi.mock instead of jest.mock (Vitest)
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: MockImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} {...props} />
  ),
}));

describe("Herobanner Component", () => {
  const desktopImage = "/assets/images/home/banner.webp";
  const mobileImage = "/assets/images/home/banner-mobile.webp";

  it("renders both desktop and mobile images", () => {
    render(
      <Herobanner
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        isHome
        alt="hero-banner"
      />
    );

    const images = screen.getAllByAltText("hero-banner");
    expect(images).toHaveLength(2);
    expect(images[0].getAttribute("src")).toContain(desktopImage);
    expect(images[1].getAttribute("src")).toContain(mobileImage);
  });

  it("applies responsive height classes when isHome is true", () => {
    const { container } = render(
      <Herobanner
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        isHome
      />
    );

    expect(container.firstChild).toHaveClass(
      "h-[260px]",
      "sm:h-[300px]",
      "md:h-[400px]",
      "xl:h-[512px]",
      "2xl:h-[600px]"
    );
  });

  it("applies fixed height when isHome is false", () => {
    const { container } = render(
      <Herobanner desktopImage={desktopImage} isHome={false} />
    );

    expect(container.firstChild).toHaveClass("h-[300px]");
  });

  it("renders only desktop image when mobile image is not provided", () => {
    render(<Herobanner desktopImage={desktopImage} alt="hero-banner" />);
    const images = screen.getAllByAltText("hero-banner");
    expect(images.length).toBe(1);
  });
});
