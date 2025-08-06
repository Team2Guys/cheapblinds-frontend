'use client';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { MONTHLYGRAPH } from 'types/general';

const baseColorArray = ['#80CAEE', '#3C50E0'];

const ChartOne = ({chartData}:{chartData : MONTHLYGRAPH}) => {


  const chartOptions: ApexOptions = {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    theme: { mode: 'dark' },
    colors: baseColorArray,
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',

      dropShadow: {
        enabled: true,
        color: '#000',
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
      curve: 'straight',
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: {
      enabled: false, style: {
        fontSize: '12px',
        colors: ['#000'],
      },

      background: {
        enabled: true,
        borderRadius: 2,
      }
    },
    markers: {
      size: 4,
      colors: '#000',
      strokeColors: baseColorArray,
      strokeWidth: 3,
      fillOpacity: 1,
      hover: { sizeOffset: 5 },
    },
    xaxis: {
      type: 'category',
      categories: chartData?.categories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { style: { fontSize: '0px' } },
      min: 0,
    },

  };



  return (
    <div className="col-span-12 rounded-sm border border-stroke  px-5 pb-5 pt-7 shadow-default sm:px-7 xl:col-span-8 bg-primary">
    
     
          <div className="flex min-w-48 pb-5">
            Monthly Statistics
          </div>




          {
          (
            chartData && (
              <ReactApexChart
                options={chartOptions}
                series={chartData.series}
                type="area"
                height={350}
                width="100%"
              />
            )
          )}


    </div>
  );
};

export default ChartOne;
