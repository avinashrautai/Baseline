"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TaskRow } from "@/components/shared/task-row";
import { LoadingScreen } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { useQuery } from "@/hooks/use-query";
import { getProjects, getTasks, getNotes } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/format";
import {
  Target,
  Clock,
  Calendar,
  Pause,
  FolderOpen,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function FocusPage() {
  const { data: projects, loading: projectsLoading } = useQuery(getProjects, []);
  const focusProject = (projects ?? []).find((p) => p.status === "active");

  const { data: tasks, loading: tasksLoading } = useQuery(
    () => focusProject ? getTasks(focusProject.id) : Promise.resolve([]),
    [focusProject?.id]
  );

  const { data: notes } = useQuery(
    () => focusProject ? getNotes(focusProject.id) : Promise.resolve([]),
    [focusProject?.id]
  );

  const loading = projectsLoading || tasksLoading;

  if (loading) return <LoadingScreen />;

  if (!focusProject) {
    return (
      <div className="px-5 md:px-8 pt-20">
        <EmptyState
          icon={<FolderOpen className="h-5 w-5" />}
          title="No active project"
          description="Create a project and set it to active to enter focus mode."
        />
      </div>
    );
  }

  const activeTasks = (tasks ?? []).filter((t) => t.status === "in-progress");
  const upcomingTasks = (tasks ?? []).filter((t) => t.status === "todo").slice(0, 4);
  const currentTask = activeTasks[0];
  const latestNote = (notes ?? [])[0];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Header */}
      <motion.header variants={item} className="px-5 md:px-8 pt-12 pb-4 md:pt-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-layer/50 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary/80" />
            </div>
            <div>
              <p className="text-overline text-muted/60 uppercase">Focus Mode</p>
              <h1 className="text-heading-3 text-foreground">{focusProject.name}</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Pause className="h-3.5 w-3.5" />
            <span className="hidden sm:inline ml-1">Pause</span>
          </Button>
        </div>
      </motion.header>

      <div className="px-5 md:px-8 pb-16">
        {/* Progress */}
        <motion.div variants={item} className="mb-14 mt-4">
          <ProgressBar
            value={focusProject.progress}
            size="sm"
            variant={focusProject.progress >= 80 ? "success" : "primary"}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-caption text-muted/60">
              {focusProject.progress}% complete
            </span>
            {focusProject.due_date && (
              <span className="flex items-center gap-1 text-caption text-muted/60">
                <Calendar className="h-3 w-3" />
                {formatDate(focusProject.due_date)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Workspace */}
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-10">

          {/* Work area */}
          <div className="lg:col-span-3 space-y-14">

            {/* Current task */}
            {currentTask ? (
              <motion.section variants={item}>
                <p className="text-overline text-muted/60 uppercase mb-3 px-1">Working On</p>
                <Card variant="default" padding="lg">
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-heading-3 text-foreground mb-1">
                          {currentTask.title}
                        </h2>
                        {currentTask.description && (
                          <p className="text-body-sm text-muted/70 leading-relaxed max-w-lg">
                            {currentTask.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {currentTask.due_date && (
                      <div className="pt-4 border-t border-border-subtle">
                        <span className="flex items-center gap-1.5 text-caption text-muted/60">
                          <Clock className="h-3 w-3" />
                          Due {formatDate(currentTask.due_date)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.section>
            ) : (
              <motion.section variants={item}>
                <p className="text-overline text-muted/60 uppercase mb-3 px-1">Working On</p>
                <Card variant="subtle" padding="lg">
                  <CardContent>
                    <p className="text-body-sm text-muted/50 text-center py-6">
                      No task in progress. Pick one from the queue below.
                    </p>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Notes */}
            <motion.section variants={item}>
              <p className="text-overline text-muted/60 uppercase mb-3 px-1">Notes</p>
              <Card variant="subtle" padding="lg">
                <CardContent>
                  <div className="min-h-[120px]">
                    {latestNote?.content ? (
                      <p className="text-body text-foreground/80 whitespace-pre-wrap">
                        {latestNote.content}
                      </p>
                    ) : (
                      <p className="text-body text-muted/40 italic">
                        Capture thoughts, sketch ideas, track decisions...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Additional active tasks */}
            {activeTasks.length > 1 && (
              <motion.section variants={item}>
                <p className="text-overline text-muted/60 uppercase mb-3 px-1">
                  Also Active ({activeTasks.length - 1})
                </p>
                <Card variant="default" padding="sm">
                  <CardContent>
                    {activeTasks.slice(1).map((task) => (
                      <TaskRow key={task.id} task={task} />
                    ))}
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </div>

          {/* Context rail */}
          <div className="lg:col-span-2 space-y-14">

            {/* Up next */}
            <motion.section variants={item}>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-overline text-muted/60 uppercase">Up Next</p>
                <span className="text-caption text-muted/40">{upcomingTasks.length} queued</span>
              </div>
              {upcomingTasks.length > 0 ? (
                <div className="space-y-2">
                  {upcomingTasks.map((task, i) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface border border-border-subtle"
                    >
                      <span className="text-caption text-muted/40 tabular-nums w-4">{i + 1}</span>
                      <p className="text-body-sm text-foreground/80 truncate flex-1">
                        {task.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-sm text-muted/50 px-1">Queue is clear.</p>
              )}
            </motion.section>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
