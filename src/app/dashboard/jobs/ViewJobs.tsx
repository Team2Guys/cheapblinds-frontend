"use client"

import { useMutation } from '@apollo/client';
import { Table } from 'antd';
import revalidateTag from 'components/ServerActons/ServerAction';
import { DELETE_JOBS } from 'graphql/JobsModule';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { SetStateAction, useState } from 'react'
import { BsEyeFill } from 'react-icons/bs';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { IJOBS } from 'types/carear';
import { DateFormatHandler } from 'utils/helperFunctions';

interface IView_RedirectUrls {
    Jobs: IJOBS[],
    setselecteMenu: React.Dispatch<SetStateAction<string>>,
    setjob: React.Dispatch<SetStateAction<IJOBS | undefined>>,
}

export default function ViewRedirecturl({
    Jobs,
    setselecteMenu,
    setjob
}: IView_RedirectUrls) {
    const [removeJobs, { loading }] = useMutation(DELETE_JOBS)
const session = useSession()
  const finalToken = session.data?.accessToken
    const [searchTerm, setSearchTerm] = useState<string>('');

    const canDeleteProduct = true;
    const canEditproduct = true;
    const canAddProduct = true;

    const filteredRedirectUrls = Jobs && Jobs.filter((item) =>
        item.custom_url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || '').getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || '').getTime();
        return dateB - dateA;
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

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
        }).catch((err) => {
            console.log(err)
        });
    };


    const handleDelete = async (key: number) => {
        try {
            await removeJobs({
                variables: { id: Number(key) },
                context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
            });
            revalidateTag('Jobs');

        } catch (err) {

            throw err;
        }
    };

    const columns = [

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: 'location',
            dataIndex: 'location',
            key: 'location',
            width: 200,
        },
         
        {
            title: 'salary',
            dataIndex: 'salary',
            key: 'salary',
            width: 200,
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: 200,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_: string, record: IJOBS) => {
                const createdAt = new Date(record?.createdAt ?? "");
                console.log(record);
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'createdAt',
            key: 'date',
            render: (_: string, record: IJOBS) => {
                const createdAt = new Date(record?.updatedAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Preview',
            key: 'Preview',
            width: 120,
            render: (text: string, record: IJOBS) => {
                let urls;

                if (record?.custom_url) {
                    urls = `/career/${record.custom_url}`
                }
                else {
                    urls = `/career/${record.custom_url}`
                }
                console.log(urls, "urls")

                return (
                    <Link
                        className="hover:text-black"
                        target="_blank"
                        href={urls}
                    >
                        <BsEyeFill className="text-primary text-base transition duration-300 ease-in-out hover:scale-200" />

                    </Link>
                );
            },
        },
        {
            title: 'Edit',
            key: 'Edit',
            width: 150,
            render: (text: string, record: IJOBS) => (
                <LiaEdit
                    className={`${canEditproduct ? 'cursor-pointer' : ''} ${!canEditproduct ? 'cursor-not-allowed text-slate-200' : ''
                        }`}
                    size={20}
                    onClick={() => {
                        if (canEditproduct) {
                            setjob(record);
                            setselecteMenu('Add Job');
                        }
                    }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text: string, record: IJOBS) => (
                loading ? "Deleting" :
                    <RiDeleteBin6Line
                        className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
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
                        className={`py-2 px-4 rounded-md text-nowrap text-12 xs:text-base dashboard_primary_button ${canAddProduct
                            ? 'cursor-pointer text-white   '
                            : 'cursor-not-allowed text-white'
                            }`}
                        onClick={() => {
                            if (canAddProduct) {
                                setselecteMenu('Add Job');
                                setjob(undefined);
                            }
                        }}
                    >
                        Add Job
                    </p>
                </div>
            </div>
            <Table
                key={filteredRedirectUrls?.map(r => r.id).join(',')}
                className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
                dataSource={filteredRedirectUrls}
                columns={columns}
                 scroll={{ y: 500, x: "max-content" }}
                rowKey="id"
                pagination={false}
            />


        </>
    )
}
