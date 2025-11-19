"use client";
import React, { SetStateAction } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import Link from "next/link";
import { DateFormatHandler } from "@utils/helperFunctions";
import { BsEyeFill } from "react-icons/bs";
import { CustomTable, Toaster } from "@components";
import { Product } from "@/types/category";
import { useMutation } from "@apollo/client";
import { REMOVE_PRODUCT_BY_ID } from "@graphql";
import revalidateTag from "@components/ServerActons/ServerAction";

export interface ViewProductProps {
  productList: Product[];
  setSelecteMenu: React.Dispatch<SetStateAction<string>>;
  setEditProduct?: React.Dispatch<SetStateAction<Product | undefined | null>>;
}

const ViewProduct = ({ productList, setSelecteMenu, setEditProduct }:ViewProductProps) => {

  const [removeProduct] = useMutation(REMOVE_PRODUCT_BY_ID);
const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await removeProduct({
        variables: { input: { id } },
      });
      Toaster("success", "Subcategory deleted successfully!");
      revalidateTag("products");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      Toaster("error", "Failed to delete subcategory!");
    }
  };

   const handleEdit = (record: Product) => {
      if (setEditProduct) {
        setEditProduct(record);
        setSelecteMenu("Add Products");
      }
    };

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (record: Product) => (
        <Image
          src={record.thumbnailUrl|| ""}
          alt={`Image of ${record?.name}`}
          width={200}
          loading="lazy"
          className="w-[70px] sm:h-20 rounded-md object-contain"
          height={200}
        />
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
      title: "Stock Quantity",
      dataIndex: "stock",
      key: "stock",
      render: (record: Product) => {
        return <p>{record.stock}</p>;
      },
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: Product) => {
        const createdAt = new Date(record?.createdAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (record: Product) => {
        const updatedAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(updatedAt)}</span>;
      },
    },

    {
      title: "Edited By",
      dataIndex: "lastEditedBy",
      key: "lastEditedBy",
    },
    {
      title: "Preview",
      key: "Preview",
      render: (record: Product) => {
        let urls;
        if (record.subcategory?.customUrl) {
          urls = `/${record.category?.customUrl + "/" + record.subcategory?.customUrl}/`;
        } else {
          urls = `/${record.category?.customUrl + "/" + record.customUrl}/`;
        }

        return (
          <Link className="hover:text-black" target="_blank" href={urls}>
            <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200" />
          </Link>
        );
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (record: Product) => (
        <button
          aria-label="Edit Product"
          onClick={() => handleEdit(record)}
          className="transition duration-300 ease-in-out cursor-pointer text-black dark:text-white hover:scale-200"
        >
          <LiaEdit size={20} />
        </button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Product) => (
        <button
          aria-label="Delete Product"
          onClick={() => handleDelete(record.id)}
          className={`transition duration-300 ease-in-out "text-red-600 cursor-pointer hover:scale-200`}
        >
          <RiDeleteBin6Line size={20} />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap text-black dark:text-white  ">
        <input className="primary-input w-fit" type="search" placeholder="Search Product" />
        <div>
          <p
            className="border-0  dark:bg-primary/60 cursor-pointer  dashboard_primary_button"
            onClick={() => {
              setSelecteMenu("Add Products");
            }}
          >
            Add Products
          </p>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        {productList && productList.length > 0 ? (
          <CustomTable<Product> data={productList} columns={columns} rowKey="id" />
        ) : (
          <p className="text-primary dark:text-white">No products found</p>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
