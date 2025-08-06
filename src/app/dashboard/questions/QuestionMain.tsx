"use client";

import React, { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ProductQuestion } from "types/general";
import { DateFormatHandler } from "utils/helperFunctions";
import { Modal, Switch, Table } from "antd";
import { DELETE_PRODUCT_QUESTION, UPDATE_PRODUCT_QUESTION } from "graphql/general";
import { useMutation } from "@apollo/client";
import revalidateTag from "components/ServerActons/ServerAction";
import showToast from "components/Toaster/Toaster";
import { BsEyeFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

const DefaultLayout = dynamic(() => import("components/Dashboard/DefaultLayout"));

function QuestionMain({ questions }: { questions: ProductQuestion[] }) {
  const [loading, setloading] = useState<number | undefined>();
  const session = useSession()
  const finalToken = session.data?.accessToken
  const [Questionsupdate] = useMutation(UPDATE_PRODUCT_QUESTION, {
    onCompleted: () => {
      showToast("success", "Question status updated");
      revalidateTag("Ecomerece");
      revalidateTag("prodQuestions");
    },
    onError: (error) => {
      showToast("error", error.message || "Something went wrong");
    },
  });

  const [deleteMutation, { loading: delLoading }] = useMutation(DELETE_PRODUCT_QUESTION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ProductQuestion | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredRedirectUrls = questions?.filter((item) =>
    [item.name, item.question, item.email, item.createdAt, item.updatedAt]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || '').getTime();
    const dateB = new Date(b.updatedAt || b.createdAt || '').getTime();
    return dateB - dateA;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const showModal = (record: ProductQuestion) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const canDeleteProduct = true;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: ProductQuestion) => <span>{record.status}</span>,
    },
    {
      title: "Prodct",
      dataIndex: "product",
      key: "product",
      render: (_: string, record: ProductQuestion) => <span>{record?.EcomereceProducts?.name}</span>,
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: string, record: ProductQuestion) => (
        <span>{DateFormatHandler(new Date(record?.createdAt ?? ""))}</span>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: string, record: ProductQuestion) => (
        <span>{DateFormatHandler(new Date(record?.updatedAt ?? ""))}</span>
      ),
    },
    {
      title: "Replies",
      key: "Replies",
      width: 100,
      render: (_: unknown, record: ProductQuestion) => (
        <button onClick={() => showModal(record)}>
          <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200" />

        </button>
      ),
    },
    {
      title: "Update Status",
      key: "statusSwitch",
      width: 150,
      render: (_: string, record: ProductQuestion) =>
        loading === record.id ? (
          "Updating..."
        ) : (
          <Switch
            checked={record.status === "APPROVED"}
            checkedChildren="Approved"
            unCheckedChildren="Rejected"
            onChange={async (checked) => {
              try {
                const newStatus = checked ? "APPROVED" : "REJECTED";
                const variables = {
                  context: {
                    headers: {
                      authorization: `Bearer ${finalToken}`,
                    },
                    credentials: 'include',
                  },
                  UpdateproductQuestionInput: {
                    id: record.id,
                    status: newStatus,
                  },
                };
                setloading(record.id);
                await Questionsupdate({ variables });
              } catch (error: unknown) {
                showToast("error", (error instanceof Error ? error.message : "Internal Server Error"));
              } finally {
                setloading(undefined);
              }
            }}
          />
        ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_: string, record: ProductQuestion) =>
        loading === record.id && delLoading ? (
          "Deleting..."
        ) : (
          <RiDeleteBin6Line
            className={`${canDeleteProduct ? "text-red-600 cursor-pointer" : "cursor-not-allowed text-slate-200"}`}
            size={20}
            onClick={async () => {
              try {
                setloading(record.id);
                await deleteMutation({context: {
                  headers: {
                    authorization: `Bearer ${finalToken}`,
                  },
                  credentials: 'include',
                }, variables: { id: record.id } });
                revalidateTag("Ecomerece");
              } catch (error: unknown) {
                showToast("error", (error instanceof Error ? error.message : "Internal Server Error"));
              } finally {
                setloading(undefined);
              }
            }}
          />
        ),
    },
  ];

  return (
    <DefaultLayout>
      <input
        className="primary-input w-fit max-w-96 mb-4"
        type="search"
        placeholder="Search Review"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div>
        <Table
        key={filteredRedirectUrls?.map((r) => r.id).join(",")}
        className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
        dataSource={filteredRedirectUrls}
        columns={columns}
        rowKey="id"
        scroll={{ y: 550, x: "max-content" }}
        pagination={false}
        />
      </div>

      <Modal
        title="Order Details"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedOrder(undefined);
        }}
        footer={null}
      >
        {selectedOrder && (
          <>
            <p>Comment Name</p>
            <p>{selectedOrder.name}</p>
            <p>Replies</p>
            {selectedOrder.replies?.map((value, index) => (
              <Fragment key={index}>
                <p>{value.replyText}</p>
                <div className="p-2 mb-3">
                  <span>Status</span>: <span>{value.status}</span>
                  <div className="mt-2">
                    <span>Action: </span>
                    {loading === selectedOrder.id ? (
                      "Updating..."
                    ) : (
                      <Switch
                        checked={value.status === "APPROVED"}
                        checkedChildren="Approved"
                        unCheckedChildren="Rejected"
                        onChange={async (checked) => {
                          try {
                            const newStatus = checked ? "APPROVED" : "REJECTED";

                            const updatedReplies = selectedOrder.replies?.map((r) =>
                              r === value ? { ...r, status: newStatus } : r
                            );

                            const variables = {
                              UpdateproductQuestionInput: {
                                id: selectedOrder.id,
                                status: selectedOrder.status,
                                replies: updatedReplies,
                              },
                            };

                            setloading(selectedOrder.id);
                            await Questionsupdate({ variables });
                            revalidateTag("Ecomerece");
                            revalidateTag("prodQuestions");

                            //     setSelectedOrder((prev) =>
                            //   prev
                            //     ? {
                            //         ...prev,
                            //         replies: updatedReplies as typeof prev.replies,
                            //       }
                            //     : prev
                            // );
                            setIsModalOpen(false);
                          } catch (error: unknown) {
                            showToast("error", (error instanceof Error ? error.message : "Internal Server Error"));
                          } finally {
                            setloading(undefined);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default QuestionMain;
