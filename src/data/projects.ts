import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj_01",
    name: "Design System",
    description: "Building a consistent visual language and component library across all platforms and touchpoints.",
    status: "active",
    progress: 72,
    color: "#76836A",
    icon: "palette",
    createdAt: "2024-03-12T09:00:00Z",
    updatedAt: "2024-06-14T14:30:00Z",
    dueDate: "2024-08-01T00:00:00Z",
    members: ["usr_01", "usr_02", "usr_03", "usr_05"],
    taskCount: 24,
    completedTasks: 17,
    tags: ["design", "foundation", "components"],
  },
  {
    id: "proj_02",
    name: "Mobile App Redesign",
    description: "Complete overhaul of the mobile experience with focus on performance and usability improvements.",
    status: "active",
    progress: 45,
    color: "#B89B72",
    icon: "smartphone",
    createdAt: "2024-04-01T09:00:00Z",
    updatedAt: "2024-06-13T11:15:00Z",
    dueDate: "2024-09-15T00:00:00Z",
    members: ["usr_01", "usr_03", "usr_04", "usr_05"],
    taskCount: 38,
    completedTasks: 17,
    tags: ["mobile", "redesign", "ux"],
  },
  {
    id: "proj_03",
    name: "Analytics Dashboard",
    description: "Real-time analytics platform with customizable widgets, export capabilities, and team sharing.",
    status: "review",
    progress: 88,
    color: "#6B9E6B",
    icon: "bar-chart",
    createdAt: "2024-02-20T09:00:00Z",
    updatedAt: "2024-06-14T09:45:00Z",
    dueDate: "2024-06-30T00:00:00Z",
    members: ["usr_02", "usr_03", "usr_06"],
    taskCount: 16,
    completedTasks: 14,
    tags: ["analytics", "data", "dashboard"],
  },
  {
    id: "proj_04",
    name: "Authentication Flow",
    description: "Secure, streamlined sign-in experience with SSO, MFA, and passwordless options.",
    status: "completed",
    progress: 100,
    color: "#7B8FA1",
    icon: "shield",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-05-28T16:00:00Z",
    members: ["usr_03", "usr_05"],
    taskCount: 12,
    completedTasks: 12,
    tags: ["security", "auth", "infrastructure"],
  },
  {
    id: "proj_05",
    name: "Content Platform",
    description: "Headless CMS integration with editor workflows, versioning, and multi-language support.",
    status: "paused",
    progress: 31,
    color: "#A88BBE",
    icon: "file-text",
    createdAt: "2024-05-01T09:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    dueDate: "2024-10-01T00:00:00Z",
    members: ["usr_01", "usr_04", "usr_06"],
    taskCount: 42,
    completedTasks: 13,
    tags: ["content", "cms", "platform"],
  },
  {
    id: "proj_06",
    name: "Notification Engine",
    description: "Cross-channel notification system with preferences, batching, and delivery tracking.",
    status: "active",
    progress: 58,
    color: "#C4956A",
    icon: "bell",
    createdAt: "2024-04-15T09:00:00Z",
    updatedAt: "2024-06-12T13:20:00Z",
    dueDate: "2024-07-20T00:00:00Z",
    members: ["usr_03", "usr_05", "usr_06"],
    taskCount: 20,
    completedTasks: 11,
    tags: ["notifications", "infrastructure", "backend"],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getActiveProjects(): Project[] {
  return projects.filter((p) => p.status === "active" || p.status === "review");
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((p) => p.status === status);
}
