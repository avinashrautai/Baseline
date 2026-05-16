"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui/status-dot";
import { User } from "@/types";
import { ChevronRight } from "lucide-react";

interface MemberRowProps {
  user: User;
  showStatus?: boolean;
  showChevron?: boolean;
  trailing?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MemberRow({
  user,
  showStatus = true,
  showChevron = false,
  trailing,
  className,
  onClick,
}: MemberRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-100",
        onClick && "hover:bg-layer/50 active:bg-layer cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Avatar with status */}
      <div className="relative flex-shrink-0">
        <Avatar fallback={user.initials} size="md" />
        {showStatus && (
          <StatusDot
            status={user.status}
            className="absolute -bottom-0.5 -right-0.5 ring-2 ring-surface"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-body font-medium text-foreground truncate">
          {user.name}
        </p>
        <p className="text-body-sm text-muted truncate">{user.role}</p>
      </div>

      {/* Trailing */}
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
      {showChevron && (
        <ChevronRight className="h-4 w-4 text-muted/50 flex-shrink-0" />
      )}
    </div>
  );
}
