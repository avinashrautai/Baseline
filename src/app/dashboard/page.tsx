"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { StatWidget } from "@/components/ui/stat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/shared/project-card";
import { ActivityItem } from "@/components/shared/activity-item";
import { TaskRow } from "@/components/shared/task-row";
import {
  currentUser,
  getActiveProjects,
  getRecentActivity,
  getRecentTasks,
} from "@/data";
import { getGreeting } from "@/lib/format";
import {
  Plus,
  TrendingUp,
  Users,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function DashboardPage() {
  const activeProjects = getActiveProjects();
  const recentActivity = getRecentActivity(5);
  const recentTasks = getRecentTasks(4).filter((t) => t.status !== "done");

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <PageHeader
        title={getGreeting()}
        subtitle={`Welcome back, ${currentUser.name.split(" ")[0]}.`}
        action={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline ml-1">New</span>
          </Button>
        }
      />

      <div className="px-5 md:px-8 space-y-14 pb-14">
        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatWidget
            label="Projects"
            value={activeProjects.length}
            change="+2 this month"
            changeType="positive"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatWidget
            label="Tasks"
            value={48}
            change="7 done today"
            changeType="positive"
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <StatWidget
            label="Team"
            value={4}
            change="of 6 online"
            changeType="neutral"
            icon={<Users className="h-4 w-4" />}
          />
          <StatWidget
            label="Velocity"
            value="94%"
            change="+12%"
            changeType="positive"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </motion.div>

        {/* Projects */}
        <motion.section variants={item}>
          <SectionHeader
            title="Active Projects"
            action={
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  All
                  <ArrowRight className="h-3 w-3 ml-1" />
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

        {/* Two columns on desktop */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Tasks */}
          <motion.section variants={item} className="lg:col-span-3">
            <SectionHeader
              title="My Tasks"
              action={
                <Button variant="ghost" size="sm">
                  See all
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              }
              className="mb-3"
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
          <motion.section variants={item} className="lg:col-span-2">
            <SectionHeader title="Activity" className="mb-3" />
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
      </div>
    </motion.div>
  );
}
