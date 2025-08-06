"use client"

import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ProductReviews } from 'types/general';
import { DateFormatHandler } from 'utils/helperFunctions';
import { Switch, Table } from 'antd';
import { DELETE_PROD_REVIEW, UPDATE_PROD_REVIEWS, } from 'graphql/general';
import { useMutation } from '@apollo/client';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { useSession } from 'next-auth/react';

const DefaultLayout = dynamic(() => import('components/Dashboard/DefaultLayout'))


function ProdReview({ reviews }: { reviews: ProductReviews[] }) {
    const [loading, setloading] = useState<number | undefined>()
    const [reviewsupdate] = useMutation(UPDATE_PROD_REVIEWS)
    const [deleteMutation, { loading: delLoading }] = useMutation(DELETE_PROD_REVIEW)
const session = useSession()
  const finalToken = session.data?.accessToken
   const [searchTerm, setSearchTerm] = useState<string>('');

const filteredRedirectUrls = reviews && reviews.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ReviewsDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.EcomereceProducts?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.createdAt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedAt?.toLowerCase().includes(searchTerm.toLowerCase())
     
);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };



    const canDeleteProduct = true
    const columns = [

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },

        {
            title: 'Rating',
            dataIndex: 'starRating',
            key: 'starRating',
            width: 150,
        },
        {
            title: 'Review Detail',
            dataIndex: 'ReviewsDescription',
            key: 'ReviewsDescription',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: ProductReviews) => {

                return <span>{record.status}</span>;
            }

        },
        {
            title: 'Prodct',
            dataIndex: 'product',
            key: 'product',
            render: (text: string, record: ProductReviews) => {
                return <span>{record?.EcomereceProducts?.name}</span>;
            }

        },

        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string, record: ProductReviews) => {
                const createdAt = new Date(record?.createdAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }

        },
        {
            title: 'Updated At',
            dataIndex: 'createdAt',
            key: 'date',
            render: (_: string, record: ProductReviews) => {
                const createdAt = new Date(record?.updatedAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
 


        {
            title: 'Update Status',
            key: 'status',
            width: 150,
            render: (text: string, record: ProductReviews) => (
                loading === record.id ? "Updating..." :
                    <Switch
                        checked={record.status === 'APPROVED'}
                        checkedChildren="Approved"
                        unCheckedChildren="Rejected"
                        onChange={async (checked) => {
                            try {
                                const newStatus = checked ? 'APPROVED' : 'REJECTED';
                                const updatedvalues = { UpdateproductReviewInput: { id: record.id, status: newStatus, } }
                                setloading(record.id)
                                await reviewsupdate({ context: {
                                    headers: {
                                    authorization: `Bearer ${finalToken}`,
                                    },
                                    credentials: 'include',
                                },variables: updatedvalues })


                                revalidateTag("Ecomerece")
                                revalidateTag("prodreviews")
                                //eslint-disable-next-line
                            } catch (error: any) {
                                showToast('error', error.message || "Internal Server Error ")

                            }
                            finally {
                                setloading(undefined)
                            }


                        }}
                    />
            ),
        },

        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text: string, record: ProductReviews) => (
                loading == record.id && delLoading ? "Deleting..." :
                    <RiDeleteBin6Line
                        className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
                            }`}
                        size={20}
                        onClick={async () => {
                            try {
                                setloading(record.id)
                                await deleteMutation({ context: {
                                    headers: {
                                    authorization: `Bearer ${finalToken}`,
                                    },
                                    credentials: 'include',
                                },variables: { id: record.id } })
                                revalidateTag("Ecomerece")
                                //eslint-disable-next-line
                            } catch (error: any) {
                                showToast('success', error.message || "Internal Server Error")
                            } finally {
                                setloading(undefined)
                            }

                        }}
                    />
            ),
        },
    ];


    return (

        <DefaultLayout>
                <input
                    className="primary-input w-fit max-w-96 mb-4 "
                    type="search"
                    placeholder="Search Review"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            <Table
                key={filteredRedirectUrls?.map(r => r.id).join(',')}
                className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
                dataSource={filteredRedirectUrls}
                columns={columns}
                rowKey="id"
                scroll={{ y: 550, x: "max-content" }}
                pagination={false}
            />

        
        </DefaultLayout >

    )
}

export default ProdReview










