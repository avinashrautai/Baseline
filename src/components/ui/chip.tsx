"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ChipProps {
  children: React.ReactNode;
  onRemove?: () => void;
  active?: boolean;
  className?: string;
}

export function Chip({ children, onRemove, active = false, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-body-sm font-medium transition-colors duration-100",
        active
          ? "bg-primary/15 text-primary border border-primary/30"
          : "bg-layer text-muted border border-transparent hover:text-foreground",
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded hover:bg-background/30 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
