"use client";
import React from "react";
import CardDataStats from "./CardDataStats";
import { IoMdEye } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrDocumentPerformance } from "react-icons/gr";
import dynamic from "next/dynamic";
import { RECORDS } from "types/type";
import { MONTHLYGRAPH, WEEKLYGRAPH } from "types/general";
import { useSession } from "next-auth/react";
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
  const { data: loggedInUser } = useSession();
  const canViewUsers =
    loggedInUser && (loggedInUser.user.role == "Admin" ? loggedInUser.user.canViewUsers : true);
  const canViewSales =
    loggedInUser && (loggedInUser.user.role == "Admin" ? loggedInUser.user.canViewSales : true);
  const canVeiwAdmins =
    loggedInUser && (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwAdmins : true);
  const canVeiwTotalproducts =
    loggedInUser &&
    (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwTotalproducts : true);
  const canVeiwTotalCategories =
    loggedInUser &&
    (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwTotalCategories : true);
  const canVeiwTotalSubCategories =
    loggedInUser &&
    (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwTotalSubCategories : true);
  const canVeiwTotalBlog =
    loggedInUser && (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwTotalBlog : true);
  const canVeiwTotalRedirecturls =
    loggedInUser &&
    (loggedInUser.user.role == "Admin" ? loggedInUser.user.canVeiwTotalRedirecturls : true);
  const canViewAppointments =
    loggedInUser &&
    (loggedInUser.user.role == "Admin" ? loggedInUser.user.canViewAppointments : true);

  const cardStats = [
    {
      title: "Admins",
      total: records?.totalAdmins ?? "0",
      icon: <IoMdEye className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />,
      condition: canVeiwAdmins,
    },
    {
      title: "Sub Categories",
      total: records?.totalSubCategories ?? "0",
      icon: <BiCategory className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" />,
      condition: canVeiwTotalSubCategories,
    },

    {
      title: "Orders",
      total: records?.totalorders ?? "0",
      icon: <FiShoppingCart className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />,
      condition: canViewSales,
    },
    {
      title: "Abandoned Orders",
      total: records?.Total_abandant_order ?? "0",
      icon: (
        <GrDocumentPerformance className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />
      ),
      condition: canViewSales,
    },
    {
      title: "Categories",
      total: records?.totalCategories ?? "0",
      icon: <IoBagOutline className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />,
      condition: canVeiwTotalCategories,
    },
    {
      title: "Product",
      total: records?.totalProducts ?? "0",
      icon: <IoBagOutline className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />,
      condition: canVeiwTotalproducts,
    },
    {
      title: "Users",
      total: records?.totalUsers ?? "0",
      icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-lg xs:text-xl" />,
      condition: canViewUsers,
    },
    {
      title: "Blogs",
      total: records?.blogs ?? "0",
      icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" />,
      condition: canVeiwTotalBlog,
    },
    {
      title: "Blog Comments",
      total: records?.blogs_comments ?? "0",
      icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" />,
      condition: canVeiwTotalBlog,
    },
    {
      title: "Redirect Urls",
      total: records?.redirecturls ?? "0",
      icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" />,
      condition: canVeiwTotalRedirecturls,
    },
    {
      title: "Appointments",
      total: records?.appointments ?? "0",
      icon: <PiUsersThreeFill className="fill-black/20 dark:fill-primary text-xl xs:text-2xl" />,
      condition: canViewAppointments,
    },
  ];

  return (
    <>
      <div className="grid gap-3 xsm:gap-5 grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 2xl:gap-6 pb-4">
        {cardStats
          .filter((card) => card.condition)
          .map((card, idx) => (
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
