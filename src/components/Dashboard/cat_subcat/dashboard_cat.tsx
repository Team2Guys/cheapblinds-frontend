"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import revalidateTag from "@components/ServerActons/ServerAction";
import { useMutation } from "@apollo/client";
import { CustomTable } from "@components";
import { DateFormatHandler } from "@utils/helperFunctions";
import { Toaster } from "@components";
import { Category } from "@/types/category";
import { REMOVE_CATEGORY_BY_ID } from "@graphql";
interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  setEditCategory?: React.Dispatch<SetStateAction<Category | undefined | null>>;
  categories?: Category[];
}

const DashboardCat = ({ setMenuType, setEditCategory, categories }: CategoryProps) => {
  const [category, setCategory] = useState<Category[] | undefined>(categories);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [removeCategory] = useMutation(REMOVE_CATEGORY_BY_ID);

  useEffect(() => {
    setCategory(categories);
  }, [categories]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await removeCategory({
        variables: {
          input: { id: id },
        },
      });
      Toaster("success", "Category deleted successfully!");
      revalidateTag("categories");
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const filteredCategories: Category[] =
    (category &&
      category
        .filter(
          (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.description &&
              category.description.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .sort((a, b) => {
          const dateA = a.updatedAt
            ? new Date(a.updatedAt).getTime()
            : a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;
          const dateB = b.updatedAt
            ? new Date(b.updatedAt).getTime()
            : b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;
          return dateB - dateA;
        })) ||
    [];

  const handleEdit = (record: Category) => {
    if (setEditCategory) {
      setEditCategory(record);
      setMenuType("CategoryForm");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      width: 100,
      render: (record: Category) =>
        record.thumbnailUrl ? (
          <Image
            src={record.thumbnailUrl || ""}
            alt={`Image of ${record.name}`}
            loading="lazy"
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available</div>
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
      width: 100,
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "date",
      width: 170,
      render: (record: Category) => {
        const createdAt = new Date(record?.createdAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "date",
      width: 170,
      render: (record: Category) => {
        const updatedAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(updatedAt)}</span>;
      },
    },
    {
      title: "Edited By",
      dataIndex: "lastEditedBy",
      key: "lastEditedBy",
      width: 150,
    },
    {
      title: "Edit",
      key: "Edit",
      width: 60,
      render: (record: Category) => (
        <LiaEdit
          aria-label="Edit Category"
          className="text-black dark:text-white cursor-pointer transition duration-300 ease-in-out hover:scale-200"
          size={20}
          onClick={() => {
            handleEdit(record);
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (record: Category) => (
        <RiDeleteBin6Line
          aria-label="Delete Category"
          className="text-red-500 cursor-pointer dark:text-red-700 transition duration-300 ease-in-out hover:scale-200"
          size={20}
          onClick={() => {
            handleDelete(record.id);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex_between mb-4 text-dark dark:text-white">
        <input
          className="primary-input w-fit"
          type="search"
          placeholder="Search Category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <p
            className="border-0 bg-black cursor-pointer dashboard_primary_button"
            onClick={() => {
              setEditCategory?.(undefined);
              setMenuType("Add Category");
            }}
          >
            Add Category
          </p>
        </div>
      </div>

      {filteredCategories && filteredCategories.length > 0 ? (
        <CustomTable<Category> data={filteredCategories} columns={columns} rowKey="id" />
      ) : (
        <p className="text-primary dark:text-white">No Categories found</p>
      )}
    </div>
  );
};

export default DashboardCat;
