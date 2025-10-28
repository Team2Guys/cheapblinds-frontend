"use client";

import { useMutation } from "@apollo/client";
import revalidateTag from "components/ServerActons/ServerAction";
import Table from "components/ui/table";
import { REMOVE_REVIEW } from "graphql/mutations";
import { useSession } from "next-auth/react";
import React, { SetStateAction, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { RedirectUrls } from "types/general";
import { DateFormatHandler } from "utils/helperFunctions";
import { getPermission } from "utils/permissionHandlers";

interface IView_RedirectUrls {
  Redirecturls: RedirectUrls[];
  setselecteMenu: React.Dispatch<SetStateAction<string>>;
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>;
}

export default function ViewRedirecturl({
  Redirecturls,
  setselecteMenu,
  setRedirectUrls,
}: IView_RedirectUrls) {
  const [RemoveReview] = useMutation(REMOVE_REVIEW);
  const session = useSession();
  const finalToken = session.data?.accessToken;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const canAddRedirecturls = getPermission(session.data, "canAddRedirecturls");
  const canDeleteRedirecturls = getPermission(session.data, "canDeleteRedirecturls");
  const canEditRedirecturls = getPermission(session.data, "canEditRedirecturls");

  const filteredRedirectUrls =
    Redirecturls &&
    Redirecturls.filter((item) => item.url?.toLowerCase().includes(searchTerm.toLowerCase())).sort(
      (a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || "").getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || "").getTime();
        return dateB - dateA;
      },
    );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const confirmDelete = (key: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, the Sub Category cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    })
      .then((result) => {
        console.log(result, "result");
        if (result.isConfirmed) {
          handleDelete(key);
        }
      })
      .catch((err) => {
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
          credentials: "include",
        },
      });
      revalidateTag("reviews");
    } catch (err) {
      throw err;
    }
  };

  const columns = [
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },

    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: RedirectUrls) => {
        const createdAt = new Date(record?.createdAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "createdAt",
      key: "date",
      render: (record: RedirectUrls) => {
        const createdAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (record: RedirectUrls) => (
        <LiaEdit
          data-testid={`edit-btn-${record.id}`}
          className={`${canEditRedirecturls ? "cursor-pointer text-black dark:text-white transition duration-300 ease-in-out hover:scale-200" : ""} ${
            !canEditRedirecturls ? "cursor-not-allowed text-slate-300" : ""
          }`}
          size={20}
          onClick={() => {
            if (canEditRedirecturls) {
              setRedirectUrls(record);
              setselecteMenu("Add RedirectUrls");
            }
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: RedirectUrls) => (
        <button
          data-testid={`delete-btn-${record.id}`}
          onClick={() => canDeleteRedirecturls && confirmDelete(record.id)}
          disabled={!canDeleteRedirecturls}
          className={`transition duration-300 ease-in-out ${
            canDeleteRedirecturls
              ? "text-red-600 cursor-pointer hover:scale-200"
              : "cursor-not-allowed text-slate-400"
          }`}
        >
          <RiDeleteBin6Line size={20} />
        </button>
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
            className={`py-2 px-4 rounded-md text-nowrap text-12 xs:text-base dashboard_primary_button ${
              canAddRedirecturls
                ? "cursor-pointer text-white "
                : "cursor-not-allowed bg-gray-500 text-white"
            }`}
            onClick={() => {
              if (canAddRedirecturls) {
                setselecteMenu("Add RedirectUrls");
                setRedirectUrls(undefined);
              }
            }}
          >
            Add Review
          </p>
        </div>
      </div>
      <Table<RedirectUrls> data={filteredRedirectUrls} columns={columns} rowKey="id" />
    </>
  );
}
