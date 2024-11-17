import toast from "react-hot-toast";
import { PlusIcon, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { taskFormSchema } from "@/schemas/taskSchema";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "@/features/task/tasksApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useModal } from "@/hooks/use-modal";
import { Task } from "@/types/task.types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type TaskModalProps = {
  task?: Task;
  onMenuClose?: () => void;
};

export function TaskModal({ task, onMenuClose }: TaskModalProps) {
  const editMode = task?.id ? true : false;
  // console.log("✨ ~ file: task-modal.tsx:42 ~ TaskModal ~ editMode:", editMode);
  const [addTaskMutation] = useAddTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const { isModalOpen, handleOpenModal, handleToggleModal } = useModal();

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: editMode
      ? task
      : {
          name: "",
          priority: "medium",
        },
  });

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    console.log("✨ ~ file: task-modal.tsx:47 ~ onSubmit ~ values:", values);
    let updatedTask;
    try {
      if (editMode) {
        updatedTask = await updateTaskMutation({
          id: String(task?.id),
          ...values,
        }).unwrap();
      } else {
        await addTaskMutation(values);
      }
      const toastMsg = updatedTask?.id
        ? `Task Modified`
        : `Task created successfully`;
      toast.success(toastMsg);

      form.reset();
      handleToggleModal(false);
      onMenuClose?.(); // menu closes
    } catch (error) {
      console.log("✨ onSubmit ~ error:", error);
      toast.error("Error creating task. Try again!");
    }
  }
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(v) => {
        handleToggleModal(v);
        onMenuClose?.(); // cross button click menu closes too
      }}
    >
      <DialogTrigger asChild>
        {editMode ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
          >
            <SquarePen />
            Edit
          </DropdownMenuItem>
        ) : (
          <Button variant="default" className="text-white bg-primary">
            <PlusIcon />
            <span>Add Task</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit task" : "Add task"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📝Task</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Swim 12 laps 🏊‍♀️.."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🚩Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {editMode ? "Save changes" : "Add new task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
