"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Divider } from "@/components/ui/divider";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TaskRow } from "@/components/shared/task-row";
import { MemberRow } from "@/components/shared/member-row";
import { FileRow } from "@/components/shared/file-row";
import { ActivityItem } from "@/components/shared/activity-item";
import {
  getProjectById,
  getTasksByProject,
  getUsersByIds,
  getRecentActivity,
  files,
} from "@/data";
import { formatDate, getStatusLabel, formatRelativeTime } from "@/lib/format";
import { ANIMATION } from "@/constants";
import {
  ArrowLeft,
  MoreHorizontal,
  Plus,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
} from "lucide-react";
import Link from "next/link";

export default function DetailPage() {
  // Default to Design System project for demo
  const project = getProjectById("proj_01")!;
  const projectTasks = getTasksByProject(project.id);
  const members = getUsersByIds(project.members);
  const projectActivity = getRecentActivity(5);

  const todoTasks = projectTasks.filter((t) => t.status === "todo");
  const inProgressTasks = projectTasks.filter((t) => t.status === "in-progress" || t.status === "review");
  const doneTasks = projectTasks.filter((t) => t.status === "done");

  const statusVariant = {
    active: "primary" as const,
    review: "accent" as const,
    paused: "warning" as const,
    completed: "success" as const,
    archived: "muted" as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION.duration.page }}
    >
      <PageHeader
        title={project.name}
        subtitle={project.description}
        back={
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        }
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1">Add Task</span>
            </Button>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="px-5 md:px-8 pb-10">
        {/* Project Meta Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant={statusVariant[project.status]}>
            {getStatusLabel(project.status)}
          </Badge>
          <div className="flex items-center gap-1.5 text-body-sm text-muted">
            <Calendar className="h-3.5 w-3.5" />
            Started {formatDate(project.createdAt)}
          </div>
          {project.dueDate && (
            <div className="flex items-center gap-1.5 text-body-sm text-muted">
              <Clock className="h-3.5 w-3.5" />
              Due {formatDate(project.dueDate)}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-body-sm text-muted">
            <Users className="h-3.5 w-3.5" />
            {members.length} members
          </div>
        </div>

        {/* Progress Section */}
        <Card variant="default" padding="md" className="mb-8">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-body font-medium text-foreground">
                  {project.completedTasks} of {project.taskCount} tasks complete
                </span>
              </div>
              <span className="text-heading-3 text-foreground tabular-nums">
                {project.progress}%
              </span>
            </div>
            <ProgressBar
              value={project.progress}
              size="lg"
              color={project.progress >= 80 ? "success" : "primary"}
              animated
            />
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-subtle">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted/50" />
                <span className="text-caption text-muted">{todoTasks.length} To Do</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-caption text-muted">{inProgressTasks.length} In Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-caption text-muted">{doneTasks.length} Done</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">
              Tasks ({projectTasks.length})
            </TabsTrigger>
            <TabsTrigger value="members">
              Members ({members.length})
            </TabsTrigger>
            <TabsTrigger value="files">
              Files ({files.length})
            </TabsTrigger>
            <TabsTrigger value="activity">
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <div className="space-y-6">
              {/* In Progress */}
              {inProgressTasks.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-2 px-1">
                    In Progress ({inProgressTasks.length})
                  </h3>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      <div className="divide-y divide-border-subtle">
                        {inProgressTasks.map((task) => (
                          <TaskRow key={task.id} task={task} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* To Do */}
              {todoTasks.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-2 px-1">
                    To Do ({todoTasks.length})
                  </h3>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      <div className="divide-y divide-border-subtle">
                        {todoTasks.map((task) => (
                          <TaskRow key={task.id} task={task} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Done */}
              {doneTasks.length > 0 && (
                <section>
                  <h3 className="text-overline text-muted uppercase tracking-wider mb-2 px-1">
                    Completed ({doneTasks.length})
                  </h3>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      <div className="divide-y divide-border-subtle">
                        {doneTasks.map((task) => (
                          <TaskRow key={task.id} task={task} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Add task button */}
              <Button variant="secondary" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-1.5" />
                Add Task
              </Button>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card variant="default" padding="sm">
              <CardContent>
                <div className="divide-y divide-border-subtle">
                  {members.map((member) => (
                    <MemberRow
                      key={member.id}
                      user={member}
                      showChevron
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Button variant="secondary" size="sm" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-1.5" />
              Invite Member
            </Button>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            {files.length > 0 ? (
              <>
                <Card variant="default" padding="sm">
                  <CardContent>
                    <div className="divide-y divide-border-subtle">
                      {files.map((file) => (
                        <FileRow key={file.id} file={file} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Button variant="secondary" size="sm" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Upload File
                </Button>
              </>
            ) : (
              <EmptyState
                icon={<Inbox className="h-7 w-7" />}
                title="No files yet"
                description="Upload design files, documents, or other resources for your team."
                action={{ label: "Upload File", onClick: () => {} }}
              />
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card variant="default" padding="sm">
              <CardContent>
                <div className="divide-y divide-border-subtle">
                  {projectActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
