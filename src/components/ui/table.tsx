import React from 'react';
import { TableProps } from 'types/types';

const Table = <T,>({ data, columns, rowKey, emptyMessage = "No data found" }: TableProps<T>) => {
  return (
    <div className="overflow-auto border rounded-md !max-h-[550px]">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-transparent ">
        <thead className="bg-gray-50 dark:bg-black">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="p-2 md:p-4 text-left text-sm font-semibold text-gray-600 dark:text-neutral-300 capitalize whitespace-nowrap"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 ">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={String(item[rowKey] ?? index)} className="hover:bg-gray-100 dark:hover:bg-black">
                {columns.map(col => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm  dark:text-neutral-200 whitespace-nowrap"
                  >
                    {col.render ? col.render(item) : String(item[col.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center px-4 py-6 text-black dark:text-white">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
