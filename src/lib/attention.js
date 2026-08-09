// Works out which players have turned up recently but haven't had an
// observation noted, so a coach can spot the quiet child slipping through.
// This is the one place attendance and progress are deliberately linked —
// and it links them for *attention*, never for scoring.

export function attendanceCount(data, playerId) {
  const att = data.attendance || {};
  return Object.values(att).filter((week) => week && week[playerId] === true).length;
}

// A player is "overlooked" if they've attended at least twice and either have
// never been noted, or their last note is older than their attendance suggests.
export function overlookedPlayers(data) {
  const players = data.players || [];
  return players
    .map((p) => ({ player: p, attended: attendanceCount(data, p.id) }))
    .filter(({ player, attended }) => {
      if (attended < 2) return false;         // too early to say
      const noted = !!player.lastNoted || Object.keys(player.skills || {}).length > 0;
      return !noted;                          // attended a fair bit, never noted
    })
    .map(({ player, attended }) => ({ id: player.id, name: player.name, attended }));
}
