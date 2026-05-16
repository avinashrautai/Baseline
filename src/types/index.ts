// ============================================
// Baseline — Core Type Definitions
// ============================================

export type ProjectStatus = "active" | "review" | "paused" | "completed" | "archived";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type NotificationType = "mention" | "assignment" | "comment" | "update" | "invite";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: string;
  status: "online" | "away" | "offline";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  members: string[]; // user IDs
  taskCount: number;
  completedTasks: number;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  target: string;
  targetType: "project" | "task" | "comment" | "file" | "member";
  projectId?: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  userId: string;
  timestamp: string;
  actionUrl?: string;
}

export interface SearchResult {
  id: string;
  type: "project" | "task" | "person" | "file";
  title: string;
  subtitle: string;
  icon: string;
  url: string;
  highlight?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url?: string;
}
