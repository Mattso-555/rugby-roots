# Sharing one squad between all your coaches

**Only do this if you actually need it.** Keeping data on each coach's own
phone is simpler, free, and easier to justify to a safeguarding officer. Go
shared when several coaches genuinely need the same squad, register and
library — and when you want parents to have their private child pages.

The good news: the shared mode is **already built into the app**. You don't
edit any code. You create one free account, paste one file of database setup,
and add two settings in Vercel. About twenty minutes.

## What shared mode gives you

- Every coach signs in with an emailed link (no passwords) and sees the same
  squad, register, notes, block and library.
- **Phones still save first.** A register taken in a field with no signal is
  never lost; it syncs when the phone reconnects. Two coaches' work merges —
  notes are never overwritten, and each week's register belongs to whoever
  ran that night.
- **Parent links.** On any player's screen, create a private link and send it
  to the designated parent. It shows that child only: this week's focus,
  awards, values, and your "for home" tips. Coach notes stay private —
  the only things parents see are the tips you deliberately publish from the
  "A tip for home" box when noting a session. Replace a link any time; the
  old one dies instantly.

## Setting it up

1. **Create the project.** Go to [supabase.com](https://supabase.com), sign
   up free, and create a project. Pick a **United Kingdom or EU region** —
   this is children's data.
2. **Paste the database setup.** In Supabase, open **SQL Editor → New
   query**, paste the entire contents of `docs/going-shared.sql` from this
   repository, and press **Run**. This creates the tables, switches on the
   security rules, and installs the parent-view function.
3. **Let yourself in.** At the bottom of that same file is one commented-out
   line. Put your own email in it, remove the leading `--`, and run it. You
   are now the first coach; every further coach is added from inside the app.
4. **Give the app the keys.** In Supabase: **Settings → API** — copy the
   Project URL and the `anon` public key. In Vercel: your project →
   **Settings → Environment Variables** — add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with those values, then
   **Redeploy** (Deployments → ⋯ → Redeploy).
5. **Sign in.** Open the app: it now asks for your email and sends a sign-in
   link. If a coach already has a season on their phone, their registers and
   notes merge into the club store the first time they sign in — the club's
   block and library become the shared truth.

Add coaches from **Home & settings → Club coaches** (tap the logo, top
left). Create parent links from a player's page on the **Players** tab.

## How merging behaves (worth knowing)

- Registers, week notes and Plan B choices merge **week by week** — the
  coach who ran a night owns that night.
- Player notes, tips, awards and values are **combined** — nothing a coach
  wrote is ever dropped. A skill level takes whichever coach observed it
  more recently.
- The block plan and the library are **whole pieces**: the last coach to edit
  wins. Curate the block and library from one phone at a time.

## Before you switch on — governance, not optional

- Show this plan to the club's safeguarding or data protection lead.
- Store first name and last initial rather than full names.
- Keep notes about rugby, not welfare or family circumstances.
- WHO gets a child's parent link is a club decision (think separated
  parents): the app gives you create/send/replace, the club decides the
  recipient. Keep a note of where each link was sent.
- Decide how long records are kept after a player leaves, and delete on
  request (delete the player in the app; their parent link dies with them).

## Going back to local

Remove the two environment variables in Vercel and redeploy. Every phone
keeps its own copy again; the Supabase project can be paused or deleted.
