"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types";
import { getUserById } from "@/data";
import { formatRelativeTime, getPriorityLabel } from "@/lib/format";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

interface TaskRowProps {
  task: Task;
  showProject?: boolean;
  className?: string;
}

export function TaskRow({ task, showProject = false, className }: TaskRowProps) {
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;

  const statusIcon = {
    "todo": <Circle className="h-4 w-4 text-muted" />,
    "in-progress": <Clock className="h-4 w-4 text-accent" />,
    "review": <AlertCircle className="h-4 w-4 text-warning" />,
    "done": <CheckCircle2 className="h-4 w-4 text-success" />,
  };

  const priorityVariant = {
    low: "muted" as const,
    medium: "default" as const,
    high: "accent" as const,
    urgent: "danger" as const,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-100",
        "hover:bg-layer/50 active:bg-layer cursor-pointer group",
        task.status === "done" && "opacity-70",
        className
      )}
    >
      {/* Status icon */}
      <div className="flex-shrink-0">
        {statusIcon[task.status]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-body text-foreground truncate",
            task.status === "done" && "line-through text-muted"
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {task.priority !== "medium" && (
            <Badge variant={priorityVariant[task.priority]} className="text-[10px] px-1.5 py-0">
              {getPriorityLabel(task.priority)}
            </Badge>
          )}
          {task.dueDate && (
            <span className="text-caption text-muted">
              Due {formatRelativeTime(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Assignee */}
      {assignee && (
        <Avatar
          fallback={assignee.initials}
          size="sm"
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100"
        />
      )}
    </div>
  );
}
