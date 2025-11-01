"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TableProps } from "@/types/types";

const Table = <T,>({ data, columns, rowKey, emptyMessage = "No data found" }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / pageSize);

  // Scroll to heading on page change
  const scrollToHeading = () => {
    const headingEl = document.getElementById("custom-table-head");
    if (headingEl) {
      const yOffset = -20;
      const y = headingEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToHeading();
  }, [currentPage]);
  return (
    <div>
      <div className="overflow-auto border rounded-md">
        <table
          className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-white/20 "
          id="custom-table-head"
        >
          <thead className="bg-gray-50 dark:bg-black">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="p-2 md:p-4 text-left text-sm font-semibold text-gray-600 dark:text-neutral-300 capitalize whitespace-nowrap"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 ">
            {data.length > 0 ? (
              data.map((item, index) => {
                const isHidden =
                  index < (currentPage - 1) * pageSize || index >= currentPage * pageSize;
                return (
                  <tr
                    key={String(item[rowKey] ?? index)}
                    className={`hover:bg-gray-100 dark:hover:bg-black ${isHidden && "sr-only"}`}
                  >
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className="px-4 py-3 text-sm  dark:text-neutral-200 whitespace-nowrap text-black"
                      >
                        {col.render ? col.render(item) : String(item[col.key as keyof T])}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center px-4 py-6 text-black dark:text-white"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-2 xs:gap-4 mt-8">
          {/* Back Button */}
          <button
            className="dashboard_primary_button relative disabled:opacity-70"
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              scrollToHeading();
            }}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft className="text-xl" />
            Back
          </button>

          {/* Page Numbers */}
          <div className="flex justify-center items-center gap-1 xs:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Always show first, last, current, and 1 around current
                return page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;
              })
              .reduce<(number | "ellipsis")[]>((acc, page, i, arr) => {
                // Add ellipsis where pages are skipped
                if (i > 0 && page - arr[i - 1] > 1) {
                  acc.push("ellipsis");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, index) =>
                item === "ellipsis" ? (
                  <span key={`ellipsis-${index}`} className="px-1 xs:px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => {
                      setCurrentPage(item);
                      scrollToHeading();
                    }}
                    className={`dashboard_primary_button border border-black dark:border-primary ${
                      currentPage === item
                        ? " text-white dark:bg-primary"
                        : "bg-transparent text-black dark:text-primary"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
          </div>

          {/* Next Button */}
          <button
            className="dashboard_primary_button relative disabled:opacity-50 text-sm xs:text-base"
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              scrollToHeading();
            }}
            disabled={currentPage === totalPages}
          >
            Next
            <MdKeyboardArrowRight className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
