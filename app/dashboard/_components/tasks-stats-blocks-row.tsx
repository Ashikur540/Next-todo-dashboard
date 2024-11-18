"use client";

import React from "react";
import { DashboardSmallMetricsBlock } from "./dashboard-small-metrics-block";
import { useSelector } from "react-redux";
import { selectTaskStats } from "@/features/task/taskSelector";
import { useGetAllTasksQuery } from "@/features/task/tasksApi";
import { Skeleton } from "@/components/ui/skeleton";

export const TasksStatsBlocksRow = () => {
  const { isLoading } = useGetAllTasksQuery();
  const { totalCompletedTasks, totalPendingTasks, totalTasks } =
    useSelector(selectTaskStats);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-12">
      {isLoading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      ) : (
        <DashboardSmallMetricsBlock
          metricValue={totalTasks}
          title="Total Tasks"
        />
      )}
      {isLoading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      ) : (
        <DashboardSmallMetricsBlock
          metricValue={totalPendingTasks}
          title="Total Pending"
        />
      )}
      {isLoading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      ) : (
        <DashboardSmallMetricsBlock
          metricValue={totalCompletedTasks}
          title="Total Completed"
        />
      )}
    </div>
  );
};
