'use client';

import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { WEEKLYGRAPH } from 'types/general';

const baseColorArray = ['#80CAEE', '#3C50E0'];

const ChartTwo= ({chartData}:{chartData:WEEKLYGRAPH}) => {





  const options: ApexOptions = {
    colors: baseColorArray,
    theme: { mode: "dark" },
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
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
      categories: chartData?.categories,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      // markers: {
      //   radius: 99,
      // },
    },
    fill: {
      opacity: 1,
    },
  };


  return (
    <div className="col-span-12 rounded-sm border border-stroke p-7 shadow-default xl:col-span-4 bg-primary">

      <p className="inline-flex appearance-none py-1 pl-3 pr-8 text-sm font-medium bg-primary">

        Weekly Statistics
      </p>





      <div id="chartTwo" className="-mb-9 -ml-5">
        { 
          chartData && (
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
