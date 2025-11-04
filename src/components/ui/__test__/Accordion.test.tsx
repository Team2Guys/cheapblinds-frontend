import { render, screen, fireEvent } from "@testing-library/react";
import { useRef, useState } from "react";
import { Accordion } from "../Accordion";

const AccordionTestWrapper = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const refObj = useRef<HTMLDivElement>(null);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Accordion
      title="Test Accordion"
      sectionKey="section1"
      openSections={openSections}
      toggleSection={toggleSection}
      refObj={refObj}
    >
      <div data-testid="content">Accordion Content</div>
    </Accordion>
  );
};

describe("Accordion Component", () => {
  it("renders the title", () => {
    render(<AccordionTestWrapper />);
    expect(screen.getByText("Test Accordion")).toBeInTheDocument();
  });

  it("hides content initially", () => {
    render(<AccordionTestWrapper />);
    const contentWrapper = screen.getByTestId("content").parentElement!;
    expect(contentWrapper).toHaveStyle("height: 0px");
  });

  it("opens content when header is clicked", () => {
    render(<AccordionTestWrapper />);
    const header = screen.getByText("Test Accordion");

    // Mock scrollHeight since jsdom does not calculate layout
    Object.defineProperty(HTMLDivElement.prototype, "scrollHeight", {
      configurable: true,
      value: 100,
    });

    fireEvent.click(header);

    const contentWrapper = screen.getByTestId("content").parentElement!;
    expect(contentWrapper.style.height).toBe("100px"); // <-- update here
  });

  it("rotates arrow when open", () => {
    render(<AccordionTestWrapper />);
    const header = screen.getByText("Test Accordion");
    const arrow = header.nextSibling as HTMLElement;
    expect(arrow).not.toHaveClass("rotate-180");

    fireEvent.click(header);
    expect(arrow).toHaveClass("rotate-180");
  });
});
