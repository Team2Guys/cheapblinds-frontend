"use client"

import { useMutation } from '@apollo/client';
import { Table } from 'antd';
import revalidateTag from 'components/ServerActons/ServerAction';
import { REMOVE_REVIEW } from 'graphql/mutations';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { SetStateAction, useState } from 'react'
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { IReview } from 'types/general';
import { DateFormatHandler } from 'utils/helperFunctions';

interface IView_Reviews {
    review: IReview[],
    setselecteMenu: React.Dispatch<SetStateAction<string>>,
    setEditsetReview: React.Dispatch<SetStateAction<IReview | undefined>>,
}

export default function ViewReviews({
    review,
    setselecteMenu,
    setEditsetReview
}: IView_Reviews) {
    const [RemoveReview, { loading }] = useMutation(REMOVE_REVIEW);
    const [searchTerm, setSearchTerm] = useState<string>('');
const session = useSession()
  const finalToken = session.data?.accessToken
    const canDeleteProduct = true;
    const canEditproduct = true;
    const canAddProduct = true;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const confirmDelete = (key: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, the review cannot be recovered.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(key);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleDelete = async (key: number) => {
        try {
            await RemoveReview({
                variables: { id: Number(key) },
                context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
            });
            revalidateTag('reviews');
        } catch (err) {
            throw err;
        }
    };

    const filteredReviews = review && review.filter((rev) =>
        rev.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || '').getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || '').getTime();
      return dateB - dateA;
    });

    const columns = [
        {
            title: 'Image',
            dataIndex: 'posterImageUrl',
            width: 150,
            key: 'posterImageUrl',
            render: (text: string, record: IReview) => (
                <Image
                    src={record?.posterImageUrl?.imageUrl || "/assets/images/dummy-avatar.jpg"}
                    alt={`Image of ${record?.name}`}
                    width={200}
                    loading='lazy'
                    className="sm:w-[80px] sm:h-[80px] rounded-md object-contain"
                    height={200}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string, record: IReview) =>
                record?.createdAt ? new Date(record.createdAt).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
        },
        {
            title: 'Updated At',
            dataIndex: 'createdAt',
            key: 'date',
            render: (_: string, record: IReview) => {
                const createdAt = new Date(record?.updatedAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Edit',
            key: 'Edit',
            width: 150,
            render: (text: string, record: IReview) => (
                <LiaEdit
                    className={`${canEditproduct ? 'cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
                    size={20}
                    onClick={() => {
                        if (canEditproduct) {
                            setEditsetReview(record);
                            setselecteMenu('Add Products');
                        }
                    }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text: string, record: IReview) => (
                loading ? "Deleting" :
                    <RiDeleteBin6Line
                        className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
                        size={20}
                        onClick={() => confirmDelete(record.id)}
                    />
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap">
                <input
                    className="primary-input w-fit max-w-96"
                    type="search"
                    placeholder="Search Review"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div>
                    <p
                        className={`dashboard_primary_button ${
                            canAddProduct
                                ? 'cursor-pointer text-white '
                                : 'cursor-not-allowed bg-gray-500 text-white'
                        }`}
                        onClick={() => {
                            if (canAddProduct) {
                                setselecteMenu('Add Products');
                                setEditsetReview(undefined);
                            }
                        }}
                    >
                        Add Review
                    </p>
                </div>
            </div>

            <Table
                key={filteredReviews.map(r => r.id).join(',')}
                className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
                dataSource={filteredReviews}
                columns={columns}
                rowKey="id"
                scroll={{ y: 550, x: "max-content" }}
                pagination={false}
            />
        </>
    );
}
