// Draws the pitch diagram for an activity.
//
// A diagram is described in the data file as a scene measured in real metres,
// so the picture takes the shape of the actual pitch — a wide game looks wide,
// a kicking game looks long and thin. Attack always runs left to right.
//
//   "diagram": {
//     "size": [24, 16],
//     "zones":   [{ "x":20, "y":0, "w":4, "h":16, "label":"TRY", "tone":"gold" }],
//     "cones":   [[12, 2], [12, 14]],
//     "gates":   [[24, 4], [24, 12]],
//     "players": [{ "x":5, "y":8, "t":"a", "n":"1", "ball":true }],
//     "moves":   [{ "k":"run", "from":[5,8], "to":[13,5] }],
//     "notes":   [{ "x":12, "y":15, "text":"pass before the tag" }],
//     "label":   "Caption printed under the picture"
//   }
//
// t: "a" attacker, "d" defender.   k: "run" | "pass" | "kick".

import React from "react";
import { C } from "../data/constants.js";

const PAD = 1.6; // metres of margin around the pitch
const R = 1.05;  // player radius in metres

const TURF = "#E4EEE5";
const TURF_ALT = "#DCE9DE";
const LINE = "#8AA795";

function curve(from, to, bend) {
  const [x1, y1] = from, [x2, y2] = to;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // keep the arc proportional — a short pass shouldn't loop like a long one
  const b = Math.sign(bend) * Math.min(Math.abs(bend), len * 0.22);
  return `M${x1},${y1} Q${mx - (dy / len) * b},${my + (dx / len) * b} ${x2},${y2}`;
}

// Stop an arrow short so its head doesn't sit on top of the player
function shorten(from, to, by) {
  const [x1, y1] = from, [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  return [x2 - (dx / len) * by, y2 - (dy / len) * by];
}

const MOVE = {
  run:  { stroke: C.ink,     dash: null,       width: 0.4,  bend: 0,   head: "run" },
  pass: { stroke: "#0A4DA0", dash: "1.1 0.9",  width: 0.38, bend: 1.4, head: "pass" },
  kick: { stroke: "#B4741B", dash: "0.35 1.1", width: 0.38, bend: 4.2, head: "kick" },
};

export default function Diagram({ diagram, pitch, compact }) {
  if (!diagram || !Array.isArray(diagram.size)) return null;

  const [L, W] = diagram.size;
  const zones = diagram.zones || [];
  const players = diagram.players || [];
  const moves = diagram.moves || [];
  const notes = diagram.notes || [];
  const cones = diagram.cones || [];
  const gates = diagram.gates || [];
  const used = new Set(moves.map((m) => m.k));

  return (
    <div className="mt-3">
      <svg viewBox={`${-PAD} ${-PAD} ${L + PAD * 2} ${W + PAD * 2}`} width="100%" role="img"
        aria-label={diagram.label || "Pitch diagram"}
        style={{ display: "block", borderRadius: 14, background: "#F6FAF6" }}>
        <defs>
          {[["run", C.ink], ["pass", "#0A4DA0"], ["kick", "#B4741B"]].map(([k, col]) => (
            <marker key={k} id={`rr-h-${k}`} viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="4.2" markerHeight="4.2" markerUnits="strokeWidth" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill={col} />
            </marker>
          ))}
          <pattern id="rr-turf" width={L / 5} height={W} patternUnits="userSpaceOnUse">
            <rect width={L / 5} height={W} fill={TURF} />
            <rect width={L / 10} height={W} fill={TURF_ALT} />
          </pattern>
        </defs>

        <rect x="0" y="0" width={L} height={W} fill="url(#rr-turf)" rx="0.6" />

        {zones.map((z, i) => {
          const covered = players.some(
            (p) => p.x > z.x - 1 && p.x < z.x + z.w + 1 && p.y > z.y - 1 && p.y < z.y + z.h + 1
          );
          return (
          <g key={"z" + i}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h}
              fill={z.tone === "gold" ? "#F3D98A" : z.tone === "dark" ? "#B9CDBE" : "#C9DFCF"}
              opacity={z.tone === "gold" ? 0.8 : 0.6}
              stroke={LINE} strokeWidth="0.16" strokeDasharray="0.9 0.7" />
            {z.label && !covered && (
              <text x={z.x + z.w / 2} y={z.y + z.h / 2} textAnchor="middle" dominantBaseline="central"
                fontSize={z.w < z.h ? Math.min(1.5, z.w * 0.6) : Math.min(1.5, z.h * 0.45)}
                fontWeight="800" fill="#6B5000" opacity="0.9"
                transform={z.w < z.h * 0.7 ? `rotate(-90 ${z.x + z.w / 2} ${z.y + z.h / 2})` : undefined}>
                {z.label}
              </text>
            )}
          </g>
          );
        })}

        <rect x="0" y="0" width={L} height={W} fill="none" stroke={LINE} strokeWidth="0.28" rx="0.6" />
        {diagram.halfway && (
          <line x1={L / 2} y1="0" x2={L / 2} y2={W} stroke={LINE} strokeWidth="0.26" strokeDasharray="1.2 0.9" />
        )}

        {gates.map(([gx, gy], i) => {
          const x = Math.min(Math.max(gx, 1), L - 1);   // keep the cones on the pitch
          const y = Math.min(Math.max(gy, 2.1), W - 2.1);
          return (
            <g key={"g" + i}>
              <line x1={x} y1={y - 1.05} x2={x} y2={y + 1.05} stroke={C.gold}
                strokeWidth="0.16" strokeDasharray="0.5 0.6" opacity="0.7" />
              <polygon points={`${x},${y - 2.0} ${x + 0.7},${y - 1.05} ${x - 0.7},${y - 1.05}`} fill={C.gold} />
              <polygon points={`${x},${y + 2.0} ${x + 0.7},${y + 1.05} ${x - 0.7},${y + 1.05}`} fill={C.gold} />
            </g>
          );
        })}
        {cones.map(([x, y], i) => (
          <polygon key={"c" + i} points={`${x},${y - 1.1} ${x + 0.85},${y + 0.5} ${x - 0.85},${y + 0.5}`} fill={C.gold} />
        ))}

        {moves.map((m, i) => {
          const st = MOVE[m.k] || MOVE.run;
          const bend = m.bend !== undefined ? m.bend : st.bend;
          const endsOnPlayer = players.some(
            (p) => Math.hypot(p.x - m.to[0], p.y - m.to[1]) < 0.8
          );
          const end = shorten(m.from, m.to, endsOnPlayer ? R + 0.35 : 0.15);
          const d = curve(m.from, end, bend);
          return (
            <g key={"m" + i}>
              <path d={d} fill="none" stroke="#fff" strokeWidth={st.width + 0.34}
                strokeLinecap="round" opacity="0.9" />
              <path d={d} fill="none" stroke={st.stroke} strokeWidth={st.width}
                strokeDasharray={st.dash || undefined} strokeLinecap="round"
                markerEnd={`url(#rr-h-${st.head})`} />
            </g>
          );
        })}

        {players.map((p, i) => (
          <g key={"p" + i}>
            {p.ball && <circle cx={p.x} cy={p.y} r={R + 0.6} fill="none" stroke={C.gold} strokeWidth="0.4" />}
            <circle cx={p.x} cy={p.y} r={R} fill={p.t === "d" ? C.pine : C.grass}
              stroke="#fff" strokeWidth="0.24" />
            {p.n && (
              <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
                fontSize="1.15" fontWeight="800" fill="#fff">{p.n}</text>
            )}
          </g>
        ))}

        {notes.map((n, i) => {
          const fs = 0.82;
          const wide = n.text.length * fs * 0.52 + 1.0;   // rough text width
          const x = Math.min(Math.max(n.x, wide / 2 + 0.3), L - wide / 2 - 0.3);
          const y = Math.min(Math.max(n.y, 1.2), W - 0.6);
          return (
            <g key={"n" + i}>
              <rect x={x - wide / 2} y={y - fs * 1.15} width={wide} height={fs * 1.75}
                rx={fs * 0.8} fill="#fff" opacity="0.88" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fontSize={fs} fontWeight="700" fill={C.pine}>{n.text}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-start justify-between gap-2 mt-1.5">
        <span className="text-xs" style={{ color: C.mute, flex: 1 }}>{diagram.label || ""}</span>
        {pitch && (
          <span className="text-xs font-bold" style={{ color: C.pine, whiteSpace: "nowrap" }}>
            {pitch.length}m × {pitch.width}m
          </span>
        )}
      </div>

      {!compact && (
        <div className="flex flex-wrap gap-3 mt-1.5" style={{ fontSize: 10, color: C.mute }}>
          <Key swatch={<span style={dot(C.grass)} />} label="Attack" />
          <Key swatch={<span style={dot(C.pine)} />} label="Defence" />
          {used.has("run") && <Key swatch={<Dash color={C.ink} />} label="Run" />}
          {used.has("pass") && <Key swatch={<Dash color="#0A4DA0" dashed />} label="Pass" />}
          {used.has("kick") && <Key swatch={<Dash color="#B4741B" dotted />} label="Kick" />}
          {(cones.length > 0 || gates.length > 0) && (
            <Key swatch={<span style={{ ...dot(C.gold), borderRadius: 2 }} />}
              label={gates.length ? "Gates" : "Cones"} />
          )}
        </div>
      )}
    </div>
  );
}

const dot = (bg) => ({ width: 9, height: 9, borderRadius: 9, background: bg, display: "inline-block" });

function Dash({ color, dashed, dotted }) {
  return <span style={{
    width: 16, height: 0, display: "inline-block", verticalAlign: "middle",
    borderTop: `2px ${dotted ? "dotted" : dashed ? "dashed" : "solid"} ${color}`,
  }} />;
}

function Key({ swatch, label }) {
  return <span className="flex items-center gap-1">{swatch}{label}</span>;
}
