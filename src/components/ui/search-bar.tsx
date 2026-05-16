"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  variant?: "default" | "minimal";
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, value, onClear, variant = "default", ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted/60" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "w-full pl-10 pr-10 py-2.5 text-body text-foreground placeholder:text-muted/50 transition-colors duration-150",
            "focus:outline-none",
            variant === "default" && [
              "rounded-xl bg-layer/40",
              "focus:bg-layer/60",
            ],
            variant === "minimal" && [
              "rounded-lg bg-layer/30",
              "focus:bg-layer/50",
            ]
          )}
          {...props}
        />
        {value && String(value).length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted/50 hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
