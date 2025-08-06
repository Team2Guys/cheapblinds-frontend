'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Dashboard/Sidebar';
import Header from 'components/Dashboard/Header';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex bg-primary min-h-screen">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto overflow-x-hidden bg-white dark:bg-boxdark transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col ${!isTablet ? 'lg:ml-72' : ''} overflow-hidden`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 bg-primary dark:bg-boxdark text-white border dark:border-strokedark p-4 md:p-6 2xl:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
