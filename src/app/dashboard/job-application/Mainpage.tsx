"use client";

import { Table } from "antd";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { JobApplicationFormValues } from "types/carear";
import { DateFormatHandler } from "utils/helperFunctions";

type ResumeObj = { imageUrl?: string };
type JobApplication = JobApplicationFormValues & { id: number; resume?: ResumeObj, createdAt:string; };

interface Props {
  applications: JobApplication[];
}

const Mainpage: React.FC<Props> = ({ applications }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return applications.filter((a) =>
      [
        a.firstName,
        a.lastName,
        a.email,
        a.phone,
      ].some((v) => v?.toLowerCase().includes(term))
    );
  }, [applications, searchTerm]);

  /* ----------------------- table columns ----------------------- */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Name",
      key: "name",
      render: (_: unknown, record: JobApplication) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Current CTC",
      dataIndex: "currentCTC",
      key: "currentCTC",
      render: (v: string) => (v ? Number(v).toLocaleString() : "—"),
    },
    {
      title: "Expected CTC",
      dataIndex: "expectedCTC",
      key: "expectedCTC",
      width: 150,
      render: (v: string) => (v ? Number(v).toLocaleString() : "—"),
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
      width: 150,
    },
    {
      title: "Portfolio",
      dataIndex: "portfolioLink",
      key: "portfolioLink",
      width: 150,
      render: (url: string) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            <BsEyeFill className="text-primary text-base transition duration-300 ease-in-out hover:scale-200"/>
          </a>
        ) : (
          "—"
        ),
    },
    {
      title: "Resume",
      key: "resume",
      width: 150,
      render: (_: unknown, record: JobApplication) =>
        record.resume?.imageUrl ? (
          <Link
            href={record.resume.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <span className="text-primary underline"> View</span>
          </Link>
        ) : (
          "—"
        ),
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: 'createdAt',
      render: (_: string, record: JobApplication) => {
        const createdAt = new Date(record?.createdAt ?? "");
        console.log(record);
        return <span>{DateFormatHandler(createdAt)}</span>;
      }
    },
  ];

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center mb-4">
        <input
          className="primary-input w-full max-w-40"
          type="search"
          placeholder="Search name, email, phone…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
         scroll={{ y: 500, x: "max-content" }}
        className="!bg-transparent lg:overflow-hidden overflow-x-scroll"
      />
    </DefaultLayout>
  );
};

export default Mainpage;
