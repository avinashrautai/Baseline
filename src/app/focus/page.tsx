"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import { TaskRow } from "@/components/shared/task-row";
import { FileRow } from "@/components/shared/file-row";
import { ActivityItem } from "@/components/shared/activity-item";
import {
  getActiveProjects,
  getTasksByProject,
  getRecentActivity,
  getUserById,
  files,
} from "@/data";
import { formatDate } from "@/lib/format";
import {
  Target,
  Clock,
  FileText,
  ArrowRight,
  Calendar,
  Pause,
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
  const project = getActiveProjects()[0];
  const projectTasks = getTasksByProject(project.id);
  const activeTasks = projectTasks.filter((t) => t.status === "in-progress");
  const upcomingTasks = projectTasks.filter((t) => t.status === "todo").slice(0, 3);
  const recentActivity = getRecentActivity(3);
  const recentFiles = files.slice(0, 3);

  // Current active task (first in-progress)
  const currentTask = activeTasks[0];
  const currentAssignee = currentTask?.assigneeId
    ? getUserById(currentTask.assigneeId)
    : undefined;

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Header — minimal, immersive */}
      <motion.header variants={item} className="px-5 md:px-8 pt-12 pb-4 md:pt-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-layer/50 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary/80" />
            </div>
            <div>
              <p className="text-overline text-muted/60 uppercase">Focus Mode</p>
              <h1 className="text-heading-3 text-foreground">{project.name}</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Pause className="h-3.5 w-3.5" />
            <span className="hidden sm:inline ml-1">Pause</span>
          </Button>
        </div>
      </motion.header>

      <div className="px-5 md:px-8 pb-16">
        {/* Progress strip — quiet context */}
        <motion.div variants={item} className="mb-14 mt-4">
          <ProgressBar
            value={project.progress}
            size="sm"
            variant={project.progress >= 80 ? "success" : "primary"}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-caption text-muted/60">
              {project.completedTasks} of {project.taskCount} complete
            </span>
            {project.dueDate && (
              <span className="flex items-center gap-1 text-caption text-muted/60">
                <Calendar className="h-3 w-3" />
                {formatDate(project.dueDate)}
              </span>
            )}
          </div>
        </motion.div>

        {/* === Primary workspace area === */}
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-10">

          {/* Left column — work area (3/5) */}
          <div className="lg:col-span-3 space-y-14">

            {/* Current Task — hero emphasis */}
            {currentTask && (
              <motion.section variants={item}>
                <p className="text-overline text-muted/60 uppercase mb-3 px-1">Working On</p>
                <Card variant="default" padding="lg">
                  <CardContent>
                    <div className="flex items-start gap-3 mb-5">
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

                    {/* Task meta */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
                      {currentAssignee && (
                        <div className="flex items-center gap-2">
                          <Avatar fallback={currentAssignee.initials} size="sm" />
                          <span className="text-caption text-muted">{currentAssignee.name}</span>
                        </div>
                      )}
                      {currentTask.dueDate && (
                        <span className="flex items-center gap-1.5 text-caption text-muted/60">
                          <Clock className="h-3 w-3" />
                          Due {formatDate(currentTask.dueDate)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Notes / Work Area — open space for thinking */}
            <motion.section variants={item}>
              <p className="text-overline text-muted/60 uppercase mb-3 px-1">Notes</p>
              <Card variant="subtle" padding="lg">
                <CardContent>
                  <div className="min-h-[140px] flex items-start">
                    <p className="text-body text-muted/40 italic">
                      Capture thoughts, sketch ideas, track decisions...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Task Stack — remaining active work */}
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

          {/* Right column — context rail (2/5) */}
          <div className="lg:col-span-2 space-y-14">

            {/* References / Files */}
            <motion.section variants={item}>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-overline text-muted/60 uppercase">References</p>
                <Button variant="ghost" size="sm" className="text-muted/60">
                  <FileText className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              <Card variant="default" padding="sm">
                <CardContent>
                  {recentFiles.map((file) => (
                    <FileRow key={file.id} file={file} />
                  ))}
                </CardContent>
              </Card>
            </motion.section>

            {/* Upcoming Queue */}
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

            {/* Quiet Activity */}
            <motion.section variants={item}>
              <p className="text-overline text-muted/60 uppercase mb-3 px-1">Recent</p>
              <div className="space-y-0">
                {recentActivity.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    compact
                  />
                ))}
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
