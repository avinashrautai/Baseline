"use client";

import { createClient } from "./client";
import type {
  Project,
  ProjectInsert,
  ProjectUpdate,
  Task,
  TaskInsert,
  TaskUpdate,
  Note,
  NoteInsert,
  NoteUpdate,
  Profile,
} from "@/types/database";

// ============================================
// Client instance
// ============================================

function db() {
  return createClient();
}

// ============================================
// Profile
// ============================================

export async function getProfile(): Promise<Profile | null> {
  const { data } = await db()
    .from("profiles")
    .select("*")
    .single();
  return data;
}

// ============================================
// Projects
// ============================================

export async function getProjects(): Promise<Project[]> {
  const { data } = await db()
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data } = await db()
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function createProject(project: Omit<ProjectInsert, "user_id">): Promise<Project | null> {
  const { data: { user } } = await db().auth.getUser();
  if (!user) return null;

  const { data } = await db()
    .from("projects")
    .insert({ ...project, user_id: user.id })
    .select()
    .single();
  return data;
}

export async function updateProject({ id, ...updates }: ProjectUpdate): Promise<Project | null> {
  const { data } = await db()
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await db()
    .from("projects")
    .delete()
    .eq("id", id);
  return !error;
}

// ============================================
// Tasks
// ============================================

export async function getTasks(projectId?: string): Promise<Task[]> {
  let query = db()
    .from("tasks")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getRecentTasks(limit: number = 5): Promise<Task[]> {
  const { data } = await db()
    .from("tasks")
    .select("*")
    .neq("status", "done")
    .order("updated_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function createTask(task: Omit<TaskInsert, "user_id">): Promise<Task | null> {
  const { data: { user } } = await db().auth.getUser();
  if (!user) return null;

  const { data } = await db()
    .from("tasks")
    .insert({ ...task, user_id: user.id })
    .select()
    .single();
  return data;
}

export async function updateTask({ id, ...updates }: TaskUpdate): Promise<Task | null> {
  const { data } = await db()
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function deleteTask(id: string): Promise<boolean> {
  const { error } = await db()
    .from("tasks")
    .delete()
    .eq("id", id);
  return !error;
}

// ============================================
// Notes
// ============================================

export async function getNotes(projectId?: string): Promise<Note[]> {
  let query = db()
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getNote(id: string): Promise<Note | null> {
  const { data } = await db()
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function createNote(note: Omit<NoteInsert, "user_id">): Promise<Note | null> {
  const { data: { user } } = await db().auth.getUser();
  if (!user) return null;

  const { data } = await db()
    .from("notes")
    .insert({ ...note, user_id: user.id })
    .select()
    .single();
  return data;
}

export async function updateNote({ id, ...updates }: NoteUpdate): Promise<Note | null> {
  const { data } = await db()
    .from("notes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function deleteNote(id: string): Promise<boolean> {
  const { error } = await db()
    .from("notes")
    .delete()
    .eq("id", id);
  return !error;
}

// ============================================
// Auth helpers
// ============================================

export async function getCurrentUser() {
  const { data: { user } } = await db().auth.getUser();
  return user;
}

export async function signOut() {
  await db().auth.signOut();
}
