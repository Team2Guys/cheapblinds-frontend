import { FaFacebookF, FaPinterest } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { MenuItem, SocialLink } from "@/types/Header";

export const cartItems = [
  {
    name: "Velvet Chair",
    image: "/assets/images/bin/product.png",
    requiredBoxes: 3,
    price: "AED 450",
  },
  {
    name: "Dining Table",
    image: "/assets/images/bin/product.png",
    requiredBoxes: 1,
    price: "AED 1,299",
  },
];

export const socialLinks: SocialLink[] = [
  { id: 1, href: "https://www.facebook.com/cheapblindsuae/", Icon: FaFacebookF },
  { id: 2, href: "https://www.pinterest.com/cheapblindsuae/", Icon: FaPinterest },
  { id: 3, href: "https://www.instagram.com/cheapblindsuae/", Icon: IoLogoInstagram },
  // {id:4, href: 'https://www.tiktok.com/@cheapblindsuae', Icon: FaTiktok  },
];

export const menuItems: MenuItem[] = [
  {
    name: "Roller Blinds",
    link: "/roller-blinds",
    image: "/assets/images/navbar/roller-blinds.png",
    submenu: [
      {
        name: "Blackout Roller Blinds",
        link: "/roller-blinds/blackout",
        mobileImage: "/assets/images/navbar/mobile/blackout-roller.png",
        desktopImage: "/assets/images/navbar/desktop/blackout-roller.png",
      },
      {
        name: "Dimout Roller Blinds",
        link: "/roller-blinds/dimout",
        mobileImage: "/assets/images/navbar/mobile/dimout-roller.png",
        desktopImage: "/assets/images/navbar/desktop/dimout-roller.png",
      },
      {
        name: "See Through",
        link: "/roller-blinds/see-through",
        mobileImage: "/assets/images/navbar/mobile/see-roller.png",
        desktopImage: "/assets/images/navbar/desktop/see-roller.png",
      },
      {
        name: "Waterproof",
        link: "/roller-blinds/waterproof",
        mobileImage: "/assets/images/navbar/mobile/waterproof-roller.png",
        desktopImage: "/assets/images/navbar/desktop/waterproof-roller.png",
      },
    ],
  },
  {
    name: "Roman Blinds",
    link: "/roman-blinds",
    image: "/assets/images/navbar/roman-blinds.png",
    submenu: [
      {
        name: "Blackout Roman Blinds",
        link: "/roman-blinds/blackout",
        mobileImage: "/assets/images/navbar/mobile/blackout-roman.png",
        desktopImage: "/assets/images/navbar/desktop/blackout-roman.png",
      },
      {
        name: "Dimout Roman Blinds",
        link: "/roman-blinds/dimout",
        mobileImage: "/assets/images/navbar/mobile/dimout-roman.png",
        desktopImage: "/assets/images/navbar/desktop/dimout-roman.png",
      },
      {
        name: "See Through",
        link: "/roman-blinds/see-through",
        mobileImage: "/assets/images/navbar/mobile/see-roman.png",
        desktopImage: "/assets/images/navbar/desktop/see-roman.png",
      },
    ],
  },
  {
    name: "Zebra Blinds",
    link: "/zebra-blinds",
    image: "/assets/images/navbar/zebra-blinds.png",
    submenu: [
      {
        name: "Dimout Zebra Blinds",
        link: "/zebra-blinds/dimout",
        mobileImage: "/assets/images/navbar/mobile/dimout-zebra.png",
        desktopImage: "/assets/images/navbar/desktop/dimout-zebra.png",
      },
      {
        name: "Light Filtering",
        link: "/zebra-blinds/light-filtering",
        mobileImage: "/assets/images/navbar/mobile/light-zebra.png",
        desktopImage: "/assets/images/navbar/desktop/light-zebra.png",
      },
    ],
  },
  {
    name: "Vertical Blinds",
    link: "/vertical-blinds",
    image: "/assets/images/navbar/vertical-blinds.png",
    submenu: [
      {
        name: "Blackout Vertical Blinds",
        link: "/vertical-blinds/blackout",
        mobileImage: "/assets/images/navbar/mobile/blackout-vertical.png",
        desktopImage: "/assets/images/navbar/desktop/blackout-vertical.png",
      },
      {
        name: "Dimout Vertical Blinds",
        link: "/vertical-blinds/dimout",
        mobileImage: "/assets/images/navbar/mobile/dimout-vertical.png",
        desktopImage: "/assets/images/navbar/desktop/dimout-vertical.png",
      },
    ],
  },
  {
    name: "Motorisation",
    link: "/motorised-blinds",
    image: "/assets/images/navbar/mobile/motorisation.png",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "FAQs",
    link: "/faqs",
  },
];
