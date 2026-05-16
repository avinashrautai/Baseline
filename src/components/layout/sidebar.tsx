"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, Search, Settings, Plus, ChevronDown, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { useQuery } from "@/hooks/use-query";
import { getProfile, getProjects } from "@/lib/supabase/queries";

const mainNav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/focus", icon: Target, label: "Focus" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: profile } = useQuery(getProfile, []);
  const { data: projects } = useQuery(getProjects, []);

  const activeProjects = (projects ?? []).filter(
    (p) => p.status === "active" || p.status === "review"
  );

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 lg:w-64 h-screen sticky top-0 bg-surface/50 border-r border-border-subtle">
      {/* Header */}
      <div className="flex items-center px-5 h-14">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/80 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-foreground">B</span>
          </div>
          <span className="text-body font-medium text-foreground">Baseline</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2 pb-4 overflow-y-auto">
        <div className="space-y-0.5">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm transition-colors duration-150",
                  isActive
                    ? "text-foreground bg-layer/40"
                    : "text-muted hover:text-foreground hover:bg-layer/20"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Projects */}
        {activeProjects.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-overline text-muted/60 uppercase">Projects</span>
              <button className="p-0.5 rounded text-muted/40 hover:text-muted transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-0.5">
              {activeProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/detail?id=${project.id}`}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-body-sm text-muted hover:text-foreground hover:bg-layer/20 transition-colors duration-150"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Settings */}
      <div className="px-3 py-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm transition-colors duration-150",
            pathname === "/settings"
              ? "text-foreground bg-layer/40"
              : "text-muted hover:text-foreground hover:bg-layer/20"
          )}
        >
          <Settings className="h-4 w-4" strokeWidth={1.5} />
          Settings
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-t border-border-subtle">
        <div className="flex items-center gap-2.5">
          <Avatar fallback={initials} src={profile?.avatar_url ?? undefined} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-body-sm text-foreground truncate">{profile?.name ?? "User"}</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted/50" />
        </div>
      </div>
    </aside>
  );
}
