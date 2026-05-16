"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { StatWidget } from "@/components/ui/stat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Plus,
  TrendingUp,
  Users,
  Clock,
  FolderOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const recentProjects = [
  {
    id: 1,
    name: "Design System",
    status: "active",
    progress: 72,
    updated: "2h ago",
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    status: "review",
    progress: 45,
    updated: "5h ago",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    status: "active",
    progress: 88,
    updated: "1d ago",
  },
];

const recentActivity = [
  { id: 1, user: "Sarah", action: "updated", target: "Design tokens", time: "12m ago" },
  { id: 2, user: "James", action: "completed", target: "Navigation flow", time: "1h ago" },
  { id: 3, user: "Maya", action: "commented on", target: "Dashboard layout", time: "3h ago" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <PageHeader
        title="Good morning"
        subtitle="Here's what's happening with your projects today."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />

      <div className="px-5 md:px-8 space-y-8 pb-8">
        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatWidget
            label="Projects"
            value={12}
            change="+2 this week"
            changeType="positive"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatWidget
            label="Tasks"
            value={48}
            change="8 due today"
            changeType="neutral"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatWidget
            label="Team"
            value={6}
            change="All active"
            changeType="positive"
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

        {/* Recent Projects */}
        <motion.div variants={item}>
          <SectionHeader
            title="Recent Projects"
            action={
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            }
            className="mb-4"
          />
          <div className="grid gap-3 md:grid-cols-3">
            {recentProjects.map((project) => (
              <Link key={project.id} href="/detail">
                <Card variant="interactive" padding="md">
                  <CardContent>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-body font-medium text-foreground">
                        {project.name}
                      </h3>
                      <Badge
                        variant={
                          project.status === "active" ? "primary" : "accent"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-body-sm">
                        <span className="text-muted">Progress</span>
                        <span className="text-foreground tabular-nums">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-layer rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="text-caption text-muted">{project.updated}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div variants={item}>
          <SectionHeader title="Recent Activity" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 py-3 px-2"
                  >
                    <Avatar fallback={activity.user} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm text-foreground truncate">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <span className="text-caption text-muted flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
