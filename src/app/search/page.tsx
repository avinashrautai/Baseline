"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/shared/project-card";
import { MemberRow } from "@/components/shared/member-row";
import { projects, users, tasks } from "@/data";
import {
  Search,
  Clock,
  FileText,
} from "lucide-react";
import Link from "next/link";

const recentSearches = [
  "Design tokens",
  "Navigation",
  "Color palette",
  "Typography",
];

type CategoryFilter = "all" | "projects" | "tasks" | "people";

const categories: { label: string; value: CategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "projects" },
  { label: "Tasks", value: "tasks" },
  { label: "People", value: "people" },
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const hasQuery = query.trim().length > 0;

  const filteredProjects = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return projects.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [query, hasQuery]);

  const filteredTasks = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [query, hasQuery]);

  const filteredPeople = React.useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
  }, [query, hasQuery]);

  const totalResults = filteredProjects.length + filteredTasks.length + filteredPeople.length;

  const showProjects = activeCategory === "all" || activeCategory === "projects";
  const showTasks = activeCategory === "all" || activeCategory === "tasks";
  const showPeople = activeCategory === "all" || activeCategory === "people";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md">
        <div className="px-5 md:px-8 pt-8 pb-4">
          <SearchBar
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            autoFocus
          />
        </div>

        {/* Filters */}
        <div className="px-5 md:px-8 pb-4 flex gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-md text-body-sm whitespace-nowrap transition-colors duration-100 ${
                activeCategory === cat.value
                  ? "text-foreground bg-layer/50"
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
        <AnimatePresence mode="wait">
          {!hasQuery ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {/* Recent */}
              <p className="text-overline text-muted/60 uppercase mb-3 px-1">Recent</p>
              <div className="space-y-0.5">
                {recentSearches.map((search) => (
                  <div
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-layer/30 transition-colors"
                  >
                    <Clock className="h-3.5 w-3.5 text-muted/40" />
                    <span className="text-body-sm text-foreground">{search}</span>
                  </div>
                ))}
              </div>

              {/* Quick access */}
              <p className="text-overline text-muted/60 uppercase mb-3 mt-10 px-1">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {projects.slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/detail?id=${p.id}`}>
                    <Card variant="interactive" padding="sm">
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <span className="text-body-sm text-foreground truncate">{p.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : totalResults > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="space-y-10"
            >
              <p className="text-caption text-muted">
                {totalResults} result{totalResults !== 1 ? "s" : ""}
              </p>

              {showProjects && filteredProjects.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-3 px-1">Projects</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </section>
              )}

              {showTasks && filteredTasks.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-3 px-1">Tasks</p>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      {filteredTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-layer/30 transition-colors cursor-pointer">
                          <FileText className="h-3.5 w-3.5 text-muted/50 flex-shrink-0" />
                          <p className="text-body text-foreground truncate">{task.title}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              )}

              {showPeople && filteredPeople.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-3 px-1">People</p>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      {filteredPeople.map((person) => (
                        <MemberRow key={person.id} user={person} />
                      ))}
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
              transition={{ duration: 0.1 }}
            >
              <EmptyState
                icon={<Search className="h-5 w-5" />}
                title="No results"
                description={`Nothing matched "${query}".`}
                action={{ label: "Clear", onClick: () => setQuery("") }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
