"use client";
import { useMutation } from '@apollo/client';
import { notification, Table } from 'antd';
import { REMOVE_BLOG } from 'graphql/blogs';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { IBlog } from 'types/general';
import { DateFormatHandler } from 'utils/helperFunctions';

interface ViewBlogProps {
  setselecteMenu: React.Dispatch<SetStateAction<string>>;
  setEditblog: React.Dispatch<SetStateAction<IBlog | undefined>>;
  blogs: IBlog[];
}

const ViewBlog: React.FC<ViewBlogProps> = ({ setselecteMenu, blogs, setEditblog }) => {
  const [allBlogs, setAllBlogs] = useState<IBlog[]>(blogs);
  const [searchTerm, setSearchTerm] = useState('');
   const session = useSession()
  const finalToken = session.data?.accessToken
  const [removeBlog, { loading }] = useMutation(REMOVE_BLOG);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);
  const canAddProduct = true;
  const canEditProduct = true;
  const canDeleteProduct = true;

  const confirmDelete = (id: number | string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the blog cannot be recovered.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: number | string) => {
    try {
      await removeBlog({ variables: { id: Number(id) },context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          }, });
      setAllBlogs((prev) => prev.filter((blog) => blog.id !== id));
      notification.success({
        message: 'Blog Deleted',
        description: 'The blog has been successfully deleted.',
        placement: 'topRight',
      });
    } catch {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the blog.',
        placement: 'topRight',
      });
    }
  };

  const filteredBlogs = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    const filtered = !lowerSearch
      ? allBlogs
      : allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.custom_url?.toLowerCase().includes(lowerSearch) ||
        blog.createdAt?.toLowerCase().includes(lowerSearch) ||
        blog.updatedAt?.toLowerCase().includes(lowerSearch) ||
        blog.category?.toLowerCase().includes(lowerSearch)
      );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || '').getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || '').getTime();
      return dateB - dateA;
    });
  }, [searchTerm, allBlogs]);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      width: 150,
      key: 'posterImageUrl',
      render: (_: string, record: IBlog) => (
        <Image
          src={record?.posterImage?.imageUrl || "/assets/images/dummy-avatar.jpg"}
          alt={record?.posterImage?.altText || 'Blog image'}
          width={80}
          height={80}
          className="rounded-md object-contain"
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Custom URL',
      dataIndex: 'custom_url',
      key: 'custom_url',
      width: 200,
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      width: 200,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: string, record: IBlog) =>
        record?.createdAt ? new Date(record.createdAt).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_: string, record: IBlog) => (
        <span>{DateFormatHandler(new Date(record.updatedAt ?? ""))}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
    {
      title: 'Edit',
      key: 'edit',
      width: 80,
      render: (_: string, record: IBlog) => (
        <LiaEdit
          className={`text-primary ${canEditProduct ? 'cursor-pointer' : 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => {
            if (canEditProduct) {
              setEditblog(record);
              setselecteMenu('Add Products');
            }
          }}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: 80,
      render: (_: string, record: IBlog) =>
        loading ? (
          'Deleting...'
        ) : (
          <RiDeleteBin6Line
            className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : 'cursor-not-allowed text-slate-300'}`}
            size={20}
            onClick={() => {
              if (canDeleteProduct) {
                if (record.id !== undefined) {
                  confirmDelete(record.id);
                }
              }
            }}
          />
        ),
    },
  ];

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap">
        <input
          className="primary-input w-full max-w-40"
          type="search"
          placeholder="Search by title or URL"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`py-2 px-4 rounded-md text-nowrap text-sm xs:text-base ${canAddProduct ? 'dashboard_primary_button text-white cursor-pointer' : 'bg-gray-400 text-white cursor-not-allowed'}`}
          onClick={() => {
            if (canAddProduct) {
              setselecteMenu('Add Products');
              setEditblog(undefined);
            }
          }}
        >
          Add Blog
        </button>
      </div>
      <Table
        dataSource={filteredBlogs}
        columns={columns}
        rowKey="id"
        scroll={{ y: 550, x: "max-content" }}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default ViewBlog;
