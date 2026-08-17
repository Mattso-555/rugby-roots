// Draws a saved skills course: the training area, every piece of kit, the
// movement arrows and any labels. Used in the Library list and inside the
// course editor — the editor imports KitShape so kit looks identical while
// being placed and once saved.
//
// Everything is drawn in real metres, top-down, same as the activity diagrams,
// so a 40m course really is twice as long as a 20m one.

import React from "react";
import { C } from "../data/constants.js";

const PAD = 2;
const TURF = "#E4EEE5";
const TURF_ALT = "#DCE9DE";
const LINE = "#8AA795";

const MOVE = {
  run:  { stroke: C.ink,     dash: null,       width: 0.42, bend: 0 },
  pass: { stroke: "#0A4DA0", dash: "1.1 0.9",  width: 0.4,  bend: 1.4 },
  kick: { stroke: "#B4741B", dash: "0.35 1.1", width: 0.4,  bend: 4.2 },
};

function curve(from, to, bend) {
  const [x1, y1] = from, [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const b = Math.sign(bend) * Math.min(Math.abs(bend), len * 0.22);
  return `M${x1},${y1} Q${(x1 + x2) / 2 - (dy / len) * b},${(y1 + y2) / 2 + (dx / len) * b} ${x2},${y2}`;
}

// One piece of kit, drawn around its own origin so rotation is just a
// transform. Shapes are stylised for recognisability at pitch scale, not
// realism — a coach glancing at a phone needs "that's the ladder" in half a
// second.
export function KitShape({ item }) {
  const { k, r = 0, n } = item;
  const g = (children) => (
    <g transform={`translate(${item.x} ${item.y}) rotate(${r})`}>{children}</g>
  );

  switch (k) {
    case "cone":
      return g(<polygon points="0,-1.05 0.85,0.55 -0.85,0.55" fill={C.gold} />);
    case "spot":
      return g(<circle r="0.5" fill={C.gold} opacity="0.85" stroke="#fff" strokeWidth="0.14" />);
    case "ball":
      return g(
        <g transform="rotate(-38)">
          <ellipse rx="0.66" ry="0.42" fill="#B4741B" stroke="#fff" strokeWidth="0.12" />
          <line x1="-0.3" y1="0" x2="0.3" y2="0" stroke="#fff" strokeWidth="0.1" />
        </g>
      );
    case "pole":
      return g(
        <>
          <circle r="0.36" fill="#fff" stroke={C.gold} strokeWidth="0.22" />
          <circle r="0.1" fill={C.gold} />
        </>
      );
    case "hurdle":
      return g(
        <>
          <line x1="-0.9" y1="0" x2="0.9" y2="0" stroke={C.pine} strokeWidth="0.42" strokeLinecap="round" />
          <line x1="-0.9" y1="-0.32" x2="-0.9" y2="0.32" stroke={C.pine} strokeWidth="0.2" />
          <line x1="0.9" y1="-0.32" x2="0.9" y2="0.32" stroke={C.pine} strokeWidth="0.2" />
        </>
      );
    case "ladder": {
      const rungs = [];
      for (let x = -1.65; x <= 1.65; x += 0.55) {
        rungs.push(<line key={x} x1={x} y1="-0.55" x2={x} y2="0.55" stroke={C.ink} strokeWidth="0.12" />);
      }
      return g(
        <>
          <rect x="-2.2" y="-0.55" width="4.4" height="1.1" fill="#fff" opacity="0.55"
            stroke={C.ink} strokeWidth="0.14" rx="0.1" />
          {rungs}
        </>
      );
    }
    case "bag":
      return g(
        <>
          <rect x="-0.9" y="-0.5" width="1.8" height="1" rx="0.48" fill={C.pine}
            stroke="#fff" strokeWidth="0.14" />
          <line x1="-0.35" y1="-0.5" x2="-0.35" y2="0.5" stroke="#fff" strokeWidth="0.1" opacity="0.6" />
          <line x1="0.35" y1="-0.5" x2="0.35" y2="0.5" stroke="#fff" strokeWidth="0.1" opacity="0.6" />
        </>
      );
    case "shield":
      return g(
        <rect x="-0.7" y="-0.45" width="1.4" height="0.9" rx="0.42" fill={C.grass}
          stroke="#fff" strokeWidth="0.14" />
      );
    case "ring":
      return g(
        <>
          <circle r="0.95" fill="none" stroke="#B4741B" strokeWidth="0.34" />
          <circle r="0.5" fill="none" stroke="#B4741B" strokeWidth="0.18" opacity="0.7" />
        </>
      );
    case "tube":
      return g(
        <rect x="-0.42" y="-1" width="0.84" height="2" rx="0.42" fill="#B4741B"
          stroke="#fff" strokeWidth="0.14" />
      );
    case "dummy":
      return g(
        <>
          <polygon points="0,-1.1 0.7,0.9 -0.7,0.9" fill="#5B6779" stroke="#fff" strokeWidth="0.14" />
          <circle cx="0" cy="-1.1" r="0.42" fill="#5B6779" stroke="#fff" strokeWidth="0.12" />
        </>
      );
    case "tee":
      return g(
        <>
          <line x1="-0.5" y1="0.4" x2="0.5" y2="0.4" stroke={C.ink} strokeWidth="0.16" />
          <line x1="0" y1="0.4" x2="0" y2="-0.4" stroke={C.ink} strokeWidth="0.16" />
          <ellipse cy="-0.55" rx="0.42" ry="0.28" fill="#B4741B" stroke="#fff" strokeWidth="0.1" />
        </>
      );
    case "coach":
      return g(
        <>
          <circle cx="0" cy="-0.55" r="0.5" fill={C.grass} stroke="#fff" strokeWidth="0.14" />
          <path d="M-0.7,0.95 A0.7 0.7 0 0 1 0.7,0.95 Z" fill={C.grass} stroke="#fff" strokeWidth="0.14" />
        </>
      );
    case "gate":
    case "start": {
      const half = k === "start" ? 2.0 : 1.5;
      return g(
        <>
          <line x1={-half} y1="0" x2={half} y2="0" stroke={C.gold}
            strokeWidth="0.16" strokeDasharray="0.5 0.6" opacity="0.75" />
          <polygon points={`${-half},-1.05 ${-half + 0.75},0 ${-half - 0.75},0`} fill={C.gold} />
          <polygon points={`${half},-1.05 ${half + 0.75},0 ${half - 0.75},0`} fill={C.gold} />
          {k === "start" && (
            <text y="1.35" textAnchor="middle" fontSize="0.85" fontWeight="800"
              fill={C.pine} style={{ letterSpacing: ".08em" }}>START</text>
          )}
        </>
      );
    }
    case "num":
      return g(
        <>
          <circle r="0.85" fill={C.gold} stroke="#fff" strokeWidth="0.16" />
          <text textAnchor="middle" dominantBaseline="central" fontSize="1"
            fontWeight="800" fill={C.pineDeep}>{n}</text>
        </>
      );
    default:
      return null;
  }
}

export default function CourseDiagram({ course, compact }) {
  if (!course || !Array.isArray(course.size)) return null;
  const [L, W] = course.size;
  const items = course.items || [];
  const moves = course.moves || [];
  const labels = course.labels || [];

  return (
    <div className={compact ? "" : "mt-2"}>
      <svg viewBox={`${-PAD} ${-PAD} ${L + PAD * 2} ${W + PAD * 2}`} width="100%" role="img"
        aria-label={course.name ? `Course: ${course.name}` : "Skills course"}
        style={{ display: "block", borderRadius: 14, background: "#F6FAF6" }}>
        <defs>
          {[["plain", C.pine], ["run", C.ink], ["pass", "#0A4DA0"], ["kick", "#B4741B"]].map(([k, col]) => (
            <marker key={k} id={`crs-h-${k}`} viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="4.2" markerHeight="4.2" markerUnits="strokeWidth" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill={col} />
            </marker>
          ))}
          <pattern id="crs-turf" width={L / 8} height={W} patternUnits="userSpaceOnUse">
            <rect width={L / 8} height={W} fill={TURF} />
            <rect width={L / 16} height={W} fill={TURF_ALT} />
          </pattern>
        </defs>

        <rect x="0" y="0" width={L} height={W} fill="url(#crs-turf)" rx="0.6" />
        <rect x="0" y="0" width={L} height={W} fill="none" stroke={LINE} strokeWidth="0.3" rx="0.6" />

        {(course.lines || []).map((ln, i) => (
          <polyline key={"ln" + i}
            points={(ln.pts || []).map((p) => p.join(",")).join(" ")}
            fill="none" stroke={C.pine} strokeWidth="0.3"
            strokeDasharray={ln.dash ? "1.2 0.8" : undefined}
            strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        ))}

        {moves.map((m, i) => {
          const st = MOVE[m.k] || MOVE.run;
          const dd = curve(m.from, m.to, st.bend);
          return (
            <g key={"m" + i}>
              <path d={dd} fill="none" stroke="#fff" strokeWidth={st.width + 0.36}
                strokeLinecap="round" opacity="0.9" />
              <path d={dd} fill="none" stroke={st.stroke} strokeWidth={st.width}
                strokeDasharray={st.dash || undefined} strokeLinecap="round"
                markerEnd={`url(#crs-h-${m.k in MOVE ? m.k : "run"})`} />
            </g>
          );
        })}

        {items.map((it, i) => <KitShape key={"i" + i} item={it} />)}

        {labels.map((n, i) => {
          const fs = 0.95;
          const wide = n.text.length * fs * 0.52 + 1.1;
          const x = Math.min(Math.max(n.x, wide / 2 + 0.3), L - wide / 2 - 0.3);
          const y = Math.min(Math.max(n.y, 1.3), W - 0.7);
          return (
            <g key={"n" + i}>
              <rect x={x - wide / 2} y={y - fs * 1.15} width={wide} height={fs * 1.75}
                rx={fs * 0.8} fill="#fff" opacity="0.9" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fontSize={fs} fontWeight="700" fill={C.pine}>{n.text}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-start justify-between gap-2 mt-1.5">
        <span className="text-xs" style={{ color: C.mute, flex: 1 }}>
          {compact ? "" : "Set out left to right. Pace the distances — they're in metres."}
        </span>
        <span className="text-xs font-bold" style={{ color: C.pine, whiteSpace: "nowrap" }}>
          {L}m × {W}m
        </span>
      </div>
    </div>
  );
}
