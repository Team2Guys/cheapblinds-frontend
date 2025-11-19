"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { useMutation } from "@apollo/client";

import revalidateTag from "@components/ServerActons/ServerAction";
import { CustomTable, Toaster } from "@components";
import { DateFormatHandler } from "@utils/helperFunctions";
import { Subcategory } from "@/types/category";
import { REMOVE_SUBCATEGORY_BY_ID } from "@graphql";

export interface DASHBOARD_VIEW_SUBCATEGORIES_PROPS {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  setEditEditSubcategory?: React.Dispatch<SetStateAction<Subcategory | undefined | null>>;
  subCategories?: Subcategory[];
}

const ViewSubcategories = ({
  setMenuType,
  setEditEditSubcategory,
  subCategories,
}: DASHBOARD_VIEW_SUBCATEGORIES_PROPS) => {
  const [subcategoryState, setSubcategoryState] = useState<Subcategory[] | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSubcategoryState(subCategories);
  }, [subCategories]);

  const filteredSubCategories = subcategoryState?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [removeSubCategory] = useMutation(REMOVE_SUBCATEGORY_BY_ID);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await removeSubCategory({
        variables: { input: { id } },
      });
      Toaster("success", "Subcategory deleted successfully!");
      revalidateTag("categories");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      Toaster("error", "Failed to delete subcategory!");
    }
  };

  const handleEdit = (record: Subcategory) => {
    if (setEditEditSubcategory) {
      setEditEditSubcategory(record);
      setMenuType("CategoryForm");
    }
  };


  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (record: Subcategory) =>
        record.thumbnailUrl !== null ? (
          <Image
            src={
              record?.thumbnailUrl ||
              "https://res.cloudinary.com/dmmeqgdhv/image/upload/v1740655318/download_krzc9s.jpg"
            }
            alt={`Image of ${record.name}`}
            loading="lazy"
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available 2</div>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "date",
      render: (record: Subcategory) => {
        const createdAt = new Date(record?.createdAt ?? "");
        DateFormatHandler(createdAt);
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "createdAt",
      key: "date",
      render: (record: Subcategory) => {
        const createdAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Edited By",
      dataIndex: "lastEditedBy",
      key: "lastEditedBy",
    },
    {
      title: "Edit",
      key: "Edit",
      render: (record: Subcategory) => (
        <LiaEdit
          aria-label="Edit Sub Category"
          className={`cursor-pointer "text-black dark:text-white transition duration-300 ease-in-out hover:scale-200`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Subcategory) => (
        <RiDeleteBin6Line
          aria-label="Delete Sub Category"
          className="cursor-pointer text-red-500 dark:text-red-700 transition duration-300 ease-in-out hover:scale-200"
          size={20}
          onClick={() => {
            handleDelete(record?.id);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
        <input
          className="primary-input w-fit"
          type="search"
          placeholder="Search Sub Categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <div
            className={`  p-2 dashboard_primary_button text-white rounded-md  "
            } flex justify-center hover:bg-black`}
            onClick={() => {
              setEditEditSubcategory?.(undefined);
              setMenuType("Add Sub Categories");
            }}
          >
            Add Sub Category
          </div>
        </div>
      </div>

      {filteredSubCategories && filteredSubCategories.length > 0 ? (
        <CustomTable<Subcategory> data={filteredSubCategories} columns={columns} rowKey="id" />
      ) : (
        "No Sub Categories found"
      )}
    </div>
  );
};

export default ViewSubcategories;
