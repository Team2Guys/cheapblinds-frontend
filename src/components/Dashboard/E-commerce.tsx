'use client';
import React from 'react';
import CardDataStats from './CardDataStats';
import { IoMdEye } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUsersThreeFill } from 'react-icons/pi';
import { IoBagOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { GrDocumentPerformance } from 'react-icons/gr';
// import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { RECORDS } from 'types/type';
import { MONTHLYGRAPH, WEEKLYGRAPH } from 'types/general';
const ChartTwo = dynamic(()=>import('./Charts/ChartTwo'),{ssr:false})
const ChartOne = dynamic(()=>import('./Charts/ChartOne'),{ssr:false})


const ECommerce = ({ records,chartData,weeklyChart }: { records: RECORDS, chartData: MONTHLYGRAPH, weeklyChart: WEEKLYGRAPH }) => {
  // const { data: loggedInUser } = useSession()
console.log(chartData,"chartData")
  // const canCheckProfit =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canCheckProfit : true);
  // const canViewUsers =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canViewUsers : true);
  // const canViewSales =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canViewSales : true);
  // const canVeiwAdmins =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canVeiwAdmins : true);
  // const canVeiwTotalproducts =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canVeiwTotalproducts : true);
  // const canVeiwTotalCategories =
  //   loggedInUser &&
  //   (loggedInUser.user.role == 'Admin' ? loggedInUser.user.canVeiwTotalCategories : true);

  const cardStats = [
    {
      title: 'Admins',
      total: records?.totalAdmins ?? '0',
      icon: <IoMdEye size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Sub Categories',
      total: records?.totalSubCategories ?? '',
      icon: <BiCategory size={25} className="text-white dark:text-black" />,
      condition: true,
    },

    {
      title: 'Orders',
      total: records?.totalorders ?? '',
      icon: (
        <FiShoppingCart size={25} className="text-white dark:text-black" />
      ),
      condition: true,
    },
    {
      title: 'Abandoned Orders',
      total: records?.Total_abandant_order ?? '',
      icon: (
        <GrDocumentPerformance size={25} className="text-white dark:text-black" />
      ),
      condition: true,
    },
    {
      title: 'Categories',
      total: records?.totalCategories ?? '',
      icon: <IoBagOutline size={25} className="text-white dark:text-black" />,
      condition: true,
    },
    {
      title: 'Product',
      total: records?.totalProducts ?? '',
      icon: <IoBagOutline size={25} className="text-white dark:text-black" />,
      condition: true,
    },
    {
      title: 'Users',
      total: records?.totalUsers ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Blogs',
      total: records?.blogs ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Blog Comments',
      total: records?.blogs_comments ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Jobs',
      total: records?.jobs ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },

    {
      title: 'Jobs Application',
      total: records?.jobApplication ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Redirect Urls',
      total: records?.redirecturls ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Admins',
      total: records?.totalAdmins ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },
    {
      title: 'Appointments',
      total: records?.appointments ?? '',
      icon: <PiUsersThreeFill size={25} className="fill-white dark:fill-black" />,
      condition: true,
    },


  ];


  

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 ">
        {cardStats
          .filter((card) => card.condition)
          .map((card, idx) => (
            <CardDataStats key={idx} title={card.title} total={card.total}>
              {card.icon}
            </CardDataStats>
          ))}
      </div>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne chartData={chartData} />
        <ChartTwo chartData={weeklyChart} />
      </div>
    </>
  );
};

export default ECommerce;
