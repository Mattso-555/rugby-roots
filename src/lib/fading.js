// Spot the child who is drifting away before they stop coming altogether.
//
// The rule: a player who attended at least twice this block, and has been
// marked OUT at the last two (or more) registers in a row. Attendance and
// misses both have to be explicit marks — a week where the coach never
// marked that child one way or the other doesn't count against them, so a
// late joiner or a half-taken register can't trip the flag.
//
// Why two-in-a-row rather than three: the register only spans the current
// six-week block, so a three-miss rule would rarely fire before the block
// was already over. Two misses after settled attendance is the earliest
// honest signal — and the flag clears itself the moment the child walks
// back in, because the trailing run of misses resets.
//
// Same philosophy as the overlooked-player flag: attention, not scoring.
// Nothing here changes a skill level and nothing is shown to anyone but
// the coach.

export function fadingPlayers(data) {
  const att = data.attendance || {};
  const planLength = (data.plan || []).length || 0;

  // Registers that were actually taken, in block order (block order is
  // date order — moveWeek keeps attendance travelling with its week).
  const takenWeeks = [];
  for (let wk = 1; wk <= planLength; wk++) {
    const marks = att[wk];
    if (marks && Object.keys(marks).length) takenWeeks.push(marks);
  }
  if (takenWeeks.length < 4) return []; // can't have 2 in + 2 out before week 4

  return (data.players || [])
    .map((p) => {
      // this child's explicit marks only — unmarked weeks are skipped
      const seq = takenWeeks
        .map((m) => (m[p.id] === true ? "in" : m[p.id] === false ? "out" : null))
        .filter((v) => v !== null);

      let missed = 0;
      for (let i = seq.length - 1; i >= 0 && seq[i] === "out"; i--) missed++;
      const attended = seq.filter((v) => v === "in").length;

      return attended >= 2 && missed >= 2 ? { player: p, attended, missed } : null;
    })
    .filter(Boolean);
}
