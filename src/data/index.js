// Assembles every skill area into one library and checks the shape on load,
// so a typo in a data file shows up immediately instead of breaking a session card.

import { tackling } from "./tackling.js";
import { passing } from "./passing.js";
import { evasion } from "./evasion.js";
import { catching } from "./catching.js";
import { support } from "./support.js";
import { kicking } from "./kicking.js";

export const SKILLS = { tackling, passing, evasion, catching, support, kicking };

export const PHASES = [
  "Introduce & build confidence",
  "Develop the technique",
  "Add movement & decisions",
  "Add pressure",
  "Small-sided game",
  "Game & celebrate",
];

// --- shape check (development only) ---
if (import.meta.env?.DEV) {
  const problems = [];
  for (const [id, skill] of Object.entries(SKILLS)) {
    if (!skill.label) problems.push(`${id}: missing label`);
    if (!Array.isArray(skill.weeks) || skill.weeks.length !== 6)
      problems.push(`${id}: needs exactly 6 weeks`);
    (skill.weeks || []).forEach((w) => {
      if (!w.title) problems.push(`${id} week ${w.week}: missing title`);
      if (!Array.isArray(w.activities) || w.activities.length < 3)
        problems.push(`${id} week ${w.week}: needs 3 activities`);
      (w.activities || []).forEach((a) => {
        ["name", "type", "setup", "play", "good", "points", "apes", "step"].forEach((f) => {
          if (!a[f]) problems.push(`${id} week ${w.week} "${a.name || "?"}": missing ${f}`);
        });
        const pb = a.planB;
        if (!pb) {
          problems.push(`${id} week ${w.week} "${a.name || "?"}": missing planB`);
        } else {
          ["wet", "indoor", "singleCoach"].forEach((k) => {
            if (typeof pb[k] !== "boolean")
              problems.push(`${id} week ${w.week} "${a.name || "?"}": planB.${k} must be true or false`);
          });
          if (!Number.isInteger(pb.minPlayers) || pb.minPlayers < 1)
            problems.push(`${id} week ${w.week} "${a.name || "?"}": planB.minPlayers must be a whole number`);
        }
      });
    });
  }
  if (problems.length) console.warn("Session data problems:\n" + problems.join("\n"));
}
