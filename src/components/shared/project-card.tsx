"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Project } from "@/types";
import { getStatusLabel } from "@/lib/format";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
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
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="text-body font-medium text-foreground truncate flex-1">
              {project.name}
            </h3>
            <Badge variant={statusVariant[project.status]}>
              {getStatusLabel(project.status)}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-body-sm text-muted/80 line-clamp-2 mb-5 leading-relaxed">
            {project.description}
          </p>

          {/* Progress */}
          <ProgressBar
            value={project.progress}
            size="sm"
            showLabel
            variant={project.progress >= 80 ? "success" : "primary"}
          />

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle">
            <span className="text-caption text-muted">
              {project.completedTasks} of {project.taskCount}
            </span>
            <span className="text-caption text-muted">
              {project.members.length} members
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
