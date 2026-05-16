"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "flex flex-col items-center justify-center text-center px-8 py-24",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-layer/40 mb-5">
          <span className="text-muted/50">{icon}</span>
        </div>
      )}
      <h3 className="text-body font-medium text-foreground/90 mb-1">{title}</h3>
      {description && (
        <p className="text-body-sm text-muted/60 max-w-[240px] leading-relaxed">{description}</p>
      )}
      {action && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-5 text-muted hover:text-foreground"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
