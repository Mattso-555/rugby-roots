# Rugby Roots — three upgrades

This folder adds three things, all in keeping with how the app already works:
everything stays on the coach's device, nothing scores a child, and the block
keeps its shape.

## What's new

**Plan B.** On any session's screen there's now a Plan B card. Raining hard,
stuck in a hall, a coach short, or too few for the games — tick what's changed
and the session swaps to activities that still work, staying on that week's
skill so the block keeps moving. Every swap says where it borrowed from, and
if nothing fits everything you ticked, it says so honestly instead of quietly
giving you something off-skill. Untick and the plan comes straight back. Your
choice is saved with the week, like the register.

Behind it, every built-in activity now carries a one-line `planB` tag in
`src/data/` — wet, indoor, single-coach, and the fewest players it works with.
Edit them freely if you disagree with a judgment. Two judgments worth knowing:
live tackling is deliberately never marked single-coach-safe, and the kicking
block has almost no indoor options because you can't punt in a hall.

**The debrief comes back to you.** The note box at the bottom of a session is
now framed as "How did tonight go?" — one line is plenty. The new part: the
next time you coach that skill, your last note appears at the top of the
session, so "gates too close together" actually gets fixed.

**Fading away.** The Players tab already nudges you about the child you
haven't noted. It now also quietly flags a child who came regularly but has
missed the last two registers in a row — the drift that usually happens before
a child stops coming. It clears itself the moment they're back. No streaks, no
percentages, nothing a child or parent ever sees.

## Putting it live

On GitHub, open your repository and use **Add file → Upload files**, keeping
the folder structure the same as this one:

- everything in `src/data/` here replaces the same files in your `src/data/`
- `src/lib/planB.js` and `src/lib/fading.js` are new — upload into `src/lib/`
- the four files in `src/components/` here replace the same four in yours
- `src/App.jsx` replaces your `src/App.jsx`

Commit, and Vercel rebuilds automatically. Nothing about saved squads,
registers or notes changes shape — existing data carries straight on, and
backups made before this upgrade still restore.
