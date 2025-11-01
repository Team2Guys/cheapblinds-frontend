"use client";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { MONTHLYGRAPH } from "@/types/general";

const baseColorArray = ["#80CAEE", "#3C50E0"];

const ChartOne = ({ chartData }: { chartData: MONTHLYGRAPH }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: isDark ? "#FFB803" : "#000000",
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
    colors: baseColorArray,
    chart: {
      background: isDark ? "#ffffff00" : "#ffffff", // Background color
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: { show: true },
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: 300 } } },
      { breakpoint: 1366, options: { chart: { height: 350 } } },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      borderColor: isDark ? "#FFB803" : "#e0e0e0",
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "12px",
        colors: [isDark ? "#FFB803" : "#000000"],
      },
      background: {
        enabled: true,
        borderRadius: 2,
      },
    },
    markers: {
      size: 4,
      colors: "#000",
      strokeColors: baseColorArray,
      strokeWidth: 3,
      fillOpacity: 1,
      hover: { sizeOffset: 5 },
    },
    xaxis: {
      type: "category",
      categories: chartData?.categories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: isDark ? "#FFB803" : "#000000" },
      },
    },
    yaxis: {
      title: { style: { fontSize: "0px" } },
      min: 0,
      labels: {
        style: { colors: isDark ? "#FFB803" : "#000000" },
      },
    },
  };

  return (
    <div className="col-span-12 border shadow-md shadow-black/10 dark:shadow-primary/30 dark:border-primary/30 p-5 rounded-xl sm:px-7 xl:col-span-8 space-y-4 bg-white dark:bg-white/20 hover:shadow-lg hover:dark:shadow-primary/50 transition-all duration-400 hover:-translate-y-1">
      <p className="font-semibold text-black dark:text-primary">Monthly Statistics</p>
      {chartData && (
        <ReactApexChart
          options={chartOptions}
          series={chartData.series}
          type="area"
          height={350}
          width="100%"
        />
      )}
    </div>
  );
};

export default ChartOne;
