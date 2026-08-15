// The first thing a new coach sees: what the app is, what it does, and one
// required decision — the squad's age grade — before anything else. The age
// grade drives safety (contact is locked below U9), so it can't be skipped.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { AGE_GRADES, CONTACT_LOCK_REASON } from "../data/ageGrades.js";

const FEATURES = [
  { emoji: "📋", title: "Six-week blocks", text: "Ready-made session plans built on games, not drills — or build your own." },
  { emoji: "✅", title: "Match-night register", text: "Tap who's in and every session resizes itself to who actually turned up." },
  { emoji: "🏉", title: "Your own library", text: "Write bespoke warm-ups, skills and games, and drop them into any week." },
  { emoji: "🌱", title: "Player journeys", text: "Quick notes, badges and gentle nudges so no child slips through unnoticed." },
];

export default function Welcome({ onStart }) {
  const [picked, setPicked] = useState(null);
  const grade = AGE_GRADES.find((g) => g.id === picked);

  return (
    <div className="rr-sheet" style={{ background: C.pineDeep }}>
      <div className="rr-sheet-inner" style={{ maxWidth: 560 }}>

        {/* brand hero */}
        <div className="text-center pt-8 pb-6">
          <div className="mx-auto flex items-center justify-center rounded-3xl"
            style={{ width: 76, height: 76, background: "rgba(255,255,255,0.1)",
                     border: "1px solid rgba(255,255,255,0.18)", fontSize: 38 }}>🌱</div>
          <h1 className="font-display font-extrabold text-white mt-4"
            style={{ fontSize: 34, letterSpacing: "-.02em" }}>Rugby Roots</h1>
          <p className="mt-1" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15 }}>
            Session plans, registers and player journeys for grassroots rugby coaches.
          </p>
        </div>

        {/* what it does */}
        <div className="space-y-2.5">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-2xl p-3.5"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)", fontSize: 20 }}>{f.emoji}</span>
              <div>
                <div className="font-bold text-white" style={{ fontSize: 15 }}>{f.title}</div>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.72)" }}>{f.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* the one required decision */}
        <div className="rounded-2xl p-4 mt-5" style={{ background: "#fff" }}>
          <div className="font-display font-extrabold" style={{ fontSize: 18, color: C.pine }}>
            Who are you coaching?
          </div>
          <p className="text-sm mt-1" style={{ color: C.mute }}>
            This decides which sessions are safe and legal to run, so it comes first.
            You can change it later in settings.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {AGE_GRADES.map((g) => {
              const on = picked === g.id;
              return (
                <button key={g.id} onClick={() => setPicked(g.id)}
                  className="rounded-xl p-2.5 text-center"
                  style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                           border: `2px solid ${on ? C.pine : C.line}` }}>
                  <div className="font-extrabold" style={{ fontSize: 16 }}>{g.label}</div>
                  <div style={{ fontSize: 10, lineHeight: "13px", opacity: 0.75 }}>{g.years}</div>
                </button>
              );
            })}
          </div>

          {grade && !grade.contact && (
            <div className="rounded-xl p-3 mt-3"
              style={{ background: C.goldSoft, border: `1px solid ${C.gold}` }}>
              <div className="font-bold text-sm" style={{ color: "#7a4f00" }}>
                Non-contact age group
              </div>
              <p className="text-xs mt-1" style={{ color: "#7a5d22" }}>{CONTACT_LOCK_REASON}</p>
            </div>
          )}

          <button onClick={() => picked && onStart(picked)} disabled={!picked}
            className="w-full rounded-xl py-4 font-bold mt-4"
            style={{ background: picked ? C.grass : C.paper,
                     color: picked ? "#fff" : C.mute, fontSize: 16 }}>
            {picked ? `Start coaching ${grade.label} →` : "Pick an age group to begin"}
          </button>
        </div>

        <p className="text-center text-xs mt-4 pb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
          Everything you record stays on this device — nothing is uploaded.
        </p>
      </div>
    </div>
  );
}
