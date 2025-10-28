import Image from "next/image";
import { useState, useRef, useEffect, FC } from "react";
import { PiPlusBold } from "react-icons/pi";
import { SlMagnifierAdd } from "react-icons/sl";
import { SideBySideMagnifierProps } from "types/prod";

const SideBySideMagnifier = ({
  imageSrc,
  largeImageSrc,
  altText,
  zoomScale = 2,
  inPlace = false,
  alignTop = false,
}: SideBySideMagnifierProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState<string>("0% 0%");
  const [displayInPlace, setDisplayInPlace] = useState(inPlace);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.getBoundingClientRect().width;
      const windowWidth = window.innerWidth;

      if (windowWidth - containerWidth < 300) {
        setDisplayInPlace(true);
      } else {
        setDisplayInPlace(inPlace);
      }
    }
  }, [inPlace]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPosition({ x, y });

    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;
    setBackgroundPosition(`${backgroundX}% ${backgroundY}%`);
  };

  return (
    <div className="relative h-full" ref={containerRef}>
      <div
        className="relative w-full h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          cursor: "none",
        }}
      >
        <div className="bg-[#F7F7F7] h-auto">
          <Image
            src={imageSrc}
            fill
            alt={altText || "product image"}
            className="!relative object-fill"
            priority
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
        </div>

        {isHovered && (
          <div
            className="absolute z-20 pointer-events-none size-20 bg-white/80 flex items-center justify-center transition-opacity"
            style={{
              top: `${magnifierPosition.y}px`,
              left: `${magnifierPosition.x}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PiPlusBold className="text-2xl" />
          </div>
        )}
      </div>

      {isHovered && (
        <div
          className={`absolute pointer-events-none bg-white ${
            displayInPlace ? "in-place" : "side-by-side"
          }`}
          style={{
            width: displayInPlace ? "100%" : "",
            height: displayInPlace ? "100%" : "",
            top: displayInPlace ? "0" : `${alignTop ? 0 : magnifierPosition.y}px`,
            left: displayInPlace ? "0" : "320px",
            backgroundImage: `url(${largeImageSrc})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: `${zoomScale * 100}%`,
            zIndex: 10,
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
    </div>
  );
};

export default SideBySideMagnifier;
