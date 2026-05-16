"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-[1.5px]",
    md: "h-5 w-5 border-[1.5px]",
    lg: "h-7 w-7 border-2",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted/20 border-t-primary/70",
        sizes[size],
        className
      )}
    />
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[240px] gap-5">
      <LoadingSpinner size="lg" />
      {message && (
        <p className="text-body-sm text-muted/70">{message}</p>
      )}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-layer/50 animate-pulse",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-surface border border-border-subtle p-5 space-y-4">
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-14 rounded-md" />
        <Skeleton className="h-5 w-18 rounded-md" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
