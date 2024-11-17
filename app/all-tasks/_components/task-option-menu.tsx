import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Trash } from "lucide-react";
import { TaskModal } from "./task-modal";
import { Task } from "@/types/task.types";
import { cn } from "@/lib/utils";
import { useDeleteTaskMutation } from "@/features/task/tasksApi";
import toast from "react-hot-toast";

type TaskMenuProps = {
  task: Task;
  className?: string;
};

// TaskOptionMenu.tsx
const TaskOptionMenu = ({ task, className, ...props }: TaskMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    await deleteTaskMutation(task?.id);
    toast.success("Task deleted");
  };
  return (
    <div className={cn(className)} {...props}>
      <DropdownMenu
        open={isMenuOpen}
        onOpenChange={() => setIsMenuOpen((prev) => !prev)}
      >
        <DropdownMenuTrigger>
          <Ellipsis size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <TaskModal task={task} onMenuClose={() => setIsMenuOpen(false)} />
          <DropdownMenuItem className="text-red-600" onClick={handleDeleteTask}>
            <Trash className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskOptionMenu;
