// Skills courses: a big open area with kit laid out — gates, bags, ladders,
// hurdles and the rest — saved in the Library so a course can be set out the
// same way every time. A course is only a picture and a note; it never touches
// players, the register or the block.
//
//   { id, name, notes, size:[L,W],
//     items:  [{ k:"bag", x, y, r }],          r = rotation in degrees
//     moves:  [{ k:"run"|"pass"|"kick", from:[x,y], to:[x,y] }],
//     labels: [{ x, y, text }] }

export const COURSE_MIN = 10;
export const COURSE_MAX = 80;
export const COURSE_DEFAULT_SIZE = [40, 25];

// Everything that can be placed. `hit` is the tap/drag radius in metres —
// generous, because this is used with a thumb on a touchline.
export const KIT = {
  start:  { label: "🚩 Start gate",   hit: 2.2 },
  gate:   { label: "⛳ Gate",         hit: 2.0 },
  cone:   { label: "▲ Cone",          hit: 1.0 },
  spot:   { label: "● Spot",          hit: 0.9 },
  bag:    { label: "🛡 Tackle bag",   hit: 1.3 },
  shield: { label: "🥊 Hit shield",   hit: 1.1 },
  ladder: { label: "🪜 Ladder",       hit: 2.5 },
  hurdle: { label: "⎍ Hurdle",        hit: 1.2 },
  pole:   { label: "❙ Pole",          hit: 0.8 },
  ball:   { label: "🏉 Ball",         hit: 0.9 },
  num:    { label: "① Station",       hit: 1.0 },
};

export function blankCourse() {
  return {
    id: `course${Date.now()}`,
    name: "",
    notes: "",
    size: [...COURSE_DEFAULT_SIZE],
    items: [],
    moves: [],
    labels: [],
  };
}

export function courseProblems(c) {
  const problems = [];
  if (!c.name || !c.name.trim()) problems.push("Give the course a name so you can find it again.");
  if (!(c.items || []).length) problems.push("Place at least one piece of kit on the area.");
  return problems;
}

// Station markers stay 1, 2, 3… in the order they were placed, even after
// one in the middle is deleted.
export function renumberStations(items) {
  let n = 0;
  return items.map((it) => (it.k === "num" ? { ...it, n: ++n } : it));
}

// A short human summary for the Library list: "2 gates · 4 cones · 1 ladder".
export function kitSummary(course) {
  const counts = {};
  (course.items || []).forEach((it) => { counts[it.k] = (counts[it.k] || 0) + 1; });
  const names = {
    start: ["start gate", "start gates"], gate: ["gate", "gates"], cone: ["cone", "cones"],
    spot: ["spot", "spots"], bag: ["tackle bag", "tackle bags"], shield: ["hit shield", "hit shields"],
    ladder: ["ladder", "ladders"], hurdle: ["hurdle", "hurdles"], pole: ["pole", "poles"],
    ball: ["ball", "balls"], num: ["station", "stations"],
  };
  return Object.keys(KIT)
    .filter((k) => counts[k])
    .map((k) => `${counts[k]} ${names[k][counts[k] === 1 ? 0 : 1]}`)
    .join(" · ");
}
