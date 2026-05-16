"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: "h-7 w-7 text-caption",
    md: "h-9 w-9 text-body-sm",
    lg: "h-12 w-12 text-body",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full overflow-hidden bg-layer",
        sizes[size],
        className
      )}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || fallback}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium text-muted uppercase">
          {fallback.slice(0, 2)}
        </span>
      )}
    </div>
  );
}
