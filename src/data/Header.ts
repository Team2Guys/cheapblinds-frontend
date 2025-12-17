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
    image: "/assets/images/bin/mobile/roller.png",
    submenu: [
      {
        name: "Blackout Roller Blinds",
        link: "/roller-blinds/blackout",
        desktopimage: "/assets/images/bin/menu1.png",
        mobileimage: "/assets/images/bin/mobile/blackout.png",
      },
      {
        name: "Dimout Roller Blinds",
        link: "/roller-blinds/dimout",
        desktopimage: "/assets/images/bin/menu2.png",
        mobileimage: "",
      },
      {
        name: "See Through",
        link: "/roller-blinds/see-through",
        desktopimage: "/assets/images/bin/menu3.png",
        mobileimage: "",
      },
      {
        name: "Waterproof",
        link: "/roller-blinds/waterproof",
        desktopimage: "/assets/images/bin/menu3.png",
        mobileimage: "",
      },
    ],
  },
  {
    name: "Roman Blinds",
    link: "/roman-blinds",
    image: "/assets/images/bin/mobile/roman.png",
    submenu: [
      {
        name: "Blackout Roman Blinds",
        link: "/roman-blinds/blackout",
        desktopimage: "/assets/images/bin/menu1.png",
        mobileimage: "/assets/images/bin/mobile/blackout.png",
      },
      {
        name: "Dimout Roman Blinds",
        link: "/roman-blinds/dimout",
        desktopimage: "/assets/images/bin/menu2.png",
        mobileimage: "",
      },
      {
        name: "See Through",
        link: "/roman-blinds/see-through",
        desktopimage: "/assets/images/bin/menu3.png",
        mobileimage: "",
      },
    ],
  },
  {
    name: "Zebra Blinds",
    link: "/zebra-blinds",
    image: "/assets/images/bin/mobile/zebra.png",
    submenu: [
      {
        name: "Dimout Zebra Blinds",
        link: "/zebra-blinds/dimout",
        desktopimage: "/assets/images/bin/menu2.png",
        mobileimage: "",
      },
      {
        name: "Light Filtering",
        link: "/zebra-blinds/light-filtering",
        desktopimage: "/assets/images/bin/menu1.png",
        mobileimage: "",
      },
    ],
  },
  {
    name: "Vertical Blinds",
    link: "/vertical-blinds",
    image: "/assets/images/bin/mobile/vertical.png",
    submenu: [
      {
        name: "Blackout Vertical Blinds",
        link: "/vertical-blinds/blackout",
        desktopimage: "/assets/images/bin/menu2.png",
        mobileimage: "",
      },
      {
        name: "Dimout Vertical Blinds",
        link: "/vertical-blinds/dimout",
        desktopimage: "/assets/images/bin/menu1.png",
        mobileimage: "",
      },
    ],
  },
  {
    name: "Motorisation",
    link: "/motorised-blinds",
    image: "/assets/images/bin/mobile/motorisation.png",
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
