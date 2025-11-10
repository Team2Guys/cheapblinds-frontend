import { Order } from "@/types/account";

export const MyOrderData: Order[] = [
  {
    id: "#ORD-1001",
    date: "2025-10-15",
    shipTo: "John Doe, Dubai",
    total: "230.00",
    items: [
      { name: "Modern Lamp", qty: 1, price: "120.00" },
      { name: "Wall Art", qty: 2, price: "110.00" },
    ],
  },
  {
    id: "#ORD-1002",
    date: "2025-10-28",
    shipTo: "Sarah Ali, Sharjah",
    total: "180.50",
    items: [{ name: "Wooden Chair", qty: 1, price: "180.50" }],
  },
  {
    id: "ORD-1003",
    date: "2025-11-02",
    shipTo: "Muhammad Khan, Abu Dhabi",
    total: "299.99",
    items: [
      { name: "Sofa Cushion Set", qty: 1, price: "200.00" },
      { name: "Curtain", qty: 2, price: "99.99" },
    ],
  },
];

export const MySampleData: Order[] = [
  {
    id: "#ORD-1001",
    shipTo: "John Doe, Dubai",
    items: [
      { name: "Modern Lamp", qty: 1, price: "120.00" },
      { name: "Wall Art", qty: 2, price: "110.00" },
    ],
  },
  {
    id: "#ORD-1002",
    shipTo: "Sarah Ali, Sharjah",
    items: [{ name: "Wooden Chair", qty: 1, price: "180.50" }],
  },
  {
    id: "#ORD-1003",
    shipTo: "Muhammad Khan, Abu Dhabi",
    items: [
      { name: "Sofa Cushion Set", qty: 1, price: "200.00" },
      { name: "Curtain", qty: 2, price: "99.99" },
    ],
  },
];
