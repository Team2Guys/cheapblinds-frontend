import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import revalidateTag from "@components/ServerActons/ServerAction";
import { Admin } from "@types/type";
import { useMutation } from "@apollo/client";
import { REMOVE_ADMIN } from "@/graphql/mutations";
import Table from "@components/ui/table";
interface AlladminsProps {
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  setEditAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  AllAdminData: Admin[];
}

function Alladmins({ setselecteMenu, setEditAdmin, AllAdminData }: AlladminsProps) {
  //eslint-disable-line
  const [delLoading, setDelLoading] = useState<string | number | undefined>(undefined);
  const [removeAdmin] = useMutation(REMOVE_ADMIN);

  const handleDelete = async (id?: string | number) => {
    try {
      setDelLoading(id);
      await removeAdmin({ variables: { id: Number(id) } });
      revalidateTag("Admins");
    } catch (error) {
      throw error;
    } finally {
      setDelLoading(undefined);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Can Add Product",
      dataIndex: "canAddProduct",
      key: "canAddProduct",
      render: (record: Admin) => <span>{record.canAddProduct ? "Yes" : "No"}</span>,
    },
    {
      title: "Can Delete Product",
      dataIndex: "canDeleteProduct",
      key: "canDeleteProduct",
      render: (record: Admin) => <span>{record.canDeleteProduct ? "Yes" : "No"}</span>,
    },
    {
      title: "Can Add Category",
      dataIndex: "canAddCategory",
      key: "canAddCategory",
      render: (record: Admin) => <span>{record.canAddCategory ? "Yes" : "No"}</span>,
    },
    {
      title: "Can View Product",
      dataIndex: "canDeleteCategory",
      key: "canDeleteCategory",
      render: (record: Admin) => <span>{record.canDeleteCategory ? "Yes" : "No"}</span>,
    },
    {
      title: "Can view Profit",
      dataIndex: "canCheckProfit",
      key: "canCheckProfit",
      render: (record: Admin) => <span>{record.canCheckProfit ? "Yes" : "No"}</span>,
    },
    {
      title: "Can View Total user",
      dataIndex: "canViewUsers",
      key: "canViewUsers",
      render: (record: Admin) => <span>{record.canViewUsers ? "Yes" : "No"}</span>,
    },

    {
      title: "Edit",
      key: "edit",
      render: (record: Admin) => (
        <FaEdit
          className="cursor-pointer transition duration-300 ease-in-out hover:scale-200 text-black dark:text-white"
          size={20}
          onClick={() => {
            setEditAdmin(record);
            setselecteMenu("");
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Admin) =>
        delLoading === record.id ? ( // Check if loading state matches current admin ID
          <p>loading...</p>
        ) : (
          <RiDeleteBin6Line
            className="cursor-pointer text-red-500 dark:text-red-700 transition duration-300 ease-in-out hover:scale-200"
            size={20}
            onClick={() => handleDelete(record?.id)}
          />
        ),
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-4 items-center text-black dark:text-white ">
        <p>Admins</p>
        <div>
          <button onClick={() => setselecteMenu("Add Admin")} className="dashboard_primary_button">
            Add new Admin
          </button>
        </div>
      </div>
      {AllAdminData && AllAdminData.length > 0 ? (
        <Table<Admin> data={AllAdminData} columns={columns} rowKey="id" />
      ) : (
        <div className="flex justify-center"> No Admin found</div>
      )}
    </>
  );
}

export default Alladmins;
