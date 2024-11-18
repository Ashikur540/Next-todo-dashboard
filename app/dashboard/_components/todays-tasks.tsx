import TaskCard from "@/app/all-tasks/_components/task-card";
import { CardTitle } from "@/components/ui/card";
import { selectTodaysTasks } from "@/features/task/taskSelector";
import React from "react";
import { useSelector } from "react-redux";

export default function TodaysTaskList() {
  const tasks = useSelector(selectTodaysTasks);
  return (
    <div className="mt-8">
      <CardTitle className="text-xl">Todays Tasks</CardTitle>
      <div className="flex justify-center items-center gap-4 flex-col  mt-4 ">
        {tasks.map((task) => (
          <TaskCard task={task} key={task?.id} />
        ))}
      </div>
    </div>
  );
}
