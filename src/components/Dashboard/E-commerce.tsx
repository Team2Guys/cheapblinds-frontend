"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CardDataStats from "./CardDataStats";
import { IoMdEye } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrDocumentPerformance } from "react-icons/gr";
import dynamic from "next/dynamic";
import { RECORDS } from "@/types/type";
import { MONTHLYGRAPH, WEEKLYGRAPH } from "@/types/general";
import { useAuth } from "@context/UserContext";

const ChartTwo = dynamic(() => import("./Charts/ChartTwo"), { ssr: false });
const ChartOne = dynamic(() => import("./Charts/ChartOne"), { ssr: false });

const ECommerce = ({
  records,
  chartData,
  weeklyChart,
}: {
  records: RECORDS;
  chartData: MONTHLYGRAPH;
  weeklyChart: WEEKLYGRAPH;
}) => {
  const router = useRouter();
  const { admin, role,isLoading } = useAuth();

 useEffect(() => {
  if (!isLoading && !admin?.accessToken) {
    router.replace("/dashboard/Admin-login");
  }
}, [isLoading, admin, router]);


  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "ADMIN";

  const adminAllowedCards = [
    "Orders",
    "Abandoned Orders",
    "Users",
    "Product",
    "Categories",
    "Blogs",
    "Blog Comments",
    "Redirect Urls",
  ];

  const cardStats = [
    { title: "Admins", total: records?.totalAdmins ?? "0", icon: <IoMdEye className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Sub Categories", total: records?.totalSubCategories ?? "0", icon: <BiCategory className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" /> },
    { title: "Orders", total: records?.totalorders ?? "0", icon: <FiShoppingCart className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Abandoned Orders", total: records?.Total_abandant_order ?? "0", icon: <GrDocumentPerformance className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Categories", total: records?.totalCategories ?? "0", icon: <IoBagOutline className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Product", total: records?.totalProducts ?? "0", icon: <IoBagOutline className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Users", total: records?.totalUsers ?? "0", icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-lg xs:text-xl" /> },
    { title: "Blogs", total: records?.blogs ?? "0", icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" /> },
    { title: "Blog Comments", total: records?.blogs_comments ?? "0", icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" /> },
    { title: "Redirect Urls", total: records?.redirecturls ?? "0", icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" /> },
    { title: "Appointments", total: records?.appointments ?? "0", icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" /> },
  ];

  const filteredCards = cardStats.filter((card) => {
    if (isSuperAdmin) return true;
    if (isAdmin) return adminAllowedCards.includes(card.title);
    return false;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 xsm:gap-5 grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 2xl:gap-6 pb-4">
        {filteredCards.map((card, idx) => (
          <CardDataStats key={idx} title={card.title} total={card.total}>
            {card.icon}
          </CardDataStats>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 mt-2 md:gap-6 2xl:gap-7.5">
        <ChartOne chartData={chartData} />
        <ChartTwo chartData={weeklyChart} />
      </div>
    </>
  );
};

export default ECommerce;
