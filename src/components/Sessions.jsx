import React, { useState } from "react";
import { C } from "../data/constants.js";
import { PHASES } from "../data/index.js";
import { resolveWeek, wState } from "../lib/helpers.js";
import { printBlock } from "../lib/print.js";
import { Card, SectionTitle } from "./ui.jsx";
import SessionDetail from "./SessionDetail.jsx";
import SharePlanCard from "./SharePlanCard.jsx";
import BlockBuilder from "./BlockBuilder.jsx";

export default function Sessions({
  data, ageGrade, setPlan, setSlot, moveWeek, setOwnWeek,
  recordObservation, setAttendance, toggleAttendance,
  saveCustom, deleteCustom, attachCustom, detachCustom,
  openWeek, setOpenWeek, toggleDone, setReflection,
}) {
  const plan = data.plan;
  // Start in build mode whenever there's no block yet, and stay there until
  // the coach taps Done — creating a block shouldn't kick them out mid-build.
  const [building, setBuilding] = useState(!plan);

  // --- running a single session (kept entirely separate from planning) ---
  if (plan && openWeek) {
    const r = resolveWeek(data, plan[openWeek - 1]);
    const st = wState(data, openWeek);
    return (
      <SessionDetail r={r} blockWeek={openWeek} st={st} players={data.players}
        back={() => setOpenWeek(null)}
        toggleDone={() => toggleDone(openWeek)} setReflection={(t) => setReflection(openWeek, t)}
        data={data} recordObservation={recordObservation} setAttendance={setAttendance} toggleAttendance={toggleAttendance}
        saveCustom={saveCustom} deleteCustom={deleteCustom}
        attachCustom={attachCustom} detachCustom={detachCustom} />
    );
  }

  // --- building / rearranging the block (its own screen) ---
  if (building) {
    return (
      <BlockBuilder data={data} ageGrade={ageGrade}
        setPlan={setPlan} setSlot={setSlot} moveWeek={moveWeek} setOwnWeek={setOwnWeek}
        onDone={() => plan && setBuilding(false)} />
    );
  }

  // --- the block overview: read it, open a session, or go to the builder ---
  if (!plan) {
    return (
      <BlockBuilder data={data} ageGrade={ageGrade}
        setPlan={setPlan} setSlot={setSlot} moveWeek={moveWeek} setOwnWeek={setOwnWeek}
        onDone={() => {}} />
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <SectionTitle>Your block</SectionTitle>
        <button onClick={() => setBuilding(true)}
          className="text-sm font-bold rounded-full px-4 py-2 shrink-0"
          style={{ background: C.grass, color: "#fff" }}>
          Build / rearrange
        </button>
      </div>
      <div className="font-bold" style={{ color: C.pine }}>{data.planName || "Your block"} · 6 weeks</div>

      <button onClick={() => printBlock(data)}
        className="w-full rounded-xl py-2.5 font-bold flex items-center justify-center gap-2"
        style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
        🖨️ Print whole block as PDF cards
      </button>

      <div className="space-y-3">
        {plan.map((slot, i) => {
          const week = i + 1;
          const r = resolveWeek(data, slot);
          const st = wState(data, week);
          return (
            <Card key={i}><div className="p-4">
              <div className="flex items-start gap-3">
                <div className="font-display rounded-xl w-11 h-11 flex items-center justify-center font-extrabold shrink-0"
                  style={{ background: st.done ? C.grass : C.grassSoft, color: st.done ? "#fff" : C.pine, fontSize: 18 }}>
                  {st.done ? "✓" : week}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: C.mute, letterSpacing: ".04em" }}>
                    Week {week} · {r.skill.emoji} {r.skill.label} · {PHASES[r.session - 1]}
                  </div>
                  <div className="font-bold leading-tight">{r.w.title}</div>
                  <div className="text-sm mt-0.5" style={{ color: C.mute }}>{r.w.objective}</div>
                </div>
              </div>
              <button onClick={() => setOpenWeek(week)} className="mt-3 text-sm font-bold" style={{ color: C.grass }}>
                Open session plan →
              </button>
            </div></Card>
          );
        })}
      </div>

      <SharePlanCard plan={data.plan} planName={data.planName} />
    </div>
  );
}
