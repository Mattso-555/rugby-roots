# Editing the sessions

All coaching content is in `src/data/`, one file per skill area.

You can edit these on the GitHub website: open the file, click the pencil
icon, make your change, click **Commit changes**. Vercel rebuilds
automatically and the change is live in about a minute.

## The shape of a session

Each skill area has exactly **six weeks**. Each week has **three activities**:
a Warm-up, a Skill Zone and a Game Zone.

```js
{
  "week": 3,
  "title": "Passing on the move",
  "objective": "Pass accurately while jogging, timing it so a team-mate can run onto it.",
  "coachingPoints": [ "Pass slightly ahead so they run onto it", "..." ],
  "activities": [ ... ],
  "safety": [ "Manage spacing so groups don't collide.", "..." ]
}
```

An activity looks like this:

```js
{
  "name": "Three-second rugby",
  "type": "Gameplay",
  "setup": "A 20m x 15m pitch, teams of four, tag or touch rules.",
  "play": "Ordinary touch rugby, except the carrier may only hold the ball for three seconds...",
  "condition": "Three seconds with the ball, then it must be passed. Count aloud.",
  "good": "Passes happen on the move without the carrier stopping first...",
  "points": [ "Pass while you're still running", "...", "..." ],
  "questions": [ "What has to happen before you get the ball?", "...", "..." ],
  "apes": { "A": 5, "P": 5, "E": 5, "S": 5 },
  "step": {
    "Space": "Wider pitch gives more time and space to pass",
    "Task": "Five seconds for younger or newer players",
    "Equipment": "Bibs by team",
    "People": "4v3 to give the passing team a head start"
  }
}
```

## What each field does

| Field | What it's for |
|---|---|
| `name` | Shown as the activity heading |
| `type` | `Warm-up`, `Skill` or `Gameplay`. `Gameplay` gets the gold Game Zone card |
| `setup` | Pitch size, numbers, kit |
| `play` | How the activity runs |
| `condition` | Game Zone only — the one rule that makes the skill appear |
| `good` | What success looks like, so you know if it's working |
| `points` | Three short coaching points |
| `questions` | Game Zone only — questions to ask instead of instructions |
| `apes` | Active / Purposeful / Enjoyable / Safe, scored 1–5. Drives the APES bar |
| `step` | How to make it easier or harder: Space, Task, Equipment, People |

## Rules to follow

- **Keep the punctuation exactly as it is.** Every `"` and `,` matters. The
  most common mistake is deleting a comma between two items, or leaving a
  comma after the last one.
- **Change words freely.** Any text between quote marks is yours to rewrite.
- **Keep six weeks and three activities per week.** The app expects them.
- If you use a quote mark inside your text, write it as `\"` — or just use a
  different word.

## Adding a whole new skill area

1. Copy `src/data/passing.js` to a new file, e.g. `src/data/defence.js`.
2. Change the first line from `export const passing = ` to
   `export const defence = `.
3. Rewrite the content.
4. Open `src/data/index.js` and add it in the two obvious places — the import
   line at the top, and the `SKILLS` list just below.

## If something breaks

Vercel will refuse to deploy rather than publish a broken app, so the live
version keeps working. On GitHub, open the file, click **History**, find the
last version that worked and restore it.

When running locally with `npm run dev`, a mistake in a data file prints a
plain-English warning in the browser console telling you which week and which
activity is wrong.
