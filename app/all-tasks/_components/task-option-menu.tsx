import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { TaskModal } from "./task-modal";
import { Task } from "@/types/task.types";
import { cn } from "@/lib/utils";
import { useDeleteTaskMutation } from "@/features/task/tasksApi";
import toast from "react-hot-toast";
import { TaskDeleteConfirmModal } from "./task-delete-confirmation-modal";

type TaskMenuProps = {
  task: Task;
  className?: string;
};

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
          <TaskDeleteConfirmModal onDelete={handleDeleteTask} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskOptionMenu;
