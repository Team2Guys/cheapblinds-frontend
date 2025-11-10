"use client";

import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Toaster } from "../ui/Toaster";
import { CustomTable } from "@components";

interface Product {
  id: string;
  email: string;
}

interface CategoryProps {
  Categories: Product[];
  setCategory: React.Dispatch<React.SetStateAction<Product[]>>;
  /* eslint-disable */
  setselecteMenu: (menu: string) => void;
  /* eslint-enable */
}

const ViewNewsletter: React.FC<CategoryProps> = ({ Categories, setCategory, setselecteMenu }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sendingLoading, setSendingLoading] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts: Product[] =
    Categories?.filter(
      (product) => product.email && product.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = async (key: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/del-user/${key}`);
      setCategory((prev) => prev.filter((item) => item.id !== key));
      Toaster("success", "Email Deleted");
    } catch (err) {
      Toaster("error", "There was an error deleting the Email.");
      throw err;
    }
  };

  const confirmDelete = (key: string) => {
    handleDelete(key);

    // Modal.confirm({
    //   title: 'Are you sure you want to delete this Email?',
    //   content: 'Once deleted, the Email cannot be recovered.',
    //   onOk: () => handleDelete(key),
    //   okText: 'Yes',
    //   cancelText: 'No',
    // });
  };

  const columns = [
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Product) => (
        <RiDeleteBin6Line
          className="text-red-600 cursor-pointer"
          size={20}
          onClick={() => confirmDelete(record.id)}
        />
      ),
    },
  ];
  const handleBroadcastMail = async () => {
    setSendingLoading(true);
    setselecteMenu("Broadcast Email");
    const selectedEmails = Categories.filter((category) =>
      selectedRowKeys.includes(category.id),
    ).map((category) => category.email);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/send-promotional-email`,
        {
          emails: selectedEmails,
        },
      );
      if (res.status === 201) {
        setSelectedRowKeys([]);
        Toaster("success", res.data.message + "🎉");
        setSendingLoading(false);
      }
    } catch (error) {
      setSendingLoading(false);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-2 mb-4 items-center">
        <input
          type="search"
          placeholder="Search Email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleBroadcastMail}
          className={` px-4 py-2 font-medium rounded-md ${selectedRowKeys.length === 0 ? "bg-gray-300 text-black cursor-not-allowed" : "bg-primary text-white"}`}
          disabled={selectedRowKeys.length === 0 || sendingLoading}
        >
          {!sendingLoading ? "Broadcast Email" : "Sending"}
        </button>
      </div>
      <CustomTable<Product>
        data={filteredProducts}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
    </div>
  );
};

export default ViewNewsletter;
