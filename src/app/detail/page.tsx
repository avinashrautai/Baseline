"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
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
import { formatDate, getStatusLabel } from "@/lib/format";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Inbox,
} from "lucide-react";
import Link from "next/link";

export default function DetailPage() {
  const project = getProjectById("proj_01")!;
  const projectTasks = getTasksByProject(project.id);
  const members = getUsersByIds(project.members);
  const projectActivity = getRecentActivity(4);

  const inProgressTasks = projectTasks.filter((t) => t.status === "in-progress" || t.status === "review");
  const todoTasks = projectTasks.filter((t) => t.status === "todo");
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
      transition={{ duration: 0.15 }}
    >
      <PageHeader
        title={project.name}
        subtitle={project.description}
        back={
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        }
        action={
          <Button variant="secondary" size="sm">
            <Plus className="h-3.5 w-3.5" />
            <span className="ml-1">Add</span>
          </Button>
        }
      />

      <div className="px-5 md:px-8 pb-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-8">
          <Badge variant={statusVariant[project.status]}>
            {getStatusLabel(project.status)}
          </Badge>
          {project.dueDate && (
            <span className="flex items-center gap-1.5 text-caption text-muted">
              <Calendar className="h-3 w-3" />
              Due {formatDate(project.dueDate)}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-10">
          <ProgressBar
            value={project.progress}
            size="md"
            showLabel
            color={project.progress >= 80 ? "success" : "primary"}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="space-y-8">
              {inProgressTasks.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-2 px-1">
                    In Progress ({inProgressTasks.length})
                  </p>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      {inProgressTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                      ))}
                    </CardContent>
                  </Card>
                </section>
              )}

              {todoTasks.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-2 px-1">
                    To Do ({todoTasks.length})
                  </p>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      {todoTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                      ))}
                    </CardContent>
                  </Card>
                </section>
              )}

              {doneTasks.length > 0 && (
                <section>
                  <p className="text-overline text-muted/60 uppercase mb-2 px-1">
                    Done ({doneTasks.length})
                  </p>
                  <Card variant="default" padding="sm">
                    <CardContent>
                      {doneTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                      ))}
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card variant="default" padding="sm">
              <CardContent>
                {members.map((member) => (
                  <MemberRow key={member.id} user={member} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            {files.length > 0 ? (
              <Card variant="default" padding="sm">
                <CardContent>
                  {files.map((file) => (
                    <FileRow key={file.id} file={file} />
                  ))}
                </CardContent>
              </Card>
            ) : (
              <EmptyState
                icon={<Inbox className="h-5 w-5" />}
                title="No files yet"
                description="Upload documents and resources for your team."
                action={{ label: "Upload", onClick: () => {} }}
              />
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card variant="default" padding="sm">
              <CardContent>
                {projectActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
