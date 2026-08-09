# Letting several coaches share one register

**Only do this if you actually need it.** Keeping data on each coach's own
phone is simpler, free, works offline, and is much easier to justify to a
safeguarding officer. Go shared only when several coaches genuinely need to
see the same squad and register.

## What changes

One file: `src/lib/storage.js`. Nothing else in the app touches storage, so
nothing else needs editing.

## Recommended: Supabase

It gives you a database, logins and permissions in one free product. Magic
link sign-in suits volunteers who won't remember a password.

Note: Vercel's own database products were discontinued — databases now come
from partners such as Supabase, Neon and Upstash, either directly or through
the Vercel Marketplace. Ignore any tutorial telling you to install
`@vercel/postgres` or `@vercel/kv`.

### Steps

1. Create a free project at [supabase.com](https://supabase.com).
2. Install the client:
   ```bash
   npm install @supabase/supabase-js
   ```
3. Create `.env` from `.env.example` and paste in your project URL and anon
   key. In Vercel, add the same two values under
   **Settings → Environment Variables**.
4. In Supabase, create tables roughly like:

   | Table | Columns |
   |---|---|
   | `squads` | `id`, `club_id`, `name` |
   | `players` | `id`, `squad_id`, `name`, `skills` (jsonb), `awards` (jsonb) |
   | `plans` | `id`, `squad_id`, `name`, `slots` (jsonb) |
   | `progress` | `id`, `squad_id`, `week`, `done`, `reflection` |

5. **Turn on Row Level Security** on every table and add a policy so a coach
   can only read rows for their own squad. Do not skip this — without it,
   anyone with your public key can read every child's name.
6. Fill in `cloudLoad` and `cloudSave` in `src/lib/storage.js` (the comments
   there tell you the shape they must return).
7. Change `const BACKEND = "local"` to `const BACKEND = "supabase"`.

## Keep the local-first behaviour

`saveData` already writes to the phone first and then to the cloud. Leave it
that way. It means a register taken in a field with no signal is never lost —
the shared copy catches up when the phone reconnects.

## Before you switch on

- Give the club's safeguarding or data protection lead sight of it.
- Store first name and last initial rather than full names.
- Keep notes about rugby, not about welfare or family circumstances.
- Have a way to delete a child's record on request.
- Decide how long you keep records after a player leaves.
