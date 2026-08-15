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

## Adding a diagram to an activity

Diagrams are described in metres, so the picture takes the shape of the real
pitch. Attack always runs left to right.

```js
"diagram": {
  "size": [20, 15],
  "zones":   [{ "x":16, "y":0, "w":4, "h":15, "label":"TRY", "tone":"gold" }],
  "players": [{ "x":3, "y":8, "t":"a", "n":"1", "ball":true },
              { "x":11, "y":8, "t":"d", "n":"1" }],
  "moves":   [{ "k":"run", "from":[3,8], "to":[9,8] }],
  "notes":   [{ "x":10, "y":13.4, "text":"down, up, play on" }],
  "label":   "Caption printed under the picture"
},
```

| Field | Meaning |
|---|---|
| `size` | `[length, width]` in metres — sets the shape of the drawing |
| `zones` | Shaded areas. `tone` is `gold` for scoring, `dark` for out of play |
| `players` | `t` is `a` for attack or `d` for defence, `n` is the shirt number, `ball: true` marks the carrier |
| `moves` | `k` is `run` (solid), `pass` (dashed) or `kick` (dotted arc) |
| `cones` / `gates` | `[[x, y], ...]`. A gate draws a pair of cones about 2m apart |
| `notes` | Short label on the grass. Keep under about 25 characters |
| `halfway` | `true` draws a dashed halfway line |

Three rules keep them readable:

- **Keep arrows over 3m long.** Anything shorter renders as a stub.
- **Keep players about 2m apart** so the circles don't collide.
- **Keep notes short.** A zone label is hidden automatically if a player is
  standing on it, so leave scoring zones clear if the label matters.

If an activity has no `diagram` line, no picture appears and nothing breaks.

The pitch measurement printed beside the diagram is not stored anywhere. It's
worked out from tonight's register at roughly 40 square metres per player,
which is the density the written session cards already use (a 4v4 on 20m x 15m).
