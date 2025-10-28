"use client";
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import Modal from "components/ui/modal";
import Table from "components/ui/table";
import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { IAppointment } from "types/types";

const Measurement = ({ appointments, title }: { appointments: IAppointment[]; title: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredOrders = appointments.filter((order) => {
    const name = order.name?.toLowerCase() || "";
    const email = order.email?.toLowerCase() || "";
    const phoneNumber = order.phoneNumber?.toLowerCase() || "";
    const whatsApp = order.whatsApp?.toLowerCase() || "";
    const location = order.location?.toLowerCase() || "";
    const message = order.message?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      email.includes(search) ||
      phoneNumber.includes(search) ||
      whatsApp.includes(search) ||
      location.includes(search) ||
      message.includes(search)
    );
  });

  const showModal = (record: IAppointment) => {
    setSelectedAppointment(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "whatsApp Number",
      dataIndex: "whatsApp",
      key: "whatsApp",
      width: 150,
    },

    {
      title: "View",
      dataIndex: "view",
      key: "view",
      width: 100,
      render: (record: IAppointment) => (
        <button onClick={() => showModal(record)}>
          <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200" />
        </button>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName={title} />
      <div className="mb-4">
        <input
          className="primary-input w-fit"
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {appointments && appointments.length > 0 ? (
        <>
          <Table<IAppointment> data={filteredOrders} columns={columns} rowKey="id" />
          <Modal isOpen={isModalOpen} onClose={handleCancel}>
            {selectedAppointment && (
              <div className="space-y-3">
                <p>
                  <strong>Email:</strong> {selectedAppointment.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedAppointment.phoneNumber}
                </p>
                <p>
                  <strong>WhatsApp Number:</strong> {selectedAppointment.whatsApp || "-"}
                </p>
                <p>
                  <strong>name:</strong> {selectedAppointment.name || "-"}
                </p>
                <p>
                  <strong>location:</strong> {selectedAppointment.location || "-"}
                </p>
                <p>
                  <strong>message:</strong> {selectedAppointment.message || "-"}
                </p>
                <p>
                  <strong>Selected Option:</strong>
                </p>
                {selectedAppointment.subCategories.map((value, index) => (
                  <p key={index}>{value || "-"}</p>
                ))}
              </div>
            )}
          </Modal>
        </>
      ) : (
        <p className="text-primary dark:text-white">No Appointments found</p>
      )}
    </DefaultLayout>
  );
};

export default Measurement;
