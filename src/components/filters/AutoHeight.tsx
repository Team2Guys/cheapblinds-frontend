"use client";
import React, { useRef, useState, useEffect, ReactNode } from "react";

interface AutoHeightProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function AutoHeight({ isOpen, children }: AutoHeightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && ref.current) {
      setHeight(ref.current.scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [isOpen, children]);

  return (
    <div
      style={{ maxHeight: height }}
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 pt-4" : "opacity-0 pt-0"}
      `}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}
