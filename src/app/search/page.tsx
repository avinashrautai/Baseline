"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { ListItem } from "@/components/ui/list-item";
import { Divider } from "@/components/ui/divider";
import { ProjectCard } from "@/components/shared/project-card";
import { MemberRow } from "@/components/shared/member-row";
import { projects, users, tasks } from "@/data";
import { getStatusLabel } from "@/lib/format";
import { ANIMATION } from "@/constants";
import {
  Search,
  Clock,
  FileText,
  Users,
  Folder,
  Sparkles,
  TrendingUp,
  Hash,
  X,
} from "lucide-react";
import Link from "next/link";

const recentSearches = [
  "Design tokens",
  "Navigation component",
  "Color palette",
  "Typography scale",
  "Sprint planning",
];

const trendingTags = [
  "design",
  "mobile",
  "performance",
  "infrastructure",
  "components",
];

type CategoryFilter = "all" | "projects" | "tasks" | "people";

const categories: { label: string; value: CategoryFilter; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: null },
  { label: "Projects", value: "projects", icon: <Folder className="h-3.5 w-3.5" /> },
  { label: "Tasks", value: "tasks", icon: <FileText className="h-3.5 w-3.5" /> },
  { label: "People", value: "people", icon: <Users className="h-3.5 w-3.5" /> },
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const hasQuery = query.trim().length > 0;

  // Filter results based on query
  const filteredProjects = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }, [query, hasQuery]);

  const filteredTasks = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q))
    );
  }, [query, hasQuery]);

  const filteredPeople = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [query, hasQuery]);

  const totalResults = filteredProjects.length + filteredTasks.length + filteredPeople.length;

  const showProjects = activeCategory === "all" || activeCategory === "projects";
  const showTasks = activeCategory === "all" || activeCategory === "tasks";
  const showPeople = activeCategory === "all" || activeCategory === "people";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION.duration.page }}
    >
      {/* Sticky Search Header */}
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
        <div className="px-5 md:px-8 pb-3 flex gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium whitespace-nowrap transition-all duration-150 ${
                activeCategory === cat.value
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted hover:text-foreground hover:bg-layer/50"
              }`}
            >
              {cat.icon}
              {cat.label}
              {hasQuery && cat.value === "projects" && filteredProjects.length > 0 && (
                <span className="text-caption opacity-70">{filteredProjects.length}</span>
              )}
              {hasQuery && cat.value === "tasks" && filteredTasks.length > 0 && (
                <span className="text-caption opacity-70">{filteredTasks.length}</span>
              )}
              {hasQuery && cat.value === "people" && filteredPeople.length > 0 && (
                <span className="text-caption opacity-70">{filteredPeople.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-8 py-6">
        <AnimatePresence mode="wait">
          {!hasQuery ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Recent Searches */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Clock className="h-3.5 w-3.5 text-muted" />
                  <span className="text-overline text-muted uppercase tracking-wider">Recent</span>
                </div>
                <div className="space-y-0.5">
                  {recentSearches.map((search) => (
                    <div
                      key={search}
                      onClick={() => setQuery(search)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-layer/50 active:bg-layer transition-colors group"
                    >
                      <Search className="h-4 w-4 text-muted/50" />
                      <span className="text-body-sm text-foreground flex-1">{search}</span>
                      <X className="h-3.5 w-3.5 text-muted/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Tags */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <TrendingUp className="h-3.5 w-3.5 text-muted" />
                  <span className="text-overline text-muted uppercase tracking-wider">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Chip key={tag} active={false}>
                      <Hash className="h-3 w-3" />
                      {tag}
                    </Chip>
                  ))}
                </div>
              </section>

              {/* Quick Access */}
              <section>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Sparkles className="h-3.5 w-3.5 text-muted" />
                  <span className="text-overline text-muted uppercase tracking-wider">Quick Access</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/detail?id=proj_01">
                    <Card variant="interactive" padding="sm">
                      <CardContent>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-primary/15 flex items-center justify-center">
                            <Folder className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-body-sm font-medium text-foreground block truncate">Design System</span>
                            <span className="text-caption text-muted">72%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/detail?id=proj_02">
                    <Card variant="interactive" padding="sm">
                      <CardContent>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center">
                            <Folder className="h-3.5 w-3.5 text-accent" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-body-sm font-medium text-foreground block truncate">Mobile App</span>
                            <span className="text-caption text-muted">45%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/detail?id=proj_03">
                    <Card variant="interactive" padding="sm">
                      <CardContent>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-success/15 flex items-center justify-center">
                            <Folder className="h-3.5 w-3.5 text-success" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-body-sm font-medium text-foreground block truncate">Analytics</span>
                            <span className="text-caption text-muted">88%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/detail?id=proj_06">
                    <Card variant="interactive" padding="sm">
                      <CardContent>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-warning/15 flex items-center justify-center">
                            <Folder className="h-3.5 w-3.5 text-warning" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-body-sm font-medium text-foreground block truncate">Notifications</span>
                            <span className="text-caption text-muted">58%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </motion.div>
          ) : totalResults > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-8"
            >
              <p className="text-body-sm text-muted">
                {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>

              {/* Projects Results */}
              {showProjects && filteredProjects.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-3 px-1">
                    Projects ({filteredProjects.length})
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </section>
              )}

              {/* Tasks Results */}
              {showTasks && filteredTasks.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-3 px-1">
                    Tasks ({filteredTasks.length})
                  </h3>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      <div className="divide-y divide-border-subtle">
                        {filteredTasks.map((task) => (
                          <div key={task.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-layer/50 transition-colors cursor-pointer">
                            <FileText className="h-4 w-4 text-muted flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-body text-foreground truncate">{task.title}</p>
                              <p className="text-caption text-muted">{getStatusLabel(task.status)}</p>
                            </div>
                            <Badge variant={task.status === "done" ? "success" : "default"}>
                              {getStatusLabel(task.status)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* People Results */}
              {showPeople && filteredPeople.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-3 px-1">
                    People ({filteredPeople.length})
                  </h3>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      <div className="divide-y divide-border-subtle">
                        {filteredPeople.map((person) => (
                          <MemberRow key={person.id} user={person} showChevron />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <EmptyState
                icon={<Search className="h-7 w-7" />}
                title="No results found"
                description={`Nothing matched "${query}". Try adjusting your search or browse by category.`}
                action={{ label: "Clear search", onClick: () => setQuery("") }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
