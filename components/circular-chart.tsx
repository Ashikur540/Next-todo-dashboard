import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

import { Skeleton } from "./ui/skeleton";
import { EmptyReportPlaceHolder } from "./empty-chart-placeholder";

type CircularChartProps = {
  labels: string[];
  series: number[];
  height?: string;
  type: ApexChart["type"];
  isLoading?: boolean;
  chartOptions?: ApexOptions; // Optional customization for specific charts
};

export const CircularChart = ({
  labels,
  series,
  type,
  height,
  isLoading,
  chartOptions,
}: CircularChartProps) => {
  const defaultChartOptions: ApexOptions = {
    colors: [
      "#10428d",
      "#ffb703",
      "#47cdea",
      "#775DD0",
      "#f28482",
      "#2a9d8f",
      "#e9c46a",
      "#fec89a",
      "#e76f51",
    ],
    chart: {
      type: type,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
        expandOnClick: false,
      },
    },
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontSize: "15px",
      fontFamily: "inherit",
      formatter(legendName, opts) {
        return legendName.charAt(0).toLocaleUpperCase() + legendName.slice(1);
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#fff"],
      lineCap: "round",
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    noData: {
      text: "No Data Available",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "16px",
        fontFamily: "inherit",
      },
    },
  };

  const mergedOptions = { ...defaultChartOptions, ...chartOptions };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[185px] w-[250px] rounded-xl" />
      ) : series.length === 0 ? (
        <EmptyReportPlaceHolder />
      ) : (
        <ReactApexChart
          options={mergedOptions}
          series={series}
          type={type}
          height={height ?? "250"}
        />
      )}
    </>
  );
};
