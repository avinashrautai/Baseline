"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  back?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  back,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("px-5 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8", className)}>
      {back && <div className="mb-3">{back}</div>}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-heading-1 md:text-display text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-body text-muted mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  );
}
