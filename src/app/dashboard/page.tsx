"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { StatWidget } from "@/components/ui/stat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ProjectCard } from "@/components/shared/project-card";
import { ActivityItem } from "@/components/shared/activity-item";
import { TaskRow } from "@/components/shared/task-row";
import {
  currentUser,
  getActiveProjects,
  getRecentActivity,
  getRecentTasks,
  getUnreadNotifications,
} from "@/data";
import { getGreeting } from "@/lib/format";
import { ANIMATION, LIMITS } from "@/constants";
import {
  Plus,
  TrendingUp,
  Users,
  Clock,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
  Bell,
} from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: ANIMATION.stagger.normal },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration.normal } },
};

export default function DashboardPage() {
  const activeProjects = getActiveProjects();
  const recentActivity = getRecentActivity(LIMITS.recentActivity);
  const recentTasks = getRecentTasks(5);
  const unreadNotifications = getUnreadNotifications();

  const totalTasks = 48;
  const completedToday = 7;
  const teamOnline = 4;

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <PageHeader
        title={getGreeting()}
        subtitle={`Welcome back, ${currentUser.name.split(" ")[0]}. Here's what's happening.`}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4" />
              {unreadNotifications.length > 0 && (
                <span className="ml-1.5 text-caption">{unreadNotifications.length}</span>
              )}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">New Project</span>
            </Button>
          </div>
        }
      />

      <div className="px-5 md:px-8 space-y-10 pb-10">
        {/* Stats Row */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatWidget
            label="Active Projects"
            value={activeProjects.length}
            change="+2 this month"
            changeType="positive"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatWidget
            label="Open Tasks"
            value={totalTasks}
            change={`${completedToday} done today`}
            changeType="positive"
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <StatWidget
            label="Team Online"
            value={teamOnline}
            change="of 6 members"
            changeType="neutral"
            icon={<Users className="h-4 w-4" />}
          />
          <StatWidget
            label="Sprint Velocity"
            value="94%"
            change="+12% vs last"
            changeType="positive"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </motion.div>

        {/* Two-column layout for desktop */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content — 3 columns */}
          <div className="lg:col-span-3 space-y-10">
            {/* Active Projects */}
            <motion.section variants={item}>
              <SectionHeader
                title="Active Projects"
                subtitle={`${activeProjects.length} projects in progress`}
                action={
                  <Link href="/search">
                    <Button variant="ghost" size="sm">
                      View all
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                }
                className="mb-4"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {activeProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.section>

            {/* My Tasks */}
            <motion.section variants={item}>
              <SectionHeader
                title="My Tasks"
                subtitle="Sorted by most recent activity"
                action={
                  <Button variant="ghost" size="sm">
                    See all
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                }
                className="mb-3"
              />
              <Card variant="default" padding="sm">
                <CardContent>
                  <div className="divide-y divide-border-subtle">
                    {recentTasks
                      .filter((t) => t.status !== "done")
                      .slice(0, 5)
                      .map((task) => (
                        <TaskRow key={task.id} task={task} />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar content — 2 columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Activity Feed */}
            <motion.section variants={item}>
              <SectionHeader title="Activity" className="mb-3" />
              <Card variant="default" padding="sm">
                <CardContent>
                  <div className="divide-y divide-border-subtle">
                    {recentActivity.slice(0, 6).map((activity) => (
                      <ActivityItem
                        key={activity.id}
                        activity={activity}
                        compact
                      />
                    ))}
                  </div>
                  <div className="pt-3 mt-1 border-t border-border-subtle">
                    <Button variant="ghost" size="sm" className="w-full text-muted">
                      View all activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Quick Stats Card */}
            <motion.section variants={item}>
              <SectionHeader title="This Week" className="mb-3" />
              <Card variant="default" padding="md">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-muted">Tasks completed</span>
                      <span className="text-body font-medium text-foreground tabular-nums">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-muted">Hours tracked</span>
                      <span className="text-body font-medium text-foreground tabular-nums">34.5h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-muted">PRs merged</span>
                      <span className="text-body font-medium text-foreground tabular-nums">8</span>
                    </div>
                    <Divider />
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-muted">Productivity score</span>
                      <span className="text-body font-semibold text-success tabular-nums">A+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
