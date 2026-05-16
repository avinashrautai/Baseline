"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "success" | "warning" | "danger";
  animated?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  variant = "primary",
  animated = true,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2.5",
  };

  const variants = {
    primary: "bg-primary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-caption text-muted">Progress</span>
          <span className="text-caption text-foreground tabular-nums font-medium">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-layer rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          className={cn("h-full rounded-full", variants[variant])}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        />
      </div>
    </div>
  );
}
