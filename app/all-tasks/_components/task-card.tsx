import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, CheckCheck, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const TaskCard = () => {
  const isComplete = true;
  const taskPriority: "HIGH" | "MEDIUM" | "LOW" = "HIGH";
  const StatusIcon = isComplete ? CheckCheck : Clock;

  // Get class names for the priority
  const { borderClass, textClass, bgClass, bgWithOpacity } =
    getPriorityClasses(taskPriority);

  return (
    <Card className="px-4 py-2 w-full">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-start gap-2 items-center">
          <Checkbox />
          <p
            className={`text-lg font-medium ${
              isComplete ? "line-through text-zinc-600" : ""
            }`}
          >
            Complete the frontend development task
          </p>
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-sm text-zinc-500 mb-2 flex justify-between items-center gap-4 mt-2">
        <div className="text-sm text-zinc-500 flex items-center gap-2">
          <Calendar size={18} /> 11 Jan 2020
          <div
            className={`px-1.5 py-0.5 border rounded-full flex items-center gap-2 ${bgWithOpacity} text-xs ${borderClass} ${textClass}`}
          >
            <div className={`h-2 w-2 rounded-full ${bgClass}`} />
            {taskPriority.charAt(0).toUpperCase() +
              taskPriority.slice(1).toLocaleLowerCase()}
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
const getPriorityClasses = (priority: "HIGH" | "MEDIUM" | "LOW") => {
  switch (priority) {
    case "HIGH":
      return {
        borderClass: "border-primary/75",
        bgWithOpacity: "bg-primary/10",
        textClass: "text-primary",
        bgClass: "bg-primary",
      };
    case "MEDIUM":
      return {
        borderClass: "border-indigo-500/75",
        bgWithOpacity: "bg-indigo-500/10",
        textClass: "text-indigo-500",
        bgClass: "bg-indigo-500",
      };
    case "LOW":
      return {
        borderClass: "border-orange-500/75",
        textClass: "text-orange-500",
        bgWithOpacity: "bg-orange-500/10",
        bgClass: "bg-orange-500",
      };
    default:
      return {
        borderClass: "border-gray-300",
        textClass: "text-gray-500",
        bgWithOpacity: "bg-gray-500/10",
        bgClass: "bg-gray-300",
      };
  }
};

export default TaskCard;
