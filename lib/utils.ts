import { Task } from "@/types/task.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const localStorageName = "FlowMate-Tasks";

export function getTasksFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem(localStorageName);
  return tasks ? JSON.parse(tasks) : [];
}

export function saveTaskToLocalStorage(tasks: Task[]) {
  localStorage.setItem(localStorageName, JSON.stringify(tasks));
}

export function getPriorityClasses(priority: Task["priority"]) {
  switch (priority) {
    case "high":
      return {
        borderClass: "border-primary/75",
        bgWithOpacity: "bg-primary/10",
        textClass: "text-primary",
        bgClass: "bg-primary",
      };
    case "medium":
      return {
        borderClass: "border-indigo-500/75",
        bgWithOpacity: "bg-indigo-500/10",
        textClass: "text-indigo-500",
        bgClass: "bg-indigo-500",
      };
    case "low":
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
}
