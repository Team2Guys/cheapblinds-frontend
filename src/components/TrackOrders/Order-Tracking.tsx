"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

const OrderTracking = () => {
  const orderData = {
    orderID: "DXB-882910",
    createdAt: "2026-01-24T14:45:00",
    status: "delivering",
    shippingAddress: {
      name: "Zaid Al-Fayed",
      phone: "+971 50 000 0000",
      line1: "Villa 12, Street 5",
      area: "Jumeirah 1",
      city: "Dubai",
      country: "UAE",
    },
    billingAddress: {
      name: "Zaid Al-Fayed",
      phone: "+971 50 000 0000",
      line1: "Office 404, Business Bay",
      area: "Downtown",
      city: "Dubai",
      country: "UAE",
    },
    orderItems: [
      {
        id: "p1",
        name: "Apple iPhone 15 Pro",
        variant: "Natural Titanium / 256GB",
        price: 4299,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=150&auto=format&fit=crop",
      },
      {
        id: "p2",
        name: "MagSafe Silicone Case",
        variant: "Storm Blue",
        price: 199,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1603313011101-316506a7fed9?q=80&w=150&auto=format&fit=crop",
      },
    ],
  };

  const getDeliveryDate = (dateString: string) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const daysToAdd = hour < 15 ? 1 : 2;

    const deliveryDate = new Date(date);
    deliveryDate.setDate(date.getDate() + daysToAdd);

    return deliveryDate.toLocaleDateString("en-AE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const subtotal = orderData.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal;

  return (
    <div className="container mx-auto py-8 px-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">TRACK ORDER</h1>
          <p className="text-gray-500 font-medium">
            Order ID: <span className="text-primary">#{orderData.orderID}</span>
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Placed on {new Date(orderData.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* 3-Step Tracking Component */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-secondary mb-8">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto">
          {/* Step 1: Ready */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors ${["ready", "delivering", "complete"].includes(orderData.status) ? "bg-primary text-white shadow-lg shadow-blue-200" : "bg-secondary text-gray-400"}`}
            >
              <FaBoxOpen />
            </div>
            <p className="mt-3 font-bold text-sm ">Ready</p>
          </div>

          <div
            className={`flex-1 h-1 mx-2 rounded-full ${["delivering", "complete"].includes(orderData.status) ? "bg-primary" : "bg-secondary"}`}
          />

          {/* Step 2: Delivery */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors ${["delivering", "complete"].includes(orderData.status) ? "bg-primary text-white shadow-lg shadow-blue-200" : "bg-secondary text-gray-400"}`}
            >
              <FaTruck />
            </div>
            <p
              className={`mt-3 font-bold text-sm ${orderData.status === "delivering" ? "text-primary" : "text-black"}`}
            >
              Delivery
            </p>
          </div>

          <div
            className={`flex-1 h-1 mx-2 rounded-full ${orderData.status === "complete" ? "bg-primary" : "bg-secondary"}`}
          />

          {/* Step 3: Complete */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors ${orderData.status === "complete" ? "bg-primary text-white shadow-lg shadow-blue-200" : "bg-secondary text-gray-400"}`}
            >
              <FaCheckCircle />
            </div>
            <p className="mt-3 font-bold text-sm ">Complete</p>
          </div>
        </div>

        <div className="mt-12 bg-secondary border border-secondary rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl text-primary shadow-sm">
              <FaTruck />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Estimated Delivery</p>
              <p className="font-black text-lg">{getDeliveryDate(orderData.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-secondary shadow-sm">
          <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest mb-4">
            <FaMapMarkerAlt className="text-primary" /> Shipping Address
          </h3>
          <div className="space-y-2">
            <p className="font-bold flex items-center gap-2">
              <FaUser size={20} className="text-primary" /> {orderData.shippingAddress.name}
            </p>
            <p className="leading-relaxed ml-5">
              {orderData.shippingAddress.line1}, {orderData.shippingAddress.area}
              <br />
              {orderData.shippingAddress.city}, {orderData.shippingAddress.country}
            </p>
            <p className="text-primary font-bold flex items-center gap-2 pt-2">
              <FaPhoneAlt size={20} /> {orderData.shippingAddress.phone}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-secondary shadow-sm">
          <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest mb-4">
            <FaMapMarkerAlt className="text-primary" /> Billing Address
          </h3>
          <div className="space-y-2">
            <p className="font-bold flex items-center gap-2">
              <FaUser size={20} className="text-primary" /> {orderData.billingAddress.name}
            </p>
            <p className="leading-relaxed ml-5">
              {orderData.billingAddress.line1}, {orderData.billingAddress.area}
              <br />
              {orderData.billingAddress.city}, {orderData.billingAddress.country}
            </p>
            <p className="font-bold text-primary flex items-center gap-2 pt-2">
              <FaPhoneAlt size={20} /> {orderData.billingAddress.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-secondary shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black tracking-tight">ORDER SUMMARY</h3>
          <span className="bg-secondary text-xs font-bold px-3 py-1 rounded-full">
            {orderData.orderItems.length} ITEMS
          </span>
        </div>

        <div className="divide-y divide-gray-50">
          {orderData.orderItems.map((item) => (
            <div key={item.id} className="p-2 sm:p-6 flex items-center gap-4 w-full">
              <Image
                unoptimized
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-28 h-20 object-cover rounded-2xl border border-secondary"
              />
              <div className="w-full sm:flex-1">
                <h4 className="font-bold leading-tight">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.variant}</p>
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm font-bold">Qty: {item.qty}</p>
                  <p className="font-black block sm:hidden">
                    {(item.price * item.qty).toLocaleString()} AED
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="font-black">{(item.price * item.qty).toLocaleString()} AED</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary p-6">
          <div className="max-w-xs ml-auto space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold">{subtotal.toLocaleString()} AED</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Delivery</span>
              <span className="font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-lg pt-3 border-t border-gray-200">
              <span className="font-black">Total</span>
              <span className="font-black text-primary">{total.toLocaleString()} AED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/contact-us"
          className="hover:text-primary text-sm font-bold transition flex items-center justify-center gap-2 mx-auto w-fit"
        >
          Need Help? Contact with us <FaArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
};

export default OrderTracking;
