import React from "react";
import { C } from "../data/constants.js";
import { SKILLS, PHASES } from "../data/index.js";
import { PRESETS, resolveSlot, wState, doneCount, buildSingle, recommendFocus, recommendSkill, skillsForAge } from "../lib/helpers.js";
import { allowsContact } from "../data/ageGrades.js";
import AgeGradeCard from "./AgeGradeCard.jsx";
import { Card, SectionTitle, Pill } from "./ui.jsx";
import BackupCard from "./BackupCard.jsx";

export default function Dashboard({ data, goSetup, goPlayers, setPlan, ageGrade, setAgeGrade, onRestore, openWeekFn }) {
  const plan = data.plan;
  const done = doneCount(data);
  const nextIdx = plan ? (plan.findIndex((_, i) => !wState(data, i + 1).done) + 1 || 6) : 0;
  const nextSlot = plan ? resolveSlot(plan[nextIdx - 1]) : null;
  const focusList = recommendFocus(data.players);
  const suggested = recommendSkill(data.players, ageGrade);
  const contactOk = allowsContact(ageGrade);
  const starter = contactOk ? PRESETS.matchready : PRESETS.tagready;

  return (
    <div className="space-y-4">
      <AgeGradeCard ageGrade={ageGrade} setAgeGrade={setAgeGrade} />

      <SectionTitle>Today</SectionTitle>

      {!plan ? (
        <Card className="pitch-hero rr-rise">
          <div className="p-5 text-white">
            <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>Get started</div>
            <h2 className="font-display text-3xl font-extrabold mt-1 leading-tight">Build your six-week block</h2>
            <p className="text-sm opacity-90 mt-2">
              Load the recommended <b>{starter.name}</b> block, focus on one skill, or build your own week-by-week mix.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => setPlan(starter.slots, starter.name)}
                className="rounded-xl px-4 py-3 font-bold text-sm"
                style={{ background: C.gold, color: C.pineDeep, boxShadow: "0 10px 22px -10px rgba(232,176,8,.85)" }}>
                ⭐ Use {starter.name}
              </button>
              <button onClick={goSetup} className="rounded-xl px-4 py-3 font-bold text-sm"
                style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}>
                Set up manually →
              </button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="pitch-hero rr-rise">
          <div className="p-5 text-white">
            <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>
              This week · {nextSlot.skill.emoji} {nextSlot.skill.label}
            </div>
            <div className="text-sm opacity-80 mt-1">Week {nextIdx} of 6 · {PHASES[nextSlot.session - 1]}</div>
            <h2 className="font-display text-3xl font-extrabold mt-1 leading-tight">{nextSlot.w.title}</h2>
            <p className="text-sm opacity-90 mt-2">{nextSlot.w.objective}</p>
            <button onClick={() => openWeekFn(nextIdx)}
              className="mt-4 rounded-xl px-4 py-3 font-bold text-sm"
              style={{ background: C.gold, color: C.pineDeep, boxShadow: "0 10px 22px -10px rgba(232,176,8,.85)" }}>Open session plan →</button>
          </div>
        </Card>
      )}

      {plan && (
        <Card><div className="p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold">{data.planName || "Your block"}</div>
            <div className="text-sm font-semibold" style={{ color: C.grass }}>{done}/6 weeks</div>
          </div>
          <div className="flex gap-1 mt-3">
            {plan.map((slot, i) => {
              const r = resolveSlot(slot);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-2.5 rounded-full bar-fill"
                    style={{ background: wState(data, i + 1).done ? C.grass : C.line }} />
                  <span style={{ fontSize: 13 }}>{r.skill.emoji}</span>
                </div>
              );
            })}
          </div>
          <button onClick={goSetup} className="mt-3 text-sm font-semibold" style={{ color: C.grass }}>
            Edit this block
          </button>
        </div></Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Card><button onClick={goPlayers} className="p-4 w-full text-left">
          <div className="font-display text-3xl font-extrabold" style={{ color: C.pine }}>{data.players.length}</div>
          <div className="text-sm" style={{ color: C.mute }}>players in the squad</div>
        </button></Card>
        <Card><div className="p-4">
          <div className="font-display text-3xl font-extrabold" style={{ color: C.pine }}>{skillsForAge(ageGrade).length}</div>
          <div className="text-sm" style={{ color: C.mute }}>skills to mix &amp; match</div>
        </div></Card>
      </div>

      <Card><div className="p-4">
        <div className="flex items-center gap-2"><span>🎯</span>
          <div className="font-bold">What should I coach next?</div></div>
        {focusList.length === 0 ? (
          <p className="text-sm mt-2" style={{ color: C.mute }}>
            Record a few observations on the Players tab and tailored suggestions appear here.
          </p>
        ) : (
          <>
            {suggested && (
              <button onClick={() => setPlan(buildSingle(suggested), `${SKILLS[suggested].label} block`)}
                className="mt-3 w-full text-left rounded-xl p-3 flex items-center justify-between"
                style={{ background: C.grassSoft }}>
                <span className="text-sm">Your squad would benefit from a <b>{SKILLS[suggested].label}</b> block</span>
                <span className="text-sm font-bold shrink-0" style={{ color: C.grass }}>Load →</span>
              </button>
            )}
            <ul className="mt-3 space-y-2">
              {focusList.map((f) => (
                <li key={f.sub} className="flex items-center justify-between text-sm">
                  <span>Grow <b>{f.sub}</b> <span style={{ color: C.mute }}>({f.area})</span></span>
                  <Pill bg={C.goldSoft} fg="#8a5a00">{f.count} to grow</Pill>
                </li>
              ))}
            </ul>
          </>
        )}
      </div></Card>

      <Card style={{ background: C.goldSoft, borderColor: C.goldSoft }}>
        <div className="p-4 text-sm" style={{ color: "#6b4a00" }}>
          <b>Coach reminders:</b> walk the pitch for hazards · headcount before and after ·
          water breaks · praise effort over outcome · finish with a team huddle.
        </div>
      </Card>
      <BackupCard data={data} onRestore={onRestore} />

    </div>
  );
}
