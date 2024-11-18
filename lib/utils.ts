"use client";

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

export function getPriorityStyles(priority: Task["priority"]) {
  const styles = {
    high: {
      badge: {
        border: "1px solid rgba(239, 68, 68, 0.75)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "rgb(239, 68, 68)",
        padding: "2px 6px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
      },
      dot: {
        height: "8px",
        width: "8px",
        borderRadius: "50%",
        backgroundColor: "rgb(239, 68, 68)",
        fontSize: "12px",
      },
    },
    medium: {
      badge: {
        border: "1px solid rgba(245, 158, 11, 0.75)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "rgb(245, 158, 11)",
        padding: "2px 6px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
      },
      dot: {
        height: "8px",
        width: "8px",
        borderRadius: "50%",
        backgroundColor: "rgb(245, 158, 11)",
      },
    },
    low: {
      badge: {
        border: "1px solid rgba(59, 130, 246, 0.75)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        color: "rgb(59, 130, 246)",
        padding: "2px 6px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
      },
      dot: {
        height: "8px",
        width: "8px",
        borderRadius: "50%",
        backgroundColor: "rgb(59, 130, 246)",
      },
    },
  };

  return styles[priority] || styles.low;
}

export function formatDate(date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  const suffix = (day: number) => {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
  };

  return `${dayOfWeek}, ${day}${suffix(day)} ${month}`;
}

export function getGreeting(
  timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) {
  // Get current time in user's timezone
  const date = new Date();
  const hours = date.toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  });

  const currentHour = parseInt(hours);

  // Determine greeting based on time
  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning 🌅";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon☀️";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good Evening 🌇";
  } else {
    greeting = "Good Night 🌙";
  }

  // Format time in both 12 and 24-hour formats
  const time12 = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timezone,
  });

  const time24 = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: timezone,
  });

  return {
    greeting,
    time12,
    time24,
    timezone,
  };
}
