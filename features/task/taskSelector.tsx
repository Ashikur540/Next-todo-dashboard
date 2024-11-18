import { createSelector } from "@reduxjs/toolkit";
import { tasksApi } from "./tasksApi";
import { Task } from "@/types/task.types";

export const selectTaskStats = createSelector(
  [tasksApi.endpoints.getAllTasks.select()],
  (allTaskRes) => {
    const allTasks = allTaskRes.data;

    const totalTasks = allTasks?.length ?? 0;
    const totalPendingTasks =
      allTasks?.filter((task) => task.status === "pending")?.length ?? 0;
    const totalCompletedTasks =
      allTasks?.filter((task) => task.status === "complete")?.length ?? 0;
    const taskStatusArr = [...new Set(allTasks?.map((task) => task.status))];

    return {
      totalTasks,
      totalPendingTasks,
      totalCompletedTasks,
      taskStatusArr,
    };
  }
);

export const selectTaskGraphData = createSelector(
  [tasksApi.endpoints.getAllTasks.select()],
  (allTaskRes) => {
    const allTasks = allTaskRes.data;
    const taskCountByPriority =
      allTasks?.reduce((ac: Record<string, number>, cv: Task) => {
        if (ac[cv.priority]) {
          ac[cv.priority] += 1;
        } else {
          ac[cv.priority] = 1;
        }
        return ac;
      }, {}) ?? {};

    const taskDataByPriority = {
      labels: [] as string[],
      values: [] as number[],
    };
    for (const key in taskCountByPriority) {
      taskDataByPriority.labels.push(key);
      taskDataByPriority.values.push(taskCountByPriority[key]);
    }

    return {
      taskDataByPriority,
      tasksCountByPriority: {
        low: allTasks?.filter((task) => task.priority === "low")?.length ?? 0,
        medium:
          allTasks?.filter((task) => task.priority === "medium")?.length ?? 0,
        high: allTasks?.filter((task) => task.priority === "high")?.length ?? 0,
      },
    };
  }
);

export const selectWeeklyTasksData = createSelector(
  [tasksApi.endpoints.getAllTasks.select()],
  (tasksResult) => {
    const tasks = tasksResult.data ?? [];

    // Get dates for last 7 days including today
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse(); // Reverse to show oldest to newest

    const weeklyTasksData = dates.map((date) => {
      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.createdAt);
        return taskDate.toDateString() === date.toDateString();
      });

      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toISOString(),
        total: dayTasks.length,
      };
    });

    return {
      weeklyTasksData,
    };
  }
);

export const selectTodaysTasks = createSelector(
  [tasksApi.endpoints.getAllTasks.select()],
  (tasksResult) => {
    const tasks = tasksResult.data ?? [];
    const today = new Date().toDateString();

    return tasks.filter((task) => {
      const taskDate = new Date(task.createdAt).toDateString();
      const matchesDate = taskDate === today;

      return matchesDate && task;
    });
  }
);
