'use client';

import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { WEEKLYGRAPH } from 'types/general';

const baseColorArray = ['#80CAEE', '#3C50E0'];

const ChartTwo = ({ chartData }: { chartData: WEEKLYGRAPH }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      document.documentElement.classList.contains('dark');
    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const options: ApexOptions = {
    colors: baseColorArray,
    theme: { mode: isDark ? 'dark' : 'light' },
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      background: isDark ? '#ffffff00' : '#ffffff',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData?.categories || [],
      labels: {
        style: { colors: isDark ? '#FFB803' : '#000000' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: isDark ? '#FFB803' : '#000000' },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      labels: {
        colors: isDark ? '#FFB803' : '#000000',
      },
    },
    grid: {
      borderColor: isDark ? '#FFB803' : '#e0e0e0',
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-xl border shadow-md shadow-black/10 dark:shadow-primary/30 dark:border-primary/30 p-5 xl:col-span-4 space-y-4 bg-white dark:bg-white/20 hover:shadow-lg hover:dark:shadow-primary/50 transition-all duration-400 hover:-translate-y-1">
      <p className="font-semibold text-black dark:text-primary">Weekly Statistics</p>

      <div id="chartTwo">
        {chartData && (
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
            width="100%"
          />
        )}
      </div>
    </div>
  );
};

export default ChartTwo;
