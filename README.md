# Rugby Roots

Six-week session plans and a player register for grassroots rugby coaches.

Every session is built as **Warm-up → Skill Zone → Game Zone**, so it always
finishes with a game. Each game carries one condition — the single rule that
makes the week's skill show up — and a few questions to ask instead of
instructions to shout.

---

## Part 1 — Put it online (no software installation needed)

You do **not** need to install anything on your computer. GitHub stores the
files, and Vercel builds the app in the cloud and puts it on the web.

Set aside about twenty minutes for this. You only ever do it once.

### Step 1 — Create a GitHub account

Go to [github.com](https://github.com) and sign up. It's free.

### Step 2 — Make an empty repository

1. Click the **+** in the top right → **New repository**.
2. Name it `rugby-roots`.
3. Choose **Private** if you'd rather other people couldn't see it.
4. Do **not** tick "Add a README file" — this folder already has one.
5. Click **Create repository**.

### Step 3 — Upload this folder

On the page that appears, click **uploading an existing file**.

Now drag **everything inside the `rugby-roots` folder** into the browser
window — all the files and the `src`, `public` and `docs` folders together.

> **Two things people get wrong here.**
>
> Drag the *contents* of the folder, not the folder itself. When it's done,
> `package.json` should be sitting at the top level of the repository, not
> inside another `rugby-roots` folder.
>
> If you ever see a `node_modules` folder, don't upload it. It's enormous and
> it's rebuilt automatically. The `.gitignore` file already tells GitHub to
> skip it.

Scroll down, type `First version` in the box, and click **Commit changes**.

### Step 4 — Connect Vercel

1. Go to [vercel.com](https://vercel.com) and click **Sign up**, then
   **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `rugby-roots` in the list and click **Import**.
4. Change nothing. Vercel already knows how to build this. Click **Deploy**.

Wait a minute or two. You'll get a web address like
`rugby-roots-abc123.vercel.app`. That's your app, live. Send it to your
coaches.

### Step 5 — Tell coaches to install it

On the phone, open the address, then:

- **iPhone:** Share button → *Add to Home Screen*
- **Android:** menu (⋮) → *Install app* or *Add to Home screen*

It then behaves like a normal app and **works with no signal**, which matters
on most pitches. Take the register in a field with no bars and it still saves.

---

## Part 2 — Where your data lives (please read this bit)

**Your squad, register and player notes are saved on the coach's own device
and nowhere else.** Nothing is uploaded. Nobody else can see it — not even
you, and not Vercel.

That's deliberate: it's the safest place for notes about children, and it
means the app works offline. But it has two consequences:

1. **It is not a backup.** If the coach clears their browser data or loses the
   phone, it's gone. Use **Back up season** on the Today tab now and then and
   keep the file somewhere safe.
2. **It does not sync between coaches.** Two coaches each have their own
   register.

**Sharing plans does work.** On the Sessions tab, **Share block with a coach**
creates a link that loads the exact six-week block on someone else's phone.
The link contains only the six session choices — no player names, no notes.

If you later need several coaches sharing one live register, see
[`docs/GOING-SHARED.md`](docs/GOING-SHARED.md). It's one file to change.

### A word on children's data

Player names and coaching notes are personal data about children. While it
stays on the coach's phone, the risk is low. The moment it moves to a shared
database, your club becomes responsible for it under UK GDPR. Before you take
that step, it's worth: using first name and last initial only, keeping notes
about rugby rather than welfare, and having your club's safeguarding or data
protection lead look it over.

---

## Part 3 — Age grade and contact (set this first)

The first thing the app asks for is your squad's age grade. It isn't
decoration — it decides what the app will let you run.

**Below U9, contact is locked out entirely.** The tackling sessions disappear
from the skill list, contact blocks vanish from the presets, and a block
shared by another coach that contains contact is refused with an explanation.
Changing an existing squad down to U7 or U8 clears any contact already in the
plan.

This is regulation, not preference. In England, RFU Regulation 15 states that
U7s and U8s are not permitted to play contact rugby in any circumstances, with
contact introduced from U9 (school year 4). In Scotland, the Age Grade Law
Variations allow only non-contact rugby through Primary 1–3, with contact
starting at P4.

At U9 and above the contact sessions unlock, and every one of them specifies a
tackle height of waist and below, in line with the current Scottish AGLVs.

**Age grade law variations change between seasons.** Before a block starts,
check the current documents:

- Scotland — [Age Grade Law Variations](https://scottishrugby.org/community-game/game-development/age-grade-law-variations-aglvs/)
- England — [Age Grade Rugby](https://www.englandrugby.com/play/parents-guardians/age-grade-rugby-overview)

If your union's guidance differs from anything here, the union is right and
this app is wrong. Tell your coaches that.

---

## Part 4 — On the pitch

Open any session and you get two things built for the touchline rather than
the kitchen table.

**Tonight's register.** Tap "Everyone's here", then tap the names of anyone
missing. It saves as you go and works with no signal.

**The session resizes itself.** Every activity shows what to do with the
number who actually turned up — "Two games of 4v4", "3 groups of 4", and a
pitch size to pace out. Nine children instead of fourteen changes the session
rather than leaving you to work it out in the rain.

Game Zone activities also carry a simple pitch diagram — cones, attackers,
defenders and the movement — so another coach can pick up your plan and run it.

---

## Part 5 — Writing your own activities

Open any session and scroll to **Your own activities → Write one**.

The form is guided rather than a blank page. Pick warm-up, skill zone or game
zone, then fill in how it's set up, how it runs, and your coaching points. If
you're writing a game it asks for **the condition** — the single rule that
forces the skill to show up — because without one it's just a game of rugby.

It then asks you to score your own activity against **APES**: Active,
Purposeful, Enjoyable, Safe. Anything under 4 gets a gentle nudge rather than
a block. It also asks for one way to make it easier and one to make it harder,
which you'll be grateful for when half the group finds it too simple.

You can draw the picture yourself, and it's built for thumbs: pick a starting
layout, then tap to place attackers and defenders, drag them where you want,
draw run, pass and kick arrows by dragging from A to B (they snap to players),
drop cones, and tap anything with the bin tool to remove it. The 🏉 tool moves
the ball between attackers. Or skip the picture entirely — it's optional.

Saved activities go in your own library and can be dropped into any session,
as many times as you like. They live with your squad data on your device, so
updating the app never overwrites them, and they travel in your backup file.

---

## Part 6 — Building and changing your block

Your six-week block has its own screen, kept separate from running a session
on the night.

On the **Sessions** tab, tap **Build / rearrange**. From there you can:

- **Start from a ready-made block** or pick a single skill to work through.
- **Change the skill for any week** — tap Change skill, pick the new skill,
  and it keeps the same difficulty for that week. Or pick a specific session
  if you want a particular one.
- **Move a week earlier or later** with the arrows on its left. Anything you've
  already recorded — whether the week was delivered, your notes, the register —
  moves with it.
- **Copy a week to the next one**, handy when you want to repeat a session or
  build a run of similar ones.

Tap **Done** and you're back to the block overview, where each week has
**Open session plan** to run it. Running a session — the register, the
activities, the diagrams — is a separate screen, so planning and coaching never
get tangled together.

Editing the built-in session *content* (the words in the drills) is different
again, and is done in the files — see below.

## Part 7 — If you want to preview changes on your own computer

Only needed if you'd rather test before going live. You'll need
[Node.js](https://nodejs.org) (take the LTS version).

```bash
npm install     # once, the first time
npm run dev     # start it — then open the address it prints
npm run build   # check it still builds cleanly
```

---

## What's in the folder

```
index.html              The page the browser opens
package.json            The list of tools this project uses
vite.config.js          Build and offline settings — leave alone
public/                 App icons
src/
  main.jsx              Starts the app
  App.jsx               Tabs, loading and saving
  styles.css            All the styling
  data/                 ← the coaching content, one file per skill
  lib/
    storage.js          ← where data is saved (change this to go shared)
    share.js            Shareable plan links
    backup.js           Export and restore
    helpers.js          Small shared functions
    print.js            The printable session card
  components/           The screens
docs/                   Guides for editing and going shared
```

---

## Troubleshooting

**Vercel says the build failed.** Click the failed deployment and read the red
line. Usually it's a missing comma or quote in a `src/data/` file. Undo your
last change on GitHub and the previous version comes straight back.

**The app looks out of date on a phone.** Because it's installed as an app it
caches itself. Close it fully and reopen, or pull down to refresh.

**A coach lost their register.** If they made a backup, use **Restore backup**
on the Today tab. If not, it can't be recovered — which is the argument for
either regular backups or the shared setup in `docs/GOING-SHARED.md`.
