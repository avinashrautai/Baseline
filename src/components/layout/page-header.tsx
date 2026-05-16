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
    <header className={cn("px-5 pt-10 pb-8 md:px-8 md:pt-12 md:pb-10", className)}>
      {back && <div className="mb-4">{back}</div>}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-heading-1 text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-body-sm text-muted mt-1.5 max-w-lg">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0 pt-0.5">{action}</div>}
      </div>
    </header>
  );
}
