"use client";

import React, { useState } from "react";
import { CustomTable, Modal } from "@components";
import { Orders, Product } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

interface MySampleProps {
  orderList: Orders[];
}

export const MySample = React.memo(({ orderList }: MySampleProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);

  const columns = [
    {
      title: "Order ID",
      key: "id",
      render: (order: Orders) => `#ORD-${(order.id || "").slice(0, 8)}`,
    },
    {
      title: "Ship To",
      key: "shipTo",
      render: (order: Orders) => ` ${order.address || ""}, ${order.city || ""}`,
    },
    {
      title: "Action",
      key: "action",
      render: (order: Orders) => (
        <button
          className="text-primary underline hover:text-primary/90 cursor-pointer "
          onClick={() => setSelectedOrder(order)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h2 className="text-2xl font-bold text-center md:text-left">My Samples</h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <CustomTable<Orders>
          data={orderList}
          columns={columns}
          rowKey="id"
          emptyMessage="No orders found"
        />
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {orderList.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          orderList.map((item) => (
            <div key={item.id} className="border-t-2 border-secondary pt-4 space-y-2">
              <p className="font-semibold">#ORD-{(item.id || "").slice(0, 8)}</p>
              <p>
                {item.firstName} {item.lastName} — {item.city}
              </p>
              <p>Total: {item.totalAmount} AED</p>
              <button
                className="text-primary underline hover:text-primary/90 cursor-pointer mt-2"
                onClick={() => setSelectedOrder(item)}
              >
                View Detail
              </button>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order #ORD-${(selectedOrder.id || "").slice(0, 8)}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-2">
                <p>
                  <strong>Order ID:</strong> #ORD-{(selectedOrder.id || "").slice(0, 8)}
                </p>
                <p>
                  <strong>Date:</strong> {selectedOrder.createdAt?.slice(0, 10) || "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-pri">
                    {selectedOrder.orderStatus}
                  </span>
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                    {selectedOrder.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  {selectedOrder.totalAmount > 0 ? `${selectedOrder.totalAmount}` : "FREE"}
                </p>
                <p>
                  <strong>Shipping:</strong>{" "}
                  {selectedOrder.shippingCost > 0 ? `${selectedOrder.shippingCost}` : "FREE"}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded-xl border">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>
                {selectedOrder.firstName} {selectedOrder.lastName}
              </p>
              <p>{selectedOrder.address}</p>
              <p>
                {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country}
              </p>
              <p>{selectedOrder.phone}</p>
            </div>

            {/* Ordered Products */}
            <div>
              <h3 className="font-semibold mb-3">Ordered Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedOrder.items.map((item: Product) => (
                  <Link
                    href={`/${item.categoryUrl}/${item.subcategoryUrl}/${item.slug}`}
                    key={item.id}
                    className="bg-white border rounded-xl p-3 shadow-sm flex flex-col"
                  >
                    <Image
                      unoptimized
                      src={item.posterImageUrl || "/images/no-image-placeholder.png"}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="font-semibold">{item.name}</p>
                    <p className=" text-sm capitalize">Color: {item.color || "-"}</p>
                    <p className="font-semibold mt-1">
                      {item.price ? `${item.price} AED` : "FREE"}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});
