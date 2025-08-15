'use client';

import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import revalidateTag from 'components/ServerActons/ServerAction';
import Swal from 'sweetalert2';

import { DASHBOARD_VIEW_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { ISUBCATEGORY } from 'types/cat';
import { useMutation } from '@apollo/client';
import { DateFormatHandler } from 'utils/helperFunctions';
import { GET_ALL_SUBCATEGORIES, REMOVE_SUBCATEGORY } from 'graphql/categories';
import Table from 'components/ui/table';
import { useSession } from 'next-auth/react';
import { getPermission } from 'utils/permissionHandlers';
const ViewSubcategries = ({
  setMenuType,
  seteditCategory,
  subCategories,
}: DASHBOARD_VIEW_SUBCATEGORIES_PROPS) => {
  const [category, setCategory] = useState<ISUBCATEGORY[] | undefined>(subCategories);
  const session = useSession()
  const finalToken = session.data?.accessToken

  useEffect(() => {
    setCategory(subCategories)

  }, [subCategories])

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };



  const filteredSubCategories: ISUBCATEGORY[] | undefined = category?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });



  const [removeCategory] = useMutation(REMOVE_SUBCATEGORY);
  const canDeleteSubCategory = getPermission(session.data, 'canDeleteSubCategory');
  const canAddSubCategory = getPermission(session.data, 'canAddSubCategory');

  const canEditSubCategory = getPermission(session.data, "canEditSubCategory" );


  const confirmDelete = (key: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the Sub Category cannot be recovered.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key);
      }
    });
  };

  // const finalToken = session?.accessToken

  const handleDelete = async (key: number) => {
    try {
      await removeCategory({
        variables: { id: Number(key) }, refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }],
        context: {
          headers: {
            authorization: `Bearer ${finalToken}`,
          },
        },
      });
      setCategory((prev: ISUBCATEGORY[] | undefined) => prev ? prev.filter((item: ISUBCATEGORY) => item.id != key) : []);
      revalidateTag('subcategories');
      notification.success({
        message: 'Category Deleted',
        description: 'The category has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {

      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the category.',
        placement: 'topRight',
      });

      throw err;
    }
  };

  const handleEdit = (record: ISUBCATEGORY) => {
    if (seteditCategory) {
      seteditCategory(record);
      setMenuType('CategoryForm');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      key: 'posterImageUrl',
      render: ( record: ISUBCATEGORY) =>
        record.posterImageUrl !== null ? (
          <Image
            src={record?.posterImageUrl?.imageUrl || 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1740655318/download_krzc9s.jpg'}
            alt={`Image of ${record.name}`}
            loading='lazy'
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available 2</div>
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
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: ( record: ISUBCATEGORY) => {
        const createdAt = new Date(record?.createdAt ?? "");
        DateFormatHandler(createdAt)
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'createdAt',
      key: 'date',
      render: ( record: ISUBCATEGORY) => {
        const createdAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: 'Edited By',
      dataIndex: 'last_editedBy',
      key: 'last_editedBy',
      width: 150
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (record: ISUBCATEGORY) => (
        <LiaEdit
          className={`cursor-pointer ${canEditSubCategory && 'text-black dark:text-white transition duration-300 ease-in-out hover:scale-200'} ${!canEditSubCategory && 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ISUBCATEGORY) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteSubCategory && 'text-red-500 dark:text-red-700 transition duration-300 ease-in-out hover:scale-200'} ${!canDeleteSubCategory && 'cursor-not-allowed text-slate-300'
            }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteSubCategory) {
              confirmDelete(Number(record?.id));
            }
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
            className={`${canAddSubCategory && 'cursor-pointer'}  p-2 ${canAddSubCategory &&
              'dashboard_primary_button text-white rounded-md  '
              } flex justify-center ${!canAddSubCategory && 'cursor-not-allowed '
              } hover:bg-black`}
            onClick={() => {
              seteditCategory?.(undefined);
              if (canAddSubCategory) {
                setMenuType('Add Sub Categories');
              }
            }}
          >
            Add Sub Category
          </div>
        </div>
      </div>

      {filteredSubCategories && filteredSubCategories.length > 0 ? (
        <Table<ISUBCATEGORY> data={filteredSubCategories} columns={columns} rowKey="id" />
      ) : (
        'No Sub Categories found'
      )}
    </div>
  );
};

export default ViewSubcategries;
