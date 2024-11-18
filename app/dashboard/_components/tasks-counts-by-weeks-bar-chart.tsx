import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllTasksQuery } from "@/features/task/tasksApi";
import { selectWeeklyTasksData } from "@/features/task/taskSelector";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export const TasksByLastWeek = () => {
  const { isLoading } = useGetAllTasksQuery();
  const { weeklyTasksData } = useSelector(selectWeeklyTasksData);
  const labels = weeklyTasksData.map((data) => data.day);
  const values = weeklyTasksData.map((data) => data.total);
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
      textAnchor: "start",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels ?? [],
      labels: {
        rotateAlways: false,
        rotate: 0,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontFamily: "inherit",
      },
    },
    noData: {
      text: "No data available",
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

    fill: {
      opacity: 1,
      colors: ["#11428D"],
    },
  };

  const chartSeries = [
    {
      name: "Tasks last week",
      data: values ?? [],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Tasks Last week</CardTitle>
        <CardDescription>This are the tasks from last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" max-h-[410px]">
          {isLoading ? (
            <Skeleton className="h-[185px] w-[250px] rounded-xl" />
          ) : (
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height="250"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
