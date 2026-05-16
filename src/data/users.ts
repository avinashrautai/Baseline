import { User } from "@/types";

export const users: User[] = [
  {
    id: "usr_01",
    name: "Alex Reed",
    email: "alex@baseline.app",
    initials: "AR",
    role: "Product Lead",
    status: "online",
  },
  {
    id: "usr_02",
    name: "Sarah Chen",
    email: "sarah@baseline.app",
    initials: "SC",
    role: "Lead Designer",
    status: "online",
  },
  {
    id: "usr_03",
    name: "James Liu",
    email: "james@baseline.app",
    initials: "JL",
    role: "Senior Engineer",
    status: "away",
  },
  {
    id: "usr_04",
    name: "Maya Patel",
    email: "maya@baseline.app",
    initials: "MP",
    role: "Product Manager",
    status: "online",
  },
  {
    id: "usr_05",
    name: "Daniel Park",
    email: "daniel@baseline.app",
    initials: "DP",
    role: "Frontend Engineer",
    status: "offline",
  },
  {
    id: "usr_06",
    name: "Olivia Torres",
    email: "olivia@baseline.app",
    initials: "OT",
    role: "UX Researcher",
    status: "online",
  },
];

export const currentUser = users[0];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getUsersByIds(ids: string[]): User[] {
  return users.filter((u) => ids.includes(u.id));
}
