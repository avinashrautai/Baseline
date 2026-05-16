// ============================================
// Baseline — Database Types (Supabase)
// ============================================

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  status: "active" | "review" | "paused" | "completed" | "archived";
  color: string;
  progress: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Insert types (omit auto-generated fields)
export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type TaskInsert = Omit<Task, "id" | "created_at" | "updated_at">;
export type NoteInsert = Omit<Note, "id" | "created_at" | "updated_at">;

// Update types (all fields optional except id)
export type ProjectUpdate = Partial<Omit<Project, "id" | "user_id" | "created_at">> & { id: string };
export type TaskUpdate = Partial<Omit<Task, "id" | "user_id" | "created_at">> & { id: string };
export type NoteUpdate = Partial<Omit<Note, "id" | "user_id" | "created_at">> & { id: string };
