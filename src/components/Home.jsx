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
import { DEFAULT_REQUIRED } from "./WhatToBring.jsx";

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
          <WhatToBringCard team={data.team || {}} onSave={setWhatToBring} />
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


function WhatToBringCard({ team, onSave }) {
  // Migrate old single-string value into the helpful list on first open.
  const initial = (() => {
    if (team && team.bring && (team.bring.required || team.bring.helpful)) return team.bring;
    if (team && typeof team.whatToBring === "string" && team.whatToBring.trim())
      return { required: [...DEFAULT_REQUIRED], helpful: [team.whatToBring.trim()] };
    return { required: [...DEFAULT_REQUIRED], helpful: [] };
  })();
  const [bring, setBring] = useStateWTB(initial);
  const [reqInput, setReqInput] = useStateWTB("");
  const [helpInput, setHelpInput] = useStateWTB("");
  const [saved, setSaved] = useStateWTB(false);

  const addTo = (list, val, clear) => {
    const v = val.trim(); if (!v) return;
    setBring((b) => ({ ...b, [list]: [...(b[list] || []), v] }));
    clear("");
  };
  const removeFrom = (list, i) =>
    setBring((b) => ({ ...b, [list]: b[list].filter((_, j) => j !== i) }));

  const save = () => {
    // also write a plain-text whatToBring for any legacy reader
    const flat = [...(bring.required||[]).map((x)=>x+" (required)"), ...(bring.helpful||[])].join(", ");
    onSave({ ...bring }, flat);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const Row = ({ list, items, colorBad }) => (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {(items || []).map((t, i) => (
        <span key={i} className="rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5"
          style={{ background: colorBad ? "#FDE7DE" : C.grassSoft, color: colorBad ? "#B3401F" : C.pine }}>
          {t}
          <button onClick={() => removeFrom(list, i)} aria-label={"Remove " + t}
            style={{ fontWeight: 800, opacity: 0.6 }}>×</button>
        </span>
      ))}
    </div>
  );

  return (
    <Card><div className="p-4">
      <Label>What to bring (parents see this)</Label>
      <p className="text-xs mt-1" style={{ color: C.mute }}>
        Split into two lists so parents can tell a <b>rule</b> from a <b>nice-to-have</b>.
      </p>

      <div className="mt-3">
        <div className="text-xs font-bold" style={{ color: "#B3401F" }}>
          ⚠ Required — no play without it
        </div>
        <Row list="required" items={bring.required} colorBad />
        <div className="flex gap-2 mt-1.5">
          <input value={reqInput} onChange={(e) => setReqInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTo("required", reqInput, setReqInput); }}
            placeholder="e.g. Gum shield"
            className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
            style={{ background: C.paper, border: `1px solid ${C.line}` }} />
          <button onClick={() => addTo("required", reqInput, setReqInput)}
            className="rounded-xl px-4 font-bold text-white text-sm" style={{ background: "#B3401F" }}>Add</button>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-bold" style={{ color: C.pine }}>Helpful to bring</div>
        <Row list="helpful" items={bring.helpful} />
        <div className="flex gap-2 mt-1.5">
          <input value={helpInput} onChange={(e) => setHelpInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTo("helpful", helpInput, setHelpInput); }}
            placeholder="e.g. Water, warm layer"
            className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
            style={{ background: C.paper, border: `1px solid ${C.line}` }} />
          <button onClick={() => addTo("helpful", helpInput, setHelpInput)}
            className="rounded-xl px-4 font-bold text-white text-sm" style={{ background: C.grass }}>Add</button>
        </div>
      </div>

      <button onClick={save} className="rounded-xl px-4 py-2.5 text-sm font-bold mt-3"
        style={{ background: C.grass, color: "#fff" }}>
        {saved ? "Saved" : "Save what to bring"}
      </button>
    </div></Card>
  );
}
