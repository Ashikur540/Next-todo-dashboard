import { getTasksFromLocalStorage, saveTaskToLocalStorage } from "@/lib/utils";
import { Task } from "@/types/task.types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      queryFn: () => {
        // show pending task first
        const tasks = getTasksFromLocalStorage().sort((a, b) => {
          // Compare by status then created time
          if (a.status === "pending" && b.status !== "pending") return -1; // a before b
          if (a.status !== "pending" && b.status === "pending") return 1; // b before a
          return Number(b.id) - Number(a.id); // latest first
        });
        // .sort((a, b) => Number(b.id) - Number(a.id));

        return { data: tasks };
      },
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation<Task, Omit<Task, "id" | "createdAt" | "status">>({
      queryFn: (newTask) => {
        const tasks = getTasksFromLocalStorage();
        const task: Task = {
          ...newTask,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: "pending",
        };
        saveTaskToLocalStorage([...tasks, task]);
        return { data: task };
      },
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, Partial<Task> & { id: string }>({
      queryFn: (updates) => {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.map((task: Task) =>
          task.id === updates.id ? { ...task, ...updates } : task
        );
        saveTaskToLocalStorage(updatedTasks);
        return {
          data: updatedTasks.find((t: Task) => t.id === updates.id) as Task,
        };
      },
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<void, string>({
      queryFn: (id) => {
        const tasks = getTasksFromLocalStorage();
        const filteredTasks = tasks.filter((task: Task) => task.id !== id);
        saveTaskToLocalStorage(filteredTasks);
        return { data: undefined };
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
