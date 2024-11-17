import z from "zod";

export const taskFormSchema = z.object({
  name: z.string().trim().min(2).max(80),
  priority: z.enum(["low", "medium", "high"]),
});
