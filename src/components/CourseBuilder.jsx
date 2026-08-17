// Design a skills course by touching it: pick a piece of kit, tap the area to
// place it, drag anything to move it, rotate what needs rotating. Built for a
// thumb on a phone, like the activity picture editor — but on a much bigger
// area, with a zoom toggle so placing a cone at 40 metres doesn't need
// surgeon's fingers.

import React, { useState, useRef } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import { KitShape } from "./CourseDiagram.jsx";
import {
  KIT, COURSE_MIN, COURSE_MAX, blankCourse, courseProblems, renumberStations,
} from "../lib/courses.js";

const PAD = 2;
const TURF = "#E4EEE5";
const TURF_ALT = "#DCE9DE";
const LINE = "#8AA795";

const MOVE_STYLE = {
  run:  { stroke: "#12241C", dash: null,       bend: 0 },
  pass: { stroke: "#0A4DA0", dash: "1.1 0.9",  bend: 1.4 },
  kick: { stroke: "#B4741B", dash: "0.35 1.1", bend: 4.2 },
};

const TOOLS = [
  { id: "move",   label: "✋ Move" },
  { id: "rotate", label: "↻ Rotate" },
  ...Object.entries(KIT).map(([id, k]) => ({ id, label: k.label })),
  { id: "arrow",  label: "➤ Arrow" },
  { id: "run",    label: "→ Run" },
  { id: "pass",   label: "⇢ Pass" },
  { id: "kick",   label: "⤳ Kick" },
  { id: "seg",    label: "— Short line" },
  { id: "line",   label: "／ Boundary" },
  { id: "label",  label: "💬 Label" },
  { id: "bin",    label: "🗑 Remove" },
];

function curve(from, to, bend) {
  const [x1, y1] = from, [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const b = Math.sign(bend) * Math.min(Math.abs(bend), len * 0.22);
  return `M${x1},${y1} Q${(x1 + x2) / 2 - (dy / len) * b},${(y1 + y2) / 2 + (dx / len) * b} ${x2},${y2}`;
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const r1 = (v) => Math.round(v * 10) / 10;

const input = {
  width: "100%", background: "#fff", borderRadius: 12,
  padding: "10px 12px", fontSize: 15, outline: "none",
};

export default function CourseBuilder({ start, onSave, onCancel }) {
  const [course, setCourse] = useState(() => start || blankCourse());
  const [tool, setTool] = useState("move");
  const [drag, setDrag] = useState(null);   // {kind, index} while moving
  const [arrow, setArrow] = useState(null); // in-progress movement arrow
  const [lineDraft, setLineDraft] = useState(null); // in-progress perimeter/line

  const finishLine = (dashed) => {
    if (lineDraft && lineDraft.pts.length >= 2) {
      set({ lines: [...lines, { pts: lineDraft.pts, dash: !!dashed }] });
    }
    setLineDraft(null);
  };
  const outlineArea = () => {
    const m = 0.4;
    set({ lines: [...lines, { pts: [[m, m], [L - m, m], [L - m, W - m], [m, W - m], [m, m]], dash: false }] });
  };
  const [zoom, setZoom] = useState(false);
  const [tried, setTried] = useState(false);
  const svgRef = useRef(null);
  const scrollRef = useRef(null);

  const [L, W] = course.size;
  const items = course.items || [];
  const moves = course.moves || [];
  const lines = course.lines || [];
  const labels = course.labels || [];
  const set = (patch) => setCourse((c) => ({ ...c, ...patch }));
  const problems = courseProblems(course);

  // Resizing the area keeps everything on it.
  const setSize = (i, v) => {
    const size = course.size.slice();
    size[i] = clamp(Math.round(Number(v) || 0), COURSE_MIN, COURSE_MAX);
    const cl = ([x, y]) => [clamp(x, 0, size[0]), clamp(y, 0, size[1])];
    set({
      size,
      items: items.map((it) => { const [x, y] = cl([it.x, it.y]); return { ...it, x, y }; }),
      moves: moves.map((m) => ({ ...m, from: cl(m.from), to: cl(m.to) })),
      lines: lines.map((ln) => ({ ...ln, pts: (ln.pts || []).map(cl) })),
      labels: labels.map((n) => { const [x, y] = cl([n.x, n.y]); return { ...n, x, y }; }),
    });
  };

  function toArea(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [clamp(r1(p.x), 0, L), clamp(r1(p.y), 0, W)];
  }

  function hit(x, y) {
    const ii = items.findIndex((it) => Math.hypot(it.x - x, it.y - y) < (KIT[it.k]?.hit || 1.2));
    if (ii >= 0) return { kind: "item", index: ii };
    const li = labels.findIndex((n) => Math.hypot(n.x - x, n.y - y) < 1.6);
    if (li >= 0) return { kind: "label", index: li };
    const mi = moves.findIndex((m) => {
      const mid = [(m.from[0] + m.to[0]) / 2, (m.from[1] + m.to[1]) / 2];
      return [m.from, m.to, mid].some(([ax, ay]) => Math.hypot(ax - x, ay - y) < 1.6);
    });
    if (mi >= 0) return { kind: "move", index: mi };
    const lni = lines.findIndex((ln) => (ln.pts || []).some(([ax, ay]) => Math.hypot(ax - x, ay - y) < 1.6));
    if (lni >= 0) return { kind: "line", index: lni };
    return null;
  }

  function down(e) {
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* older browsers */ }
    const [x, y] = toArea(e);

    if (KIT[tool]) {
      const it = { k: tool, x, y, r: 0 };
      set({ items: renumberStations([...items, it]) });
      // cones, spots, poles and balls come in multiples — stay on the tool;
      // bigger kit goes straight back to Move for the place-then-nudge flow
      if (!["cone", "spot", "pole", "ball"].includes(tool)) setTool("move");
      return;
    }
    if (tool === "seg") {
      setArrow({ seg: true, from: [x, y], to: [x, y] });
      return;
    }
    if (tool === "arrow" || tool === "run" || tool === "pass" || tool === "kick") {
      setArrow({ k: tool === "arrow" ? "plain" : tool, from: [x, y], to: [x, y] });
      return;
    }
    if (tool === "line") {
      // tap to drop points; each tap extends the current line
      setLineDraft((d) => d ? { pts: [...d.pts, [x, y]] } : { pts: [[x, y]] });
      return;
    }
    if (tool === "label") {
      const text = window.prompt("Label text (e.g. FINISH, 3 steps then pop):");
      if (text && text.trim()) set({ labels: [...labels, { x, y, text: text.trim().slice(0, 40) }] });
      return;
    }
    if (tool === "rotate") {
      const h = hit(x, y);
      if (h && h.kind === "item") {
        set({ items: items.map((it, i) => (i === h.index ? { ...it, r: ((it.r || 0) + 45) % 360 } : it)) });
      }
      return;
    }
    if (tool === "bin") {
      const h = hit(x, y);
      if (!h) return;
      if (h.kind === "item") set({ items: renumberStations(items.filter((_, i) => i !== h.index)) });
      if (h.kind === "label") set({ labels: labels.filter((_, i) => i !== h.index) });
      if (h.kind === "move") set({ moves: moves.filter((_, i) => i !== h.index) });
      if (h.kind === "line") set({ lines: lines.filter((_, i) => i !== h.index) });
      return;
    }
    // move tool
    const h = hit(x, y);
    if (h && (h.kind === "item" || h.kind === "label")) setDrag(h);
  }

  function move(e) {
    if (!drag && !arrow) return;
    e.preventDefault();
    const [x, y] = toArea(e);
    if (arrow) { setArrow({ ...arrow, to: [x, y] }); return; }
    if (drag.kind === "item") {
      set({ items: items.map((it, i) => (i === drag.index ? { ...it, x, y } : it)) });
    } else {
      set({ labels: labels.map((n, i) => (i === drag.index ? { ...n, x, y } : n)) });
    }
  }

  function up() {
    if (arrow) {
      const len = Math.hypot(arrow.to[0] - arrow.from[0], arrow.to[1] - arrow.from[1]);
      if (arrow.seg) {
        if (len >= 1) set({ lines: [...lines, { pts: [arrow.from, arrow.to], dash: false }] });
      } else if (len >= 3) {
        set({ moves: [...moves, { k: arrow.k, from: arrow.from, to: arrow.to }] });
      }
      setArrow(null);
    }
    setDrag(null);
  }

  const save = () => {
    setTried(true);
    if (problems.length) return;
    onSave({ ...course, name: course.name.trim(), notes: (course.notes || "").trim() });
  };

  const hint = KIT[tool]
    ? `Tap the area to place. ${["cone", "spot", "pole", "ball"].includes(tool) ? "Keep tapping for more." : "Then drag to nudge, ↻ to rotate."}`
    : {
        move: "Drag any piece of kit or label to move it.",
        rotate: "Tap a piece of kit to turn it 45° — ladders, bags, gates and hurdles all rotate.",
        arrow: "Press and drag to draw a plain direction arrow.",
        run: "Press and drag the route a player runs.",
        pass: "Press and drag from the passer to the catcher.",
        kick: "Press and drag from the kicker to where the ball lands.",
        seg: "Press and drag to draw a short line — a try line, a channel edge.",
        line: "Tap each corner of a boundary, then “Finish”. Or use “Outline the whole area”.",
        label: "Tap where the label should sit, then type it.",
        bin: "Tap kit, a label or an arrow to remove it.",
      }[tool];

  return (
    <div className="space-y-3">
      <button onClick={onCancel} className="text-sm font-semibold" style={{ color: C.grass }}>
        ← Cancel
      </button>

      <Card><div className="p-4">
        <Label>Name the course</Label>
        <input value={course.name} onChange={(e) => set({ name: e.target.value })}
          placeholder="e.g. Tuesday agility circuit"
          style={{ ...input, border: `1px solid ${C.line}`, marginTop: 6 }} />

        <div className="flex gap-2 mt-3">
          <div style={{ flex: 1 }}>
            <div className="text-xs font-bold" style={{ color: C.mute }}>Length (m)</div>
            <input type="number" value={L} onChange={(e) => setSize(0, e.target.value)}
              min={COURSE_MIN} max={COURSE_MAX}
              style={{ ...input, border: `1px solid ${C.line}` }} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="text-xs font-bold" style={{ color: C.mute }}>Width (m)</div>
            <input type="number" value={W} onChange={(e) => setSize(1, e.target.value)}
              min={COURSE_MIN} max={COURSE_MAX}
              style={{ ...input, border: `1px solid ${C.line}` }} />
          </div>
        </div>
        <p className="text-xs mt-1.5" style={{ color: C.mute }}>
          Up to {COURSE_MAX}m each way — everything stays on the area when you shrink it.
        </p>
      </div></Card>

      <Card><div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Label>Lay out the kit</Label>
          <button onClick={() => setZoom(!zoom)} aria-label={zoom ? "Zoom out" : "Zoom in for easier placement"}
            className="text-sm font-bold rounded-full px-3 py-1.5"
            style={{ background: zoom ? C.pine : C.grassSoft, color: zoom ? "#fff" : C.pine }}>
            {zoom ? "✓ Zoomed — scroll sideways" : "🔍 Zoom in"}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
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

        {tool === "line" && (
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="button" onClick={outlineArea}
              className="rounded-full px-3 py-1.5 text-sm font-bold"
              style={{ background: C.grassSoft, color: C.pine }}>
              ▭ Outline the whole area
            </button>
            {lineDraft && lineDraft.pts.length >= 2 && (
              <>
                <button type="button" onClick={() => finishLine(false)}
                  className="rounded-full px-3 py-1.5 text-sm font-bold"
                  style={{ background: C.grass, color: "#fff" }}>
                  ✓ Finish line
                </button>
                <button type="button" onClick={() => finishLine(true)}
                  className="rounded-full px-3 py-1.5 text-sm font-bold"
                  style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
                  ✓ Finish (dashed)
                </button>
              </>
            )}
            {lineDraft && (
              <button type="button" onClick={() => setLineDraft(null)}
                className="rounded-full px-3 py-1.5 text-sm font-bold"
                style={{ background: "#fff", color: "#B3401F", border: `1px solid ${C.line}` }}>
                Cancel line
              </button>
            )}
          </div>
        )}

        <div ref={scrollRef} style={zoom ? { overflowX: "auto", WebkitOverflowScrolling: "touch" } : undefined}>
          <svg ref={svgRef}
            viewBox={`${-PAD} ${-PAD} ${L + PAD * 2} ${W + PAD * 2}`}
            width={zoom ? "230%" : "100%"} role="img" aria-label="Course editor"
            style={{ display: "block", borderRadius: 14, background: "#F6FAF6",
                     touchAction: zoom ? "pan-x" : "none",
                     cursor: tool === "move" ? "grab" : "crosshair", marginTop: 8 }}
            onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
            <defs>
              {[["run", "#12241C"], ["pass", "#0A4DA0"], ["kick", "#B4741B"]].map(([k, col]) => (
                <marker key={k} id={`ced-h-${k}`} viewBox="0 0 10 10" refX="8" refY="5"
                  markerWidth="4.2" markerHeight="4.2" markerUnits="strokeWidth" orient="auto-start-reverse">
                  <path d="M0,1 L9,5 L0,9 z" fill={col} />
                </marker>
              ))}
              <pattern id="ced-turf" width={L / 8} height={W} patternUnits="userSpaceOnUse">
                <rect width={L / 8} height={W} fill={TURF} />
                <rect width={L / 16} height={W} fill={TURF_ALT} />
              </pattern>
            </defs>

            <rect x="0" y="0" width={L} height={W} fill="url(#ced-turf)" rx="0.6" />
            <rect x="0" y="0" width={L} height={W} fill="none" stroke={LINE} strokeWidth="0.3" rx="0.6" />

            {lines.map((ln, i) => (
              <polyline key={"ln" + i}
                points={(ln.pts || []).map((p) => p.join(",")).join(" ")}
                fill="none" stroke="#0B2E63" strokeWidth="0.3"
                strokeDasharray={ln.dash ? "1.2 0.8" : undefined}
                strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
            ))}
            {lineDraft && (
              <polyline points={lineDraft.pts.map((p) => p.join(",")).join(" ")}
                fill="none" stroke="#0B2E63" strokeWidth="0.3" strokeDasharray="0.6 0.6"
                strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            )}
            {lineDraft && lineDraft.pts.map((p, i) => (
              <circle key={"lp" + i} cx={p[0]} cy={p[1]} r="0.4" fill="#0B2E63" />
            ))}

            {moves.map((m, i) => {
              const st = MOVE_STYLE[m.k] || MOVE_STYLE.run;
              const path = curve(m.from, m.to, st.bend);
              return (
                <g key={"m" + i}>
                  <path d={path} fill="none" stroke="#fff" strokeWidth="0.78" strokeLinecap="round" opacity="0.9" />
                  <path d={path} fill="none" stroke={st.stroke} strokeWidth="0.42"
                    strokeDasharray={st.dash || undefined} strokeLinecap="round"
                    markerEnd={`url(#ced-h-${m.k})`} />
                </g>
              );
            })}

            {arrow && (
              <path d={curve(arrow.from, arrow.to, (MOVE_STYLE[arrow.k] || MOVE_STYLE.run).bend)}
                fill="none" stroke={(MOVE_STYLE[arrow.k] || MOVE_STYLE.run).stroke}
                strokeWidth="0.42" strokeDasharray="0.6 0.6" strokeLinecap="round" opacity="0.7" />
            )}

            {items.map((it, i) => <KitShape key={"i" + i} item={it} />)}

            {labels.map((n, i) => {
              const fs = 0.95;
              const wide = n.text.length * fs * 0.52 + 1.1;
              return (
                <g key={"n" + i} style={{ cursor: "grab" }}>
                  <rect x={n.x - wide / 2} y={n.y - fs * 1.15} width={wide} height={fs * 1.75}
                    rx={fs * 0.8} fill="#fff" opacity="0.9" stroke={C.line} strokeWidth="0.06" />
                  <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                    fontSize={fs} fontWeight="700" fill={C.pine}
                    style={{ pointerEvents: "none", userSelect: "none" }}>{n.text}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs" style={{ color: C.mute }}>
            {items.length} piece{items.length === 1 ? "" : "s"} of kit · {moves.length} arrow{moves.length === 1 ? "" : "s"} · {lines.length} line{lines.length === 1 ? "" : "s"} · {L}m × {W}m
          </span>
          {(items.length > 0 || moves.length > 0 || labels.length > 0) && (
            <button type="button"
              onClick={() => { if (window.confirm("Clear the whole course?")) set({ items: [], moves: [], lines: [], labels: [] }); }}
              className="text-xs font-bold" style={{ color: "#B3401F" }}>
              Clear course
            </button>
          )}
        </div>
      </div></Card>

      <Card><div className="p-4">
        <Label>How it runs</Label>
        <p className="text-xs mt-0.5 mb-1" style={{ color: C.mute }}>
          Optional. What happens at each station, and what you're watching for —
          so any coach can set it out and run it.
        </p>
        <textarea value={course.notes} onChange={(e) => set({ notes: e.target.value })} rows={3}
          placeholder="e.g. Start gate → fast feet through the ladder → hit the bag → weave the poles → score under the hurdle."
          style={{ ...input, border: `1px solid ${C.line}`, resize: "vertical" }} />
      </div></Card>

      {tried && problems.length > 0 && (
        <Card style={{ borderColor: "#E8A08B", borderWidth: 2 }}><div className="p-4">
          <Label>Nearly there</Label>
          <ul className="mt-1.5 space-y-1">
            {problems.map((p, i) => (
              <li key={i} className="text-sm" style={{ color: "#B3401F" }}>{p}</li>
            ))}
          </ul>
        </div></Card>
      )}

      <button onClick={save} className="w-full rounded-xl py-4 font-bold"
        style={{ background: C.grass, color: "#fff", fontSize: 16 }}>
        Save this course
      </button>
      <div className="text-center pb-2">
        <Pill bg={C.paper} fg={C.mute}>Saved on this device, in your own library</Pill>
      </div>
    </div>
  );
}
