"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ListItem } from "@/components/ui/list-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Clock,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import Link from "next/link";

const tasks = [
  { id: 1, title: "Define color palette", status: "done", assignee: "SR" },
  { id: 2, title: "Typography scale", status: "done", assignee: "JL" },
  { id: 3, title: "Component inventory", status: "active", assignee: "MK" },
  { id: 4, title: "Icon system", status: "pending", assignee: "SR" },
  { id: 5, title: "Motion guidelines", status: "pending", assignee: "JL" },
];

const members = [
  { name: "Sarah Reed", role: "Lead Designer", initials: "SR" },
  { name: "James Liu", role: "Developer", initials: "JL" },
  { name: "Maya Kim", role: "Product", initials: "MK" },
];

export default function DetailPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <PageHeader
        title="Design System"
        subtitle="Building a consistent visual language across all platforms."
        back={
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        }
        action={
          <Button variant="secondary" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />

      <div className="px-5 md:px-8 pb-8">
        {/* Project Meta */}
        <div className="flex items-center gap-3 mb-8">
          <Badge variant="primary">Active</Badge>
          <span className="text-body-sm text-muted">Started Mar 12</span>
          <span className="text-body-sm text-muted">·</span>
          <span className="text-body-sm text-muted">72% complete</span>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-layer rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: "72%" }}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="space-y-1">
              {tasks.map((task) => (
                <ListItem
                  key={task.id}
                  icon={
                    task.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : task.status === "active" ? (
                      <Clock className="h-4 w-4 text-accent" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )
                  }
                  title={task.title}
                  subtitle={
                    task.status === "done"
                      ? "Completed"
                      : task.status === "active"
                      ? "In progress"
                      : "Not started"
                  }
                  trailing={<Avatar fallback={task.assignee} size="sm" />}
                />
              ))}
            </div>
            <div className="mt-4">
              <Button variant="secondary" size="sm" className="w-full">
                Add Task
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="space-y-1">
              {members.map((member) => (
                <ListItem
                  key={member.name}
                  icon={<Avatar fallback={member.initials} size="sm" />}
                  title={member.name}
                  subtitle={member.role}
                  showChevron
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files">
            <Card variant="subtle" padding="lg">
              <CardContent>
                <div className="flex flex-col items-center text-center py-8">
                  <Paperclip className="h-8 w-8 text-muted mb-3" />
                  <p className="text-body-sm text-muted">
                    No files uploaded yet
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3">
                    Upload File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
