// The coach's own activities: add one to tonight's session, edit or delete.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import ActivityBuilder from "./ActivityBuilder.jsx";
import { editableActivity } from "../lib/customActivities.js";

export default function MyActivities({ data, slotKey, onSave, onDelete, onAttach, onDetach }) {
  const [building, setBuilding] = useState(false);
  const [editing, setEditing] = useState(null);

  const library = data.customActivities || [];
  const attached = (data.extras && data.extras[slotKey]) || [];

  if (building || editing) {
    // Takes over the screen — otherwise the session sits behind the form and
    // the coach can scroll into the wrong set of boxes.
    return (
      <div className="rr-sheet"><div className="rr-sheet-inner">
      <ActivityBuilder
        start={editing ? editableActivity(editing) : undefined}
        onCancel={() => { setBuilding(false); setEditing(null); }}
        onSave={(a) => {
          onSave(a);
          if (slotKey && !attached.includes(a.id)) onAttach(a.id);
          setBuilding(false); setEditing(null);
        }}
      />
      </div></div>
    );
  }

  return (
    <Card><div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Your own activities</Label>
        <button onClick={() => setBuilding(true)}
          className="text-sm font-bold rounded-full px-3 py-1.5"
          style={{ background: C.grass, color: "#fff" }}>
          + Write one
        </button>
      </div>

      {library.length === 0 ? (
        <p className="text-sm mt-2" style={{ color: C.mute }}>
          Nothing yet. Write a warm-up, a skill activity or a game of your own and
          it'll be here to drop into any session.
        </p>
      ) : (
        <div className="space-y-2 mt-3">
          {library.map((a) => {
            const on = attached.includes(a.id);
            return (
              <div key={a.id} className="rounded-xl p-3"
                style={{ background: C.paper, border: `1px solid ${on ? C.grass : C.line}` }}>
                <div className="flex items-start justify-between gap-2">
                  <div style={{ flex: 1 }}>
                    <div className="font-bold text-sm">{a.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.mute }}>
                      {a.type === "Gameplay" ? "Game Zone" : a.type}
                    </div>
                  </div>
                  {on && <Pill bg={C.grassSoft} fg={C.pine}>In this session</Pill>}
                </div>
                <div className="flex gap-2 mt-2">
                  {slotKey && (
                    <button onClick={() => (on ? onDetach(a.id) : onAttach(a.id))}
                      className="rounded-xl px-3 py-1.5 text-sm font-bold"
                      style={on
                        ? { background: "#fff", color: C.mute, border: `1px solid ${C.line}` }
                        : { background: C.grass, color: "#fff" }}>
                      {on ? "Remove from session" : "Add to this session"}
                    </button>
                  )}
                  <button onClick={() => setEditing(a)}
                    className="rounded-xl px-3 py-1.5 text-sm font-bold"
                    style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
                    Edit
                  </button>
                  <button onClick={() => {
                      if (window.confirm(`Delete "${a.name}"? This can't be undone.`)) onDelete(a.id);
                    }}
                    className="rounded-xl px-3 py-1.5 text-sm font-bold"
                    style={{ background: "#fff", color: "#B3401F", border: `1px solid ${C.line}` }}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div></Card>
  );
}
