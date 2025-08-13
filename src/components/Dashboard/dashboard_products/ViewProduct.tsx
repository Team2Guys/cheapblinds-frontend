'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { IProduct } from 'types/prod';
import { DASHBOARD_MAIN_PRODUCT_PROPS } from 'types/PagesProps';
import { useMutation } from '@apollo/client';
import showToast from 'components/Toaster/Toaster';
import { DateFormatHandler } from 'utils/helperFunctions';
import { BsEyeFill } from 'react-icons/bs';
import { GET_ALL_PRODUCTS, REMOVE_PRODUCT } from 'graphql/prod';
import Table from 'components/ui/table';
import { getPermission } from 'utils/permissionHandlers';
import { useSession } from 'next-auth/react';

const ViewProduct: React.FC<DASHBOARD_MAIN_PRODUCT_PROPS> = ({
  products,
  setProducts,
  setselecteMenu,
  setEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: session } = useSession()
  // const finalToken = session?.accessToken;
  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    fetchPolicy: "no-cache",
    context: {
      fetchOptions: {
        // credentials: "include",
        next: { tags: ["products"] }
      },
      // headers: {
      //   authorization: `Bearer ${finalToken}`,      
      // }
    }
  });


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const canAddProduct = getPermission(session, "canAddProduct")
  const canDeleteProduct = getPermission(session, "canDeleteProduct")
  const canEditproduct = getPermission(session, "canEditProduct")



  const filteredProducts: IProduct[] = products?.filter((product) => {
    const searchtext = searchTerm.trim().toLowerCase();
    return (
      product?.name?.toLowerCase().includes(searchtext) ||
      product.description?.toLowerCase().includes(searchtext) ||
      product.price?.toString().includes(searchtext) ||
      product?.discountPrice?.toString().includes(searchtext) ||
      product?.stock?.toString().includes(searchtext) ||
      product.category?.name?.toLowerCase().includes(searchtext) ||
      product.subcategory?.name?.toLowerCase().includes(searchtext)
    );
  }).sort((a, b) => {
    const searchText = searchTerm.trim().toLowerCase();
    const aStartsWith = a?.name?.toLowerCase().startsWith(searchText) ? -1 : 1;
    const bStartsWith = b?.name?.toLowerCase().startsWith(searchText) ? -1 : 1;

    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : b.createdAt ? new Date(b.createdAt).getTime() : 0;


    if (!searchText) return dateB - dateA;

    return (aStartsWith !== bStartsWith)
      ? aStartsWith - bStartsWith
      : dateB - dateA;
  }) || [];





  const confirmDelete = (key: string | number) => {
    const type = "product";
    Swal.fire({
      title: 'Are you sure?',
      text: `Once deleted, the ${type} cannot be recovered.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key, type);
      }
    });
  };

  const handleDelete = async (key: string | number, type: "product" | "e-comerece") => {
    try {

      await removeProduct({
        variables: { id: +key },
        refetchQueries: [{ query: GET_ALL_PRODUCTS }],
      });
      setProducts((prev: IProduct[]) => prev.filter((item) => item.id !== key) || []);

      showToast("success", `${type.charAt(0).toUpperCase() + type.slice(1)} Deleted`,

      );
    } catch (err) {
      showToast('error', `There was an error deleting the ${type} .`)

      throw err;
    }
  };


  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      key: 'posterImageUrl',
      render: (record: (IProduct)) => (
        <Image
          src={record.posterImageUrl?.imageUrl || ""}
          alt={`Image of ${record?.name}`}
          width={200}
          loading='lazy'
          className="w-[70px] sm:h-[80px] rounded-md object-contain"
          height={200}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock",
      key: "stock",
      render: (record: (IProduct)) => {
        return (
          <p>{record.stock}</p>
        )
      },
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record: (IProduct)) => {
        const createdAt = new Date(record?.createdAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (record: (IProduct)) => {
        const updatedAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(updatedAt)}</span>;
      }
    },

    {
      title: 'Edited By',
      dataIndex: 'last_editedBy',
      key: 'last_editedBy',

    },
    {
      title: 'Preview',
      key: 'Preview',
      render: (record: (IProduct)) => {
        let urls;
        if (record.subcategory?.custom_url) {
          urls = `/${record.category?.custom_url + "/" + record.subcategory?.custom_url}/`
        }
        else {
          urls = `/${record.category?.custom_url + "/" + record.custom_url}/`
        }

        return (
          <Link
            className="hover:text-black"
            target="_blank"
            href={urls}
          >
            <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200" />
          </Link>
        );
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (record: (IProduct)) => (
        <LiaEdit
          className={`${canEditproduct ? 'cursor-pointer text-black dark:text-white transition duration-300 ease-in-out hover:scale-200' : ''} ${!canEditproduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              const { updatedAt, createdAt, __typename, ...rest } = record;
              console.log(updatedAt, createdAt, __typename)
              setEditProduct(rest);
              setselecteMenu('Add Products');
            }
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: (IProduct)) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? 'text-red-600 cursor-pointer transition duration-300 ease-in-out hover:scale-200' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            // if (canDeleteProduct) {
            confirmDelete(record.id);
            // }
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap text-black dark:text-white  ">
        <input
          className="primary-input w-fit"
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <p
            className={`${canAddProduct &&
              'cursor-pointer rounded-md text-nowrap text-12 xs:text-base'
              } py-2 px-4 ${canAddProduct && 'dashboard_primary_button text-white'
              } flex justify-center ${!canAddProduct &&
              'cursor-not-allowed bg-gray-500 text-white rounded-md'
              }`}
            onClick={() => {
              if (canAddProduct) {
                setselecteMenu('Add Products');
                setEditProduct(undefined);
              }
            }}
          >
            Add Products
          </p>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>

        {filteredProducts && filteredProducts.length > 0 ? (
          <Table<IProduct> data={filteredProducts} columns={columns} rowKey="id" />
        ) : (
          <p className="text-primary dark:text-white">No products found</p>
        )}
      </div>
    </>
  );
};

export default ViewProduct;