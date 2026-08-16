-- PRAN — Stage 3.1 (Docs/4_Phases.md): the `projects` table, its Storage
-- bucket, and RLS. Run this once in the Supabase SQL editor, against a new
-- project. Written 2026-08-16.
--
-- SHAPE IS NOT INVENTED — it follows Docs/2_Architecture.md §3 exactly.
-- If you need a column that isn't here, add it to Architecture.md first,
-- then here; don't let the two drift apart.
--
-- SCOPE: only `projects` + its bucket. Architecture.md §3 also documents
-- `orders`, `contact_submissions`, and `calculator_results` — none of those
-- are built here. `orders` is deferred with the escrow flow (Docs/4_Phases.md
-- "DEFERRED — NOT THIS PHASE"); the other two were never part of Stage 3.1's
-- scope. Do not add them without checking Phases.md first.
--
-- Statements use IF NOT EXISTS / ON CONFLICT DO NOTHING so re-running this
-- file is safe.

-- ── projects ────────────────────────────────────────────────────────────

create table if not exists public.projects (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  slug                 text not null unique,
  developer_name       text,
  source_type          text not null default 'DEVELOPER'
                         check (source_type in ('DEVELOPER', 'BROKER', 'REGISTRY')),
  short_description    text,
  full_description     text,
  project_type         text,
  registry             text,
  registry_project_id  text,
  methodology          text,
  country              text,
  location             text,
  vintage_year         integer,
  -- Money as numeric, never float — CLAUDE.md: all money uses precise
  -- decimal handling.
  price_per_credit_usd numeric(12, 2),
  price_per_credit_inr numeric(12, 2),
  credits_available    numeric(14, 2),
  verification_status  text not null default 'PENDING'
                         check (verification_status in ('VERIFIED', 'PENDING')),
  cover_image_url      text,
  gallery_urls         jsonb not null default '[]'::jsonb,
  documents            jsonb not null default '[]'::jsonb,
  sdg_tags             jsonb not null default '[]'::jsonb,
  status               text not null default 'PAUSED'
                         check (status in ('ACTIVE', 'PAUSED', 'SOLD_OUT')),
  created_at           timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_country_idx on public.projects (country);

alter table public.projects enable row level security;

-- Public storefront: only ACTIVE projects, read-only. Matches
-- Architecture.md §3's RLS table exactly ("public can SELECT where
-- status='ACTIVE'").
drop policy if exists "projects_public_read_active" on public.projects;
create policy "projects_public_read_active"
  on public.projects for select
  to anon, authenticated
  using (status = 'ACTIVE');

-- Phase 1 has exactly ONE admin account (Stage 3.2 creates it via Supabase
-- Auth). There is no role table because there is only ever one row to be
-- one of — any authenticated user IS the admin. This policy makes the DATA
-- safe; it does NOT satisfy CLAUDE.md's "everything under /admin requires
-- server-checked admin auth" on its own — Stage 3.2 must still check the
-- session server-side on every /admin route. Both are required, not either/or.
drop policy if exists "projects_admin_full_access" on public.projects;
create policy "projects_admin_full_access"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- ── storage: project images + documents ────────────────────────────────
-- One bucket, per Architecture.md §2 ("File storage — Documents, images,
-- certificates") and §3's ⚠ note that a Storage bucket for project
-- images/documents is the only Stage-3.1 storage scope. Public-read: cover
-- images and gallery photos are shown on public marketplace pages.

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

drop policy if exists "project_media_public_read" on storage.objects;
create policy "project_media_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-media');

drop policy if exists "project_media_admin_write" on storage.objects;
create policy "project_media_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-media');

drop policy if exists "project_media_admin_update" on storage.objects;
create policy "project_media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-media');

drop policy if exists "project_media_admin_delete" on storage.objects;
create policy "project_media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-media');
