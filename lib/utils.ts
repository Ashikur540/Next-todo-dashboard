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

export function saveTaskToLocalStorage(task: Task) {
  localStorage.setItem(localStorageName, JSON.stringify(task));
}
