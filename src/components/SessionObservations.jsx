// After the register, a quick way to note how the present players got on.
// Deliberately optional and low-friction: a short note is the main thing, a
// skill nudge is there if wanted. Absent players don't appear.

import React, { useState } from "react";
import { C, AREAS, LEVELS, LEVEL_COLOR } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";
import { attendanceFor } from "../lib/grouping.js";

// The skill areas, flattened to "Area::Sub" the way player.skills is keyed.
const SKILL_OPTIONS = Object.entries(AREAS).flatMap(([area, subs]) =>
  subs.map((sub) => ({ key: `${area}::${sub}`, area, sub }))
);

function OnePlayer({ player, week, onSave, onClose }) {
  const [note, setNote] = useState("");
  const [homeNote, setHomeNote] = useState("");
  const [skillKey, setSkillKey] = useState(null);
  const [level, setLevel] = useState(null);

  const save = () => {
    onSave(player.id, { note, homeNote, skillKey, level, week });
    onClose();
  };

  return (
    <div className="rounded-xl p-3 mt-2" style={{ background: "#fff", border: `1px solid ${C.grass}` }}>
      <div className="font-bold">{player.name}</div>

      <Label className="mt-2">How did they get on?</Label>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
        placeholder="e.g. Catching looked more confident tonight."
        style={{ width: "100%", background: C.paper, border: `1px solid ${C.line}`,
                 borderRadius: 10, padding: "8px 10px", fontSize: 14, marginTop: 4, resize: "vertical" }} />

      <details className="mt-2">
        <summary className="text-sm font-bold cursor-pointer" style={{ color: C.grass }}>
          A tip for home (optional — parents see this)
        </summary>
        <p className="text-xs mt-1" style={{ color: C.mute }}>
          One line the parent can act on in the garden. Your note above stays
          private to coaches; only this line is published.
        </p>
        <textarea value={homeNote} onChange={(e) => setHomeNote(e.target.value)} rows={2}
          placeholder="e.g. Practise passing off the left hand — short and both moving."
          style={{ width: "100%", background: "#FFFCF2", border: `1px solid ${C.gold}`,
                   borderRadius: 10, padding: "8px 10px", fontSize: 14, marginTop: 6, resize: "vertical" }} />
      </details>

      <details className="mt-2">
        <summary className="text-sm font-bold cursor-pointer" style={{ color: C.grass }}>
          Nudge a skill (optional)
        </summary>
        <p className="text-xs mt-1" style={{ color: C.mute }}>
          Only if you saw something clear. Attendance on its own doesn't change a skill.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {SKILL_OPTIONS.map((s) => {
            const on = skillKey === s.key;
            const cur = player.skills && player.skills[s.key];
            return (
              <button key={s.key} onClick={() => { setSkillKey(on ? null : s.key); setLevel(null); }}
                className="rounded-full px-2.5 py-1.5 text-xs font-semibold"
                style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                         border: `1px solid ${on ? C.pine : C.line}` }}>
                {s.sub}{cur ? ` · ${cur}` : ""}
              </button>
            );
          })}
        </div>
        {skillKey && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {LEVELS.filter((l) => l !== "Not Yet Observed").map((l) => {
              const on = level === l;
              return (
                <button key={l} onClick={() => setLevel(on ? null : l)}
                  className="rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: on ? LEVEL_COLOR[l] : "#fff", color: on ? "#fff" : C.ink,
                           border: `1px solid ${on ? LEVEL_COLOR[l] : C.line}` }}>
                  {l}
                </button>
              );
            })}
          </div>
        )}
      </details>

      <div className="flex gap-2 mt-3">
        <button onClick={save}
          className="rounded-xl px-4 py-2 text-sm font-bold"
          style={{ background: C.grass, color: "#fff" }}>
          Save
        </button>
        <button onClick={onClose}
          className="rounded-xl px-4 py-2 text-sm font-bold"
          style={{ background: "#fff", color: C.mute, border: `1px solid ${C.line}` }}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default function SessionObservations({ data, week, recordObservation }) {
  const [openId, setOpenId] = useState(null);
  const [doneIds, setDoneIds] = useState([]);

  const marks = attendanceFor(data, week);
  const present = (data.players || []).filter((p) => marks[p.id] === true);

  if (!present.length) return null; // nothing to note until the register is taken

  return (
    <Card><div className="p-4">
      <Label>How did they get on?</Label>
      <p className="text-xs mt-0.5 mb-2" style={{ color: C.mute }}>
        Optional. Tap anyone who's here to jot a quick note while it's fresh.
        A note is plenty — you don't have to rate a skill.
      </p>

      <div className="flex flex-wrap gap-2">
        {present.map((p) => {
          const noted = doneIds.includes(p.id);
          return (
            <button key={p.id} onClick={() => setOpenId(openId === p.id ? null : p.id)}
              className="rounded-full px-3 py-2 text-sm font-bold"
              style={{ background: noted ? C.grassSoft : "#fff",
                       color: noted ? C.pine : C.ink,
                       border: `1px solid ${openId === p.id ? C.grass : C.line}` }}>
              {noted ? "✓ " : ""}{p.name}
            </button>
          );
        })}
      </div>

      {openId && (
        <OnePlayer
          player={present.find((p) => p.id === openId)}
          week={week}
          onSave={(id, obs) => { recordObservation(id, obs); setDoneIds((d) => [...new Set([...d, id])]); }}
          onClose={() => setOpenId(null)}
        />
      )}
    </div></Card>
  );
}
