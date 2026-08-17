// Renders the squad's "what to bring" for parents: required items as a clear
// rule (you-won't-play warning), helpful items softly below. Accepts either
// the new structured shape (team.bring) or an old plain string (whatToBring).

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";

// Sensible safety defaults, shown until a coach edits the lists. These are the
// two rules that stop a child playing, so they must never be silently absent.
export const DEFAULT_REQUIRED = [
  "Gum shield — no gum shield, no play",
  "A named parent or adult must stay with each child for the whole session",
];

export function normaliseBring(team, whatToBringStr) {
  if (team && team.bring && (team.bring.required || team.bring.helpful)) {
    return {
      required: team.bring.required && team.bring.required.length ? team.bring.required : DEFAULT_REQUIRED,
      helpful: team.bring.helpful || [],
    };
  }
  const s = (team && team.whatToBring) || whatToBringStr;
  if (s && typeof s === "string" && s.trim())
    return { required: DEFAULT_REQUIRED, helpful: [s.trim()] };
  return { required: DEFAULT_REQUIRED, helpful: [] };
}

export default function WhatToBring({ team, whatToBringStr }) {
  const { required, helpful } = normaliseBring(team, whatToBringStr);
  if (!required.length && !helpful.length) return null;

  return (
    <Card><div className="p-4">
      <Label>What to bring</Label>

      {required.length > 0 && (
        <div className="rounded-2xl mt-2.5" style={{
          background: "linear-gradient(180deg,#FEF1EC,#FDE7DE)",
          border: "1px solid #F0B5A2",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.6)",
          overflow: "hidden",
        }}>
          <div className="flex items-center gap-2 px-3 py-2"
            style={{ background: "#B3401F", color: "#fff" }}>
            <span style={{ fontSize: 15 }}>⚠</span>
            <span className="text-xs font-extrabold uppercase" style={{ letterSpacing: ".06em" }}>
              Must bring — can't play without it
            </span>
          </div>
          <ul className="px-3 py-2.5 space-y-1.5">
            {required.map((t, i) => (
              <li key={i} className="text-sm font-bold flex items-center gap-2.5" style={{ color: "#8A2E14" }}>
                <span aria-hidden style={{ width: 6, height: 6, borderRadius: 9, background: "#B3401F", flex: "0 0 auto" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {helpful.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-bold uppercase" style={{ color: C.mute, letterSpacing: ".06em" }}>Also handy</div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {helpful.map((t, i) => (
              <span key={i} className="rounded-full px-3 py-1.5 text-sm font-semibold"
                style={{ background: C.grassSoft, color: C.pine }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div></Card>
  );
}
