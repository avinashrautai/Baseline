"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  LayoutGrid,
  Settings,
  Plus,
  Bell,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui/status-dot";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { currentUser, getActiveProjects, getUnreadNotifications } from "@/data";

const mainNav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
];

export function Sidebar() {
  const pathname = usePathname();
  const activeProjects = getActiveProjects();
  const unreadCount = getUnreadNotifications().length;

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 h-screen sticky top-0 bg-surface border-r border-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-border-subtle">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">B</span>
          </div>
          <span className="text-body font-semibold text-foreground">Baseline</span>
        </Link>
        <NotificationBadge count={unreadCount}>
          <button className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-layer transition-colors">
            <Bell className="h-4 w-4" />
          </button>
        </NotificationBadge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm font-medium transition-colors duration-100",
                isActive
                  ? "bg-layer text-foreground"
                  : "text-muted hover:text-foreground hover:bg-layer/50"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={isActive ? 2 : 1.5} />
              {item.label}
            </Link>
          );
        })}

        {/* Projects Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-overline text-muted uppercase tracking-wider">Projects</span>
            <button className="p-0.5 rounded text-muted hover:text-foreground transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {activeProjects.map((project) => {
              const isActive = pathname === `/detail` && true; // simplified
              return (
                <Link
                  key={project.id}
                  href={`/detail?id=${project.id}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm transition-colors duration-100",
                    "text-muted hover:text-foreground hover:bg-layer/50"
                  )}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                  <span className="ml-auto text-caption text-muted/50 tabular-nums">
                    {project.progress}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border-subtle px-3 py-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm font-medium transition-colors duration-100",
            pathname === "/settings"
              ? "bg-layer text-foreground"
              : "text-muted hover:text-foreground hover:bg-layer/50"
          )}
        >
          <Settings className="h-4 w-4" strokeWidth={pathname === "/settings" ? 2 : 1.5} />
          Settings
        </Link>
      </div>

      {/* User Section */}
      <div className="border-t border-border-subtle px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar fallback={currentUser.initials} size="sm" />
            <StatusDot
              status={currentUser.status}
              className="absolute -bottom-0.5 -right-0.5 ring-2 ring-surface"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-foreground truncate">{currentUser.name}</p>
            <p className="text-caption text-muted truncate">{currentUser.role}</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </div>
      </div>
    </aside>
  );
}
