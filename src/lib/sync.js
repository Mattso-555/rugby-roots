// The sync brain: how one squad's data is split into sections for the shared
// store, and how a remote copy is merged with the local one without losing
// either coach's work.
//
// Everything here is pure — data in, data out — so the rules can be tested.
//
// THE MERGE RULES, in plain English:
//   · Week-keyed sections (attendance, progress, planB, weekEdits,
//     weekCourses) merge WEEK BY WEEK. Weeks only one side has are kept.
//     Where both sides changed the same week, the locally-edited side wins —
//     in practice one coach runs one night, so per-week granularity is the
//     honest one.
//   · Players merge PLAYER BY PLAYER. Notes, home tips, awards and values
//     are unioned (nothing a coach wrote is ever dropped). Skill levels take
//     whichever side observed that skill more recently (skillDates decides).
//   · The libraries (activities, sessions, courses), the plan and team
//     settings are whole-section: the side that edited since its last sync
//     wins. Curate the library from one phone at a time.

export const SECTIONS = [
  "team", "players", "plan", "progress", "attendance", "planB",
  "weekEdits", "weekCourses", "customActivities", "customSessions",
  "courses", "extras",
];

// --- split / join --------------------------------------------------------
export function splitSections(data) {
  return {
    team: data.team || { name: "My Squad", ageGrade: null },
    players: data.players || [],
    plan: { slots: data.plan || null, name: data.planName || null },
    progress: data.progress || {},
    attendance: data.attendance || {},
    planB: data.planB || {},
    weekEdits: data.weekEdits || {},
    weekCourses: data.weekCourses || {},
    customActivities: data.customActivities || [],
    customSessions: data.customSessions || [],
    courses: data.courses || [],
    extras: data.extras || {},
  };
}

export function joinSections(s) {
  return {
    team: s.team || { name: "My Squad", ageGrade: null },
    players: s.players || [],
    plan: (s.plan && s.plan.slots) || null,
    planName: (s.plan && s.plan.name) || null,
    progress: s.progress || {},
    attendance: s.attendance || {},
    planB: s.planB || {},
    weekEdits: s.weekEdits || {},
    weekCourses: s.weekCourses || {},
    customActivities: s.customActivities || [],
    customSessions: s.customSessions || [],
    courses: s.courses || [],
    extras: s.extras || {},
  };
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Which sections differ between two snapshots — used to work out what a
// device has edited since it last pushed.
export function changedSections(a, b) {
  const sa = splitSections(a || {});
  const sb = splitSections(b || {});
  return SECTIONS.filter((k) => !eq(sa[k], sb[k]));
}

// --- per-type merges ------------------------------------------------------
const WEEK_KEYED = ["progress", "attendance", "planB", "weekEdits", "weekCourses"];

function mergeWeekMap(local, remote, localDirty) {
  const out = { ...(remote || {}) };
  for (const [week, val] of Object.entries(local || {})) {
    if (!(week in out)) out[week] = val;                 // only local has it
    else if (localDirty && !eq(out[week], val)) out[week] = val; // conflict: edited side wins
  }
  return out;
}

function unionBy(a, b, keyOf) {
  const seen = new Set((a || []).map(keyOf));
  return [...(a || []), ...(b || []).filter((x) => !seen.has(keyOf(x)))];
}

const noteKey = (n) => `${n.date}|${n.week ?? ""}|${n.text}`;

function laterDate(a, b) {
  // dates are en-GB "dd/mm/yyyy" locale strings; compare parseable parts
  const p = (s) => {
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(s || "");
    return m ? Date.UTC(+m[3], +m[2] - 1, +m[1]) : 0;
  };
  return p(a) >= p(b);
}

function mergePlayer(l, r) {
  const skills = { ...(r.skills || {}) };
  const skillDates = { ...(r.skillDates || {}) };
  for (const [k, lv] of Object.entries(l.skills || {})) {
    const ld = (l.skillDates || {})[k];
    const rd = skillDates[k];
    if (!(k in skills) || laterDate(ld, rd)) { skills[k] = lv; if (ld) skillDates[k] = ld; }
  }
  return {
    ...r, ...l, // local scalar fields (name etc.) win; then repair the merged ones:
    notes: unionBy(l.notes, r.notes, noteKey),
    homeNotes: unionBy(l.homeNotes, r.homeNotes, noteKey),
    awards: [...new Set([...(l.awards || []), ...(r.awards || [])])],
    values: [...new Set([...(l.values || []), ...(r.values || [])])],
    skills, skillDates,
    lastNoted: laterDate(l.lastNoted, r.lastNoted) ? l.lastNoted : r.lastNoted,
  };
}

function mergePlayers(local, remote) {
  const byId = new Map((remote || []).map((p) => [p.id, p]));
  const out = [];
  for (const lp of local || []) {
    const rp = byId.get(lp.id);
    out.push(rp ? mergePlayer(lp, rp) : lp);
    byId.delete(lp.id);
  }
  for (const rp of byId.values()) out.push(rp); // added on another phone
  return out;
}

// A remote value that is essentially "nothing" must never replace real local
// content — this protects a phone carrying a real season from a club store
// that was seeded empty moments earlier by a fresh device.
function isEmptyish(name, v) {
  if (v == null) return true;
  if (name === "plan") return !v.slots || !v.slots.length;
  if (name === "team") return !v.ageGrade;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v).length === 0;
  return false;
}

// --- the section merge ------------------------------------------------------
// `localDirty` = this device edited the section since it last pushed.
export function mergeSection(name, local, remote, localDirty) {
  if (remote === undefined || remote === null) return local;
  if (name === "players") return mergePlayers(local, remote);
  if (WEEK_KEYED.includes(name)) return mergeWeekMap(local, remote, localDirty);
  // team / plan / libraries / extras: whole-section, edited side wins —
  // but nothing never beats something.
  if (isEmptyish(name, remote) && !isEmptyish(name, local)) return local;
  return localDirty ? local : remote;
}

// Merge a set of remote sections into full local data. `dirty` is the set of
// section names this device has edited since its last successful push.
export function mergeRemote(localData, remoteSections, dirty) {
  const s = splitSections(localData);
  for (const [name, remoteVal] of Object.entries(remoteSections)) {
    if (!SECTIONS.includes(name)) continue;
    s[name] = mergeSection(name, s[name], remoteVal, dirty.has(name));
  }
  return joinSections(s);
}
