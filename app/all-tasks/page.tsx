"use client";

import React from "react";
import TaskCard from "./_components/task-card";
import { Button } from "@/components/ui/button";
import { FilterIcon, PlusIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { TaskFilterBtn } from "./_components/task-filter-btn";
import { useGetAllTasksQuery } from "@/features/task/tasksApi";

export default function AllTasks() {
  const { data: tasks = [] } = useGetAllTasksQuery();
  console.log("✨ ~ file: page.tsx:11 ~ AllTasks ~ tasks:", tasks);
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="max-w-screen-lg mx-auto">
          <PageHeader
            desc="  Manage all your tasks here. You can search and filter tasks"
            title="All Tasks"
          />

          <div className="flex justify-start gap-2.5">
            <Button variant="default" className="text-white bg-primary">
              <PlusIcon />
              <span>Add Task</span>
            </Button>
            <Button variant="secondary" className="text-[#0055FF]">
              <FilterIcon />
              <span>Filters</span>
            </Button>
            <TaskFilterBtn />
          </div>
          <div className="flex justify-center items-center gap-4 flex-col  mt-6 ">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>
    </section>
  );
}
