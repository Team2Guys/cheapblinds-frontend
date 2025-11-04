"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import revalidateTag from "@components/ServerActons/ServerAction";
import Swal from "sweetalert2";
import { Category } from "@/types/cat";
import { useMutation } from "@apollo/client";
import { REMOVE_CATEGORY } from "@graphql/categories";
import Table from "@components/ui/table";
import { useSession } from "next-auth/react";
import { DateFormatHandler } from "@utils/helperFunctions";
import { getPermission } from "@utils/permissionHandlers";
import { showToast } from "@/components/Toaster/Toaster";
interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  seteditCategory?: React.Dispatch<SetStateAction<Category | undefined | null>>;
  cetagories?: Category[];
}

const DashboardCat = ({ setMenuType, seteditCategory, cetagories }: CategoryProps) => {
  const [category, setCategory] = useState<Category[] | undefined>(cetagories);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [removeCategory] = useMutation(REMOVE_CATEGORY);
  const { data: session } = useSession();
  const finalToken = session?.accessToken;
  useEffect(() => {
    setCategory(cetagories);
  }, [cetagories]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  const canDeleteCategory = getPermission(session, "canDeleteCategory");
  const canAddCategory = getPermission(session, "canAddCategory");
  const canEditCategory = getPermission(session, "canEditCategory");

  console.log(session, "session");

  const confirmDelete = (key: string | number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, the Category cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key);
      }
    });
  };

  const handleDelete = async (key: number | string) => {
    try {
      await removeCategory({
        variables: { id: Number(key) },
        context: {
          headers: {
            authorization: `Bearer ${finalToken}`,
          },
          credentials: "include",
        },
      });

      setCategory((prev: Category[] | undefined) =>
        prev ? prev.filter((item) => item.id !== key) : [],
      );
      revalidateTag("categories");
        showToast("success", "Category Deleted");
        } catch (err) {
          showToast("error", "There was an error deleting the category.");
          return err;
        }
  };

  const handleEdit = (record: Category) => {
    if (seteditCategory) {
      seteditCategory(record);
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
        record.posterImageUrl ? (
          <Image
            src={record.posterImageUrl.imageUrl || ""}
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
      dataIndex: "last_editedBy",
      key: "last_editedBy",
      width: 150,
    },
    {
      title: "Edit",
      key: "Edit",
      width: 60,
      render: (record: Category) => (
        <LiaEdit
          aria-label="Edit Category"
          className={`${canEditCategory && "text-black dark:text-white cursor-pointer transition duration-300 ease-in-out hover:scale-200"} ${!canEditCategory && "cursor-not-allowed text-slate-400"}`}
          size={20}
          onClick={() => {
            if (canEditCategory) handleEdit(record);
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
          className={`${canDeleteCategory && "text-red-500 cursor-pointer dark:text-red-700 transition duration-300 ease-in-out hover:scale-200"} ${!canDeleteCategory && "cursor-not-allowed text-slate-400"}`}
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(record.id);
            }
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
            className={`${!canAddCategory ? "cursor-not-allowed border-0 bg-black/60 dark:bg-primary/60" : "cursor-pointer"} dashboard_primary_button`}
            onClick={() => {
              seteditCategory?.(undefined);
              if (canAddCategory) {
                setMenuType("Add Category");
              }
            }}
          >
            Add Category
          </p>
        </div>
      </div>

      {filteredCategories && filteredCategories.length > 0 ? (
        <Table<Category> data={filteredCategories} columns={columns} rowKey="id" />
      ) : (
        <p className="text-primary dark:text-white">No Categories found</p>
      )}
    </div>
  );
};

export default DashboardCat;
