import React from "react";
import { C, AWARDS } from "../data/constants.js";
import { resolveWeek, wState } from "../lib/helpers.js";
import { Card, Label, SectionTitle, Pill } from "./ui.jsx";
import WhatToBring from "./WhatToBring.jsx";

export default function ParentView({ data, child, setChild }) {
  const plan = data.plan;
  const nextIdx = plan ? (plan.findIndex((_, i) => !wState(data, i + 1).done) + 1 || 6) : 0;
  const nextSlot = plan ? resolveWeek(data, plan[nextIdx - 1]) : null;
  const p = data.players.find((x) => x.id === child);

  if (!p) {
    return (
      <div className="space-y-4">
        <SectionTitle>Parent view</SectionTitle>
        <p className="text-sm" style={{ color: C.mute }}>Choose your child to see their focus and achievements. This view is read-only.</p>
        <div className="space-y-2">
          {data.players.map((pl) => (
            <Card key={pl.id}>
              <button onClick={() => setChild(pl.id)} className="w-full text-left p-4 flex items-center gap-3">
                <div className="rounded-full w-11 h-11 flex items-center justify-center font-extrabold"
                  style={{ background: C.grassSoft, color: C.pine }}>{pl.name.slice(0,1).toUpperCase()}</div>
                <div className="flex-1 font-bold">{pl.name}</div>
                <span style={{ color: C.mute }}>›</span>
              </button>
            </Card>
          ))}
          {data.players.length === 0 && <p className="text-sm" style={{ color: C.mute }}>No players added yet.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setChild(null)} className="text-sm font-semibold" style={{ color: C.grass }}>← Choose child</button>

      <Card className="pitch-hero rr-rise">
        <div className="p-5 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>This week's focus</div>
          <h2 className="font-display text-2xl font-extrabold mt-1">{nextSlot ? `${nextSlot.skill.emoji} ${nextSlot.skill.label}` : "Coming soon"}</h2>
          {nextSlot && <p className="text-sm opacity-90 mt-1">{nextSlot.w.title} — {nextSlot.w.objective}</p>}
        </div>
      </Card>

      <Card><div className="p-4">
        <Label>{p.name}'s achievements</Label>
        {p.awards.length === 0 && p.values.length === 0 ? (
          <p className="text-sm mt-2" style={{ color: C.mute }}>Achievements will appear here as the season goes on.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.awards.map((id) => {
                const a = AWARDS.find((x) => x.id === id);
                return a ? (
                  <span key={id} className="rounded-xl px-3 py-2 text-sm font-semibold flex items-center gap-1.5"
                    style={{ background: C.goldSoft, color:"#8a5a00" }}>
                    <span style={{ fontSize: 18 }}>{a.emoji}</span>{a.label}
                  </span>
                ) : null;
              })}
            </div>
            {p.values.length > 0 && (
              <>
                <Label className="mt-4">Rugby values shown</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.values.map((v) => <Pill key={v} bg={C.grassSoft} fg={C.pine}>{v}</Pill>)}
                </div>
              </>
            )}
          </>
        )}
      </div></Card>

      <WhatToBring team={data.team} />

      <Card><div className="p-4">
        <Label>What to practise at home</Label>
        {(p.homeNotes || []).length === 0 ? (
          <p className="text-sm mt-2" style={{ color: C.mute }}>Tips from the coaches appear here.</p>
        ) : (
          <div className="mt-2 space-y-2">
            {p.homeNotes.map((n, i) => (
              <div key={i} className="text-sm rounded-xl p-2.5" style={{ background: C.grassSoft }}>
                <div style={{ color: C.pine }}>{n.text}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.mute }}>{n.date}</div>
              </div>
            ))}
          </div>
        )}
      </div></Card>

      <Card><div className="p-4">
        <Label>Upcoming</Label>
        <div className="mt-2 text-sm space-y-1.5">
          <div className="flex gap-2"><span>📅</span> Next session: <b>{nextSlot ? nextSlot.w.title : "TBC"}</b></div>
          {null}
          <div className="flex gap-2"><span>💛</span> Cheer effort, not just tries!</div>
        </div>
      </div></Card>

      <p className="text-xs text-center" style={{ color: C.mute }}>
        Parents can view but not edit. Development levels are set by coaches through observation.
      </p>
    </div>
  );
}
