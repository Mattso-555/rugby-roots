// Tonight's register. Tap a name to toggle them in or out.

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";
import { attendanceFor, presentCount, isCounted } from "../lib/grouping.js";

export default function Register({ data, week, setAttendance, toggleAttendance }) {
  const players = data.players || [];
  const marks = attendanceFor(data, week);
  const counted = isCounted(data, week);
  const present = presentCount(data, week);

  if (!players.length) {
    return (
      <Card><div className="p-4">
        <Label>Tonight's register</Label>
        <p className="text-sm mt-1" style={{ color: C.mute }}>
          Add your squad on the Players tab and you can take the register here.
        </p>
      </div></Card>
    );
  }

  const setAll = (value) => {
    const next = {};
    players.forEach((p) => { next[p.id] = value; });
    setAttendance(week, next);
  };

  // Handled in App with a functional update so rapid taps can't overwrite
  // each other while React is still re-rendering.
  const toggle = (id) => toggleAttendance(week, id);

  return (
    <Card><div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Tonight's register</Label>
        <span className="text-sm font-bold" style={{ color: counted ? C.grass : C.mute }}>
          {counted ? `${present} of ${players.length} in` : "Not taken"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {players.map((p) => {
          const inTonight = marks[p.id] === true;
          const out = marks[p.id] === false;
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className="rounded-full px-3 py-2 text-sm font-bold"
              style={{
                background: inTonight ? C.grass : out ? "#fff" : C.paper,
                color: inTonight ? "#fff" : out ? C.mute : C.ink,
                border: `1px solid ${inTonight ? C.grass : C.line}`,
                textDecoration: out ? "line-through" : "none",
                opacity: out ? 0.65 : 1,
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={() => setAll(true)}
          className="flex-1 rounded-xl py-2 text-sm font-bold"
          style={{ background: C.grassSoft, color: C.pine }}>
          Everyone's here
        </button>
        {counted && (
          <button onClick={() => setAttendance(week, {})}
            className="rounded-xl px-3 py-2 text-sm font-bold"
            style={{ background: "#fff", color: C.mute, border: `1px solid ${C.line}` }}>
            Clear
          </button>
        )}
      </div>

      <p className="text-xs mt-2" style={{ color: C.mute }}>
        Tap a name to switch them between in and out. The session below resizes
        itself to whoever's here.
      </p>
    </div></Card>
  );
}
