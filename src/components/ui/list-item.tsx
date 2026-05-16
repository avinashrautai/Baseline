"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  destructive?: boolean;
}

export function ListItem({
  icon,
  title,
  subtitle,
  trailing,
  showChevron = false,
  destructive = false,
  className,
  ...props
}: ListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-100 cursor-pointer",
        "hover:bg-layer/40 active:bg-layer/60",
        destructive && "hover:bg-danger/5",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg bg-layer/60",
            destructive && "bg-danger/8"
          )}
        >
          <span className={cn("text-muted", destructive && "text-danger")}>
            {icon}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-body text-foreground",
            destructive && "text-danger"
          )}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-caption text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      {trailing && <div className="text-muted flex-shrink-0">{trailing}</div>}
      {showChevron && (
        <ChevronRight className="h-3.5 w-3.5 text-muted/40 flex-shrink-0" />
      )}
    </div>
  );
}
