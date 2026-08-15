// Per-week slot edits: swap any of a week's three slots — Warm-up, Skill
// Zone, Game Zone — for something of your own, without touching the other
// two or the block itself.
//
// An override is stored against the week and the slot:
//
//   data.weekEdits = { [week]: { [slotIndex]: ref } }
//
//   ref = { kind:"custom",  id }               one of your own activities
//       | { kind:"course",  id }               one of your skills courses
//       | { kind:"builtin", skill, session }   the same slot from another
//                                              week of a built-in skill
//
// Rules the screens rely on:
//   - Overrides are keyed by week number, so they work on any week (built-in
//     or your own session) and travel with the week when the block moves.
//   - A slot you've deliberately swapped is yours: Plan B leaves it alone.
//   - Deleting an activity or course from the library clears any slots that
//     were using it (handled in App), and a ref that no longer resolves is
//     simply ignored — the plan shows through.

import { SKILLS } from "../data/index.js";
import { kitSummary } from "./courses.js";

export const SLOT_LABELS = ["Warm-up", "Skill Zone", "Game Zone"];
export const SLOT_TYPES = ["Warm-up", "Skill", "Gameplay"];

export function weekEditsFor(data, week) {
  return (data && data.weekEdits && data.weekEdits[week]) || {};
}

// Turn a stored ref into the thing to show. Returns { activity } or
// { course }, or null when the ref no longer points at anything.
export function resolveRef(data, ref, slotIndex) {
  if (!ref) return null;
  if (ref.kind === "custom") {
    const a = (data.customActivities || []).find((x) => x.id === ref.id);
    return a ? { activity: a } : null;
  }
  if (ref.kind === "course") {
    const c = (data.courses || []).find((x) => x.id === ref.id);
    return c ? { course: c } : null;
  }
  if (ref.kind === "builtin") {
    const s = SKILLS[ref.skill];
    const a = s && s.weeks[ref.session - 1] && s.weeks[ref.session - 1].activities[slotIndex];
    return a ? { activity: a } : null;
  }
  return null;
}

// Compose what each slot actually shows tonight. Precedence per slot:
//   1. the coach's own swap (an override),
//   2. Plan B's substitute, when Plan B is active and offered one,
//   3. the planned activity.
// `planB` is the result of planBForWeek, or null.
export function displaySlots(data, week, baseTrio, planB) {
  const edits = weekEditsFor(data, week);
  return baseTrio.map((planned, i) => {
    const res = resolveRef(data, edits[i], i);
    if (res) {
      return { i, overridden: true, ref: edits[i],
               activity: res.activity || null, course: res.course || null };
    }
    const s = planB ? planB.slots[i] : null;
    const activity = s && !s.keep && s.replacement ? s.replacement : planned;
    return { i, overridden: false, activity, course: null, planBSlot: s };
  });
}

// The printable card needs activity-shaped objects. A course in a slot is
// synthesised honestly: real name, real dimensions and kit, the coach's own
// "how it runs" note — and dashes where scores would be invented.
export function printableActivities(slots, extras) {
  const fromSlot = (v) => {
    if (v.activity) return v.activity;
    const c = v.course;
    return {
      name: c.name || "Skills course",
      type: "Skills course",
      setup: `${c.size[0]}m × ${c.size[1]}m area${kitSummary(c) ? ` — ${kitSummary(c)}` : ""}. Full layout printed on this sheet.`,
      play: c.notes || "Run the course as drawn — see the course card on this sheet.",
      good: "Players move through with control and confidence at each station.",
      points: [],
      apes: { A: "–", P: "–", E: "–", S: "–" },
      step: {},
    };
  };
  return [...slots.map(fromSlot), ...(extras || [])];
}
