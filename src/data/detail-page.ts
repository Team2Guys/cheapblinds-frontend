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
    "The headrail is the top section that houses the blind mechanism. Choose “Cassette” for a sleek look for remote operation. You can also select a classic finish for manual operation. Consider matching the colour to your interior style.",
  ),

  "Stacking Style": React.createElement(
    React.Fragment,
    null,
    "Stacking Style determines how the fabric folds when raised. 'Cascade' folds neatly in layers, while 'Flat' lies flush against the window. Choose a style that complements your room layout and window size.",
  ),

  Lining: React.createElement(
    React.Fragment,
    null,
    "Lining affects light control, privacy, and insulation. Blackout lining completely blocks light, while thermal lining provides extra warmth. Standard polycotton lining allows some light through but softens glare.",
  ),

  "Control Options": React.createElement(
    React.Fragment,
    null,
    "Control options define how you operate your blinds. Nickel and Brass offer premium finishes, while White and Black are standard. Consider the location and frequency of use when selecting the control type.",
  ),

  "Chain Side": React.createElement(
    React.Fragment,
    null,
    "Select which side you want the control chain on. 'Left' positions the chain on the left-hand side, 'Right' positions it on the right-hand side. Choose the side that best fits your window placement and room layout.",
  ),
};
