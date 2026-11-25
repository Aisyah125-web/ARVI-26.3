-- ARVI initial relational schema
-- Run in Supabase SQL Editor on a fresh project.
-- RLS is enabled on every user-data table.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  road_name text,
  location text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_name_nonempty check (length(trim(name)) > 0)
);

create table if not exists public.survey_points (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  code text not null,
  sta text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  surveyed_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint survey_points_code_nonempty check (length(trim(code)) > 0),
  constraint survey_points_latitude_range check (latitude is null or latitude between -90 and 90),
  constraint survey_points_longitude_range check (longitude is null or longitude between -180 and 180)
);

create table if not exists public.cross_sections (
  id uuid primary key default gen_random_uuid(),
  survey_point_id uuid not null unique references public.survey_points(id) on delete cascade,
  crown_enabled boolean not null default true,
  left_cross_slope_pct numeric(6,3) default 2,
  right_cross_slope_pct numeric(6,3) default 2,
  elevation_enabled boolean not null default false,
  elevation_value_m numeric(10,3),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.road_components (
  id uuid primary key default gen_random_uuid(),
  cross_section_id uuid not null references public.cross_sections(id) on delete cascade,
  side text not null default 'center' check (side in ('left','right','center')),
  component_type text not null,
  template_key text,
  label text,
  width_m numeric(10,3),
  height_m numeric(10,3),
  position_x_m numeric(10,3) not null default 0,
  position_y_m numeric(10,3) not null default 0,
  rotation_deg numeric(8,3) not null default 0,
  sort_order integer not null default 0,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.survey_media (
  id uuid primary key default gen_random_uuid(),
  survey_point_id uuid not null references public.survey_points(id) on delete cascade,
  storage_path text not null,
  media_type text not null default 'photo',
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.drawing_settings (
  id uuid primary key default gen_random_uuid(),
  cross_section_id uuid not null unique references public.cross_sections(id) on delete cascade,
  paper_size text not null default 'A4',
  orientation text not null default 'landscape' check (orientation in ('portrait','landscape')),
  scale_denominator integer not null default 100,
  road_identity text,
  sta_label text,
  coordinate_label text,
  survey_date date,
  surveyor_name text,
  team_name text,
  logo_storage_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists survey_points_project_id_idx on public.survey_points(project_id);
create index if not exists road_components_cross_section_id_idx on public.road_components(cross_section_id);
create index if not exists survey_media_survey_point_id_idx on public.survey_media(survey_point_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','projects','survey_points','cross_sections','road_components','drawing_settings'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- Create profile after signup (safe minimal metadata extraction)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name',''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.survey_points enable row level security;
alter table public.cross_sections enable row level security;
alter table public.road_components enable row level security;
alter table public.survey_media enable row level security;
alter table public.drawing_settings enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "projects_select_own" on public.projects for select to authenticated using (user_id = (select auth.uid()));
create policy "projects_insert_own" on public.projects for insert to authenticated with check (user_id = (select auth.uid()));
create policy "projects_update_own" on public.projects for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "projects_delete_own" on public.projects for delete to authenticated using (user_id = (select auth.uid()));

create policy "survey_points_select_own_project" on public.survey_points for select to authenticated
using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())));
create policy "survey_points_insert_own_project" on public.survey_points for insert to authenticated
with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())));
create policy "survey_points_update_own_project" on public.survey_points for update to authenticated
using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())))
with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())));
create policy "survey_points_delete_own_project" on public.survey_points for delete to authenticated
using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())));

create policy "cross_sections_access_own" on public.cross_sections for all to authenticated
using (exists (select 1 from public.survey_points sp join public.projects p on p.id = sp.project_id where sp.id = survey_point_id and p.user_id = (select auth.uid())))
with check (exists (select 1 from public.survey_points sp join public.projects p on p.id = sp.project_id where sp.id = survey_point_id and p.user_id = (select auth.uid())));

create policy "road_components_access_own" on public.road_components for all to authenticated
using (exists (select 1 from public.cross_sections cs join public.survey_points sp on sp.id = cs.survey_point_id join public.projects p on p.id = sp.project_id where cs.id = cross_section_id and p.user_id = (select auth.uid())))
with check (exists (select 1 from public.cross_sections cs join public.survey_points sp on sp.id = cs.survey_point_id join public.projects p on p.id = sp.project_id where cs.id = cross_section_id and p.user_id = (select auth.uid())));

create policy "survey_media_access_own" on public.survey_media for all to authenticated
using (exists (select 1 from public.survey_points sp join public.projects p on p.id = sp.project_id where sp.id = survey_point_id and p.user_id = (select auth.uid())))
with check (exists (select 1 from public.survey_points sp join public.projects p on p.id = sp.project_id where sp.id = survey_point_id and p.user_id = (select auth.uid())));

create policy "drawing_settings_access_own" on public.drawing_settings for all to authenticated
using (exists (select 1 from public.cross_sections cs join public.survey_points sp on sp.id = cs.survey_point_id join public.projects p on p.id = sp.project_id where cs.id = cross_section_id and p.user_id = (select auth.uid())))
with check (exists (select 1 from public.cross_sections cs join public.survey_points sp on sp.id = cs.survey_point_id join public.projects p on p.id = sp.project_id where cs.id = cross_section_id and p.user_id = (select auth.uid())));

-- Important: this migration does not insert demo projects or survey rows.
