"use client";
import React, { useState, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT_STATUS, UPDATE_REPLY_STATUS } from "@/graphql/blogs";
import { IBlogComment } from "@types/general";
import showToast from "@components/Toaster/Toaster";
import revalidateTag from "@components/ServerActons/ServerAction";
import { useSession } from "next-auth/react";

interface Props {
  AllComment: IBlogComment[];
}

const MainPage: React.FC<Props> = ({ AllComment }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<IBlogComment[]>(AllComment);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const session = useSession();
  const finalToken = session.data?.accessToken;
  const avatarColor = (seed: string) => `hsl(${seed.charCodeAt(0) % 360},70%,60%)`;

  const toggleExpand = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const [updateCommentStatus] = useMutation(UPDATE_COMMENT_STATUS, {
    onError: (err) => showToast("error", err.message),
  });

  const [updateReplyStatus] = useMutation(UPDATE_REPLY_STATUS, {
    onError: (err) => showToast("error", err.message),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const updateLocalStatus = (
    id: string,
    status: "APPROVED" | "REJECTED" | "PENDING",
    isReply: boolean,
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (!isReply && comment.id === id) {
          return { ...comment, status };
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) =>
            isReply && reply.id === id ? { ...reply, status } : reply,
          );
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      }),
    );
  };

  const setStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED" | "PENDING",
    isReply: boolean = false,
    commentId?: string,
  ) => {
    try {
      updateLocalStatus(id, status, isReply);

      if (isReply) {
        let parentCommentId = commentId;
        if (!parentCommentId) {
          const parentComment = comments.find((c) => c.replies?.some((r) => r.id === id));
          parentCommentId = parentComment?.id;
        }

        if (!parentCommentId) throw new Error("Parent comment not found");

        await updateReplyStatus({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: "include",
          },
          variables: {
            updateReplystatus: {
              id,
              status,
              commentId: parseFloat(parentCommentId),
            },
          },
          optimisticResponse: {
            updatereplyStatus: { id, status, __typename: "BlogReply" },
          },
        });
        showToast("success", `Reply marked as ${status}`);
      } else {
        const { data } = await updateCommentStatus({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: "include",
          },
          variables: {
            UpdateStatus: { id, status },
          },
          optimisticResponse: {
            UpdateStatus: { id, status, __typename: "BlogComment" },
          },
        });
        showToast("success", `Comment marked as ${data?.UpdateStatus.status}`);
      }
      revalidateTag("blogs");
    } catch (error) {
      updateLocalStatus(id, "PENDING", isReply);
      showToast("error", error instanceof Error ? error.message : "Failed");
    }
  };

  const groupedComments = useMemo(() => {
    const groups: Record<string, IBlogComment[]> = {};

    comments.forEach((comment) => {
      const blogTitle = comment.blog?.title || "Unknown Blog";
      if (!groups[blogTitle]) groups[blogTitle] = [];
      groups[blogTitle].push(comment);
    });

    return groups;
  }, [comments]);

  return (
    <div className="space-y-4 my-5">
      <input
        className="primary-input w-fit max-w-96 mb-4"
        type="search"
        placeholder="Search Comment"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {Object.entries(groupedComments).map(([title, comments]) => (
        <div key={title} className="border p-4 rounded-md bg-primary">
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>

          {comments.map((c) => (
            <div key={c.id} className="border p-4 mb-3 space-y-2 bg-primary rounded">
              <p className="text-xs text-white">{new Date(c.createdAt).toLocaleDateString()}</p>
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center rounded-full text-white font-semibold"
                  style={{
                    backgroundColor: avatarColor(c.name),
                    width: 40,
                    height: 40,
                  }}
                >
                  {c.name[0].toUpperCase()}
                </span>
                <p className="font-medium">{c.name}</p>
              </div>

              <p className="text-sm text-white">
                {expanded[c.id]
                  ? c.description
                  : c.description.split(/\s+/).slice(0, 35).join(" ") + " …"}
                {c.description.split(/\s+/).length > 35 && (
                  <button
                    onClick={() => toggleExpand(c.id)}
                    className="ml-1 underline font-semibold"
                  >
                    {expanded[c.id] ? "Read less" : "Read more"}
                  </button>
                )}
              </p>

              <p className="text-lg text-white">
                Status: <span className="font-semibold">{c.status}</span>
              </p>

              <div className="flex gap-2">
                {["APPROVED", "REJECTED", "PENDING"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatus(c.id, status as "APPROVED" | "REJECTED" | "PENDING")}
                    className={`px-2 py-1 text-sm rounded-md ${
                      c.status === status
                        ? "bg-gray-500 cursor-not-allowed"
                        : {
                            APPROVED: "bg-green-500 cursor-pointer",
                            REJECTED: "bg-red-500 cursor-pointer",
                            PENDING: "bg-blue-500 cursor-pointer",
                          }[status]
                    }`}
                    disabled={c.status === status}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {c.replies?.length ? (
                <div className="mt-3 space-y-2 pl-4 border-l border-white">
                  {c.replies.map((r) => (
                    <div key={r.id} className="text-white">
                      <p className="text-xs">{new Date(r.createdAt).toLocaleDateString()}</p>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-sm">{r.description}</p>
                      <p>
                        Status: <span className="font-semibold">{r.status}</span>
                      </p>
                      <div className="flex gap-2">
                        {["APPROVED", "REJECTED", "PENDING"].map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              setStatus(
                                r.id,
                                status as "APPROVED" | "REJECTED" | "PENDING",
                                true,
                                c.id,
                              )
                            }
                            className={`px-2 py-1 text-sm rounded-md ${
                              r.status === status
                                ? "bg-gray-500 cursor-not-allowed"
                                : {
                                    APPROVED: "bg-green-500 cursor-pointer",
                                    REJECTED: "bg-red-500 cursor-pointer",
                                    PENDING: "bg-blue-500 cursor-pointer",
                                  }[status]
                            }`}
                            disabled={r.status === status}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
