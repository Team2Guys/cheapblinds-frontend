'use client';

import React, { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import revalidateTag from 'components/ServerActons/ServerAction';
import Swal from 'sweetalert2';

import { DASHBOARD_ADD_INNERSUBCATEGORY_PROPS } from 'types/PagesProps';
import { INNERSUBCATEGORY } from 'types/cat';
import { useMutation } from '@apollo/client';
import { REMOVE_INNER_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';
import { DateFormatHandler } from 'utils/helperFunctions';
import { useSession } from 'next-auth/react';
const ViewInnerSubcategories = ({
  setMenuType,
  seteditCategory,
  Innersubcategory,
}: DASHBOARD_ADD_INNERSUBCATEGORY_PROPS) => {
  const [category, setCategory] = useState<INNERSUBCATEGORY[] | undefined>(Innersubcategory);
  
  useEffect(() => {
    setCategory(Innersubcategory)

  }, [Innersubcategory])

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubCategories: INNERSUBCATEGORY[] | undefined = category?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [removeCategory] = useMutation(REMOVE_INNER_SUBCATEGORY);
  const canDeleteCategory = true;
  const canAddCategory = true;

  const canEditCategory = true;
  const confirmDelete = (key: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the Inner Sub Category cannot be recovered.',
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
const session = useSession()
  const finalToken = session?.data?.accessToken

  const handleDelete = async (key: number) => {
    try {
      await removeCategory({
        variables: { id: Number(key) }, refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
        context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
          },
      });
      setCategory((prev: INNERSUBCATEGORY[] | undefined) => prev ? prev.filter((item: INNERSUBCATEGORY) => item.id != key) : []);
      revalidateTag('innerSubcategories');
      notification.success({
        message: 'inner Sub Categories Deleted',
        description: 'The inner Sub Categories has been successfully deleted.',
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

  const handleEdit = (record: INNERSUBCATEGORY) => {

      seteditCategory?.(record);
      setMenuType('Inner Sub Categor');

  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (_: string, record: INNERSUBCATEGORY) => {
        const createdAt = new Date(record?.createdAt ?? "");
        DateFormatHandler(createdAt)

        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (_: string, record: INNERSUBCATEGORY) => {
        const createdAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: 'Edited By',
      dataIndex: 'last_editedBy',
      key: 'last_editedBy',
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (_: string, record: INNERSUBCATEGORY) => (
        <LiaEdit
          className={`cursor-pointer ${canEditCategory && 'text-black '} ${!canEditCategory && 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: INNERSUBCATEGORY) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'text-red-500 dark:text-red-700'} ${!canDeleteCategory && 'cursor-not-allowed text-slate-300'
            }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
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
          placeholder="Search Inner Sub Categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <p
            className={`${canAddCategory && 'cursor-pointer '}  p-2 ${canAddCategory &&
              'dashboard_primary_button'
              } flex justify-center ${!canAddCategory && 'cursor-not-allowed '
              } hover:bg-black`}
            onClick={() => {
              seteditCategory?.(undefined);
              if (canAddCategory) {
                setMenuType('Add Inner Sub Category');
              }
            }}
          >
            Add inner Sub Category
          </p>
        </div>
      </div>

      {filteredSubCategories && filteredSubCategories.length > 0 ? (
        <Table
          className="overflow-x-scroll lg:overflow-auto"
          dataSource={filteredSubCategories}
          columns={columns}
          pagination={false}
          scroll={{ y: 550, x: "fit-content" }}
          rowKey="id"
        />
      ) : (
        'No Inner Sub Categories found'
      )}
    </div>
  );
};

export default ViewInnerSubcategories;
