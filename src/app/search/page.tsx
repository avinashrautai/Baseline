"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ListItem } from "@/components/ui/list-item";
import {
  Search,
  Clock,
  FileText,
  Users,
  Folder,
  X,
} from "lucide-react";
import Link from "next/link";

const recentSearches = [
  "Design tokens",
  "Navigation component",
  "Color palette",
  "Typography scale",
];

const categories = [
  { label: "All", value: "all" },
  { label: "Projects", value: "projects" },
  { label: "Tasks", value: "tasks" },
  { label: "People", value: "people" },
  { label: "Files", value: "files" },
];

const searchResults = [
  {
    type: "project",
    title: "Design System",
    subtitle: "Active project · 72% complete",
    icon: Folder,
  },
  {
    type: "task",
    title: "Define color tokens",
    subtitle: "Design System · Completed",
    icon: FileText,
  },
  {
    type: "person",
    title: "Sarah Reed",
    subtitle: "Lead Designer",
    icon: Users,
  },
  {
    type: "task",
    title: "Design navigation patterns",
    subtitle: "Mobile App · In progress",
    icon: FileText,
  },
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const hasResults = query.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border-subtle">
        <div className="px-5 md:px-8 pt-6 pb-4">
          <SearchBar
            placeholder="Search projects, tasks, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            autoFocus
          />
        </div>

        {/* Category filters */}
        <div className="px-5 md:px-8 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-body-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.value
                  ? "bg-layer text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-8 py-6">
        {!hasResults ? (
          <div>
            {/* Recent Searches */}
            <div className="mb-8">
              <p className="text-overline text-muted uppercase tracking-wider mb-3 px-1">
                Recent
              </p>
              <div className="space-y-0.5">
                {recentSearches.map((search) => (
                  <div
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-layer/50 transition-colors"
                  >
                    <Clock className="h-4 w-4 text-muted/60" />
                    <span className="text-body-sm text-foreground">{search}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <p className="text-overline text-muted uppercase tracking-wider mb-3 px-1">
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Card variant="interactive" padding="sm">
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-primary" />
                      <span className="text-body-sm">New Project</span>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="interactive" padding="sm">
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-accent" />
                      <span className="text-body-sm">New Task</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-body-sm text-muted mb-4">
              {searchResults.length} results for &ldquo;{query}&rdquo;
            </p>
            <div className="space-y-1">
              {searchResults.map((result, i) => {
                const Icon = result.icon;
                return (
                  <Link key={i} href="/detail">
                    <ListItem
                      icon={<Icon className="h-4 w-4" />}
                      title={result.title}
                      subtitle={result.subtitle}
                      showChevron
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
