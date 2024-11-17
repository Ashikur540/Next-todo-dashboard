export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "complete";

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}
