"use client";

import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import revalidateTag from "@components/ServerActons/ServerAction";
import { formatPermission } from "@utils/helperFunctions";
import { AlladminsProps } from "@/types/admin";
import { REMOVE_ADMIN_BY_ID } from "@graphql/Admins";

const Alladmins = ({ setselecteMenu, AllAdminData }: AlladminsProps) => {
  const [delLoading, setDelLoading] = useState<string | number | undefined>(undefined);
  const [removeAdmin] = useMutation(REMOVE_ADMIN_BY_ID);

const handleDelete = async (id?: string | number) => {
  if (!id) return;

  try {
    setDelLoading(id);
    await removeAdmin({
      variables: {
        input: { id: String(id) },
      },
    });
    revalidateTag("Admins"); 
  } catch (error) {
    console.error("Error deleting admin:", error);
  } finally {
    setDelLoading(undefined);
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-black dark:text-white">Admins</h2>
        <button
          onClick={() => setselecteMenu("Add Admin")}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Add New Admin
        </button>
      </div>

      {/* Admin Cards */}
      {AllAdminData && AllAdminData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {AllAdminData.map((admin) => (
            <div
              key={admin.id}
              className="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col justify-between"
            >
              {/* Header: Name & Role */}
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white">
                  {`${admin.firstName} ${admin.lastName}`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{admin.role}</p>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{admin.email}</p>
              </div>

              {/* Permissions */}
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Permissions:</p>
                <ul className="flex flex-wrap gap-2">
                  {admin.permissions.map((perm, idx) => (
                    <li
                      key={idx}
                      className="bg-primary px-2 py-1 rounded-full text-white text-xs"
                    >
                      {formatPermission(perm)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-4">
                <FaEdit
                  size={20}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                  onClick={() => setselecteMenu("")}
                />
                {delLoading === admin.id ? (
                  <span className="text-gray-500">Deleting...</span>
                ) : (
                  <RiDeleteBin6Line
                    size={20}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDelete(admin.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-gray-500 dark:text-gray-400">No Admins Found</div>
      )}
    </div>
  );
};

export default Alladmins;
