-- ============================================================
-- Rugby Roots — shared club storage
-- Paste this WHOLE file into Supabase: SQL Editor → New query → Run.
-- Safe to run once on a fresh project.
-- ============================================================

-- Who is allowed in. Only emails in this table can read or write anything.
create table if not exists club_coaches (
  email text primary key,
  name text,
  added_at timestamptz not null default now()
);

-- One row per squad (the app uses the first squad it finds, creating one
-- if none exists).
create table if not exists squads (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Main squad',
  created_at timestamptz not null default now()
);

-- The squad's data, one row per section (players, plan, attendance, …).
-- Section-level rows let two coaches sync without trampling each other.
create table if not exists squad_sections (
  squad_id uuid not null references squads(id) on delete cascade,
  section text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (squad_id, section)
);

-- Private parent links: possession of the token shows ONE child's published
-- view. Revoke by setting revoked = true (the app has a button for this).
create table if not exists parent_links (
  token uuid primary key default gen_random_uuid(),
  squad_id uuid not null references squads(id) on delete cascade,
  player_id text not null,
  label text,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security: coaches only. DO NOT SKIP.
-- ------------------------------------------------------------
alter table club_coaches enable row level security;
alter table squads enable row level security;
alter table squad_sections enable row level security;
alter table parent_links enable row level security;

create or replace function is_coach() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from club_coaches
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists coaches_read on club_coaches;
create policy coaches_read on club_coaches for select using (is_coach());
drop policy if exists coaches_add on club_coaches;
create policy coaches_add on club_coaches for insert with check (is_coach());

drop policy if exists squads_all on squads;
create policy squads_all on squads for all using (is_coach()) with check (is_coach());

drop policy if exists sections_all on squad_sections;
create policy sections_all on squad_sections for all using (is_coach()) with check (is_coach());

drop policy if exists links_all on parent_links;
create policy links_all on parent_links for all using (is_coach()) with check (is_coach());

-- ------------------------------------------------------------
-- The parent view. SECURITY DEFINER so an un-signed-in parent holding a
-- valid, unrevoked token gets exactly one child's PUBLISHED data and
-- nothing else: name, awards, values, "for home" tips, and the block's
-- session list so the app can show this week's focus. Coach reflections,
-- private notes, the register and every other child are never returned.
-- ------------------------------------------------------------
create or replace function get_parent_view(p_token uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  link parent_links%rowtype;
  players jsonb;
  child jsonb;
  plan jsonb;
  progress jsonb;
  done jsonb;
begin
  select * into link from parent_links where token = p_token and revoked = false;
  if not found then return null; end if;

  select data into players from squad_sections
    where squad_id = link.squad_id and section = 'players';
  select coalesce(
    (select elem from jsonb_array_elements(players) elem
      where elem ->> 'id' = link.player_id limit 1), null)
  into child;
  if child is null then return null; end if;

  select data into plan from squad_sections
    where squad_id = link.squad_id and section = 'plan';
  select data into progress from squad_sections
    where squad_id = link.squad_id and section = 'progress';

  -- weeks delivered (true/false only — no reflections)
  select coalesce(jsonb_object_agg(key, (value -> 'done')), '{}'::jsonb)
    into done from jsonb_each(coalesce(progress, '{}'::jsonb));

  return jsonb_build_object(
    'name',      child ->> 'name',
    'awards',    coalesce(child -> 'awards', '[]'::jsonb),
    'values',    coalesce(child -> 'values', '[]'::jsonb),
    'homeNotes', coalesce(child -> 'homeNotes', '[]'::jsonb),
    'plan',      coalesce(plan, 'null'::jsonb),
    'done',      done
  );
end;
$$;

grant execute on function get_parent_view(uuid) to anon;

-- ------------------------------------------------------------
-- FINALLY: let yourself in. Replace the email, then run this line.
-- Every further coach can be added from inside the app.
-- ------------------------------------------------------------
-- insert into club_coaches (email, name) values ('you@example.com', 'Head coach');
