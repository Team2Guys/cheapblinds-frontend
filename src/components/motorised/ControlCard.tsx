import Image from "next/image";
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

interface CardItem {
  imageSrc: string;
  title: string;
  description?: string;
  listItems?: string[];
  note?: string;
}

interface ControlCardProps {
  heading?: string;
  CardData: CardItem[];
}

export const ControlCard = React.memo(({ heading, CardData }: ControlCardProps) => {
  return (
    <div className="bg-primary-light pt-16 pb-10 mt-10">
      <div className="container mx-auto px-2 space-y-10">
        {heading && <p className="text-heading">{heading}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CardData.map((option, index) => (
            <div key={index} className="bg-white p-2">
              <div className="relative aspect-square w-full mb-3">
                <Image
                  unoptimized
                  src={option.imageSrc}
                  alt={option.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <h3 className="text-xl font-medium font-rubik mb-2">{option.title}</h3>

              {option.description && <p>{option.description}</p>}
              {option.listItems && option.listItems.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {option.listItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start md:items-center gap-2 text-sm md:text-base"
                    >
                      <FaRegCircleCheck className="text-primary text-xl sm:text-2xl" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {option.note && (
                <p className="font-semibold mt-3">
                  <span>*</span>
                  {option.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
