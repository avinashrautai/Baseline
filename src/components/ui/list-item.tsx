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
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-100 cursor-pointer",
        "hover:bg-layer/50 active:bg-layer",
        destructive && "hover:bg-danger/5",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg bg-layer",
            destructive && "bg-danger/10"
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
            "text-body text-foreground truncate",
            destructive && "text-danger"
          )}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-body-sm text-muted truncate">{subtitle}</p>
        )}
      </div>
      {trailing && <div className="text-muted flex-shrink-0">{trailing}</div>}
      {showChevron && (
        <ChevronRight className="h-4 w-4 text-muted/50 flex-shrink-0" />
      )}
    </div>
  );
}
