// Age grades, and what each one is allowed to do.
//
// The rule this file exists to enforce: children below U9 must not do contact
// rugby. That is not coaching preference, it is regulation in both unions.
//
//   England — RFU Regulation 15: U7s and U8s are not permitted to play
//   contact rugby in any circumstances. Contact is introduced from U9
//   (school year 4).
//
//   Scotland — Age Grade Law Variations: only non-contact forms of the game
//   should be played in Primary 1–3. Contact begins at P4 (U9).
//
// Age grade law variations change between seasons. Check the current ones
// before a block starts:
//   scottishrugby.org/community-game/game-development/age-grade-law-variations-aglvs
//   englandrugby.com — Age Grade Rugby / Regulation 15

export const AGE_GRADES = [
  { id: "u7",  label: "U7",   years: "P1–P2 / Year 2",       contact: false, kicking: false },
  { id: "u8",  label: "U8",   years: "P3 / Year 3",          contact: false, kicking: false },
  { id: "u9",  label: "U9",   years: "P4 / Year 4",          contact: true,  kicking: true  },
  { id: "u10", label: "U10",  years: "P5 / Year 5",          contact: true,  kicking: true  },
  { id: "u11", label: "U11",  years: "P6 / Year 6",          contact: true,  kicking: true  },
  { id: "u12", label: "U12+", years: "P7 / Year 7 upwards",  contact: true,  kicking: true  },
];

export function gradeById(id) {
  return AGE_GRADES.find((g) => g.id === id) || null;
}

export function allowsContact(id) {
  const g = gradeById(id);
  return g ? g.contact : false; // unknown age grade → assume the safest answer
}

export function allowsKicking(id) {
  const g = gradeById(id);
  return g ? g.kicking : false;
}

// Which skill areas a squad of this age may be shown.
export function isSkillAllowed(skillId, ageGradeId) {
  if (skillId === "tackling") return allowsContact(ageGradeId);
  return true;
}

// Kicking isn't banned at U7/U8 — it simply isn't part of tag rugby, so the
// app flags it rather than hiding it.
export function skillWarning(skillId, ageGradeId) {
  if (skillId === "kicking" && !allowsKicking(ageGradeId)) {
    return "Kicking isn't part of the tag game at this age. Fine as a bit of fun, but it won't come up in a match.";
  }
  return null;
}

export const CONTACT_LOCK_REASON =
  "Contact rugby isn't permitted below U9. In England, RFU Regulation 15 rules " +
  "it out for U7s and U8s in any circumstances; in Scotland, only non-contact " +
  "rugby is played through Primary 1–3. Tackling is introduced at U9 (P4).";
