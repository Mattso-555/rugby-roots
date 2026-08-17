// Opened from the logo in the top-left of every screen. One place for what
// the app is, where everything lives, and the settings that used to crowd the
// Today screen (age grade, backup, start again).

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";
import AgeGradeCard from "./AgeGradeCard.jsx";
import BackupCard from "./BackupCard.jsx";
import { clearData } from "../lib/storage.js";
import { useState as useStateWTB } from "react";
import { cloudEnabled } from "../lib/supabaseClient.js";
import { CoachesCard, QuickSignInCard } from "./CloudCards.jsx";

const SECTIONS = [
  { tab: "today",    emoji: "🏠", title: "Today",    text: "This week's session and your block at a glance." },
  { tab: "sessions", emoji: "📋", title: "Sessions", text: "Your six-week block — read it, rearrange it, run a night." },
  { tab: "library",  emoji: "🏉", title: "Library",  text: "Your own warm-ups, skills, games and full sessions." },
  { tab: "players",  emoji: "👥", title: "Players",  text: "The squad, quick notes, badges and skill levels." },
  { tab: "journey",  emoji: "🌱", title: "Journey",  text: "The season trail — every session you've delivered." },
];

export default function Home({ data, ageGrade, setAgeGrade, onRestore, goTab, onClose, syncStatus, syncDetail, setWhatToBring }) {
  return (
    <div className="rr-sheet">
      <div className="rr-sheet-inner" style={{ maxWidth: 560 }}>

        {/* header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center rounded-xl"
              style={{ width: 40, height: 40, background: "#fff", border: `1px solid ${C.line}`, padding: 3 }}>
              <img src="/crest.png" alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
            </span>
            <div className="leading-tight">
              <div className="font-display font-extrabold" style={{ fontSize: 20, color: C.pine }}>Glasgow Accies RFC</div>
              <div style={{ fontSize: 11, color: C.mute, letterSpacing: ".06em" }}>HOME &amp; SETTINGS</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close settings" aria-label="Close"
            className="rounded-full font-bold flex items-center justify-center"
            style={{ width: 40, height: 40, background: "#fff", color: C.pine, border: `1px solid ${C.line}`, fontSize: 16 }}>
            ✕
          </button>
        </div>

        <p className="text-sm mt-3" style={{ color: C.mute }}>
          Session plans, match-night registers and player journeys for grassroots
          rugby — built on games, sized to whoever turns up, and safe for the age
          group you coach.
        </p>

        {/* where everything lives */}
        <Label className="mt-5">Where everything lives</Label>
        <div className="space-y-2 mt-2">
          {SECTIONS.map((s) => (
            <button key={s.tab} onClick={() => { goTab(s.tab); onClose(); }}
              className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 rr-card">
              <span className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 42, height: 42, background: C.grassSoft, fontSize: 20 }}>{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="font-bold" style={{ fontSize: 15 }}>{s.title}</div>
                <div className="text-sm" style={{ color: C.mute }}>{s.text}</div>
              </div>
              <span style={{ color: C.mute }}>›</span>
            </button>
          ))}
        </div>

        {/* settings */}
        <div className="mt-7" />
        <Label>Settings</Label>
        <div className="space-y-3 mt-2">
          {cloudEnabled() && <CoachesCard syncStatus={syncStatus} syncDetail={syncDetail} />}
          {cloudEnabled() && <QuickSignInCard />}
          <AgeGradeCard ageGrade={ageGrade} setAgeGrade={setAgeGrade} />
          <WhatToBringCard value={(data.team && data.team.whatToBring) || ""} onSave={setWhatToBring} />
          <BackupCard data={data} onRestore={onRestore} />

          <Card><div className="p-4">
            <Label>Start again</Label>
            <p className="text-sm mt-1" style={{ color: C.mute }}>
              Wipes everything on this device — squad, register, notes and your
              library. Save a backup first if there's anything you'd miss.
            </p>
            <button
              onClick={() => {
                const sure = window.confirm(
                  "Delete everything on this device?\n\nSquad, register, notes, your library — all of it. " +
                  "This cannot be undone."
                );
                if (sure) { clearData(); window.location.reload(); }
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-bold mt-3"
              style={{ background: "#fff", color: "#B3401F", border: "1px solid #E8A08B" }}>
              Delete everything
            </button>
          </div></Card>
        </div>

        <p className="text-center text-xs mt-6 pb-4" style={{ color: C.mute }}>
          Everything stays on this device — nothing is uploaded.
        </p>
      </div>
    </div>
  );
}


function WhatToBringCard({ value, onSave }) {
  const [text, setText] = useStateWTB(value);
  const [saved, setSaved] = useStateWTB(false);
  const save = () => { onSave(text.trim()); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <Card><div className="p-4">
      <Label>What to bring (parents see this)</Label>
      <p className="text-xs mt-1 mb-2" style={{ color: C.mute }}>
        One line shown to every parent — kit, water, weather gear. Written once
        for the whole squad; edit it whenever the season changes.
      </p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2}
        placeholder="e.g. Boots, gum shield, water, and a warm layer — it's a cold pitch in winter."
        style={{ width: "100%", background: C.paper, border: `1px solid ${C.line}`,
                 borderRadius: 12, padding: "10px 12px", fontSize: 15, resize: "vertical" }} />
      <button onClick={save} className="rounded-xl px-4 py-2.5 text-sm font-bold mt-2"
        style={{ background: C.grass, color: "#fff" }}>
        {saved ? "Saved" : "Save"}
      </button>
    </div></Card>
  );
}
