"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-8 py-20",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-layer/50 mb-5">
          <span className="text-muted/70">{icon}</span>
        </div>
      )}
      <h3 className="text-body font-medium text-foreground mb-1.5">{title}</h3>
      {description && (
        <p className="text-body-sm text-muted/70 max-w-[260px] leading-relaxed">{description}</p>
      )}
      {action && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-6"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
