// The swap control that sits above each of a week's three slots. Tap Swap
// and pick a replacement for just that slot: one of your own activities of
// the right type, one of your skills courses, or the same slot borrowed from
// another week of this skill. "Back to the plan" undoes it.
//
// This is the per-week edit: the block keeps its shape, the other two slots
// keep their plan, and only this slot changes — for this week only.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { SKILLS, PHASES } from "../data/index.js";
import { Label, Pill } from "./ui.jsx";
import { SLOT_TYPES } from "../lib/weekEdits.js";

export default function SlotSwap({
  data, slotIndex, slotLabel, skillId, session, isOwn, current, setRef,
}) {
  const [open, setOpen] = useState(false);

  const myActivities = (data.customActivities || []).filter((a) => a.type === SLOT_TYPES[slotIndex]);
  const myCourses = data.courses || [];
  const skill = !isOwn ? SKILLS[skillId] : null;
  const builtins = skill
    ? skill.weeks
        .filter((w) => w.week !== session)
        .map((w) => ({ week: w.week, a: w.activities[slotIndex] }))
        .filter((x) => x.a)
    : [];

  const pick = (ref) => { setRef(ref); setOpen(false); };
  const nothingToOffer = !myActivities.length && !myCourses.length && !builtins.length;

  return (
    <div className="mb-1">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase" style={{ color: C.mute, letterSpacing: ".04em" }}>
            {slotLabel}
          </span>
          {current && <Pill bg={C.goldSoft} fg="#8a5a00">Your swap</Pill>}
        </div>
        <div className="flex items-center gap-2">
          {current && (
            <button onClick={() => setRef(null)}
              className="text-xs font-bold" style={{ color: C.mute }}>
              Back to the plan
            </button>
          )}
          <button onClick={() => setOpen(!open)}
            className="text-xs font-bold rounded-full px-2.5 py-1"
            style={{ background: open ? C.pine : C.grassSoft, color: open ? "#fff" : C.pine }}>
            {open ? "Close" : "Swap"}
          </button>
        </div>
      </div>

      {open && (
        <div className="rounded-xl p-3 mt-1.5" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          {nothingToOffer && (
            <p className="text-sm" style={{ color: C.mute }}>
              Nothing to swap in yet — write activities or design a course on
              the Library tab and they'll appear here.
            </p>
          )}

          {myActivities.length > 0 && (
            <div className="mb-2.5">
              <Label>My activities</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {myActivities.map((a) => {
                  const on = current && current.kind === "custom" && current.id === a.id;
                  return (
                    <button key={a.id} onClick={() => pick({ kind: "custom", id: a.id })}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                               border: `1px solid ${on ? C.pine : C.line}` }}>
                      ⭐ {a.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {myCourses.length > 0 && (
            <div className="mb-2.5">
              <Label>My skills courses</Label>
              <p className="text-xs mt-0.5 mb-1.5" style={{ color: C.mute }}>
                The course becomes this slot — its layout and notes replace the
                planned activity for this week.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {myCourses.map((c) => {
                  const on = current && current.kind === "course" && current.id === c.id;
                  return (
                    <button key={c.id} onClick={() => pick({ kind: "course", id: c.id })}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                               border: `1px solid ${on ? C.pine : C.line}` }}>
                      🏟 {c.name || "Untitled course"}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {builtins.length > 0 && (
            <div>
              <Label>From the {skill.label.toLowerCase()} block</Label>
              <p className="text-xs mt-0.5 mb-1.5" style={{ color: C.mute }}>
                The same slot from a different week — easier earlier, harder later.
              </p>
              <div className="space-y-1.5">
                {builtins.map(({ week, a }) => {
                  const on = current && current.kind === "builtin" && current.session === week;
                  return (
                    <button key={week}
                      onClick={() => pick({ kind: "builtin", skill: skillId, session: week })}
                      className="w-full text-left rounded-lg px-3 py-2 text-sm"
                      style={{ background: on ? C.grassSoft : "#fff",
                               border: `1px solid ${on ? C.grass : C.line}`, color: C.ink }}>
                      <span className="font-semibold" style={{ color: C.pine }}>
                        {PHASES[week - 1]}:
                      </span>{" "}
                      {a.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
