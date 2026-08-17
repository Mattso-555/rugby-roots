// Edit an activity's picture by touching it.
//
// One tool is active at a time. Tap the pitch to place things, drag things to
// move them, tap an arrow tool then drag from A to B to draw movement. Tap any
// player or arrow while the bin is active to remove it. Everything works with
// a thumb on a phone, which is where coaches will use it.

import React, { useState, useRef } from "react";
import { C } from "../data/constants.js";

const PAD = 1.6;
const R = 1.05;
const LINE = "#8AA795";
const TURF = "#E4EEE5";
const TURF_ALT = "#DCE9DE";

const TOOLS = [
  { id: "move",   label: "✋ Move" },
  { id: "attack", label: "🟢 Attacker" },
  { id: "defend", label: "🔵 Defender" },
  { id: "ball",   label: "🏉 Ball" },
  { id: "run",    label: "→ Run" },
  { id: "pass",   label: "⇢ Pass" },
  { id: "kick",   label: "⤳ Kick" },
  { id: "cone",   label: "▲ Cone" },
  { id: "bin",    label: "🗑 Remove" },
];

const MOVE_STYLE = {
  run:  { stroke: "#12241C", dash: null,       bend: 0 },
  pass: { stroke: "#0A4DA0", dash: "1.1 0.9",  bend: 1.4 },
  kick: { stroke: "#B4741B", dash: "0.35 1.1", bend: 4.2 },
};

function curve(from, to, bend) {
  const [x1, y1] = from, [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const b = Math.sign(bend) * Math.min(Math.abs(bend), len * 0.22);
  return `M${x1},${y1} Q${(x1 + x2) / 2 - (dy / len) * b},${(y1 + y2) / 2 + (dx / len) * b} ${x2},${y2}`;
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const r1 = (v) => Math.round(v * 10) / 10;

export default function DiagramEditor({ diagram, onChange }) {
  const [tool, setTool] = useState("move");
  const [drag, setDrag] = useState(null);   // {kind:'player'|'cone', index} while moving
  const [arrow, setArrow] = useState(null); // {from:[x,y], to:[x,y]} while drawing
  const [flash, setFlash] = useState(null);  // short-lived message under the pitch
  const svgRef = useRef(null);

  const d = diagram;
  const [L, W] = d.size;
  const players = d.players || [];
  const moves = d.moves || [];
  const cones = d.cones || [];

  const set = (patch) => onChange({ ...d, ...patch });

  // pointer position in pitch metres
  function toPitch(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [clamp(r1(p.x), 0, L), clamp(r1(p.y), 0, W)];
  }

  function hit(x, y) {
    const pi = players.findIndex((p) => Math.hypot(p.x - x, p.y - y) < R + 0.6);
    if (pi >= 0) return { kind: "player", index: pi };
    const ci = cones.findIndex(([cx, cy]) => Math.hypot(cx - x, cy - y) < 1.3);
    if (ci >= 0) return { kind: "cone", index: ci };
    // an arrow is hit near either end or its midpoint
    const mi = moves.findIndex((m) => {
      const mid = [(m.from[0] + m.to[0]) / 2, (m.from[1] + m.to[1]) / 2];
      return [m.from, m.to, mid].some(([ax, ay]) => Math.hypot(ax - x, ay - y) < 1.4);
    });
    if (mi >= 0) return { kind: "move", index: mi };
    return null;
  }

  function renumber(list) {
    let a = 0, dd = 0;
    return list.map((p) => ({ ...p, n: String(p.t === "a" ? ++a : ++dd) }));
  }

  function down(e) {
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* older browsers */ }
    const [x, y] = toPitch(e);

    if (tool === "attack" || tool === "defend") {
      const t = tool === "attack" ? "a" : "d";
      const next = renumber([...players, { x, y, t }]);
      // first attacker placed carries the ball
      if (t === "a" && !next.some((p) => p.ball)) {
        const i = next.findIndex((p) => p.t === "a");
        next[i] = { ...next[i], ball: true };
      }
      set({ players: next });
      setTool("move"); // straight back to moving — placing then nudging is the common flow
      return;
    }
    if (tool === "cone") {
      set({ cones: [...cones, [x, y]] });
      return;
    }
    if (tool === "run" || tool === "pass" || tool === "kick") {
      setArrow({ k: tool, from: [x, y], to: [x, y] });
      return;
    }
    if (tool === "ball") {
      const h = hit(x, y);
      if (h && h.kind === "player" && players[h.index].t === "a") {
        set({ players: players.map((p, j) => ({ ...p, ball: j === h.index })) });
        setTool("move");
      }
      return;
    }
    if (tool === "bin") {
      const h = hit(x, y);
      if (!h) return;
      if (h.kind === "player") {
        const hadBall = !!players[h.index].ball;
        let next = renumber(players.filter((_, i) => i !== h.index));
        if (hadBall) {
          const a = next.findIndex((p) => p.t === "a");
          if (a >= 0) next = next.map((p, i) => ({ ...p, ball: i === a }));
        }
        set({ players: next });
      }
      if (h.kind === "cone") set({ cones: cones.filter((_, i) => i !== h.index) });
      if (h.kind === "move") set({ moves: moves.filter((_, i) => i !== h.index) });
      return;
    }
    // move tool
    const h = hit(x, y);
    if (h && (h.kind === "player" || h.kind === "cone")) {
      // arrows whose end sits on this player travel with it
      let attached = [];
      if (h.kind === "player") {
        const pl = players[h.index];
        moves.forEach((m, mi) => {
          ["from", "to"].forEach((end) => {
            if (Math.hypot(m[end][0] - pl.x, m[end][1] - pl.y) < 0.6)
              attached.push({ mi, end });
          });
        });
      }
      setDrag({ ...h, attached });
    }
  }

  function move(e) {
    if (!drag && !arrow) return;
    e.preventDefault();
    const [x, y] = toPitch(e);
    if (arrow) { setArrow({ ...arrow, to: [x, y] }); return; }
    if (drag.kind === "player") {
      const nextMoves = (drag.attached || []).length
        ? moves.map((m, mi) => {
            const mine = drag.attached.filter((a) => a.mi === mi);
            if (!mine.length) return m;
            const nm = { ...m };
            mine.forEach((a) => { nm[a.end] = [x, y]; });
            return nm;
          })
        : moves;
      set({ players: players.map((p, i) => (i === drag.index ? { ...p, x, y } : p)),
            moves: nextMoves });
    } else {
      set({ cones: cones.map((c, i) => (i === drag.index ? [x, y] : c)) });
    }
  }

  function up() {
    if (arrow) {
      const len = Math.hypot(arrow.to[0] - arrow.from[0], arrow.to[1] - arrow.from[1]);
      if (len < 3) {
        setFlash("Arrows need to be at least 3m — drag a little further.");
        setTimeout(() => setFlash(null), 2500);
      }
      if (len >= 3) {
        // snap ends to a player if released on one
        const snap = ([x, y]) => {
          const p = players.find((q) => Math.hypot(q.x - x, q.y - y) < R + 0.8);
          return p ? [p.x, p.y] : [x, y];
        };
        set({ moves: [...moves, { k: arrow.k, from: snap(arrow.from), to: snap(arrow.to) }] });
      }
      setArrow(null);
    }
    setDrag(null);
  }

  const hint = {
    move: "Drag a player or cone to move it.",
    attack: "Tap the pitch to place an attacker.",
    defend: "Tap the pitch to place a defender.",
    ball: "Tap an attacker to give them the ball.",
    run: "Press and drag from where the run starts to where it ends.",
    pass: "Press and drag from the passer to the catcher.",
    kick: "Press and drag from the kicker to where the ball lands.",
    cone: "Tap the pitch to drop a cone. Tap again for more.",
    bin: "Tap a player, cone or arrow to remove it.",
  }[tool];

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {TOOLS.map((t) => {
          const on = tool === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setTool(t.id)}
              className="rounded-full px-3 py-2 font-bold"
              style={{ fontSize: 13, background: on ? C.pine : "#fff",
                       color: on ? "#fff" : C.ink,
                       border: `1px solid ${on ? C.pine : C.line}` }}>
              {t.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-1.5" style={{ color: C.mute }}>{hint}</p>

      <svg ref={svgRef}
        viewBox={`${-PAD} ${-PAD} ${L + PAD * 2} ${W + PAD * 2}`}
        width="100%" role="img" aria-label="Diagram editor"
        style={{ display: "block", borderRadius: 14, background: "#F6FAF6",
                 touchAction: "none", cursor: tool === "move" ? "grab" : "crosshair",
                 marginTop: 8 }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
        <defs>
          {[["run", "#12241C"], ["pass", "#0A4DA0"], ["kick", "#B4741B"]].map(([k, col]) => (
            <marker key={k} id={`ed-h-${k}`} viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="4.2" markerHeight="4.2" markerUnits="strokeWidth" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill={col} />
            </marker>
          ))}
          <pattern id="ed-turf" width={L / 5} height={W} patternUnits="userSpaceOnUse">
            <rect width={L / 5} height={W} fill={TURF} />
            <rect width={L / 10} height={W} fill={TURF_ALT} />
          </pattern>
        </defs>

        <rect x="0" y="0" width={L} height={W} fill="url(#ed-turf)" rx="0.6" />
        {(d.zones || []).map((z, i) => (
          <rect key={i} x={z.x} y={z.y} width={z.w} height={z.h}
            fill={z.tone === "gold" ? "#F3D98A" : "#C9DFCF"} opacity="0.7"
            stroke={LINE} strokeWidth="0.16" strokeDasharray="0.9 0.7" />
        ))}
        <rect x="0" y="0" width={L} height={W} fill="none" stroke={LINE} strokeWidth="0.28" rx="0.6" />
        {d.halfway && (
          <line x1={L / 2} y1="0" x2={L / 2} y2={W} stroke={LINE} strokeWidth="0.26" strokeDasharray="1.2 0.9" />
        )}

        {(d.gates || []).map(([gx, gy], i) => {
          const x = clamp(gx, 1, L - 1), y = clamp(gy, 2.1, W - 2.1);
          return (
            <g key={"g" + i} style={{ pointerEvents: "none" }}>
              <line x1={x} y1={y - 1.05} x2={x} y2={y + 1.05} stroke={C.gold}
                strokeWidth="0.16" strokeDasharray="0.5 0.6" opacity="0.7" />
              <polygon points={`${x},${y - 2.0} ${x + 0.7},${y - 1.05} ${x - 0.7},${y - 1.05}`} fill={C.gold} />
              <polygon points={`${x},${y + 2.0} ${x + 0.7},${y + 1.05} ${x - 0.7},${y + 1.05}`} fill={C.gold} />
            </g>
          );
        })}

        {cones.map(([x, y], i) => (
          <polygon key={"c" + i}
            points={`${x},${y - 1.1} ${x + 0.85},${y + 0.5} ${x - 0.85},${y + 0.5}`}
            fill={C.gold} style={{ cursor: "grab" }} />
        ))}

        {moves.map((m, i) => {
          const st = MOVE_STYLE[m.k] || MOVE_STYLE.run;
          const path = curve(m.from, m.to, st.bend);
          return (
            <g key={"m" + i}>
              <path d={path} fill="none" stroke="#fff" strokeWidth="0.74" strokeLinecap="round" opacity="0.9" />
              <path d={path} fill="none" stroke={st.stroke} strokeWidth="0.4"
                strokeDasharray={st.dash || undefined} strokeLinecap="round"
                markerEnd={`url(#ed-h-${m.k})`} />
            </g>
          );
        })}

        {arrow && (
          <path d={curve(arrow.from, arrow.to, (MOVE_STYLE[arrow.k] || MOVE_STYLE.run).bend)}
            fill="none" stroke={(MOVE_STYLE[arrow.k] || MOVE_STYLE.run).stroke}
            strokeWidth="0.4" strokeDasharray="0.6 0.6" strokeLinecap="round" opacity="0.7" />
        )}

        {players.map((p, i) => (
          <g key={"p" + i} style={{ cursor: "grab" }}>
            {p.ball && <circle cx={p.x} cy={p.y} r={R + 0.6} fill="none" stroke={C.gold} strokeWidth="0.4" />}
            <circle cx={p.x} cy={p.y} r={R} fill={p.t === "d" ? C.pine : C.grass}
              stroke="#fff" strokeWidth="0.24" />
            <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
              fontSize="1.15" fontWeight="800" fill="#fff"
              style={{ pointerEvents: "none", userSelect: "none" }}>{p.n}</text>
          </g>
        ))}
      </svg>

      {flash && (
        <p className="text-xs mt-1.5 font-bold" style={{ color: "#B3401F" }}>{flash}</p>
      )}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-xs" style={{ color: C.mute }}>
          {players.filter((p) => p.t === "a").length} attackers ·{" "}
          {players.filter((p) => p.t === "d").length} defenders · {moves.length} arrows
        </span>
        {(players.length > 0 || moves.length > 0 || cones.length > 0) && (
          <button type="button"
            onClick={() => { if (window.confirm("Clear the whole picture?")) set({ players: [], moves: [], cones: [] }); }}
            className="text-xs font-bold" style={{ color: "#B3401F" }}>
            Clear picture
          </button>
        )}
      </div>
    </div>
  );
}
