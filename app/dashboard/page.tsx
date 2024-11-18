"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Greetings } from "./_components/greetings";
import { TasksStatsBlocksRow } from "./_components/tasks-stats-blocks-row";
import TodaysTaskList from "./_components/todays-tasks";

// Dynamically import cz ApexCharts relies on the browser's window object
const TasksByPriorityPieChart = dynamic(
  () =>
    import("./_components/tasks-by-priority-pie-chart").then(
      (mod) => mod.TasksByPriorityPieChart
    ),
  { ssr: false }
);
const TasksByLastWeek = dynamic(
  () =>
    import("./_components/tasks-counts-by-weeks-bar-chart").then(
      (mod) => mod.TasksByLastWeek
    ),
  { ssr: false }
);

export default function Dashboard() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="max-w-screen-lg mx-auto">
          {/* greet block */}
          <Greetings />
          <TasksStatsBlocksRow />
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-4">
            <TasksByLastWeek />
            <TasksByPriorityPieChart />
          </div>
          <TodaysTaskList />
        </div>
      </div>
    </section>
  );
}
