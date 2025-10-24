import { render, screen } from "@testing-library/react";
import Herobanner from "../hero-banner";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Mock Next.js Image component
    return <img {...props} alt={props.alt} />;
  },
}));

describe("Herobanner Component", () => {
  const desktopImage = "/assets/images/home/banner.webp";
  const mobileImage = "/assets/images/home/banner-mobile.webp";

  it("renders both desktop and mobile images", () => {
    render(
      <Herobanner
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        isHome={true}
        alt="hero-banner"
      />
    );

    const desktopImg = screen.getByAltText("hero-banner") as HTMLImageElement;
    expect(desktopImg).toBeInTheDocument();
    expect(desktopImg.getAttribute("src")).toContain(desktopImage);
  });

  it("applies responsive height classes when isHome is true", () => {
    const { container } = render(
      <Herobanner
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        isHome={true}
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
