import dynamic from "next/dynamic";
const ECommerce = dynamic(() => import("@components/Dashboard/E-commerce"));
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import { get_all_records } from "@config/fetch";
import { MONTHLYSTATS_HANDLER, WEEEKLYSTATSHANDLER } from "@config/generals";
import { STATUS } from "@/types/general";

async function DashboardMain() {
  // const token  = await getToken()
  const token = "hello";

  const [records, monthlyStats, weeklyStats] = await Promise.all([
    get_all_records(),
    MONTHLYSTATS_HANDLER(token),
    WEEEKLYSTATSHANDLER(token),
  ]);

  const categories = monthlyStats?.orders?.map(
    (item: { month: string; Revenue: number; Orders: number }) => item.month,
  );
  const appointmentsData = monthlyStats?.appointments?.map(
    (item: { Appointments: string; Orders: number }) => item.Appointments || 0,
  );
  const ordersData = monthlyStats?.orders?.map(
    (item: { month: string; Revenue: number; Orders: number }) => item.Orders || 0,
  );

  const charts = {
    categories,
    series: [
      { name: "Appointments", data: appointmentsData },
      { name: "Orders", data: ordersData },
    ],
  };

  const defaultArray = [
    {
      name: "Appointments",
      data: weeklyStats?.map((item: STATUS) => item.Appointments),
    },
    {
      name: "Orders",
      data: weeklyStats?.map((item: STATUS) => item.Orders),
    },
  ];

  const weeklyChart = {
    categories: weeklyStats?.map((item: STATUS) => item.day),
    series: defaultArray,
  };
  return (
    <DefaultLayout>
      <ECommerce records={records} chartData={charts} weeklyChart={weeklyChart} />
    </DefaultLayout>
  );
}

export default DashboardMain;
