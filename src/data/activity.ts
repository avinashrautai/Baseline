import { Activity, Notification } from "@/types";

export const activities: Activity[] = [
  {
    id: "act_01",
    userId: "usr_02",
    action: "updated",
    target: "Color palette tokens",
    targetType: "task",
    projectId: "proj_01",
    timestamp: "2024-06-14T14:30:00Z",
  },
  {
    id: "act_02",
    userId: "usr_03",
    action: "completed",
    target: "Navigation flow prototype",
    targetType: "task",
    projectId: "proj_02",
    timestamp: "2024-06-14T13:15:00Z",
  },
  {
    id: "act_03",
    userId: "usr_04",
    action: "commented on",
    target: "Dashboard layout review",
    targetType: "comment",
    projectId: "proj_03",
    timestamp: "2024-06-14T11:45:00Z",
  },
  {
    id: "act_04",
    userId: "usr_05",
    action: "pushed code to",
    target: "Button component PR",
    targetType: "task",
    projectId: "proj_01",
    timestamp: "2024-06-14T10:20:00Z",
  },
  {
    id: "act_05",
    userId: "usr_06",
    action: "uploaded",
    target: "Research findings.pdf",
    targetType: "file",
    projectId: "proj_02",
    timestamp: "2024-06-14T09:00:00Z",
  },
  {
    id: "act_06",
    userId: "usr_01",
    action: "created",
    target: "Sprint 14 milestone",
    targetType: "project",
    projectId: "proj_01",
    timestamp: "2024-06-13T16:30:00Z",
  },
  {
    id: "act_07",
    userId: "usr_02",
    action: "assigned",
    target: "Icon system task",
    targetType: "task",
    projectId: "proj_01",
    timestamp: "2024-06-13T14:00:00Z",
  },
  {
    id: "act_08",
    userId: "usr_03",
    action: "merged PR for",
    target: "Animation utilities",
    targetType: "task",
    projectId: "proj_01",
    timestamp: "2024-06-13T11:30:00Z",
  },
  {
    id: "act_09",
    userId: "usr_04",
    action: "moved to review",
    target: "Export functionality",
    targetType: "task",
    projectId: "proj_03",
    timestamp: "2024-06-13T10:00:00Z",
  },
  {
    id: "act_10",
    userId: "usr_05",
    action: "added member",
    target: "Olivia Torres",
    targetType: "member",
    projectId: "proj_06",
    timestamp: "2024-06-12T15:45:00Z",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif_01",
    type: "mention",
    title: "Sarah mentioned you",
    message: "in Design System — \"@Alex can you review the new token structure?\"",
    read: false,
    userId: "usr_02",
    timestamp: "2024-06-14T14:30:00Z",
    actionUrl: "/detail?id=proj_01",
  },
  {
    id: "notif_02",
    type: "assignment",
    title: "New task assigned",
    message: "Form components and validation patterns — due Jul 1",
    read: false,
    userId: "usr_05",
    timestamp: "2024-06-14T10:00:00Z",
    actionUrl: "/detail?id=proj_01",
  },
  {
    id: "notif_03",
    type: "comment",
    title: "Maya commented",
    message: "on Analytics Dashboard — \"The export format looks great, one suggestion...\"",
    read: true,
    userId: "usr_04",
    timestamp: "2024-06-13T16:00:00Z",
    actionUrl: "/detail?id=proj_03",
  },
  {
    id: "notif_04",
    type: "update",
    title: "Project milestone reached",
    message: "Authentication Flow — 100% complete",
    read: true,
    userId: "usr_03",
    timestamp: "2024-06-12T09:00:00Z",
    actionUrl: "/detail?id=proj_04",
  },
  {
    id: "notif_05",
    type: "invite",
    title: "You were added to",
    message: "Notification Engine project by Daniel",
    read: true,
    userId: "usr_05",
    timestamp: "2024-06-11T14:00:00Z",
    actionUrl: "/detail?id=proj_06",
  },
];

export function getRecentActivity(limit: number = 8): Activity[] {
  return [...activities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function getUnreadNotifications(): Notification[] {
  return notifications.filter((n) => !n.read);
}
