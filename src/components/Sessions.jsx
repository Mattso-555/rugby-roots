import React, { useState } from "react";
import { C } from "../data/constants.js";
import { SKILLS, PHASES } from "../data/index.js";
import { PRESETS, resolveSlot, wState, doneCount, buildSingle, presetsForAge, skillsForAge } from "../lib/helpers.js";
import { skillWarning, allowsContact, CONTACT_LOCK_REASON } from "../data/ageGrades.js";
import { printBlock } from "../lib/print.js";
import { Card, Label, SectionTitle, Pill, Icon } from "./ui.jsx";
import SessionDetail from "./SessionDetail.jsx";
import SharePlanCard from "./SharePlanCard.jsx";

export default function Sessions({ data, ageGrade, setPlan, setSlot, openWeek, setOpenWeek, toggleDone, setReflection }) {
  const [editing, setEditing] = useState(false);
  const [editOpen, setEditOpen] = useState(null);
  const plan = data.plan;

  if (plan && openWeek) {
    const r = resolveSlot(plan[openWeek - 1]);
    const st = wState(data, openWeek);
    return <SessionDetail r={r} blockWeek={openWeek} st={st} players={data.players} back={() => setOpenWeek(null)}
      toggleDone={() => toggleDone(openWeek)} setReflection={(t) => setReflection(openWeek, t)} />;
  }

  const loadPlan = (slots, name) => { setPlan(slots, name); setEditing(false); setEditOpen(null); };

  return (
    <div className="space-y-4">
      <SectionTitle>Your block</SectionTitle>
      <p className="text-sm" style={{ color: C.mute }}>
        Build a six-week block. Start from a template, focus on one skill, or mix skills week by week — every session stays built on APES and STEP.
      </p>

      <Card><div className="p-4">
        <Label>Templates</Label>
        <div className="space-y-2 mt-2">
          {Object.entries(presetsForAge(ageGrade)).map(([id, p]) => (
            <div key={id} className="rounded-xl p-3" style={{ border: `1px solid ${C.line}`, background: C.paper }}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{p.name}</span>
                    <Pill bg={id === "matchready" ? C.goldSoft : C.grassSoft} fg={id === "matchready" ? "#8a5a00" : C.grass}>{p.tag}</Pill>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {p.slots.map((s, i) => <span key={i} style={{ fontSize: 15 }}>{SKILLS[s.skill].emoji}</span>)}
                  </div>
                </div>
                <button onClick={() => loadPlan(p.slots, p.name)}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold shrink-0"
                  style={{ background: id === "matchready" ? C.gold : C.grass, color: id === "matchready" ? C.pineDeep : "#fff" }}>Use</button>
              </div>
              <p className="text-xs mt-2" style={{ color: C.mute }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div></Card>

      <Card><div className="p-4">
        <Label>Or focus on one skill</Label>
        <p className="text-xs mt-1" style={{ color: C.mute }}>Loads that skill's full six-week progression.</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(SKILLS).filter(([id]) => skillsForAge(ageGrade).includes(id)).map(([id, s]) => (
            <button key={id} onClick={() => loadPlan(buildSingle(id), `${s.label} block`)}
              className="rounded-full px-3 py-2 text-sm font-semibold"
              style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div></Card>

      {!plan ? (
        <Card><div className="p-6 text-center">
          <div style={{ fontSize: 30 }}>🏉</div>
          <p className="text-sm mt-2" style={{ color: C.mute }}>Pick a template or a skill above to build your six-week block.</p>
        </div></Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="font-bold min-w-0 truncate">{data.planName || "Your block"} · 6 weeks</div>
            <button onClick={() => { setEditing(!editing); setEditOpen(null); }}
              className="text-sm font-bold rounded-full px-3 py-1.5 shrink-0"
              style={{ background: editing ? C.grass : C.grassSoft, color: editing ? "#fff" : C.grass }}>
              {editing ? "Done editing" : "Edit weeks"}
            </button>
          </div>
          {editing && (
            <p className="text-sm" style={{ color: C.mute }}>
              Tap <b>Change</b> on any week to swap in a different skill and session. Mix freely — the app keeps it to six weeks.
            </p>
          )}

          <button onClick={() => printBlock(data)}
            className="w-full rounded-xl py-2.5 font-bold flex items-center justify-center gap-2"
            style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
            🖨️ Print whole block as PDF cards
          </button>

          <div className="space-y-3">
            {plan.map((slot, i) => {
              const week = i + 1; const r = resolveSlot(slot); const st = wState(data, week);
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

                  {!editing ? (
                    <button onClick={() => setOpenWeek(week)} className="mt-3 text-sm font-bold" style={{ color: C.grass }}>
                      Open session plan →
                    </button>
                  ) : editOpen === week ? (
                    <div className="mt-3 rounded-xl p-3" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
                      <Label>Skill</Label>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {Object.entries(SKILLS).filter(([id]) => skillsForAge(ageGrade).includes(id)).map(([id, s]) => {
                          const on = r.skillId === id;
                          return <button key={id} onClick={() => setSlot(week, { skill:id, session:1 })}
                            className="rounded-full px-2.5 py-1.5 text-xs font-semibold"
                            style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink, border: `1px solid ${on ? C.pine : C.line}` }}>
                            {s.emoji} {s.label}
                          </button>;
                        })}
                      </div>
                      <Label className="mt-3">Session</Label>
                      <div className="mt-2 space-y-1.5">
                        {planFor(r.skillId).map((sw) => {
                          const on = r.session === sw.week;
                          return <button key={sw.week} onClick={() => setSlot(week, { skill:r.skillId, session:sw.week })}
                            className="w-full text-left rounded-lg px-3 py-2 text-sm"
                            style={{ background: on ? C.grassSoft : "#fff", border: `1px solid ${on ? C.grass : C.line}`, color: C.ink }}>
                            <span className="font-semibold" style={{ color: C.pine }}>{PHASES[sw.week - 1]}:</span> {sw.title}
                          </button>;
                        })}
                      </div>
                      <button onClick={() => setEditOpen(null)} className="mt-3 text-sm font-bold" style={{ color: C.grass }}>Done</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditOpen(week)} className="mt-3 text-sm font-bold" style={{ color: C.grass }}>
                      Change week {week} →
                    </button>
                  )}
                </div></Card>
              );
            })}
          </div>
        </>
      )}
      <SharePlanCard plan={data.plan} planName={data.planName} />

    </div>
  );
}
