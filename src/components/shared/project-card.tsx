"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Project, User } from "@/types";
import { getUsersByIds } from "@/data";
import { formatRelativeTime, getStatusLabel } from "@/lib/format";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const members = getUsersByIds(project.members).slice(0, 3);
  const remainingMembers = project.members.length - 3;

  const statusVariant = {
    active: "primary" as const,
    review: "accent" as const,
    paused: "warning" as const,
    completed: "success" as const,
    archived: "muted" as const,
  };

  return (
    <Link href={`/detail?id=${project.id}`}>
      <Card variant="interactive" padding="md" className={cn("h-full", className)}>
        <CardContent>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${project.color}20` }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: project.color }}
                />
              </div>
              <h3 className="text-body font-medium text-foreground truncate">
                {project.name}
              </h3>
            </div>
            <Badge variant={statusVariant[project.status]}>
              {getStatusLabel(project.status)}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-body-sm text-muted line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Progress */}
          <div className="mb-4">
            <ProgressBar
              value={project.progress}
              size="sm"
              showLabel
              color={project.progress >= 80 ? "success" : "primary"}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Members */}
            <div className="flex items-center -space-x-1.5">
              {members.map((member) => (
                <Avatar
                  key={member.id}
                  fallback={member.initials}
                  size="sm"
                  className="ring-2 ring-surface"
                />
              ))}
              {remainingMembers > 0 && (
                <div className="w-7 h-7 rounded-full bg-layer flex items-center justify-center ring-2 ring-surface">
                  <span className="text-[10px] font-medium text-muted">
                    +{remainingMembers}
                  </span>
                </div>
              )}
            </div>

            {/* Meta */}
            <span className="text-caption text-muted">
              {project.completedTasks}/{project.taskCount} tasks
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
