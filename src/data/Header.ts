
import { FaFacebookF, FaPinterest } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io';
import { MenuItem, SocialLink } from 'types/Header';


  export const wishlistItems = [
    { name: 'Modern Lamp', image: '/assets/images/bin/product.png', price: 'AED 199' },
    { name: 'Luxury Sofa', image: '/assets/images/bin/product.png', price: 'AED 899' },
  ];

 export const cartItems = [
    { name: 'Velvet Chair', image: '/assets/images/bin/product.png',requiredBoxes: 3, price: 'AED 450' },
    { name: 'Dining Table', image: '/assets/images/bin/product.png',requiredBoxes: 1, price: 'AED 1,299' },
  ];

export const socialLinks: SocialLink[] = [
  {id:1, href: 'https://facebook.com', Icon: FaFacebookF },
  {id:2, href: 'https://pinterest.com', Icon: FaPinterest },
  {id:3, href: 'https://instagram.com', Icon: IoLogoInstagram },
];

export const menuItems: MenuItem[] = [
  {
    name: "Roller Blinds",
    submenu: [
      { name: "Blackout Roller Blinds", link: "/roller-blinds/blackout" , image:"/assets/images/bin/menu1.png"},
      { name: "Sunscreen Roller Blinds", link: "/roller-blinds/sunscreen", image:"/assets/images/bin/menu2.png" },
      { name: "Double Roller Blinds", link: "/roller-blinds/double", image:"/assets/images/bin/menu3.png" },
    ],
  },
  {
    name: "Roman Blinds",
     link: "/roman-blinds",
  },
  {
    name: "Zebra Blinds",
    submenu: [
      { name: "Sheer Zebra Blinds", link: "/zebra-blinds/sheer", image:"/assets/images/bin/menu3.png" },
      { name: "Translucent Zebra Blinds", link: "/zebra-blinds/translucent", image:"/assets/images/bin/menu1.png" },
    ],
  },
  {
    name: "Vertical Blinds",
    submenu: [
      { name: "PVC Vertical Blinds", link: "/vertical-blinds/pvc", image:"/assets/images/bin/menu2.png" },
      { name: "Fabric Vertical Blinds", link: "/vertical-blinds/fabric", image:"/assets/images/bin/menu1.png" },
    ],
  },
  {
    name: "Motorisation",
    link: "/motorisation",
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