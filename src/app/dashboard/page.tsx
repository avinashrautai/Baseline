"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { TaskRow } from "@/components/shared/task-row";
import { LoadingScreen } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@/hooks/use-query";
import { getProjects, getRecentTasks, getProfile } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/format";
import {
  ArrowRight,
  Calendar,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { data: profile } = useQuery(getProfile, []);
  const { data: projects, loading: projectsLoading } = useQuery(getProjects, []);
  const { data: tasks, loading: tasksLoading } = useQuery(() => getRecentTasks(5), []);

  const loading = projectsLoading || tasksLoading;
  const activeProjects = (projects ?? []).filter((p) => p.status === "active" || p.status === "review");
  const focusProject = activeProjects[0];
  const firstName = profile?.name?.split(" ")[0] ?? "";

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Hero Greeting */}
      <motion.header variants={item} className="px-5 md:px-8 pt-12 pb-6 md:pt-14 md:pb-8">
        <p className="text-caption text-muted/60 uppercase tracking-wider mb-2">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-heading-1 text-foreground">
          {getGreeting()}{firstName ? `, ${firstName}` : ""}
        </h1>
      </motion.header>

      <div className="px-5 md:px-8 space-y-16 pb-16">

        {/* Focus Project */}
        {focusProject ? (
          <motion.section variants={item}>
            <Link href={`/detail?id=${focusProject.id}`}>
              <Card variant="interactive" padding="lg">
                <CardContent>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: focusProject.color }}
                    />
                    <span className="text-overline text-muted/60 uppercase">Current Focus</span>
                  </div>

                  <h2 className="text-heading-2 text-foreground mb-2">
                    {focusProject.name}
                  </h2>
                  {focusProject.description && (
                    <p className="text-body-sm text-muted/70 leading-relaxed max-w-md mb-6">
                      {focusProject.description}
                    </p>
                  )}

                  <ProgressBar
                    value={focusProject.progress}
                    size="md"
                    showLabel
                    variant={focusProject.progress >= 80 ? "success" : "primary"}
                  />

                  {focusProject.due_date && (
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-subtle">
                      <span className="flex items-center gap-1.5 text-caption text-muted/60">
                        <Calendar className="h-3 w-3" />
                        Due {formatDate(focusProject.due_date)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.section>
        ) : (
          <motion.section variants={item}>
            <EmptyState
              icon={<FolderOpen className="h-5 w-5" />}
              title="No projects yet"
              description="Create your first project to get started."
              action={{ label: "New Project", onClick: () => {} }}
            />
          </motion.section>
        )}

        {/* Tasks */}
        <motion.section variants={item}>
          <SectionHeader
            title="My Tasks"
            action={
              <Button variant="ghost" size="sm">
                See all
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            }
            className="mb-4"
          />
          {tasks && tasks.length > 0 ? (
            <Card variant="default" padding="sm">
              <CardContent>
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card variant="subtle" padding="md">
              <CardContent>
                <p className="text-body-sm text-muted/60 text-center py-6">
                  No open tasks. You're all caught up.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.section>

        {/* Projects grid */}
        {activeProjects.length > 1 && (
          <motion.section variants={item}>
            <SectionHeader
              title="Projects"
              action={
                <Link href="/search">
                  <Button variant="ghost" size="sm">
                    All projects
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              }
              className="mb-4"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(1, 4).map((project) => (
                <Link key={project.id} href={`/detail?id=${project.id}`}>
                  <Card variant="interactive" padding="md" className="h-full">
                    <CardContent>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <h3 className="text-body font-medium text-foreground truncate flex-1">
                          {project.name}
                        </h3>
                        <Badge variant={project.status === "active" ? "primary" : "accent"}>
                          {project.status}
                        </Badge>
                      </div>
                      {project.description && (
                        <p className="text-body-sm text-muted/70 line-clamp-2 mb-5 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      <ProgressBar
                        value={project.progress}
                        size="sm"
                        showLabel
                        variant={project.progress >= 80 ? "success" : "primary"}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}
