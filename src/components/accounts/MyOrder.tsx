"use client";

import React, { useState } from "react";
import { CustomTable, Modal } from "@components";
import { CartItems, Orders } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

interface MyOderProps {
  orderList: Orders[];
}

export const MyOrder = React.memo(({ orderList }: MyOderProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);

  const columns = [
    {
      title: "Order ID",
      key: "id",
      render: (order: Orders) => `#ORD-${(order.id || "").slice(0, 8)}`,
    },
    {
      title: "Date",
      key: "createdAt",
      render: (order: Orders) => order.createdAt?.slice(0, 10) || "-",
    },
    {
      title: "Total",
      key: "totalAmount",
      render: (order: Orders) => (
        <span className="font-semibold">
          <span className="font-currency text-xl font-normal"> </span>
          {order.totalAmount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "orderStatus",
      render: (order: Orders) => (
        <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800 uppercase">
          {order.orderStatus}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (order: Orders) => (
        <div className="flex gap-2">
          <button
            className="text-primary underline hover:text-primary/90 cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            View Details
          </button>
          <button className="text-primary underline hover:text-primary/90 cursor-pointer">
            Track Orders
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h2 className="text-2xl font-bold text-center md:text-left">My Orders</h2>

      <div className="hidden md:block">
        <CustomTable<Orders>
          data={orderList}
          columns={columns}
          rowKey="id"
          emptyMessage="No orders found"
        />
      </div>

      <div className="block md:hidden space-y-4">
        {orderList.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          orderList.map((item) => (
            <div key={item.id} className="border-t-2 border-secondary pt-4 space-y-2">
              <p className="font-semibold text-primary">#ORD-{(item.id || "").slice(0, 8)}</p>
              <p className="text-sm text-gray-600">{item.createdAt?.slice(0, 10)}</p>
              <p>
                <strong>Ship To:</strong> {item.shippingAddress?.firstName}{" "}
                {item.shippingAddress?.lastName}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                <span className="font-currency text-xl font-normal"> </span>{" "}
                {item.totalAmount.toFixed(2)}
              </p>
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
                  <strong>Date:</strong> {selectedOrder.createdAt?.slice(0, 10)}
                </p>
                <p>
                  <strong>Total:</strong>
                  <span className="font-currency text-xl font-normal"> </span>
                  {selectedOrder.totalAmount > 0
                    ? `${selectedOrder.totalAmount.toFixed(2)}`
                    : "FREE"}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800 uppercase">
                    {selectedOrder.orderStatus}
                  </span>
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 uppercase">
                    {selectedOrder.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Shipping:</strong>{" "}
                  {selectedOrder.shippingCost > 0 ? `AED ${selectedOrder.shippingCost}` : "FREE"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border">
                <h3 className="font-bold border-b pb-2 mb-2 text-primary">Billing Address</h3>
                <p className="font-medium">
                  {selectedOrder.billingAddress?.firstName} {selectedOrder.billingAddress?.lastName}
                </p>
                <p>{selectedOrder.billingAddress?.address}</p>
                <p>
                  {selectedOrder.billingAddress?.city}, {selectedOrder.billingAddress?.state}
                </p>
                <p>{selectedOrder.billingAddress?.country}</p>
                <p className="text-sm mt-1">{selectedOrder.billingAddress?.phone}</p>
                <p className="text-sm">{selectedOrder.billingAddress?.email}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl border">
                <h3 className="font-bold border-b pb-2 mb-2 text-primary">Shipping Address</h3>
                <p className="font-medium">
                  {selectedOrder.shippingAddress?.firstName}{" "}
                  {selectedOrder.shippingAddress?.lastName}
                </p>
                <p>{selectedOrder.shippingAddress?.address}</p>
                <p>
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}
                </p>
                <p>{selectedOrder.shippingAddress?.country}</p>
                <p className="text-sm mt-1">{selectedOrder.shippingAddress?.phone}</p>
                <p className="text-sm">{selectedOrder.shippingAddress?.email}</p>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="bg-blue-50 p-4 rounded-xl border text-sm italic">
                <strong>Notes:</strong> {selectedOrder.notes}
              </div>
            )}

            <div>
              <h3 className="font-bold mb-3 text-lg">Items Ordered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedOrder.orderItems.map((item: CartItems, index: number) => (
                  <Link
                    href={item.newPath || ""}
                    key={index}
                    className="bg-white border rounded-xl p-3 shadow-sm flex flex-col"
                  >
                    <div className="relative w-full h-40 mb-2">
                      <Image
                        unoptimized
                        src={item.posterImageUrl || "/images/no-image-placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {item.width}
                      {item.unit} Width x {item.drop}
                      {item.unit} Drop
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{item.recessType} Recess</p>

                    <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                    <p className="font-bold text-primary mt-1">
                      <span className="font-currency text-xl font-normal"> </span>
                      {item.subPrice?.toFixed(2)}
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
