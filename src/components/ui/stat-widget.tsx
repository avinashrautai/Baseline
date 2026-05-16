"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatWidgetProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function StatWidget({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  className,
}: StatWidgetProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border-subtle rounded-xl p-4",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-caption text-muted uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-heading-1 text-foreground tabular-nums">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-caption mb-1",
              changeType === "positive" && "text-success",
              changeType === "negative" && "text-danger",
              changeType === "neutral" && "text-muted"
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
