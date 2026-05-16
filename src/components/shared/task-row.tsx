"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Task } from "@/types";
import { getUserById } from "@/data";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TaskRowProps {
  task: Task;
  className?: string;
}

export function TaskRow({ task, className }: TaskRowProps) {
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;

  const statusIcon = {
    "todo": <Circle className="h-[15px] w-[15px] text-muted/50" />,
    "in-progress": <Clock className="h-[15px] w-[15px] text-accent" />,
    "review": <Clock className="h-[15px] w-[15px] text-warning" />,
    "done": <CheckCircle2 className="h-[15px] w-[15px] text-success/70" />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-150",
        "hover:bg-layer/20 cursor-pointer",
        task.status === "done" && "opacity-50",
        className
      )}
    >
      <div className="flex-shrink-0">
        {statusIcon[task.status]}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-body text-foreground truncate",
            task.status === "done" && "line-through text-muted"
          )}
        >
          {task.title}
        </p>
      </div>

      {assignee && (
        <Avatar
          fallback={assignee.initials}
          size="sm"
          className="flex-shrink-0"
        />
      )}
    </div>
  );
}
