// Assemble a bespoke session from your own activities: one warm-up, one skill,
// one game. Each slot picks from the matching activities in your library, or
// sends you to write a new one on the spot.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import ActivityBuilder from "./ActivityBuilder.jsx";
import { blankActivity, blankSession, activitiesOfType, sessionGaps } from "../lib/customActivities.js";

const SLOTS = [
  { key: "warmup", type: "Warm-up",  label: "Warm-up",   blurb: "Gets them moving" },
  { key: "skill",  type: "Skill",    label: "Skill Zone", blurb: "Sharpens one thing" },
  { key: "game",   type: "Gameplay", label: "Game Zone",  blurb: "Puts it in a game" },
];

export default function SessionBuilder({ start, data, onSaveSession, onSaveActivity, onCancel }) {
  const [session, setSession] = useState(() => start || blankSession());
  const [writing, setWriting] = useState(null); // slot key we're writing an activity for
  const [tried, setTried] = useState(false);

  // Writing a brand-new activity for one of the slots.
  if (writing) {
    const slot = SLOTS.find((s) => s.key === writing);
    return (
      <ActivityBuilder
        start={blankActivity(slot.type)}
        onCancel={() => setWriting(null)}
        onSave={(a) => {
          onSaveActivity(a);
          setSession((s) => ({ ...s, [writing]: a.id }));
          setWriting(null);
        }}
      />
    );
  }

  const gaps = sessionGaps(session);
  const save = () => {
    setTried(true);
    if (gaps.length) return;
    onSaveSession({ ...session, name: session.name.trim() });
  };

  return (
    <div className="space-y-3">
      <button onClick={onCancel} className="text-sm font-semibold" style={{ color: C.grass }}>
        ← Cancel
      </button>

      <Card><div className="p-4">
        <Label>Name this session</Label>
        <input value={session.name} onChange={(e) => setSession({ ...session, name: e.target.value })}
          placeholder="e.g. Week 1 — hands and space"
          style={{ width: "100%", background: "#fff", border: `1px solid ${C.line}`,
                   borderRadius: 12, padding: "10px 12px", fontSize: 15, marginTop: 6 }} />
      </div></Card>

      {SLOTS.map((slot) => {
        const chosenId = session[slot.key];
        const options = activitiesOfType(data, slot.type);
        const chosen = options.find((a) => a.id === chosenId);
        return (
          <Card key={slot.key} style={chosen ? { borderColor: C.grass } : undefined}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Label>{slot.label}</Label>
                {chosen && <Pill bg={C.grassSoft} fg={C.pine}>✓ chosen</Pill>}
              </div>
              <p className="text-xs mt-0.5" style={{ color: C.mute }}>{slot.blurb}</p>

              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map((a) => {
                    const on = a.id === chosenId;
                    return (
                      <button key={a.id}
                        onClick={() => setSession({ ...session, [slot.key]: on ? null : a.id })}
                        className="rounded-full px-3 py-2 text-sm font-semibold"
                        style={{ background: on ? C.grass : "#fff", color: on ? "#fff" : C.ink,
                                 border: `1px solid ${on ? C.grass : C.line}` }}>
                        {a.name}
                      </button>
                    );
                  })}
                </div>
              )}

              <button onClick={() => setWriting(slot.key)}
                className="mt-3 text-sm font-bold" style={{ color: C.grass }}>
                + Write a new {slot.label.toLowerCase()}
              </button>
            </div>
          </Card>
        );
      })}

      {tried && gaps.length > 0 && (
        <Card style={{ borderColor: "#E8A08B", borderWidth: 2 }}><div className="p-4">
          <Label>Nearly there</Label>
          <p className="text-sm mt-1" style={{ color: "#B3401F" }}>
            This session still needs {gaps.join(", ")}.
          </p>
        </div></Card>
      )}

      <button onClick={save} className="w-full rounded-xl py-4 font-bold"
        style={{ background: C.grass, color: "#fff", fontSize: 16 }}>
        Save this session
      </button>
      <div className="text-center pb-2">
        <Pill bg={C.paper} fg={C.mute}>Saved to your library, ready to drop into any week</Pill>
      </div>
    </div>
  );
}
