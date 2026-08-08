import React, { useState } from "react";
import { C } from "../data/constants.js";
import { PHASES } from "../data/index.js";
import { printSession } from "../lib/print.js";
import { Card, Label } from "./ui.jsx";
import ActivityCard from "./ActivityCard.jsx";

export default function SessionDetail({ r, blockWeek, st, players, back, toggleDone, setReflection }) {
  const { skill, w, session } = r;
  return (
    <div className="space-y-4">
      <button onClick={back} className="text-sm font-semibold" style={{ color: C.grass }}>← Back to block</button>

      <Card className="pitch-hero rr-rise">
        <div className="p-5 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>
            {skill.emoji} {skill.label} · Week {blockWeek} of 6
          </div>
          <div className="text-sm opacity-80 mt-1">{PHASES[session - 1]}</div>
          <h2 className="font-display text-3xl font-extrabold mt-1">{w.title}</h2>
          <p className="text-sm opacity-90 mt-2">{w.objective}</p>
        </div>
      </Card>

      {skill.ageNote && (
        <Card style={{ background: C.grassSoft, borderColor: C.grassSoft }}><div className="p-3 text-sm" style={{ color: C.pine }}>
          <b>{skill.label}:</b> {skill.ageNote}
        </div></Card>
      )}

      <Card><div className="p-4">
        <Label>Coaching focus</Label>
        <ul className="mt-2 space-y-1.5">
          {w.coachingPoints.map((o, i) => (
            <li key={i} className="text-sm flex gap-2"><span style={{ color: C.gold }}>›</span>{o}</li>
          ))}
        </ul>
      </div></Card>

      <Card><div className="p-4">
        <Label>Session shape</Label>
        <div className="flex gap-1.5 mt-2">
          {[["Warm-up", "Get moving"], ["Skill Zone", "Sharpen it"], ["Game Zone", "Use it"]].map(([t, s], i) => (
            <div key={t} className="flex-1 rounded-xl p-2.5 text-center"
              style={{ background: i === 2 ? C.goldSoft : C.grassSoft,
                       border: `1px solid ${i === 2 ? C.gold : C.grassSoft}` }}>
              <div className="font-extrabold" style={{ fontSize: 11, lineHeight: "14px", color: i === 2 ? "#7a4f00" : C.pine }}>{t}</div>
              <div className="mt-0.5" style={{ fontSize: 10, lineHeight: "13px", color: C.mute }}>{s}</div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: C.mute }}>
          Every session now finishes in the Game Zone. The skill practice earns its place by
          making the game better — so if you're short of time, cut the practice, not the game.
        </p>
      </div></Card>

      <Label className="px-1">Activities</Label>
      {w.activities.map((a, i) => <ActivityCard key={i} a={a} />)}

      <Card style={{ background: "#FFF7F2", borderColor: "#FBE0D3" }}><div className="p-4">
        <Label>Safety checks</Label>
        <ul className="mt-2 space-y-1.5">
          {w.safety.map((s, i) => (
            <li key={i} className="text-sm flex gap-2"><span>⚠️</span>{s}</li>
          ))}
        </ul>
      </div></Card>

      <Card><div className="p-4">
        <Label>Reflection notes</Label>
        <p className="text-xs mt-1 mb-2" style={{ color: C.mute }}>What went well? What will you tweak next time?</p>
        <textarea rows={3} value={st.reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Jot a quick note after the session…"
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          style={{ background: C.paper, border: `1px solid ${C.line}` }} />
      </div></Card>

      <button onClick={toggleDone} className="w-full rounded-xl py-3 font-bold"
        style={{ background: st.done ? C.grassSoft : C.grass, color: st.done ? C.pine : "#fff" }}>
        {st.done ? "✓ Session delivered — tap to undo" : "Mark session as delivered"}
      </button>

      <button onClick={() => printSession(blockWeek, r, players)}
        className="w-full rounded-xl py-3 font-bold flex items-center justify-center gap-2"
        style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
        🖨️ Print this session (Save as PDF)
      </button>
      <p className="text-xs text-center" style={{ color: C.mute }}>
        Prints a pocket-size card plus a player register. Choose “Save as PDF” in the print box.
      </p>
    </div>
  );
}
