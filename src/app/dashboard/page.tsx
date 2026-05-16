"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProjectCard } from "@/components/shared/project-card";
import { ActivityItem } from "@/components/shared/activity-item";
import { TaskRow } from "@/components/shared/task-row";
import {
  currentUser,
  getActiveProjects,
  getRecentActivity,
  getRecentTasks,
} from "@/data";
import { getGreeting, formatDate } from "@/lib/format";
import {
  Plus,
  ArrowRight,
  Calendar,
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

export default function DashboardPage() {
  const activeProjects = getActiveProjects();
  const recentActivity = getRecentActivity(4);
  const recentTasks = getRecentTasks(5).filter((t) => t.status !== "done");
  const focusProject = activeProjects[0];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Hero Greeting */}
      <motion.header variants={item} className="px-5 md:px-8 pt-12 pb-6 md:pt-14 md:pb-8">
        <p className="text-caption text-muted/60 uppercase tracking-wider mb-2">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-heading-1 text-foreground">
          {getGreeting()}, {currentUser.name.split(" ")[0]}
        </h1>
      </motion.header>

      <div className="px-5 md:px-8 space-y-16 pb-16">

        {/* Focus Project — hero card */}
        {focusProject && (
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
                  <p className="text-body-sm text-muted/70 leading-relaxed max-w-md mb-6">
                    {focusProject.description}
                  </p>

                  <ProgressBar
                    value={focusProject.progress}
                    size="md"
                    showLabel
                    variant={focusProject.progress >= 80 ? "success" : "primary"}
                  />

                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-subtle">
                    <span className="text-caption text-muted/60">
                      {focusProject.completedTasks} of {focusProject.taskCount} tasks
                    </span>
                    {focusProject.dueDate && (
                      <span className="flex items-center gap-1.5 text-caption text-muted/60">
                        <Calendar className="h-3 w-3" />
                        {formatDate(focusProject.dueDate)}
                      </span>
                    )}
                    <span className="text-caption text-muted/60">
                      {focusProject.members.length} members
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.section>
        )}

        {/* Stats — quiet inline numbers */}
        <motion.section variants={item}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Open tasks", value: "48", sub: "7 done today" },
              { label: "Team online", value: "4", sub: "of 6 members" },
              { label: "Sprint velocity", value: "94%", sub: "+12% vs last" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border-subtle rounded-xl p-4 md:p-5">
                <p className="text-caption text-muted/60 mb-1">{stat.label}</p>
                <p className="text-heading-3 text-foreground tabular-nums">{stat.value}</p>
                <p className="text-caption text-success mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Two-column: Tasks + Activity */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Tasks */}
          <motion.section variants={item} className="lg:col-span-2">
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
            <Card variant="default" padding="sm">
              <CardContent>
                {recentTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* Activity */}
          <motion.section variants={item} className="lg:col-span-1">
            <SectionHeader title="Activity" className="mb-4" />
            <Card variant="default" padding="sm">
              <CardContent>
                {recentActivity.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    compact
                  />
                ))}
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Other Projects */}
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}
