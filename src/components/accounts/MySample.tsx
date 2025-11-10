"use client";
import React, { useState } from "react";
import { CustomTable, Modal } from "@components";
import { Order } from "@/types/account";
import { MySampleData } from "@data/account";

export const MySample = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns = [
    { title: "Order ID", key: "id" },
    { title: "Ship To", key: "shipTo" },
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
      <h2 className="text-2xl font-bold text-center md:text-left">My Samples</h2>
      <div className="hidden md:block">
        <CustomTable<Order>
          data={MySampleData}
          columns={columns}
          rowKey="id"
          emptyMessage="No orders found"
        />
      </div>
      <div className="block md:hidden space-y-4">
        {MySampleData.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          MySampleData.map((item) => (
            <div key={item.id} className="border-t-2 border-secondary pt-4 space-y-2">
              <p className="font-semibold">{item.id}</p>
              <p> {item.date}</p>
              <p> {item.shipTo}</p>
              <p>
                <span className="font-currency text-xl font-normal"></span>
                {item.total}
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
        title={selectedOrder ? `Order Details: ${selectedOrder.id}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-4">
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
