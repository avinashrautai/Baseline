"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui/status-dot";
import { User } from "@/types";

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
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-100",
        onClick && "hover:bg-layer/30 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <Avatar fallback={user.initials} size="sm" />
        {showStatus && (
          <StatusDot
            status={user.status}
            className="absolute -bottom-0.5 -right-0.5 ring-2 ring-surface"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body text-foreground truncate">{user.name}</p>
        <p className="text-caption text-muted truncate">{user.role}</p>
      </div>

      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  );
}
