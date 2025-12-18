"use client";
import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  title?: string;
  slug?: string;
  subcategory?: string;
  className?: string;
}

export const Breadcrumb = ({
  title = "",
  slug = "",
  subcategory = "",
  className = "",
}: BreadcrumbProps) => {
  const arrow = (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12L6.25 7L0 2L1.25 0L10 7L1.25 14L0 12Z" fill="black" />
    </svg>
  );
  return (
    <div className={`z-20 w-full p-2 max-md:bg-secondary ${className}`}>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 container mx-auto">
        <Link href="/" className="capitalize text-[#00000099]">
          Home
        </Link>

        {slug && (
          <>
            {arrow}
            <Link href={`/${slug.toLowerCase()}/`} className="capitalize">
              {slug.replace(/-/g, " ")}
            </Link>
          </>
        )}

        {subcategory && (
          <>
            {arrow}
            {title ? (
              <Link
                href={`/${slug.toLowerCase()}/${subcategory.toLowerCase()}/`}
                className="capitalize"
              >
                {subcategory.replace(/-/g, " ")}
              </Link>
            ) : (
              <span className="capitalize">{subcategory.replace(/-/g, " ")}</span>
            )}
          </>
        )}

        {title && (
          <>
            {arrow}
            <span className="capitalize text-black">{title.replace(/-/g, " ")}</span>
          </>
        )}
      </div>
    </div>
  );
};
