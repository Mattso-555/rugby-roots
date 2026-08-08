// Shared building blocks used across every screen.

import React from "react";
import { C, LEVEL_COLOR } from "../data/constants.js";

export function Pill({ children, bg, fg }) {
  return <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
    style={{ background: bg, color: fg }}>{children}</span>;
}
export function LevelDot({ level, size = 12 }) {
  return <span className="inline-block rounded-full"
    style={{ width: size, height: size, background: LEVEL_COLOR[level] }} />;
}
export function Card({ children, style, className = "" }) {
  return <div className={`rr-card ${className}`} style={style}>{children}</div>;
}
export function Label({ children, className = "" }) {
  return <div className={`text-xs font-bold uppercase tracking-wide ${className}`}
    style={{ color: C.mute }}>{children}</div>;
}
export function SectionTitle({ children }) {
  return <h1 className="font-display text-2xl font-extrabold" style={{ color: C.pine, letterSpacing: "-.02em" }}>{children}</h1>;
}
export function MiniStat({ value, label, gold }) {
  return <Card style={gold ? { background: C.goldSoft, borderColor: C.goldSoft } : {}}>
    <div className="p-3 text-center">
      <div className="font-display text-3xl font-extrabold" style={{ color: gold ? "#8a5a00" : C.pine }}>{value}</div>
      <div className="text-[11px] leading-tight mt-0.5" style={{ color: C.mute }}>{label}</div>
    </div>
  </Card>;
}
export function ApesBar({ apes }) {
  const map = { A:"Active", P:"Purposeful", E:"Enjoyable", S:"Safe" };
  return <div className="flex gap-2">
    {Object.keys(map).map((k) => (
      <div key={k} className="flex-1">
        <div className="flex items-center justify-between text-xs mb-1" style={{ color: C.mute }}>
          <span className="font-semibold" style={{ color: C.ink }}>{k}</span><span>{apes[k]}/5</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: C.line }}>
          <div className="h-1.5 rounded-full bar-fill"
            style={{ width: `${(apes[k]/5)*100}%`, background: apes[k] >= 4 ? C.grass : C.gold }} />
        </div>
        <div className="text-[10px] mt-1 truncate" style={{ color: C.mute }}>{map[k]}</div>
      </div>
    ))}
  </div>;
}

export function Icon({ name, size = 22 }) {
  const paths = {
    today: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /><path d="M10 20v-5h4v5" /></>,
    sessions: <><rect x="5" y="4" width="14" height="17" rx="2.5" /><path d="M9 3.5h6v3H9z" /><path d="M9 11h6" /><path d="M9 15h4" /></>,
    players: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 18.5V20" /><circle cx="10.5" cy="8" r="3.3" /><path d="M18.5 20v-1.5a3.5 3.5 0 0 0-2.6-3.4" /><path d="M15.5 5.2a3.3 3.3 0 0 1 0 6.1" /></>,
    journey: <><path d="M5 21V4" /><path d="M5 4.5c3-1.5 6 1.5 9 0V12c-3 1.5-6-1.5-9 0z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
