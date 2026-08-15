import React from "react";
import { C } from "../data/constants.js";
import { PHASES } from "../data/index.js";
import { printSession } from "../lib/print.js";
import { Card, Label } from "./ui.jsx";
import Register from "./Register.jsx";
import SessionObservations from "./SessionObservations.jsx";
import { headcount } from "../lib/grouping.js";
import MyActivities from "./MyActivities.jsx";
import { activitiesForSlot } from "../lib/customActivities.js";
import ActivityCard from "./ActivityCard.jsx";
import { resolveWeek, wState } from "../lib/helpers.js";
import { planBForWeek } from "../lib/planB.js";
import PlanBCard from "./PlanBCard.jsx";
import WeekCourses from "./WeekCourses.jsx";
import SlotSwap from "./SlotSwap.jsx";
import CourseDiagram from "./CourseDiagram.jsx";
import { displaySlots, printableActivities, SLOT_LABELS } from "../lib/weekEdits.js";
import { kitSummary } from "../lib/courses.js";

export default function SessionDetail({ r, blockWeek, st, players, back, toggleDone, setReflection, data, recordObservation, setAttendance, toggleAttendance, saveCustom, deleteCustom, attachCustom, detachCustom, setPlanB, attachCourse, detachCourse, setWeekSlot }) {
  const { skill, skillId, w, session } = r;
  const count = data ? headcount(data, blockWeek) : (players || []).length;
  const slotKey = `${skillId}:${session}`;
  const isOwn = skillId === "own";

  // Plan B: the conditions ticked for this week, saved like the register.
  // Substitutes stay on this week's skill and slot, so the block keeps its
  // shape and the age-grade contact lock is respected automatically.
  const planBConds = (data && data.planB && data.planB[blockWeek]) || [];
  const planB = data && !isOwn && planBConds.length
    ? planBForWeek(skill, session - 1, planBConds.filter((c) => c !== "numbers"), count)
    : null;
  // Each slot in precedence order: your swap, then Plan B's substitute, then
  // the plan. Attached extras from your library follow the three slots.
  const slots = data ? displaySlots(data, blockWeek, w.activities, planB) : w.activities.map((a, i) => ({ i, activity: a }));
  const extras = data && !isOwn ? activitiesForSlot(data, skillId, session, []) : [];
  const overriddenSlots = slots.filter((v) => v.overridden).map((v) => v.i);

  // Debrief recall: the note left the previous time this skill was coached.
  const lastTime = data && data.plan && !isOwn
    ? data.plan
        .map((slot, i) => {
          const week = i + 1;
          if (week === blockWeek) return null;
          const past = wState(data, week);
          if (!past.done || !past.reflection || !past.reflection.trim()) return null;
          return resolveWeek(data, slot).skillId === skillId
            ? { week, text: past.reflection.trim() }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.week - a.week)[0]
    : null;
  return (
    <div className="space-y-4">
      <button onClick={back} className="text-sm font-semibold" style={{ color: C.grass }}>← Back to block</button>

      <Card className="pitch-hero rr-rise">
        <div className="p-5 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>
            {skill.emoji} {skill.label} · Week {blockWeek} of 6
          </div>
          {!isOwn && <div className="text-sm opacity-80 mt-1">{PHASES[session - 1]}</div>}
          <h2 className="font-display text-3xl font-extrabold mt-1">{w.title}</h2>
          <p className="text-sm opacity-90 mt-2">{w.objective}</p>
        </div>
      </Card>

      {data && setAttendance && (
        <Register data={data} week={blockWeek} setAttendance={setAttendance} toggleAttendance={toggleAttendance} />
      )}

      {data && recordObservation && (
        <SessionObservations data={data} week={blockWeek} recordObservation={recordObservation} />
      )}


      {skill.ageNote && (
        <Card style={{ background: C.grassSoft, borderColor: C.grassSoft }}><div className="p-3 text-sm" style={{ color: C.pine }}>
          <b>{skill.label}:</b> {skill.ageNote}
        </div></Card>
      )}

      {w.coachingPoints && w.coachingPoints.length > 0 && (
      <Card><div className="p-4">
        <Label>Coaching focus</Label>
        <ul className="mt-2 space-y-1.5">
          {w.coachingPoints.map((o, i) => (
            <li key={i} className="text-sm flex gap-2"><span style={{ color: C.gold }}>›</span>{o}</li>
          ))}
        </ul>
      </div></Card>
      )}

      <Card><div className="p-4">
        <Label>Session shape</Label>
        <div className="flex gap-1.5 mt-2">
          {[["Warm-up", "Get moving"], ["Skill Zone", "Sharpen it"], ["Game Zone", "Use it"]].map(([t, s], i) => (
            <div key={t} className="flex-1 rounded-xl p-2.5 text-center"
              style={{ background: i === 2 ? C.goldSoft : C.grassSoft,
                       border: `1px solid ${i === 2 ? C.gold : C.grassSoft}` }}>
              <div className="font-extrabold" style={{ fontSize: 11, lineHeight: "14px", color: i === 2 ? "#7a4f00" : C.pine }}>{t}</div>
              <div className="mt-0.5" style={{ fontSize: 10, lineHeight: "13px", color: C.mute }}>{s}</div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: C.mute }}>
          Every session now finishes in the Game Zone. The skill practice earns its place by
          making the game better — so if you're short of time, cut the practice, not the game.
        </p>
      </div></Card>

      {data && !isOwn && setPlanB && (
        <PlanBCard skill={skill} count={count} conds={planBConds}
          setConds={(c) => setPlanB(blockWeek, c)} plan={planB}
          overriddenSlots={overriddenSlots} />
      )}

      {lastTime && (
        <Card style={{ background: C.grassSoft, borderColor: C.grassSoft }}><div className="p-4">
          <Label>Last time on {skill.label} — week {lastTime.week}</Label>
          <p className="text-sm mt-1" style={{ color: C.pine }}>“{lastTime.text}”</p>
        </div></Card>
      )}

      <Label className="px-1">Activities</Label>
      {slots.map((v) => {
        const s = !v.overridden && v.planBSlot && !v.planBSlot.keep && v.planBSlot.replacement ? v.planBSlot : null;
        return (
          <div key={v.i}>
            {data && setWeekSlot && (
              <SlotSwap data={data} slotIndex={v.i} slotLabel={SLOT_LABELS[v.i]}
                skillId={skillId} session={session} isOwn={isOwn}
                current={v.ref || null}
                setRef={(ref) => setWeekSlot(blockWeek, v.i, ref)} />
            )}
            {s && (
              <div className="rounded-xl px-3 py-2 mb-1 text-xs font-bold"
                style={{ background: C.goldSoft, color: "#7a4f00" }}>
                Plan B swap · runs instead of “{s.original.name}” · borrowed from week {s.fromWeek}
              </div>
            )}
            {v.course ? (
              <Card style={{ borderColor: C.grass, borderWidth: 2 }}><div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold">{v.course.name || "Untitled course"}</div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: C.grassSoft, color: C.pine }}>🏟 Skills course</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: C.mute }}>
                  {v.course.size[0]}m × {v.course.size[1]}m{kitSummary(v.course) ? ` · ${kitSummary(v.course)}` : ""}
                </div>
                <CourseDiagram course={v.course} />
                {v.course.notes && (
                  <div className="rounded-xl p-2.5 mt-2" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
                    <Label>How it runs</Label>
                    <p className="text-sm mt-1">{v.course.notes}</p>
                  </div>
                )}
              </div></Card>
            ) : (
              <ActivityCard a={v.activity} count={count} />
            )}
          </div>
        );
      })}
      {extras.map((a, i) => <ActivityCard key={a.id || "x" + i} a={a} count={count} />)}

      {data && attachCourse && (
        <WeekCourses data={data} week={blockWeek}
          attachCourse={attachCourse} detachCourse={detachCourse} />
      )}

      <Card style={{ background: "#FFF7F2", borderColor: "#FBE0D3" }}><div className="p-4">
        <Label>Safety checks</Label>
        <ul className="mt-2 space-y-1.5">
          {w.safety.map((s, i) => (
            <li key={i} className="text-sm flex gap-2"><span>⚠️</span>{s}</li>
          ))}
        </ul>
      </div></Card>

      <Card><div className="p-4">
        <Label>How did tonight go?</Label>
        <p className="text-xs mt-1 mb-2" style={{ color: C.mute }}>
          What worked? What would you change? One line is plenty — it reappears
          the next time you coach {skill.label.toLowerCase()}.
        </p>
        <textarea rows={3} value={st.reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Jot a quick note after the session…"
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          style={{ background: C.paper, border: `1px solid ${C.line}` }} />
      </div></Card>

      <button onClick={toggleDone} className="w-full rounded-xl py-3 font-bold"
        style={{ background: st.done ? C.grassSoft : C.grass, color: st.done ? C.pine : "#fff" }}>
        {st.done ? "✓ Session delivered — tap to undo" : "Mark session as delivered"}
      </button>

      <button onClick={() => {
          const slotCourses = slots.filter((v) => v.course).map((v) => v.course);
          const slotIds = slotCourses.map((c) => c.id);
          const added = ((data && data.weekCourses && data.weekCourses[blockWeek]) || [])
            .filter((id) => !slotIds.includes(id))
            .map((id) => (data.courses || []).find((c) => c.id === id))
            .filter(Boolean);
          printSession(blockWeek,
            { ...r, w: { ...w, activities: printableActivities(slots, extras) } },
            players, [...slotCourses, ...added]);
        }}
        className="w-full rounded-xl py-3 font-bold flex items-center justify-center gap-2"
        style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}>
        🖨️ Print this session (Save as PDF)
      </button>
      <p className="text-xs text-center" style={{ color: C.mute }}>
        Prints a pocket-size card plus a player register. Choose “Save as PDF” in the print box.
      </p>
      {data && saveCustom && !isOwn && (
        <MyActivities data={data} slotKey={slotKey}
          onSave={saveCustom} onDelete={deleteCustom}
          onAttach={(id) => attachCustom(slotKey, id)}
          onDetach={(id) => detachCustom(slotKey, id)} />
      )}


    </div>
  );
}
