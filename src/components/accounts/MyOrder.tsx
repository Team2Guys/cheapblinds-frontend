"use client";
import React, { useState } from "react";
import Table from "@components/ui/table";
import Modal from "@components/ui/modal";
import { Order } from "@/types/account";
import { MyOrderData } from "@data/account";

export const MyOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns = [
    { title: "Order ID", key: "id" },
    { title: "Date", key: "date" },
    { title: "Ship To", key: "shipTo" },
     {
      title: "Total",
      key: "total",
      render: (item: Order) => (
        <span>
          <span className="font-currency text-xl font-normal"></span>
          {item.total}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item: Order) => (
        <button
          className="text-primary underline hover:text-primary/90 cursor-pointer"
          onClick={() => setSelectedOrder(item)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h2 className="text-2xl font-bold text-center md:text-left">My Orders</h2>

      {/* 🖥️ Desktop View */}
      <div className="hidden md:block">
        <Table<Order>
          data={MyOrderData}
          columns={columns}
          rowKey="id"
          emptyMessage="No orders found"
        />
      </div>

      {/* 📱 Mobile View */}
      <div className="block md:hidden space-y-4">
        {MyOrderData.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          MyOrderData.map((item) => (
            <div key={item.id} className="border-t-2 border-secondary pt-4 space-y-2">
              <p className="font-semibold">{item.id}</p>
              <p> {item.date}</p>
              <p> {item.shipTo}</p>
              <p><span className="font-currency text-xl font-normal"></span>{item.total}</p>
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
        title={selectedOrder ? `Order Details: ${selectedOrder.id}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Ship To:</strong> {selectedOrder.shipTo}
            </p>
            <p>
              <strong>Total:</strong> <span className="font-currency text-xl font-normal"></span>{selectedOrder.total}
            </p>

            <div>
              <strong>Items:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {selectedOrder.items &&
                  selectedOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.qty} — {item.price}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
