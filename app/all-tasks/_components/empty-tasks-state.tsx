import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TaskModal } from "./task-modal";

export default function EmptyTasksPlaceHolder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          <Image
            src={`/to-do-list.png`}
            width={100}
            height={100}
            alt="empty-state-image"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-center gap-1 mt-4">
          <h4 className=" text-xl font-semibold tracking-tight ">
            No Tasks Found
          </h4>
          <span className="text-muted-foreground">
            Save your working time by creating a new task.
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <TaskModal />
      </div>
    </div>
  );
}
