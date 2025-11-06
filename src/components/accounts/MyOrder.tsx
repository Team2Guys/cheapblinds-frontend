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
    { title: "Total", key: "total" },
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

      <Table<Order>
        data={MyOrderData}
        columns={columns}
        rowKey="id"
        emptyMessage="No orders found"
      />
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
              <strong>Total:</strong> {selectedOrder.total}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
