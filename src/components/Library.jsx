// The Library tab. Everything a coach builds lives here, away from any single
// session: their own sessions (warm-up + skill + game) and their loose
// activities. This is the home base for bespoke content.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { SectionTitle, Card, Label, Pill } from "./ui.jsx";
import ActivityBuilder from "./ActivityBuilder.jsx";
import SessionBuilder from "./SessionBuilder.jsx";
import { sessionGaps } from "../lib/customActivities.js";

const TYPE_LABEL = { "Warm-up": "Warm-up", Skill: "Skill Zone", Gameplay: "Game Zone" };

export default function Library({
  data, saveCustom, deleteCustom, saveSession, deleteSession,
}) {
  const [view, setView] = useState("home"); // home | activity | session
  const [editActivity, setEditActivity] = useState(null);
  const [editSession, setEditSession] = useState(null);

  const sessions = data.customSessions || [];
  const activities = data.customActivities || [];

  if (view === "activity") {
    return (
      <ActivityBuilder start={editActivity || undefined}
        onCancel={() => { setView("home"); setEditActivity(null); }}
        onSave={(a) => { saveCustom(a); setView("home"); setEditActivity(null); }} />
    );
  }

  if (view === "session") {
    return (
      <SessionBuilder start={editSession || undefined} data={data}
        onSaveActivity={saveCustom}
        onSaveSession={(s) => { saveSession(s); setView("home"); setEditSession(null); }}
        onCancel={() => { setView("home"); setEditSession(null); }} />
    );
  }

  const byType = (t) => activities.filter((a) => a.type === t);

  return (
    <div className="space-y-4">
      <SectionTitle>Your library</SectionTitle>
      <p className="text-sm" style={{ color: C.mute }}>
        Everything you build lives here. Sessions can be dropped into any week of
        your block; activities are the building blocks you make sessions from.
      </p>

      {/* Sessions */}
      <div className="flex items-center justify-between">
        <Label>My sessions</Label>
        <button onClick={() => { setEditSession(null); setView("session"); }}
          className="text-sm font-bold rounded-full px-3 py-1.5"
          style={{ background: C.grass, color: "#fff" }}>
          + Build a session
        </button>
      </div>

      {sessions.length === 0 ? (
        <Card><div className="p-4">
          <p className="text-sm" style={{ color: C.mute }}>
            No sessions yet. Build one from a warm-up, a skill activity and a game,
            then drop it into a week when you plan your block.
          </p>
        </div></Card>
      ) : (
        sessions.map((s) => {
          const gaps = sessionGaps(s);
          return (
            <Card key={s.id}><div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-bold">{s.name || "Untitled session"}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.mute }}>
                    Warm-up · Skill Zone · Game Zone
                  </div>
                </div>
                {gaps.length > 0 && <Pill bg={C.goldSoft} fg="#8a5a00">needs {gaps.length}</Pill>}
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setEditSession(s); setView("session"); }}
                  className="rounded-xl px-3 py-1.5 text-sm font-bold"
                  style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
                  Edit
                </button>
                <button onClick={() => {
                    if (window.confirm(`Delete "${s.name || "this session"}"?`)) deleteSession(s.id);
                  }}
                  className="rounded-xl px-3 py-1.5 text-sm font-bold"
                  style={{ background: "#fff", color: "#B3401F", border: `1px solid ${C.line}` }}>
                  Delete
                </button>
              </div>
            </div></Card>
          );
        })
      )}

      {/* Activities */}
      <div className="flex items-center justify-between mt-2">
        <Label>My activities</Label>
        <button onClick={() => { setEditActivity(null); setView("activity"); }}
          className="text-sm font-bold rounded-full px-3 py-1.5"
          style={{ background: C.grassSoft, color: C.grass }}>
          + Write one
        </button>
      </div>

      {activities.length === 0 ? (
        <Card><div className="p-4">
          <p className="text-sm" style={{ color: C.mute }}>
            No activities yet. Write a warm-up, a skill drill or a game and it'll be
            here to use in a session or drop straight into a night's plan.
          </p>
        </div></Card>
      ) : (
        ["Warm-up", "Skill", "Gameplay"].map((t) => {
          const list = byType(t);
          if (!list.length) return null;
          return (
            <div key={t}>
              <div className="text-xs font-bold uppercase mt-1 mb-1.5"
                style={{ color: C.mute, letterSpacing: ".04em" }}>{TYPE_LABEL[t]}</div>
              <div className="space-y-2">
                {list.map((a) => (
                  <Card key={a.id}><div className="p-3 flex items-center justify-between gap-2">
                    <div className="font-bold text-sm min-w-0 truncate">{a.name}</div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditActivity(a); setView("activity"); }}
                        className="rounded-lg px-3 py-1.5 text-sm font-bold"
                        style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
                        Edit
                      </button>
                      <button onClick={() => {
                          if (window.confirm(`Delete "${a.name}"?`)) deleteCustom(a.id);
                        }}
                        className="rounded-lg px-3 py-1.5 text-sm font-bold"
                        style={{ background: "#fff", color: "#B3401F", border: `1px solid ${C.line}` }}>
                        Delete
                      </button>
                    </div>
                  </div></Card>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
