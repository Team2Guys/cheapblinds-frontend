"use client";
import React from "react";
import Image from "next/image";

const helpOptions = [
  {
    id: 1,
    title: "Help making an order",
    desc: "If you would like help placing an order, click below.",
    button: "Sales Help",
    icon: "/assets/images/contact/order.png",
  },
  {
    id: 2,
    title: "Help with an existing order",
    desc: "If you would like help with an existing order, click below.",
    button: "Order Help",
    icon: "/assets/images/contact/help.png",
  },
  {
    id: 3,
    title: "Sale Care",
    desc: "If you would like help with sale delivery, click below.",
    button: "Sale Help",
    icon: "/assets/images/contact/box.png",
  },
];

export const ContactHelp = React.memo(() => {
  return (
    <div className="container mx-auto px-2 my-10 space-y-6">
      <h2 className="text-center text-heading">How can we help you?</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center max-w-2xl mx-auto">
        {helpOptions.map((item) => (
          <div
            key={item.id}
            className="bg-primary-light p-2 md:p-4 flex flex-col justify-between items-center text-center space-y-3"
          >
            <div className="space-y-2">
              <div className="relative w-20 h-20 mx-auto">
                <Image
                  unoptimized
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
            <button className="bg-primary px-4 py-2 rounded-md font-medium hover:bg-primary/80">
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
