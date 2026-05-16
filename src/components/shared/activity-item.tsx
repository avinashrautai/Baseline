"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Activity } from "@/types";
import { getUserById } from "@/data";
import { formatRelativeTime } from "@/lib/format";

interface ActivityItemProps {
  activity: Activity;
  compact?: boolean;
  className?: string;
}

export function ActivityItem({ activity, compact = false, className }: ActivityItemProps) {
  const user = getUserById(activity.userId);

  if (!user) return null;

  return (
    <div className={cn("flex items-start gap-3 px-3", compact ? "py-2.5" : "py-3", className)}>
      <Avatar
        fallback={user.initials}
        size="sm"
        className="flex-shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p className="text-body-sm text-foreground leading-relaxed">
          <span className="font-medium">{user.name}</span>{" "}
          <span className="text-muted">{activity.action}</span>{" "}
          <span className="text-foreground">{activity.target}</span>
        </p>
        <p className="text-caption text-muted/60 mt-0.5">
          {formatRelativeTime(activity.timestamp)}
        </p>
      </div>
    </div>
  );
}
