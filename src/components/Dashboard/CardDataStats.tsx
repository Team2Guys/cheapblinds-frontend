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
  className = '',
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-white dark:bg-white/20 backdrop-blur-md
        border dark:border-primary/30
        shadow-md dark:shadow-primary/30
        hover:shadow-lg hover:dark:shadow-primary/50
        transition-all duration-400
        hover:-translate-y-1
        ${className}
      `}
    >
      {/* Icon circle with white background */}
      <div
        className="
          relative mx-auto mt-8 flex h-12 w-12 xsm:h-14 xsm:w-14 xs:h-20 xs:w-20 items-center justify-center
          rounded-full border-black/10 border-4 dark:border-primary
          bg-white
          text-black/10 dark:text-primary
          shadow-lg dark:shadow-primary/70 shadow-black/20
          transition-transform duration-500
          group-hover:scale-110
        "
      >
        {children}
        {/* Soft glow ring */}
        <span
          aria-hidden="true"
          className="
            absolute inset-0 rounded-full
            bg-black/60 dark:bg-primary opacity-20 dark:opacity-60 blur-xl
            animate-pulse
          "
        />
      </div>

      {/* Content with white text */}
      <div className="mt-4 xsm:mt-8 mb-8 px-2 xsm:px-4 xs:px-6 text-center">
        <h4
          className="
            text-xl xsm:text-2xl xs:text-4xl font-extrabold text-black/20 dark:text-primary
            border-b-4 border-black/10 dark:border-primary/70
            py-1
            select-none
          "
        >
          {total}
        </h4>
        <span
          className="
            block mt-3 uppercase tracking-widest
            text-black/30 dark:text-primary font-semibold
            select-none text-xs xs:text-sm
          "
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
