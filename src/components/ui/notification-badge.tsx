"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
  children: React.ReactNode;
}

export function NotificationBadge({
  count,
  max = 99,
  className,
  children,
}: NotificationBadgeProps) {
  const displayCount = count > max ? `${max}+` : String(count);

  return (
    <div className={cn("relative inline-flex", className)}>
      {children}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-[10px] font-bold text-foreground">
          {displayCount}
        </span>
      )}
    </div>
  );
}
