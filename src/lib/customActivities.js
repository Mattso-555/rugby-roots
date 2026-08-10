// Activities a coach writes themselves.
//
// They are stored with the coach's own data, never in the session files, so a
// club can update the app without losing anything anyone has written.

export const ACTIVITY_TYPES = [
  { id: "Warm-up",  label: "Warm-up",   blurb: "Gets them moving and touching the ball" },
  { id: "Skill",    label: "Skill Zone", blurb: "Sharpens one thing, with lots of goes each" },
  { id: "Gameplay", label: "Game Zone",  blurb: "A game where that skill has to show up" },
];

export const APES_LABELS = {
  A: ["Active", "Are they moving most of the time, rather than queueing?"],
  P: ["Purposeful", "Does it clearly practise the thing you named?"],
  E: ["Enjoyable", "Would they ask to play it again?"],
  S: ["Safe", "Space, numbers and equipment all sensible?"],
};

export const STEP_LABELS = {
  Space: "Make the area bigger or smaller",
  Task: "Change the rule or the challenge",
  Equipment: "Change the ball, bibs or cones",
  People: "Change the numbers or who plays whom",
};

export function blankActivity(type = "Gameplay") {
  return {
    id: `own${Date.now()}`,
    own: true,
    type,
    name: "",
    setup: "",
    play: "",
    condition: "",
    good: "",
    points: ["", "", ""],
    questions: ["", "", ""],
    apes: { A: 4, P: 4, E: 4, S: 5 },
    step: { Space: "", Task: "", Equipment: "", People: "" },
    diagram: null,
  };
}

// A saved activity has empty rows stripped and optional fields removed.
// The form needs them back: three point rows, three question rows, all STEP keys.
export function editableActivity(a) {
  const pad = (arr, n) => { const out = (arr || []).slice(0, n); while (out.length < n) out.push(""); return out; };
  return {
    ...blankActivity(a.type),
    ...a,
    condition: a.condition || "",
    good: a.good || "",
    points: pad(a.points, 3),
    questions: pad(a.questions, 3),
    step: { Space: "", Task: "", Equipment: "", People: "", ...(a.step || {}) },
    diagram: a.diagram || null,
  };
}

// Plain-English problems, in the order a coach would want to fix them.
export function problemsWith(a) {
  const p = [];
  if (!a.name.trim()) p.push("Give it a name.");
  if (!a.setup.trim()) p.push("Say how to set it up — pitch size, numbers, kit.");
  if (!a.play.trim()) p.push("Describe how it runs.");
  if (!a.points.filter((x) => x.trim()).length) p.push("Add at least one coaching point.");
  if (a.type === "Gameplay" && !a.condition.trim())
    p.push("A Game Zone needs a condition — the one rule that makes the skill show up.");
  return p;
}

// Warnings don't block saving; they nudge towards a better activity.
export function warningsFor(a) {
  const w = [];
  const low = Object.entries(a.apes).filter(([, v]) => v < 4).map(([k]) => k);
  if (low.includes("S")) w.push("You've marked this low on Safe. Change it before you run it.");
  if (low.includes("A")) w.push("Low on Active — check nobody is standing in a queue.");
  if (low.includes("P")) w.push("Low on Purposeful — is it really practising what you named?");
  if (low.includes("E")) w.push("Low on Enjoyable — would they ask to play it again?");
  if (a.type === "Gameplay" && !a.questions.filter((q) => q.trim()).length)
    w.push("No questions yet. Asking beats telling — try adding one or two.");
  if (!Object.values(a.step).some((s) => s.trim()))
    w.push("No adaptations yet. Add one way to make it easier and one to make it harder.");
  return w;
}

// Tidy up before saving: drop empty rows, trim everything.
export function cleanActivity(a) {
  const out = {
    ...a,
    name: a.name.trim(),
    setup: a.setup.trim(),
    play: a.play.trim(),
    good: a.good.trim() || "They stay busy, and the skill you named keeps showing up.",
    points: a.points.map((x) => x.trim()).filter(Boolean),
    questions: a.questions.map((x) => x.trim()).filter(Boolean),
    step: Object.fromEntries(Object.entries(a.step).map(([k, v]) => [k, v.trim()])),
  };
  if (a.type === "Gameplay") out.condition = a.condition.trim();
  else delete out.condition;
  if (!out.questions.length) delete out.questions;
  // keep the picture only if there's something on it
  const d = a.diagram;
  const hasContent = d && ((d.players && d.players.length) || (d.moves && d.moves.length) ||
    (d.cones && d.cones.length) || (d.zones && d.zones.length));
  if (hasContent) out.diagram = { ...d, label: d.label || "" };
  else delete out.diagram;
  return out;
}

// Starting layouts. They seed the editor with a sensible arrangement the
// coach then drags into shape — not the finished picture.
export const LAYOUTS = [
  { id: "none",    label: "No picture" },
  { id: "grid",    label: "Open grid" },
  { id: "tryzone", label: "Try zone at one end" },
  { id: "endball", label: "Scoring zone at both ends" },
  { id: "wide",    label: "Wide channels worth double" },
  { id: "gates",   label: "Four gates to run through" },
];

export function quickDiagram(layout, pitch) {
  if (!layout || layout === "none") return null;
  const L = Math.max(8, Number(pitch?.[0]) || 20);
  const W = Math.max(6, Number(pitch?.[1]) || 15);
  const base = { size: [L, W], label: "" };
  const A = (x, y, n, ball) => ({ x, y, t: "a", n, ...(ball ? { ball: true } : {}) });
  const D = (x, y, n) => ({ x, y, t: "d", n });

  if (layout === "grid") return {
    ...base,
    players: [A(L * 0.2, W * 0.6, "1", true), A(L * 0.42, W * 0.25, "2"),
              D(L * 0.6, W * 0.55, "1"), D(L * 0.75, W * 0.8, "2")],
    moves: [{ k: "run", from: [L * 0.2, W * 0.6], to: [L * 0.4, W * 0.58] },
            { k: "pass", from: [L * 0.4, W * 0.58], to: [L * 0.42, W * 0.25] }],
  };
  if (layout === "tryzone") return {
    ...base,
    zones: [{ x: L - 4, y: 0, w: 4, h: W, label: "TRY", tone: "gold" }],
    players: [A(L * 0.15, W * 0.55, "1", true), A(L * 0.4, W * 0.25, "2"), D(L * 0.5, W * 0.6, "1")],
    moves: [{ k: "pass", from: [L * 0.15, W * 0.55], to: [L * 0.4, W * 0.25] },
            { k: "run", from: [L * 0.4, W * 0.25], to: [L - 5, W * 0.2] }],
  };
  if (layout === "endball") return {
    ...base,
    zones: [{ x: 0, y: 0, w: 3, h: W, label: "ZONE", tone: "gold" },
            { x: L - 3, y: 0, w: 3, h: W, label: "ZONE", tone: "gold" }],
    players: [A(L * 0.25, W * 0.5, "1", true), A(L * 0.72, W * 0.6, "2"), D(L * 0.5, W * 0.35, "1")],
    moves: [{ k: "pass", from: [L * 0.25, W * 0.5], to: [L * 0.72, W * 0.6] }],
  };
  if (layout === "wide") return {
    ...base,
    zones: [{ x: 0, y: 0, w: L, h: W * 0.22, label: "×2", tone: "gold" },
            { x: 0, y: W * 0.78, w: L, h: W * 0.22, label: "×2", tone: "gold" },
            { x: L - 3, y: 0, w: 3, h: W, tone: "gold" }],
    players: [A(L * 0.15, W * 0.55, "1", true), A(L * 0.4, W * 0.5, "2"), D(L * 0.5, W * 0.45, "1")],
    moves: [{ k: "pass", from: [L * 0.15, W * 0.55], to: [L * 0.4, W * 0.5] },
            { k: "run", from: [L * 0.4, W * 0.5], to: [L - 4, W * 0.1] }],
  };
  if (layout === "gates") return {
    ...base,
    gates: [[L - 1, W * 0.18], [L - 1, W * 0.42], [L - 1, W * 0.66], [L - 1, W * 0.9]],
    players: [A(L * 0.15, W * 0.5, "1", true), D(L * 0.55, W * 0.32, "1"), D(L * 0.6, W * 0.7, "2")],
    moves: [{ k: "run", from: [L * 0.15, W * 0.5], to: [L - 2, W * 0.85] }],
  };
  return null;
}

// Merge a coach's extras into a session for a given plan slot.
export function activitiesForSlot(data, skillId, session, weekActivities) {
  const key = `${skillId}:${session}`;
  const ids = (data.extras && data.extras[key]) || [];
  const lib = data.customActivities || [];
  const extra = ids.map((id) => lib.find((a) => a.id === id)).filter(Boolean);
  return [...weekActivities, ...extra];
}

// ---- bespoke sessions: a coach's own warm-up + skill + game as one week ----

export function blankSession() {
  return {
    id: `sess${Date.now()}`,
    own: true,
    name: "",
    warmup: null, // activity id
    skill: null,
    game: null,
  };
}

// Which activity ids a session still needs, in plain words.
export function sessionGaps(session) {
  const missing = [];
  if (!session.name || !session.name.trim()) missing.push("a name");
  if (!session.warmup) missing.push("a warm-up");
  if (!session.skill) missing.push("a skill activity");
  if (!session.game) missing.push("a game");
  return missing;
}

// Resolve a bespoke session into the same shape the app renders for a week.
export function resolveOwnSession(data, sessionId) {
  const session = (data.customSessions || []).find((s) => s.id === sessionId);
  if (!session) return null;
  const lib = data.customActivities || [];
  const find = (id) => lib.find((a) => a.id === id);
  const activities = [session.warmup, session.skill, session.game]
    .map(find)
    .filter(Boolean);
  return {
    own: true,
    week: 0,
    title: session.name || "My session",
    objective: "Your own session.",
    activities,
    safety: ["Check space, numbers and kit before you start."],
  };
}

// Activities of one type, for the pickers in the session builder.
export function activitiesOfType(data, type) {
  return (data.customActivities || []).filter((a) => a.type === type);
}
