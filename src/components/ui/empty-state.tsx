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
        "flex flex-col items-center justify-center text-center px-6 py-16",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-layer mb-4">
          <span className="text-muted">{icon}</span>
        </div>
      )}
      <h3 className="text-heading-3 text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-body-sm text-muted max-w-[280px]">{description}</p>
      )}
      {action && (
        <Button
          variant="default"
          size="sm"
          className="mt-5"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
