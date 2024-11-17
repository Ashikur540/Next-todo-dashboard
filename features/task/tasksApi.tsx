import { getTasksFromLocalStorage } from "@/lib/utils";
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
        return { data: getTasksFromLocalStorage() };
      },
      providesTags: ["Tasks"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTasksQuery } = tasksApi;
