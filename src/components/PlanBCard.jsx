// Plan B — for when the night has gone sideways. Tick what's changed and the
// session below swaps to activities that still work, staying on this week's
// skill so the block keeps its shape. Untick everything and the original plan
// comes straight back.
//
// The choice is saved against the week (like the register), so closing the
// app mid-session doesn't lose it.

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import { PLAN_B_CONDITIONS } from "../lib/planB.js";

// Honest phrases for conditions the plan couldn't satisfy.
const UNMET = {
  wet: "it isn't ideal in heavy rain",
  indoor: "it still needs to be outside",
  singleCoach: "it still needs more than one coach",
};

export default function PlanBCard({ skill, count, conds, setConds, plan, overriddenSlots = [] }) {
  const active = conds.length > 0;

  const toggle = (id) =>
    setConds(conds.includes(id) ? conds.filter((c) => c !== id) : [...conds, id]);

  const options = [
    ...PLAN_B_CONDITIONS,
    {
      id: "numbers",
      label: "Too few for the games",
      detail: `Swap in activities that work with ${count} player${count === 1 ? "" : "s"}.`,
    },
  ];

  const swaps = plan ? plan.slots.filter((s) => !s.keep && s.replacement) : [];
  const unfilled = plan ? plan.slots.filter((s) => s.unfilled) : [];

  return (
    <Card style={active ? { borderColor: C.gold, borderWidth: 2 } : undefined}>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Label>Plan B</Label>
          {active && <Pill bg={C.goldSoft} fg="#8a5a00">In use tonight</Pill>}
        </div>
        <p className="text-xs mt-1" style={{ color: C.mute }}>
          Night gone sideways? Tick what's changed and the session swaps to{" "}
          {skill.label.toLowerCase()} activities that still work. Untick to go
          back to the plan.
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {options.map((o) => {
            const on = conds.includes(o.id);
            return (
              <button key={o.id} onClick={() => toggle(o.id)}
                className="rounded-full px-3 py-2 text-sm font-bold"
                style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                         border: `1px solid ${on ? C.pine : C.line}` }}>
                {on ? "✓ " : ""}{o.label}
              </button>
            );
          })}
        </div>
        {!active && (
          <p className="text-xs mt-2" style={{ color: C.mute }}>
            {options.map((o) => o.detail).join(" ")}
          </p>
        )}

        {plan && (
          <div className="mt-3 space-y-1.5">
            {plan.slots.map((s) => (
              <div key={s.slot} className="text-sm flex gap-2">
                <span className="font-bold shrink-0" style={{ color: C.mute, minWidth: 86, fontSize: 12 }}>
                  {s.slotLabel}
                </span>
                {overriddenSlots.includes(s.slot) ? (
                  <span style={{ color: C.pine }}>✋ your swap — left as you set it</span>
                ) : s.keep ? (
                  <span style={{ color: C.pine }}>✓ <b>{s.original.name}</b> works as planned</span>
                ) : s.replacement ? (
                  <span>
                    <span style={{ color: C.mute, textDecoration: "line-through" }}>{s.original.name}</span>
                    {" → "}<b>{s.replacement.name}</b>
                    <span style={{ color: C.mute }}> (week {s.fromWeek})</span>
                  </span>
                ) : (
                  <span style={{ color: "#7a4f00" }}>
                    ⚠ nothing fits — <b>{s.original.name}</b> stays, adapt it with STEP
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {plan && plan.dropped.length > 0 && (
          <div className="rounded-xl p-2.5 mt-3"
            style={{ background: C.goldSoft, border: `1px solid ${C.gold}` }}>
            <p className="text-sm font-semibold" style={{ color: "#7a4f00" }}>
              No {skill.label.toLowerCase()} activity fits everything ticked.
              This is the nearest plan, but {plan.dropped.map((d) => UNMET[d] || d).join(", and ")}.
            </p>
          </div>
        )}

        {plan && swaps.length === 0 && unfilled.length === 0 && plan.dropped.length === 0 && (
          <p className="text-xs mt-2 font-semibold" style={{ color: C.grass }}>
            Good news — tonight's plan already copes with all of that.
          </p>
        )}
      </div>
    </Card>
  );
}
