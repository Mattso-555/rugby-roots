import React, { useState } from "react";
import { C, AREAS, LEVELS, LEVEL_COLOR, VALUES, AWARDS } from "../data/constants.js";
import { overlookedPlayers } from "../lib/attention.js";
import { cloudEnabled } from "../lib/supabaseClient.js";
import { ParentLinkCard } from "./CloudCards.jsx";
import { fadingPlayers } from "../lib/fading.js";
import { Card, Label, SectionTitle, LevelDot } from "./ui.jsx";

export default function Players({ data, openPlayer, setOpenPlayer, updatePlayer, addPlayer }) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  if (openPlayer) {
    const p = data.players.find((x) => x.id === openPlayer);
    if (p) return <PlayerDetail p={p} back={() => setOpenPlayer(null)}
      update={(patch) => updatePlayer(p.id, patch)} />;
  }

  const submit = () => {
    if (!newName.trim()) return;
    addPlayer({ id:`p${Date.now()}`, name:newName.trim(), dob:"", parent:"",
      attendance:{}, notes:[], awards:[], values:[], skills:{} });
    setNewName(""); setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle>Players</SectionTitle>
        <button onClick={() => setAdding(!adding)}
          className="text-sm font-bold rounded-full px-3 py-1.5" style={{ background: C.grass, color: "#fff" }}>
          + Add player
        </button>
      </div>

      {(adding || data.players.length === 0) && (
        <Card><div className="p-4">
          <Label>Add a player</Label>
          <div className="flex gap-2 mt-2">
            <input value={newName} onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              placeholder="Player name"
              className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: C.paper, border: `1px solid ${C.line}` }} />
            <button onClick={submit} className="rounded-xl px-4 font-bold text-white"
              style={{ background: C.grass }}>Save</button>
          </div>
          <p className="text-xs mt-2" style={{ color: C.mute }}>Add as many as you like — one at a time.</p>
        </div></Card>
      )}

      {(() => {
        const fading = fadingPlayers(data);
        if (!fading.length) return null;
        return (
          <Card style={{ background: C.goldSoft, borderColor: C.gold }}><div className="p-4">
            <Label>Fading away?</Label>
            {fading.map(({ player, attended, missed }) => (
              <p key={player.id} className="text-sm mt-1" style={{ color: "#7a4f00" }}>
                {player.name} came to {attended} session{attended === 1 ? "" : "s"} but has
                missed the last {missed} in a row.
              </p>
            ))}
            <p className="text-xs mt-1.5" style={{ color: "#8a6a2a" }}>
              Might be worth a friendly message home — children usually drift for a
              while before they stop. This clears itself the moment they're back.
            </p>
          </div></Card>
        );
      })()}

      {(() => {
        const flagged = overlookedPlayers(data);
        if (!flagged.length) return null;
        return (
          <Card style={{ background: C.goldSoft, borderColor: C.gold }}><div className="p-4">
            <Label>Worth a look</Label>
            <p className="text-sm mt-1" style={{ color: "#7a4f00" }}>
              {flagged.length === 1
                ? `${flagged[0].name} has come to ${flagged[0].attended} sessions but you haven't noted anything yet.`
                : `${flagged.map((f) => f.name).join(", ")} have been coming along but haven't been noted yet.`}
            </p>
            <p className="text-xs mt-1.5" style={{ color: "#8a6a2a" }}>
              A quick note next session is plenty — this is just so nobody slips through.
            </p>
          </div></Card>
        );
      })()}

      <div className="space-y-2">
        {data.players.map((p) => {
          const seen = Object.keys(p.skills || {}).length;
          const secure = Object.values(p.skills || {}).filter((l) => l === "Secure" || l === "Excelling").length;
          return (
            <Card key={p.id}>
              <button onClick={() => setOpenPlayer(p.id)} className="w-full text-left p-4 flex items-center gap-3">
                <div className="rounded-full w-11 h-11 flex items-center justify-center font-extrabold shrink-0"
                  style={{ background: C.grassSoft, color: C.pine }}>{p.name.slice(0,1).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-xs" style={{ color: C.mute }}>
                    {seen ? `${secure} skills secure · ${seen} observed` : "No observations yet"}{p.lastNoted ? ` · noted ${p.lastNoted}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {p.awards.slice(0,3).map((id) => {
                    const a = AWARDS.find((x) => x.id === id); return a ? <span key={id} title={a.label}>{a.emoji}</span> : null;
                  })}
                  <span style={{ color: C.mute }}>›</span>
                </div>
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function PlayerDetail({ p, back, update }) {
  const [note, setNote] = useState("");
  const setSkill = (area, sub, level) => update({ skills: { ...p.skills, [`${area}::${sub}`]: level } });
  const toggleAward = (id) => update({ awards: p.awards.includes(id) ? p.awards.filter((a) => a !== id) : [...p.awards, id] });
  const toggleValue = (v) => update({ values: p.values.includes(v) ? p.values.filter((x) => x !== v) : [...p.values, v] });
  const addNote = () => {
    if (!note.trim()) return;
    update({ notes: [{ text: note.trim(), date: new Date().toLocaleDateString() }, ...p.notes] });
    setNote("");
  };

  return (
    <div className="space-y-4">
      <button onClick={back} className="text-sm font-semibold" style={{ color: C.grass }}>← All players</button>

      <div className="flex items-center gap-3">
        <div className="rounded-full w-14 h-14 flex items-center justify-center text-2xl font-extrabold"
          style={{ background: C.grassSoft, color: C.pine }}>{p.name.slice(0,1).toUpperCase()}</div>
        <div>
          <div className="text-xl font-extrabold">{p.name}</div>
          <div className="text-sm" style={{ color: C.mute }}>Development is a journey, not a score.</div>
        </div>
      </div>

      <Card><div className="p-4">
        <Label>Skill progression</Label>
        <p className="text-xs mt-1" style={{ color: C.mute }}>Tap a level. Observe, don't judge — everyone develops at their own pace.</p>
        <div className="mt-3 space-y-4">
          {Object.entries(AREAS).map(([area, subs]) => (
            <div key={area}>
              <div className="font-bold text-sm mb-2" style={{ color: C.pine }}>{area}</div>
              <div className="space-y-2">
                {subs.map((sub) => {
                  const key = `${area}::${sub}`;
                  const cur = p.skills[key] || "Not Yet Observed";
                  return (
                    <div key={sub}>
                      <div className="flex items-center justify-between text-sm">
                        <span>{sub}</span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: C.mute }}>
                          <LevelDot level={cur} /> {cur}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {LEVELS.map((lvl) => (
                          <button key={lvl} onClick={() => setSkill(area, sub, lvl)} title={lvl}
                            className="flex-1 h-2.5 rounded-full"
                            style={{ background: cur === lvl ? LEVEL_COLOR[lvl] : C.line,
                              outline: cur === lvl ? `2px solid ${LEVEL_COLOR[lvl]}` : "none", outlineOffset: 1 }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 text-[11px]" style={{ color: C.mute }}>
          {LEVELS.map((l) => (
            <span key={l} className="flex items-center gap-1"><LevelDot level={l} size={8} />{l.split(" ")[0]}</span>
          ))}
        </div>
      </div></Card>

      <Card><div className="p-4">
        <Label>Awards earned</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {AWARDS.map((a) => {
            const on = p.awards.includes(a.id);
            return (
              <button key={a.id} onClick={() => toggleAward(a.id)}
                className="rounded-xl p-2.5 text-left flex items-center gap-2"
                style={{ background: on ? C.goldSoft : C.paper, border: `1px solid ${on ? C.gold : C.line}` }}>
                <span style={{ fontSize: 20, filter: on ? "none" : "grayscale(1) opacity(0.5)" }}>{a.emoji}</span>
                <span className="text-xs font-semibold">{a.label}</span>
              </button>
            );
          })}
        </div>
        <Label className="mt-4">Rugby values</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {VALUES.map((v) => {
            const on = p.values.includes(v);
            return (
              <button key={v} onClick={() => toggleValue(v)}
                className="rounded-full px-3 py-1.5 text-sm font-semibold"
                style={{ background: on ? C.pine : C.paper, color: on ? "#fff" : C.mute, border: `1px solid ${on ? C.pine : C.line}` }}>
                {v}
              </button>
            );
          })}
        </div>
      </div></Card>

      <Card><div className="p-4">
        <Label>For home — published to the parent</Label>
        <p className="text-xs mt-1" style={{ color: C.mute }}>
          Added from a session's "tip for home". These are the only notes a
          parent ever sees.
        </p>
        <div className="mt-2 space-y-2">
          {(p.homeNotes || []).length === 0 && (
            <p className="text-sm" style={{ color: C.mute }}>No tips published yet.</p>
          )}
          {(p.homeNotes || []).map((n, i) => (
            <div key={i} className="text-sm rounded-xl p-2.5 flex items-start justify-between gap-2"
              style={{ background: C.grassSoft }}>
              <div>
                <div style={{ color: C.pine }}>{n.text}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.mute }}>{n.date}{n.week ? ` · week ${n.week}` : ""}</div>
              </div>
              <button onClick={() => update({ homeNotes: p.homeNotes.filter((_, j) => j !== i) })}
                className="text-xs font-bold shrink-0" style={{ color: "#B3401F" }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div></Card>

      {cloudEnabled() && <ParentLinkCard player={p} />}

      <Card><div className="p-4">
        <Label>Development notes</Label>
        <div className="flex gap-2 mt-2">
          <input value={note} onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addNote(); }}
            placeholder="e.g. Great support running today"
            className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
            style={{ background: C.paper, border: `1px solid ${C.line}` }} />
          <button onClick={addNote} className="rounded-xl px-4 font-bold text-white" style={{ background: C.grass }}>Add</button>
        </div>
        <div className="mt-3 space-y-2">
          {p.notes.length === 0 && <p className="text-sm" style={{ color: C.mute }}>No notes yet.</p>}
          {p.notes.map((n, i) => (
            <div key={i} className="text-sm rounded-xl p-2.5" style={{ background: C.paper }}>
              <div>{n.text}</div>
              <div className="text-[11px] mt-0.5" style={{ color: C.mute }}>{n.date}</div>
            </div>
          ))}
        </div>
      </div></Card>
    </div>
  );
}
