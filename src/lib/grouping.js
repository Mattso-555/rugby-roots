// Takes the number who actually turned up and works out how to organise them.
//
// The pitch sizes come from the density the session cards already use: a 4v4
// game on 20m x 15m is 300 square metres between 8 players, so roughly 40 sq m
// each. That is much tighter than a match pitch, which is the point — training
// grids are deliberately crowded so the ball comes to everyone often.

export function attendanceFor(data, week) {
  return (data.attendance && data.attendance[week]) || {};
}

export function presentCount(data, week) {
  const a = attendanceFor(data, week);
  return (data.players || []).filter((p) => a[p.id] === true).length;
}

// Nobody marked yet — fall back to the whole squad so the card still helps.
export function headcount(data, week) {
  const marked = Object.keys(attendanceFor(data, week)).length;
  return marked ? presentCount(data, week) : (data.players || []).length;
}

export function isCounted(data, week) {
  return Object.keys(attendanceFor(data, week)).length > 0;
}

// Roughly 40 sq m per player, in a rectangle about 4:3.
export function pitchFor(n) {
  if (!n || n < 2) return null;
  const area = 40 * n;
  const width = Math.max(8, Math.round(Math.sqrt(area / 1.35)));
  const length = Math.round(width * 1.35);
  return { length, width };
}

// Split a group into the evenest sets of a target size.
function split(n, target) {
  if (n < target) return [n];
  const groups = Math.max(1, Math.round(n / target));
  const base = Math.floor(n / groups);
  const extra = n % groups;
  return Array.from({ length: groups }, (_, i) => base + (i < extra ? 1 : 0));
}

function describe(sizes) {
  const counts = {};
  sizes.forEach((s) => { counts[s] = (counts[s] || 0) + 1; });
  return Object.entries(counts)
    .sort((a, b) => b[0] - a[0])
    .map(([size, howMany]) =>
      `${howMany} group${howMany === 1 ? "" : "s"} of ${size}`)
    .join(" and ");
}

// What to do with n players for a given kind of activity.
export function organise(n, type) {
  if (!n || n < 2) {
    return { headline: "Not enough players yet", detail: "Mark tonight's register to size the session." };
  }

  if (type === "Warm-up") {
    if (n <= 6) return { headline: "Keep them together", detail: "One group is plenty at this number — more touches each." };
    const sizes = split(n, 6);
    return { headline: describe(sizes), detail: "Small groups keep everyone moving instead of queueing." };
  }

  if (type === "Skill") {
    const sizes = split(n, 4);
    const odd = n % 2 === 1;
    return {
      headline: describe(sizes),
      detail: odd
        ? "Odd number — make one group a three and rotate a coach or spare in."
        : "Groups of about four give the most repetitions each.",
    };
  }

  // Game Zone
  if (n <= 5) {
    return { headline: "One small game", detail: `Play ${Math.floor(n / 2)}v${Math.ceil(n / 2)} — uneven is fine, swap the spare player each try.` };
  }
  if (n <= 10) {
    const per = Math.floor(n / 2);
    const spare = n - per * 2;
    return {
      headline: `One game, ${per}v${per}`,
      detail: spare ? "One spare — rotate them in after every try so nobody sits out." : "Even teams, one pitch.",
    };
  }
  // Big group: two games beats one crowded one
  const per = Math.floor(n / 4);
  const spare = n - per * 4;
  return {
    headline: `Two games of ${per}v${per}`,
    detail: spare
      ? `${spare} spare — rotate ${spare === 1 ? "them" : "them"} in after every try so nobody stands watching.`
      : "Two smaller games beat one crowded one — everyone gets far more of the ball.",
  };
}

// Number actually on a pitch at once, used for sizing the grid.
export function onPitch(n, type) {
  if (type !== "Gameplay") return Math.min(n, 8);
  if (n <= 10) return n;
  return Math.floor(n / 2); // two games running side by side
}
