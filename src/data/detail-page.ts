import React from "react";

export const Receptions = [
  {
    id: "outside",
    label: "Outside Recess",
    img: "/assets/images/detail-page/outside.png",
  },
  {
    id: "inside",
    label: "Inside Recess",
    img: "/assets/images/detail-page/inside.png",
  },
];

export const TestimonialReview = [
  {
    rating: 5,
    date: "2 days ago",
    title: "Best on the market",
    text: "I love this product because the support is great. Please …",
    author: "Worldtraveler",
  },
  {
    rating: 4,
    date: "3 days ago",
    title: "Excellent quality",
    text: "Amazing blinds and super easy to install. Highly recommend!",
    author: "HomeDesigner",
  },
  {
    rating: 5,
    date: "5 days ago",
    title: "Great value",
    text: "The price was fair and the delivery was quick.",
    author: "InteriorLover",
  },
  {
    rating: 5,
    date: "1 week ago",
    title: "Perfect fit",
    text: "Exactly what I was looking for. Looks great in my living room.",
    author: "SatisfiedBuyer",
  },
  {
    rating: 5,
    date: "1 week ago",
    title: "Fast delivery",
    text: "Order arrived sooner than expected and in perfect condition.",
    author: "HappyCustomer",
  },
];

export const headrailOptions = [
  {
    id: "Classic",
    label: "Classic",
    price: "119.78",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  {
    id: "Cassette",
    label: "Cassette",
    price: "159.70",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  { id: "Cassette Motorised", label: "Cassette Motorised", price: "781.28" },
];
export const StackingStyle = [
  {
    id: "Cascade",
    label: "Cascade",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  {
    id: "Stacked",
    label: "Stacked",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
];
export const controlOptions = [
  { id: "Nickel", label: "Nickel", imageUrl: "/assets/images/detail-page/form-image.png" },
  { id: "Brass", label: "Brass", imageUrl: "/assets/images/detail-page/form-image.png" },
  { id: "Black", label: "Black", imageUrl: "/assets/images/detail-page/form-image.png" },
  { id: "White", label: "White", imageUrl: "/assets/images/detail-page/form-image.png" },
];

export const Lining = [
  {
    id: "Polycotton",
    label: "Polycotton",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  {
    id: "Satin",
    label: "Satin",
    price: "49.99",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  {
    id: "Blackout",
    label: "Blackout",
    price: "49.99",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
  {
    id: "Bonded",
    label: "Bonded",
    price: "49.99",
    imageUrl: "/assets/images/detail-page/form-image.png",
  },
];

// categoryOptionConfig.ts
export const CATEGORY_OPTION_CONFIG = {
  "roller-blinds": {
    Finish: ["CLASSIC", "EVO"], // ✅ FIXED
    Chain: ["ROLC-0020BK", "ROLC-0020WH", "ROLC-0031"],
    "Control Side": ["LHC", "RHC"],
  },

  "roman-blinds": {
    Finish: ["CLASSIC", "EVO"],
    System: ["DLXSYS", "ECLSYS", "EVOSYS"],
    Type: ["CASCADE", "STACKED"],
    Chain: ["ROLC-0020BK", "ROLC-0020WH", "ROLC-0031"],
    "Control Side": ["LHC", "RHC"],
    "Lining Type": [
      "LINI-0000",
      "LINI-0001",
      "LINI-0002",
      "LINI-0003",
      "LINI-0004",
      "LINI-0007",
      "LINI-0008",
      "SPE125",
    ],
  },
  "zebra-blinds": {
    Chain: ["ROLC-0020BK", "ROLC-0020WH", "ROLC-0031"],
    "Control Side": ["LHC", "RHC"],
  },
  "vertical-blinds": {
    "Control Side": ["LHC", "RHC"],
  },
};

export const MODAL_CONTENTS: Record<string, React.ReactNode> = {
  "Headrail Type / Colour": React.createElement(
    React.Fragment,
    null,
    "Choose the headrail style and colour that best suits your blind. Options influence appearance and operation, offering modern or classic designs to complement interiors and suit different mounting needs.",
  ),

  "Stacking Style": React.createElement(
    React.Fragment,
    null,
    "Select how the fabric folds when raised. Cascade creates soft, elegant folds for a classic look, while stacked delivers a compact, tidy finish, ideal for smaller windows or minimalist interiors.",
  ),

  Lining: React.createElement(
    React.Fragment,
    null,
    "Select a lining to manage light, privacy, and insulation. From light-filtering to blackout options, linings help control brightness, improve energy efficiency, and enhance overall room comfort.",
  ),

  "Control Options": React.createElement(
    React.Fragment,
    null,
    "Decide which side the control chain will be placed. Choosing left or right depends on window access, furniture layout, and convenience to ensure smooth, comfortable everyday operation.",
  ),

  "Chain Side": React.createElement(
    React.Fragment,
    null,
    "Choose the chain type and colour used to operate your blind. Plastic chains are lightweight and practical, while metal chains offer a premium look and enhanced durability for frequent daily use.",
  ),
};
