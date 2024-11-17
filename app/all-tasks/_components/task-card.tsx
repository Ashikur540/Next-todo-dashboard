import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, CheckCheck, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task.types";
import { getPriorityClasses } from "@/lib/utils";
import { useUpdateTaskMutation } from "@/features/task/tasksApi";
import toast from "react-hot-toast";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [updateTaskMutation] = useUpdateTaskMutation();
  const isComplete = task?.status === "complete";
  const StatusIcon = isComplete ? CheckCheck : Clock;

  // Get class names for the priority
  const { borderClass, textClass, bgClass, bgWithOpacity } = getPriorityClasses(
    task?.priority
  );

  const handleCompleteTask = async (checked: boolean) => {
    try {
      await updateTaskMutation({
        id: task.id,
        status: checked ? "complete" : "pending",
      }).unwrap();
      const toastMethod = checked ? toast["success"] : toast;
      toastMethod(`Task marked as ${checked ? "completed" : "pending"}`);
    } catch (error) {
      console.log(
        "✨ ~ file: task-card.tsx:38 ~ handleCompleteTask ~ error:",
        error
      );
      toast.error("Failed to update task status");
    }
  };

  return (
    <Card className="px-4 py-2 w-full">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-start gap-2 items-center">
          <Checkbox checked={isComplete} onCheckedChange={handleCompleteTask} />
          <p
            className={`text-lg font-medium ${
              isComplete ? "line-through text-zinc-600" : ""
            }`}
          >
            {task?.name}
          </p>
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-sm text-zinc-500 mb-2 flex justify-between items-center gap-4 mt-2">
        <div className="text-sm text-zinc-500 flex items-center gap-2">
          <Calendar size={18} />
          {new Date(task?.createdAt).toDateString()}
          <div
            className={`px-1.5 py-0.5 border rounded-full flex items-center gap-2 ${bgWithOpacity} text-xs ${borderClass} ${textClass}`}
          >
            <div className={`h-2 w-2 rounded-full ${bgClass} `} />
            {task?.priority.charAt(0).toUpperCase() +
              task?.priority.slice(1).toLocaleLowerCase()}
          </div>
        </div>
        <div
          className={`px-2.5 py-1.5 ${
            isComplete
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-orange-600"
          } rounded-full flex items-center gap-1`}
        >
          <StatusIcon
            className={isComplete ? `text-green-600` : `text-orange-600`}
            size={16}
          />
          {isComplete ? "Done" : "Pending"}
        </div>
      </CardDescription>
    </Card>
  );
};

// Function to return priority classes

export default TaskCard;
