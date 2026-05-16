"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "online" | "away" | "offline" | "busy";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ status, size = "sm", pulse = false, className }: StatusDotProps) {
  const sizes = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
  };

  const colors = {
    online: "bg-success",
    away: "bg-warning",
    offline: "bg-muted/50",
    busy: "bg-danger",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full",
        sizes[size],
        colors[status],
        pulse && status === "online" && "animate-pulse",
        className
      )}
    />
  );
}
