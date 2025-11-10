"use client";
import React, { useState, useCallback } from "react";
import { Breadcrumb, TabContent, TabBar } from "@components";

interface Tab {
  id: number;
  label: string;
  component: () => React.ReactNode;
}

export const VerticalTabs = ({ tabs }: { tabs: Tab[] }) => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabChange = useCallback((id: number) => {
    setSelectedTabId(id);
  }, []);

  const selectedTab = tabs.find((tab) => tab.id === selectedTabId);

  return (
    <>
      <Breadcrumb title={selectedTab?.label || ""} />
      <div className="md:my-10 md:px-8 flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-3/12">
          <TabBar tabs={tabs} selectedTabId={selectedTabId} onTabChange={handleTabChange} />
        </div>

        <div className="w-full md:w-9/12 px-2">
          <TabContent component={selectedTab?.component} />
        </div>
      </div>
    </>
  );
};
