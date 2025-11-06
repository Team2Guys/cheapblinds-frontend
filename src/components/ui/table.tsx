"use client";

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TableProps } from "@/types/types";

const Table = <T,>({
  data,
  columns,
  rowKey,
  emptyMessage = "No data found",
  rowSelection,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / pageSize);

  // Smooth scroll to table heading on page change
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

  // Handle single row select
  const handleSelect = (key: React.Key) => {
    if (!rowSelection) return;
    const selected = new Set(rowSelection.selectedRowKeys);
    if (selected.has(key)) {
      selected.delete(key);
    } else {
      selected.add(key);
    }
    rowSelection.onChange(Array.from(selected));
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!rowSelection) return;
    const allKeys = data.map((item) => item[rowKey] as React.Key);
    const isAllSelected = allKeys.every((key) => rowSelection.selectedRowKeys.includes(key));
    rowSelection.onChange(isAllSelected ? [] : allKeys);
  };

  return (
    <div>
      <div className="overflow-auto">
        <table
          className="min-w-full divide-y divide-secondary  bg-white dark:bg-secondary"
          id="custom-table-head"
        >
          {/* ---------- TABLE HEADER ---------- */}
          <thead className="bg-primary-light dark:bg-primary">
            <tr>
              {rowSelection && (
                <th className="p-2 md:p-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      data.every((item) =>
                        rowSelection.selectedRowKeys.includes(item[rowKey] as React.Key),
                      )
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="p-2 text-left text-xl font-medium font-rubik dark:text-neutral-300 capitalize whitespace-nowrap"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* ---------- TABLE BODY ---------- */}
          <tbody className="divide-y divide-secondary">
            {data.length > 0 ? (
              data.map((item, index) => {
                const isHidden =
                  index < (currentPage - 1) * pageSize || index >= currentPage * pageSize;
                const key = item[rowKey] as React.Key;
                const isChecked = rowSelection?.selectedRowKeys.includes(key);

                return (
                  <tr
                    key={String(key ?? index)}
                    className={`hover:bg-gray-100   ${isHidden && "sr-only"}`}
                  >
                    {rowSelection && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => handleSelect(key)}
                        />
                      </td>
                    )}
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className="px-4 py-3 font-semibold whitespace-nowrap text-black "
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
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="text-center px-4 py-6 text-black dark:text-white"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- PAGINATION ---------- */}
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
                return page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;
              })
              .reduce<(number | "ellipsis")[]>((acc, page, i, arr) => {
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
                        ? "text-white dark:bg-primary"
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
