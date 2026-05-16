-- ============================================
-- Baseline — Supabase Database Schema
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- Users (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- Projects
-- ============================================
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text default '',
  status text default 'active' check (status in ('active', 'review', 'paused', 'completed', 'archived')),
  color text default '#76836A',
  progress integer default 0 check (progress >= 0 and progress <= 100),
  due_date timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.projects enable row level security;

create policy "Users can CRUD own projects"
  on public.projects for all
  using (auth.uid() = user_id);

-- ============================================
-- Tasks
-- ============================================
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  description text default '',
  status text default 'todo' check (status in ('todo', 'in-progress', 'review', 'done')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  due_date timestamptz,
  position integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.tasks enable row level security;

create policy "Users can CRUD own tasks"
  on public.tasks for all
  using (auth.uid() = user_id);

-- ============================================
-- Notes
-- ============================================
create table public.notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  title text default '',
  content text default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.notes enable row level security;

create policy "Users can CRUD own notes"
  on public.notes for all
  using (auth.uid() = user_id);

-- ============================================
-- Indexes
-- ============================================
create index idx_projects_user on public.projects(user_id);
create index idx_tasks_project on public.tasks(project_id);
create index idx_tasks_user on public.tasks(user_id);
create index idx_notes_user on public.notes(user_id);
create index idx_notes_project on public.notes(project_id);

-- ============================================
-- Updated_at trigger
-- ============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at before update on public.projects
  for each row execute function public.update_updated_at();

create trigger tasks_updated_at before update on public.tasks
  for each row execute function public.update_updated_at();

create trigger notes_updated_at before update on public.notes
  for each row execute function public.update_updated_at();
