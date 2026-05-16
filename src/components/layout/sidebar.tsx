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

const mainNav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/dashboard", icon: LayoutGrid, label: "Projects" },
];

const bottomNav = [
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 h-screen sticky top-0 bg-surface border-r border-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">B</span>
          </div>
          <span className="text-body font-semibold text-foreground">Baseline</span>
        </div>
        <button className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-layer transition-colors">
          <Bell className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href + item.label}
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
            <span className="text-overline text-muted uppercase">Projects</span>
            <button className="p-0.5 rounded text-muted hover:text-foreground transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {["Design System", "Mobile App", "Analytics"].map((project) => (
              <Link
                key={project}
                href="/detail"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm text-muted hover:text-foreground hover:bg-layer/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                {project}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-border-subtle px-3 py-3 space-y-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm text-muted hover:text-foreground hover:bg-layer/50 transition-colors"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="border-t border-border-subtle px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar fallback="AR" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-foreground truncate">Alex Reed</p>
            <p className="text-caption text-muted truncate">alex@baseline.app</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </div>
      </div>
    </aside>
  );
}
