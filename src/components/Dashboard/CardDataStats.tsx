'use client';

import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
  className?: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
  className,
}) => {
  return (
    <div
      className={`rounded-sm border border-stroke bg-white dark:bg-black dark:text-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary dark:text-black dark:bg-white">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-primary dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-primary dark:text-white">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
