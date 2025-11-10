"use client";
import React from "react";

export const TabContent = ({ component }: { component?: () => React.ReactNode }) => {
  if (!component) return null;
  const Component = component;
  return <>{Component()}</>;
};
