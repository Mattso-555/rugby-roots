// Plan B — last-minute substitutions when the night goes wrong.
//
// The rules this file enforces:
//
//   1. Substitutes come from the SAME skill, so the week still counts toward
//      the block. Plan B never moves a week off-skill.
//   2. Substitutes fill the same slot (warm-up / skill zone / game zone), so
//      the session keeps its shape and still finishes with a game.
//   3. Nearest difficulty first: an activity from the same week is preferred,
//      then one week either side, and so on. Earlier (easier) beats later
//      (harder) at equal distance — on a bad night, easier is safer.
//   4. Honest beats clever: if no activity satisfies everything ticked, we say
//      so and show the nearest miss (dropping the most recently ticked
//      condition), rather than silently swapping to something off-skill.
//
// Because substitutes never leave the skill, the age-grade contact lock is
// automatically respected — a tackling week can only ever swap to other
// tackling activities, which the age gate has already allowed or refused.
//
// Everything here is pure: data in, answer out. Nothing is saved. The calling
// screen decides what to record.

export const PLAN_B_CONDITIONS = [
  {
    id: "wet",
    label: "Raining hard",
    detail: "Only activities where nobody stands still long enough to get cold.",
  },
  {
    id: "indoor",
    label: "No pitch — we're in a hall",
    detail: "No going to ground, no punting, nothing needing a big pitch.",
  },
  {
    id: "singleCoach",
    label: "A coach short",
    detail: "Only activities one adult can run safely with the whole squad.",
  },
];

// Does one activity work under the ticked conditions and tonight's numbers?
// `conditions` is an array of condition ids, e.g. ["wet", "singleCoach"].
// `playerCount` may be null (register not taken yet) — then numbers are ignored.
export function activityFits(activity, conditions, playerCount) {
  const pb = activity.planB;
  if (!pb) return false; // untagged (e.g. an older bespoke activity) — never assume
  for (const c of conditions) if (!pb[c]) return false;
  if (playerCount != null && playerCount < pb.minPlayers) return false;
  return true;
}

// Find the best substitute for one slot (0 = warm-up, 1 = skill, 2 = game)
// within the same skill. Returns { activity, week } or null.
// Search order: same week, then one week either side (earlier first), etc.
function findSlotSubstitute(skill, weekIndex, slot, conditions, playerCount) {
  const order = [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5];
  for (const d of order) {
    const wi = weekIndex + d;
    if (wi < 0 || wi >= skill.weeks.length) continue;
    const candidate = skill.weeks[wi]?.activities?.[slot];
    if (candidate && activityFits(candidate, conditions, playerCount)) {
      return { activity: candidate, week: skill.weeks[wi].week };
    }
  }
  return null;
}

// The main entry point.
//
//   planBForWeek(skill, weekIndex, ["wet", "singleCoach"], 9)
//
// Returns:
//   {
//     ok:      true if every slot could be satisfied under ALL conditions,
//     dropped: the condition ids we had to give up, in the order dropped
//              (most recently ticked goes first), or [] if none,
//     met:     the condition ids the returned plan does satisfy,
//     slots: [
//       {
//         slot, slotLabel,
//         original,              // the planned activity
//         keep,                  // true — original already fits, no swap
//         replacement, fromWeek, // if swapped: what to run and which week it came from
//         unfilled,              // true — nothing in this skill fits even relaxed
//       }, x3
//     ],
//   }
//
// The calling screen should present `dropped` plainly, e.g.
// "No tackling activity fits all of that — this is the nearest plan,
//  but it does need two coaches."
export const SLOT_LABELS = ["Warm-up", "Skill Zone", "Game Zone"];

export function planBForWeek(skill, weekIndex, conditions, playerCount) {
  const week = skill.weeks[weekIndex];
  if (!week) return null;

  const attempt = (conds) => {
    const slots = [];
    let complete = true;
    for (let slot = 0; slot < 3; slot++) {
      const original = week.activities[slot];
      if (activityFits(original, conds, playerCount)) {
        slots.push({ slot, slotLabel: SLOT_LABELS[slot], original, keep: true });
        continue;
      }
      const sub = findSlotSubstitute(skill, weekIndex, slot, conds, playerCount);
      if (sub) {
        slots.push({
          slot, slotLabel: SLOT_LABELS[slot], original,
          keep: false, replacement: sub.activity, fromWeek: sub.week,
        });
      } else {
        slots.push({ slot, slotLabel: SLOT_LABELS[slot], original, keep: false, unfilled: true });
        complete = false;
      }
    }
    return { slots, complete };
  };

  // Try everything ticked; if a slot can't be filled, drop conditions one at a
  // time from the end (the most recently ticked) until the plan is complete.
  const active = [...conditions];
  const dropped = [];
  let result = attempt(active);
  while (!result.complete && active.length > 0) {
    dropped.unshift(active.pop());
    result = attempt(active);
  }

  return {
    ok: dropped.length === 0 && result.complete,
    dropped,
    met: active,
    slots: result.slots,
  };
}

// A small helper for the button itself: is Plan B worth offering tonight?
// True if any ticked condition would change at least one slot — the screen
// can also use it to grey out conditions that would change nothing.
export function planBWouldChangeAnything(skill, weekIndex, conditions, playerCount) {
  const plan = planBForWeek(skill, weekIndex, conditions, playerCount);
  return !!plan && plan.slots.some((s) => !s.keep);
}
