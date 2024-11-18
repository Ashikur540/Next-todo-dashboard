"use client";

import { CircularChart } from "@/components/circular-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllTasksQuery } from "@/features/task/tasksApi";
import {
  selectTaskGraphData,
  selectTaskStats,
} from "@/features/task/taskSelector";
import { useAppSelector } from "@/hooks/redux-hook";
import React, { useState } from "react";

type FilterType = "priority" | "status";

export function TasksByPriorityPieChart() {
  const { taskDataByPriority } = useAppSelector(selectTaskGraphData);
  const { totalPendingTasks, totalCompletedTasks, taskStatusArr } =
    useAppSelector(selectTaskStats);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("priority");

  const isPriority = selectedFilter === "priority";

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1 ">
          <CardTitle className="text-xl">
            Tasks by {isPriority ? " Priority" : "status"}
          </CardTitle>
          <CardDescription>
            These are the tasks by their{" "}
            {isPriority ? "priority level" : "status"}
          </CardDescription>
        </div>
        <Select
          value={selectedFilter}
          onValueChange={(v: FilterType) => setSelectedFilter(v)}
        >
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            <SelectItem value={"priority"} className="rounded-lg [&_span]:flex">
              Priority
            </SelectItem>
            <SelectItem value={"status"} className="rounded-lg [&_span]:flex">
              Status
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        {selectedFilter === "priority" ? (
          <CircularChart
            labels={taskDataByPriority.labels ?? [""]}
            series={taskDataByPriority.values ?? []}
            type="donut"
          />
        ) : (
          <CircularChart
            labels={taskStatusArr ?? [""]}
            series={[totalPendingTasks, totalCompletedTasks]}
            type="donut"
          />
        )}
      </CardContent>
    </Card>
  );
}
