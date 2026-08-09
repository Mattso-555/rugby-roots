// The form a coach fills in to write their own warm-up, skill or game.
// Deliberately guided rather than a blank box — the prompts carry the same
// coaching principles the rest of the app is built on.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import DiagramEditor from "./DiagramEditor.jsx";
import {
  ACTIVITY_TYPES, APES_LABELS, STEP_LABELS, LAYOUTS,
  blankActivity, problemsWith, warningsFor, cleanActivity, quickDiagram,
} from "../lib/customActivities.js";

const DEFAULT_PITCH = [20, 15];

const input = {
  width: "100%", background: "#fff", borderRadius: 12,
  padding: "10px 12px", fontSize: 15, outline: "none",
};

function Field({ label, hint, children }) {
  return (
    <div className="mt-3">
      <Label>{label}</Label>
      {hint && <p className="text-xs mt-0.5 mb-1" style={{ color: C.mute }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function ActivityBuilder({ start, onSave, onCancel }) {
  const [a, setA] = useState(() => start || blankActivity());
  const [tried, setTried] = useState(false);

  const set = (patch) => setA({ ...a, ...patch });
  const setPoint = (i, v) => { const p = a.points.slice(); p[i] = v; set({ points: p }); };
  const setQ = (i, v) => { const q = a.questions.slice(); q[i] = v; set({ questions: q }); };
  const isGame = a.type === "Gameplay";

  const problems = problemsWith(a);
  const warnings = warningsFor(a);
  const pitch = (a.diagram && a.diagram.size) || DEFAULT_PITCH;

  const setPitch = (i, v) => {
    const size = pitch.slice(); size[i] = Math.max(6, Number(v) || 0);
    // moving the touchline in shouldn't strand anything outside it
    const d = a.diagram || { size, players: [], moves: [], cones: [], zones: [] };
    const cl = (x, max) => Math.min(x, size[max === "L" ? 0 : 1]);
    set({ diagram: { ...d, size,
      players: (d.players || []).map((p) => ({ ...p, x: cl(p.x, "L"), y: cl(p.y, "W") })),
      cones: (d.cones || []).map(([x, y]) => [cl(x, "L"), cl(y, "W")]),
      moves: (d.moves || []).map((m) => ({ ...m,
        from: [cl(m.from[0], "L"), cl(m.from[1], "W")], to: [cl(m.to[0], "L"), cl(m.to[1], "W")] })),
    } });
  };

  const seedLayout = (id) => {
    if (id === "none") { set({ diagram: null }); return; }
    const seeded = quickDiagram(id, pitch);
    if (a.diagram && (a.diagram.players || []).length &&
        !window.confirm("Replace the current picture with this layout?")) return;
    set({ diagram: seeded });
  };

  const save = () => {
    setTried(true);
    if (problems.length) return;
    onSave(cleanActivity(a));
  };

  return (
    <div className="space-y-3">
      <button onClick={onCancel} className="text-sm font-semibold" style={{ color: C.grass }}>
        ← Cancel
      </button>

      <Card><div className="p-4">
        <Label>What kind of activity?</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {ACTIVITY_TYPES.map((t) => {
            const on = a.type === t.id;
            return (
              <button key={t.id} onClick={() => set({ type: t.id })}
                className="rounded-xl p-2.5 text-center"
                style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                         border: `1px solid ${on ? C.pine : C.line}` }}>
                <div className="font-extrabold" style={{ fontSize: 14 }}>{t.label}</div>
              </button>
            );
          })}
        </div>
        <p className="text-xs mt-2" style={{ color: C.mute }}>
          {ACTIVITY_TYPES.find((t) => t.id === a.type).blurb}
        </p>

        <Field label="Name it" hint="Something the children will remember and ask for.">
          <input value={a.name} onChange={(e) => set({ name: e.target.value })}
            placeholder="e.g. Four-gate rugby"
            style={{ ...input, border: `1px solid ${C.line}` }} />
        </Field>

        <Field label="Setting it up" hint="Pitch size, how many in each group, what kit you need.">
          <textarea value={a.setup} onChange={(e) => set({ setup: e.target.value })} rows={2}
            placeholder="A 20m x 15m pitch, two teams of four, bibs and a ball."
            style={{ ...input, border: `1px solid ${C.line}`, resize: "vertical" }} />
        </Field>

        <Field label="How it runs" hint="Describe it as you'd explain it to another coach.">
          <textarea value={a.play} onChange={(e) => set({ play: e.target.value })} rows={4}
            placeholder="What the players actually do, and how they score."
            style={{ ...input, border: `1px solid ${C.line}`, resize: "vertical" }} />
        </Field>

        {isGame && (
          <Field label="The condition"
            hint="The single rule that forces the skill to appear. Without one it's just a game of rugby.">
            <textarea value={a.condition} onChange={(e) => set({ condition: e.target.value })} rows={2}
              placeholder="e.g. Three seconds with the ball, then it must be passed."
              style={{ ...input, border: `1px solid ${C.gold}`, background: "#FFFCF2", resize: "vertical" }} />
          </Field>
        )}

        <Field label="What good looks like" hint="How you'll know it's working. Leave blank and we'll fill something in.">
          <textarea value={a.good} onChange={(e) => set({ good: e.target.value })} rows={2}
            placeholder="e.g. Passes happen on the move without the carrier stopping first."
            style={{ ...input, border: `1px solid ${C.line}`, resize: "vertical" }} />
        </Field>

        <Field label="Coaching points" hint="Three at most. Short enough to shout across a pitch.">
          {a.points.map((p, i) => (
            <input key={i} value={p} onChange={(e) => setPoint(i, e.target.value)}
              placeholder={["Hands up early", "Pass while running", "Support the carrier"][i]}
              style={{ ...input, border: `1px solid ${C.line}`, marginTop: i ? 6 : 0 }} />
          ))}
        </Field>

        {isGame && (
          <Field label="Questions to ask"
            hint="Ask instead of telling. Stop the game rarely, then ask one of these and wait.">
            {a.questions.map((q, i) => (
              <input key={i} value={q} onChange={(e) => setQ(i, e.target.value)}
                placeholder={["What did you see before you passed?", "Where was the space?", "What would you try next time?"][i]}
                style={{ ...input, border: `1px solid ${C.line}`, marginTop: i ? 6 : 0 }} />
            ))}
          </Field>
        )}
      </div></Card>

      {/* APES self-check */}
      <Card><div className="p-4">
        <Label>Check it against APES</Label>
        <p className="text-xs mt-0.5" style={{ color: C.mute }}>
          Score your own activity honestly. Anything under 4 is worth another look.
        </p>
        {Object.entries(APES_LABELS).map(([k, [name, ask]]) => (
          <div key={k} className="mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{name}</span>
              <span className="text-sm font-bold"
                style={{ color: a.apes[k] < 4 ? "#B3401F" : C.grass }}>{a.apes[k]}/5</span>
            </div>
            <p className="text-xs" style={{ color: C.mute }}>{ask}</p>
            <div className="flex gap-1.5 mt-1.5">
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} onClick={() => set({ apes: { ...a.apes, [k]: v } })}
                  className="flex-1 rounded-xl py-2 font-bold"
                  style={{ fontSize: 13,
                           background: a.apes[k] >= v ? (a.apes[k] < 4 ? "#E8A08B" : C.grass) : C.paper,
                           color: a.apes[k] >= v ? "#fff" : C.mute,
                           border: `1px solid ${C.line}` }}>{v}</button>
              ))}
            </div>
          </div>
        ))}
      </div></Card>

      {/* STEP */}
      <Card><div className="p-4">
        <Label>Making it easier or harder</Label>
        <p className="text-xs mt-0.5 mb-1" style={{ color: C.mute }}>
          One line each. You'll be glad of these when half the group finds it too easy.
        </p>
        {Object.entries(STEP_LABELS).map(([k, hint]) => (
          <div key={k} className="mt-2">
            <div className="text-sm font-bold">{k}</div>
            <input value={a.step[k]} onChange={(e) => set({ step: { ...a.step, [k]: e.target.value } })}
              placeholder={hint} style={{ ...input, border: `1px solid ${C.line}`, marginTop: 4 }} />
          </div>
        ))}
      </div></Card>

      {/* picture */}
      <Card><div className="p-4">
        <Label>The picture</Label>
        <p className="text-xs mt-0.5 mb-2" style={{ color: C.mute }}>
          Optional. Start from a layout, then move everything around — drag
          players, draw arrows, drop cones.
        </p>
        <div className="flex gap-2 mt-1">
          <div style={{ flex: 1 }}>
            <div className="text-xs font-bold" style={{ color: C.mute }}>Length (m)</div>
            <input type="number" value={pitch[0]}
              onChange={(e) => setPitch(0, e.target.value)}
              style={{ ...input, border: `1px solid ${C.line}` }} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="text-xs font-bold" style={{ color: C.mute }}>Width (m)</div>
            <input type="number" value={pitch[1]}
              onChange={(e) => setPitch(1, e.target.value)}
              style={{ ...input, border: `1px solid ${C.line}` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {LAYOUTS.map((l) => (
            <button key={l.id} type="button" onClick={() => seedLayout(l.id)}
              className="rounded-full px-3 py-2 text-sm font-bold"
              style={{ background: "#fff", color: C.ink, border: `1px solid ${C.line}` }}>
              {l.label}
            </button>
          ))}
        </div>
        {a.diagram && (
          <DiagramEditor diagram={a.diagram} onChange={(d) => set({ diagram: d })} />
        )}
      </div></Card>

      {/* problems and nudges */}
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

      {warnings.length > 0 && (
        <Card style={{ background: C.goldSoft, borderColor: C.gold }}><div className="p-4">
          <Label>Worth a thought</Label>
          <ul className="mt-1.5 space-y-1">
            {warnings.map((w, i) => (
              <li key={i} className="text-sm" style={{ color: "#7a4f00" }}>{w}</li>
            ))}
          </ul>
        </div></Card>
      )}

      <button onClick={save} className="w-full rounded-xl py-4 font-bold"
        style={{ background: C.grass, color: "#fff", fontSize: 16 }}>
        Save this activity
      </button>
      <div className="text-center pb-2">
        <Pill bg={C.paper} fg={C.mute}>Saved on this device, in your own library</Pill>
      </div>
    </div>
  );
}
