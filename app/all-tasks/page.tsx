"use client";

import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import TaskCard from "./_components/task-card";
import { PageHeader } from "@/components/ui/page-header";
import { TaskFilterBtn } from "./_components/task-filter-btn";
import { useGetAllTasksQuery } from "@/features/task/tasksApi";
import { TaskModal } from "./_components/task-modal";

export default function AllTasks() {
  const { data: tasks = [] } = useGetAllTasksQuery();
  const form = useForm<{ selectedFilters: string[] }>({
    defaultValues: { selectedFilters: [] },
  });
  const selectedFilters = form.watch("selectedFilters");
  const selectedValues = useMemo(
    () => new Set(selectedFilters),
    [selectedFilters]
  );

  // Filter tasks based on selected priorities
  const filteredTasks = useMemo(() => {
    if (selectedValues.size === 0) return tasks;
    return tasks?.filter((task) => selectedValues.has(task.priority)) ?? [];
  }, [tasks, selectedValues]);

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="max-w-screen-lg mx-auto">
          <PageHeader
            desc="  Manage all your tasks here. You can search and filter tasks"
            title="All Tasks"
          />

          <div className="flex justify-start gap-2.5">
            <TaskModal />
            <FormProvider {...form}>
              <TaskFilterBtn selectedValues={selectedValues} />
            </FormProvider>
          </div>
          <div className="flex justify-center items-center gap-4 flex-col  mt-6 ">
            {filteredTasks.map((task) => (
              <TaskCard task={task} key={task?.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
