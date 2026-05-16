"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Notification } from "@/types";
import { formatRelativeTime } from "@/lib/format";
import { AtSign, UserPlus, MessageSquare, RefreshCw, Mail } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  className?: string;
}

export function NotificationItem({ notification, className }: NotificationItemProps) {
  const typeIcon = {
    mention: <AtSign className="h-4 w-4 text-primary" />,
    assignment: <UserPlus className="h-4 w-4 text-accent" />,
    comment: <MessageSquare className="h-4 w-4 text-muted" />,
    update: <RefreshCw className="h-4 w-4 text-success" />,
    invite: <Mail className="h-4 w-4 text-accent" />,
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-3 py-3 rounded-xl transition-colors duration-100 cursor-pointer",
        "hover:bg-layer/50 active:bg-layer",
        !notification.read && "bg-primary/5",
        className
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-layer flex-shrink-0 mt-0.5">
        {typeIcon[notification.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-body-sm truncate", notification.read ? "text-muted" : "text-foreground font-medium")}>
          {notification.title}
        </p>
        <p className="text-caption text-muted truncate mt-0.5">
          {notification.message}
        </p>
        <p className="text-caption text-muted/60 mt-1">
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
      )}
    </div>
  );
}
