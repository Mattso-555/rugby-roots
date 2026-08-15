// Build or rearrange a six-week block. This screen does one job — planning —
// and hands off to the running view (register, activities) elsewhere.
//
// Shape follows what coaches expect from session planners: start from a
// template or a single skill, then see all six weeks at a glance and adjust
// each one with as few taps as possible (change, duplicate, move, done).

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { SKILLS, PHASES } from "../data/index.js";
import { planFor, resolveWeek, buildSingle, presetsForAge, skillsForAge } from "../lib/helpers.js";
import { sessionGaps } from "../lib/customActivities.js";
import { Card, Label, SectionTitle, Pill } from "./ui.jsx";

export default function BlockBuilder({ data, ageGrade, setPlan, setSlot, moveWeek, setOwnWeek, onDone }) {
  const plan = data.plan;
  const [changing, setChanging] = useState(null); // week number being changed
  const allowedSkills = skillsForAge(ageGrade);

  const start = (slots, name) => { setPlan(slots, name); setChanging(null); };

  return (
    <div className="space-y-4">
      <button onClick={onDone} className="text-sm font-semibold" style={{ color: C.grass }}>
        ← Done building
      </button>
      <SectionTitle>{plan ? "Your six-week block" : "Build your block"}</SectionTitle>

      {/* Start points — only prominent before there's a block, tucked away after */}
      {!plan ? (
        <>
          <p className="text-sm" style={{ color: C.mute }}>
            Pick a ready-made block to start, or choose a single skill to work through.
            You can rearrange and swap any week afterwards.
          </p>

          <Card><div className="p-4">
            <Label>Ready-made blocks</Label>
            <div className="space-y-2 mt-2">
              {Object.entries(presetsForAge(ageGrade)).map(([id, p]) => (
                <button key={id} onClick={() => start(p.slots, p.name)}
                  className="w-full text-left rounded-xl p-3"
                  style={{ border: `1px solid ${C.line}`, background: C.paper }}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{p.name}</span>
                    <Pill bg={C.grassSoft} fg={C.grass}>{p.tag}</Pill>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {p.slots.map((s, i) => <span key={i} style={{ fontSize: 15 }}>{SKILLS[s.skill].emoji}</span>)}
                  </div>
                  <p className="text-xs mt-2" style={{ color: C.mute }}>{p.note}</p>
                </button>
              ))}
            </div>
          </div></Card>

          <Card><div className="p-4">
            <Label>Or work through one skill</Label>
            <p className="text-xs mt-1" style={{ color: C.mute }}>
              Loads that skill's full six-week progression, easiest first.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {allowedSkills.map((id) => (
                <button key={id} onClick={() => start(buildSingle(id), `${SKILLS[id].label} block`)}
                  className="rounded-full px-3 py-2 text-sm font-semibold"
                  style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}>
                  {SKILLS[id].emoji} {SKILLS[id].label}
                </button>
              ))}
            </div>
          </div></Card>
        </>
      ) : (
        <>
          <p className="text-sm" style={{ color: C.mute }}>
            Change the skill for any week, duplicate it, or move it earlier or later.
            The block always stays six weeks long.
          </p>

          {/* the six weeks */}
          <div className="space-y-2">
            {plan.map((slot, i) => {
              const week = i + 1;
              const r = resolveWeek(data, slot);
              const open = changing === week;
              return (
                <Card key={i} style={open ? { borderColor: C.grass, borderWidth: 2 } : undefined}>
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      {/* week number + move controls, as one column */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="font-display rounded-xl w-9 h-9 flex items-center justify-center font-extrabold"
                          style={{ background: C.pine, color: "#fff", fontSize: 15 }}>{week}</div>
                        <div className="flex gap-1">
                          <button onClick={() => moveWeek(week, -1)} disabled={week === 1}
                            aria-label="Move earlier"
                            className="rounded-lg flex items-center justify-center font-bold"
                            style={{ background: week === 1 ? C.paper : C.grassSoft,
                                     color: week === 1 ? C.line : C.pine, fontSize: 13, width: 24, height: 28 }}
                            >▲</button>
                          <button onClick={() => moveWeek(week, 1)} disabled={week === plan.length}
                            aria-label="Move later"
                            className="rounded-lg flex items-center justify-center font-bold"
                            style={{ background: week === plan.length ? C.paper : C.grassSoft,
                                     color: week === plan.length ? C.line : C.pine, fontSize: 13, width: 24, height: 28 }}
                            >▼</button>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold uppercase" style={{ color: C.mute, letterSpacing: ".04em" }}>
                          {r.skill.emoji} {r.skill.label} · {PHASES[r.session - 1]}
                        </div>
                        <div className="font-bold leading-tight text-sm">{r.w.title}</div>
                      </div>
                    </div>

                    {!open ? (
                      <div className="flex gap-2 mt-2 pl-14">
                        <button onClick={() => setChanging(week)}
                          className="rounded-lg px-3 py-1.5 text-sm font-bold"
                          style={{ background: C.grass, color: "#fff" }}>
                          Change skill
                        </button>
                        {week < plan.length && (
                          <button onClick={() => setSlot(week + 1, slot)}
                            className="rounded-lg px-3 py-1.5 text-sm font-bold"
                            style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
                            Copy to week {week + 1}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="mt-3 rounded-xl p-3" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
                        {(data.customSessions || []).filter((cs) => !sessionGaps(cs).length).length > 0 && (
                          <div className="mb-3">
                            <Label>My sessions</Label>
                            <p className="text-xs mt-0.5 mb-2" style={{ color: C.mute }}>
                              Drop one of your own sessions into this week.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {(data.customSessions || []).filter((cs) => !sessionGaps(cs).length).map((cs) => {
                                const on = slot.ownSession === cs.id;
                                return (
                                  <button key={cs.id}
                                    onClick={() => { setOwnWeek(week, cs.id); setChanging(null); }}
                                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                                    style={{ background: on ? C.gold : "#fff", color: on ? C.pineDeep : C.ink,
                                             border: `1px solid ${on ? C.gold : C.line}` }}>
                                    ⭐ {cs.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <Label>Pick a built-in skill for week {week}</Label>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {allowedSkills.map((id) => {
                            const on = r.skillId === id;
                            // keep the same phase (session number) when swapping skill
                            return (
                              <button key={id}
                                onClick={() => { setSlot(week, { skill: id, session: r.session }); setChanging(null); }}
                                className="rounded-full px-2.5 py-1.5 text-xs font-semibold"
                                style={{ background: on ? C.pine : "#fff", color: on ? "#fff" : C.ink,
                                         border: `1px solid ${on ? C.pine : C.line}` }}>
                                {SKILLS[id].emoji} {SKILLS[id].label}
                              </button>
                            );
                          })}
                        </div>

                        {r.skillId !== "own" && <><Label className="mt-3">Which session?</Label>
                        <p className="text-xs mt-0.5 mb-2" style={{ color: C.mute }}>
                          Sessions run easiest to hardest. Week {week} is usually {PHASES[week - 1]}.
                        </p>
                        <div className="space-y-1.5">
                          {planFor(r.skillId).map((sw) => {
                            const on = r.session === sw.week;
                            return (
                              <button key={sw.week}
                                onClick={() => { setSlot(week, { skill: r.skillId, session: sw.week }); setChanging(null); }}
                                className="w-full text-left rounded-lg px-3 py-2 text-sm"
                                style={{ background: on ? C.grassSoft : "#fff",
                                         border: `1px solid ${on ? C.grass : C.line}`, color: C.ink }}>
                                <span className="font-semibold" style={{ color: C.pine }}>{PHASES[sw.week - 1]}:</span> {sw.title}
                              </button>
                            );
                          })}
                        </div>
                        </>}
                        <button onClick={() => setChanging(null)} className="mt-3 text-sm font-bold" style={{ color: C.mute }}>
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* start over */}
          <Card><div className="p-4">
            <Label>Start from something else</Label>
            <p className="text-xs mt-1 mb-2" style={{ color: C.mute }}>
              This replaces all six weeks. Your register and notes stay.
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(presetsForAge(ageGrade)).map(([id, p]) => (
                <button key={id} onClick={() => start(p.slots, p.name)}
                  className="rounded-full px-3 py-2 text-sm font-semibold"
                  style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}>
                  {p.name}
                </button>
              ))}
              {allowedSkills.map((id) => (
                <button key={id} onClick={() => start(buildSingle(id), `${SKILLS[id].label} block`)}
                  className="rounded-full px-3 py-2 text-sm font-semibold"
                  style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}>
                  {SKILLS[id].emoji} {SKILLS[id].label}
                </button>
              ))}
            </div>
          </div></Card>

          <button onClick={onDone} className="w-full rounded-xl py-4 font-bold"
            style={{ background: C.grass, color: "#fff", fontSize: 16 }}>
            Done — this is my block
          </button>
        </>
      )}
    </div>
  );
}
