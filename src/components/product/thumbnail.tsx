"use client";
import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SideBySideMagnifier = dynamic(() => import("./SideBySideMagnifier"), {
  ssr: false,
});

interface ImageType {
  imageUrl: string;
  altText?: string;
}

const Thumbnail = ({ images = [] }: { images?: ImageType[] }) => {
  const mainSlider = useRef<Slider | null>(null);
  const thumbSlider = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState<Slider | undefined>();
  const [nav2, setNav2] = useState<Slider | undefined>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mainSlider.current) setNav1(mainSlider.current);
    if (thumbSlider.current) setNav2(thumbSlider.current);
    setActiveIndex(0);
  }, [images]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    mainSlider.current?.slickGoTo(index);
  };

  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    draggable: true,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
    asNavFor: nav2,
  };

  const thumbSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    swipeToSlide: true,
    asNavFor: nav1,
  };
  if (!images.length) return null;

  return (
    <div className="w-full overflow-hidden">
      <Slider {...mainSettings} ref={mainSlider}>
        {images.map((img, index) => (
          <div key={index} className="focus:outline-none">
            <SideBySideMagnifier
              imageSrc={img.imageUrl}
              largeImageSrc={img.imageUrl}
              zoomScale={1.5}
              inPlace
              alignTop
            />
          </div>
        ))}
      </Slider>
      <Slider {...thumbSettings} ref={thumbSlider} className="px-0">
        {images.map((img, index) => (
          <div key={index} className="px-1">
            <div
              onClick={() => handleThumbnailClick(index)}
              className={`relative cursor-pointer border aspect-square w-full flex items-center justify-center overflow-hidden ${
                index === activeIndex ? "border-black" : "border-transparent"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={img.altText || `Thumbnail ${index + 1}`}
                fill
                priority
                className="object-cover w-full h-full"
                sizes="200px"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Thumbnail;
