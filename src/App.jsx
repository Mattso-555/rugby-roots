// The app shell: loads saved data, holds the current tab, saves on every change.

import React, { useState, useEffect, useRef } from "react";
import { C } from "./data/constants.js";
import { SKILLS } from "./data/index.js";
import { loadData, saveData, onRemoteChange, onSyncStatus, startSyncLoop } from "./lib/storage.js";
import { cloudEnabled, getSession, onAuthChange } from "./lib/supabaseClient.js";
import { readPlanFromUrl } from "./lib/share.js";
import { buildSingle, wState, planBreachesAge } from "./lib/helpers.js";
import { isSkillAllowed } from "./data/ageGrades.js";
import { Icon } from "./components/ui.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Sessions from "./components/Sessions.jsx";
import Players from "./components/Players.jsx";
import Journey from "./components/Journey.jsx";
import Library from "./components/Library.jsx";
import Welcome from "./components/Welcome.jsx";
import Home from "./components/Home.jsx";
import ParentView from "./components/ParentView.jsx";
import SignIn from "./components/SignIn.jsx";
import ParentPortal from "./components/ParentPortal.jsx";

// A parent opening their child's private link goes straight to the portal —
// no coach data ever loads on their device.
const PARENT_TOKEN = new URLSearchParams(window.location.search).get("parent");

export default function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("today");
  const [mode, setMode] = useState("coach");
  const [openWeek, setOpenWeek] = useState(null);
  const [home, setHome] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(null);
  const [parentChild, setParentChild] = useState(null);
  const firstLoad = useRef(true);
  const cloud = cloudEnabled();
  // "off" (local mode) | "checking" | "out" | "in"
  const [auth, setAuth] = useState(cloud ? "checking" : "off");
  const [syncStatus, setSyncStatus] = useState(cloud ? "offline" : "local");
  const [syncDetail, setSyncDetail] = useState(null);
  const loadedOnce = useRef(false);

  // Shared mode: find out whether this coach is signed in.
  useEffect(() => {
    if (!cloud || PARENT_TOKEN) return;
    let un;
    (async () => {
      setAuth((await getSession()) ? "in" : "out");
      un = onAuthChange((s) => setAuth(s ? "in" : "out"));
    })();
    return () => un && un();
  }, [cloud]);

  useEffect(() => {
    if (PARENT_TOKEN) return;                 // parents never load coach data
    if (cloud && auth !== "in") return;       // shared mode waits for sign-in
    if (loadedOnce.current) return;
    loadedOnce.current = true;
    onSyncStatus((s, detail) => { setSyncStatus(s); setSyncDetail(detail || null); });
    // Another coach's changes, already merged with this phone's copy.
    onRemoteChange((merged) => setData(merged));
    const stopSync = startSyncLoop();
    window.addEventListener("beforeunload", stopSync);
    (async () => {
      const saved = await loadData();
      const base = { team:{ name:"My Squad", ageGrade:null }, players:[], plan:null, planName:null, progress:{}, attendance:{}, planB:{}, customActivities:[], customSessions:[], courses:[], weekCourses:{}, weekEdits:{}, extras:{} };
      let d = saved ? { ...base, ...saved, players: saved.players || [] } : base;
      // migrate old single-skill saves (focusSkill + progress[skill][week])
      if (!d.plan && saved && saved.focusSkill && SKILLS[saved.focusSkill]) {
        d.plan = buildSingle(saved.focusSkill);
        d.planName = `${SKILLS[saved.focusSkill].label} block`;
        const old = (saved.progress && saved.progress[saved.focusSkill]) || {};
        const flat = {}; Object.keys(old).forEach((k) => { flat[k] = old[k]; });
        d.progress = flat;
      }
      if (!d.team) d.team = { name:"My Squad", ageGrade:null };
      if (!d.attendance || Array.isArray(d.attendance)) d.attendance = {};
      if (!d.planB || Array.isArray(d.planB)) d.planB = {};
      if (!Array.isArray(d.customActivities)) d.customActivities = [];
      if (!Array.isArray(d.customSessions)) d.customSessions = [];
      if (!Array.isArray(d.courses)) d.courses = [];
      if (!d.weekCourses || Array.isArray(d.weekCourses)) d.weekCourses = {};
      if (!d.weekEdits || Array.isArray(d.weekEdits)) d.weekEdits = {};
      if (!d.extras || Array.isArray(d.extras)) d.extras = {};
      if (!Array.isArray(d.plan)) d.plan = null;
      if (!d.progress || Array.isArray(d.progress)) d.progress = {};
      delete d.focusSkill;

      // Did another coach send us a block? If so, check it suits our age
      // group before offering it — a shared link must not smuggle in contact.
      const shared = readPlanFromUrl();
      if (shared && planBreachesAge(shared.plan, d.team.ageGrade)) {
        window.alert(
          "That shared block includes contact sessions, which aren't permitted " +
          "for your age group. It hasn't been loaded."
        );
      } else if (shared) {
        const replacing = d.plan && d.plan.length;
        const ok = !replacing || window.confirm(
          "A coach has shared a six-week block with you.\n\n" +
          "Load it? This replaces your current block. Your squad, register " +
          "and notes are not affected."
        );
        if (ok) {
          d.plan = shared.plan;
          d.planName = shared.name || "Shared block";
          d.progress = {};
          // Save straight away, otherwise the shared block is lost if the
          // coach closes the app without changing anything else.
          saveData(d);
        }
      }

      setData(d);
      setTab(d.players.length ? "today" : "players");
    })();
  }, [cloud, auth]);

  useEffect(() => {
    if (!data) return;
    if (firstLoad.current) { firstLoad.current = false; return; }
    saveData(data);
  }, [data]);

  if (PARENT_TOKEN) {
    return <ParentPortal token={PARENT_TOKEN} />;
  }
  if (cloud && auth === "checking") {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: C.paper }}>
      <div style={{ color: C.mute }}>Signing in…</div>
    </div>;
  }
  if (cloud && auth === "out") {
    return <SignIn />;
  }
  if (!data) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: C.paper }}>
      <div style={{ color: C.mute }}>Loading…</div>
    </div>;
  }

  const setAgeGrade = (id) => {
    // Changing to a non-contact age grade must also strip any contact
    // sessions already sitting in the plan.
    const team = { ...(data.team || {}), ageGrade: id };
    const plan = data.plan || [];
    const breaches = plan.some((s) => !isSkillAllowed(s.skill, id));
    if (breaches) {
      const ok = window.confirm(
        "Your current block contains contact sessions, which aren't permitted " +
        "for this age group.\n\nChange the age grade and clear the block?"
      );
      if (!ok) return;
      setData({ ...data, team, plan: null, planName: null, progress: {} });
      return;
    }
    setData({ ...data, team });
  };

  // Functional updates: a coach tapping quickly down a list of names must not
  // lose a tap because two handlers read the same stale state.
  const setAttendance = (week, marks) =>
    setData((prev) => ({ ...prev, attendance: { ...(prev.attendance || {}), [week]: marks } }));

  const toggleAttendance = (week, id) =>
    setData((prev) => {
      const forWeek = (prev.attendance && prev.attendance[week]) || {};
      const next = { ...forWeek, [id]: forWeek[id] === true ? false : true };
      return { ...prev, attendance: { ...(prev.attendance || {}), [week]: next } };
    });

  // Plan B for a week: the conditions the coach ticked ("wet", "singleCoach",
  // "indoor", "numbers"), or nothing when the night goes back to plan. Kept
  // per week — like attendance — so it survives closing the session, travels
  // in backups, and moves with the week if the block is rearranged.
  const setPlanB = (week, conds) =>
    setData((prev) => {
      const next = { ...(prev.planB || {}) };
      if (conds && conds.length) next[week] = conds;
      else delete next[week];
      return { ...prev, planB: next };
    });

  const saveCustom = (a) =>
    setData((prev) => {
      const lib = prev.customActivities || [];
      const i = lib.findIndex((x) => x.id === a.id);
      const next = i >= 0 ? lib.map((x) => (x.id === a.id ? a : x)) : [...lib, a];
      return { ...prev, customActivities: next };
    });

  const deleteCustom = (id) =>
    setData((prev) => {
      const extras = { ...(prev.extras || {}) };
      Object.keys(extras).forEach((k) => { extras[k] = extras[k].filter((x) => x !== id); });
      const weekEdits = stripRefs(prev.weekEdits, (ref) => ref.kind === "custom" && ref.id === id);
      return { ...prev, customActivities: (prev.customActivities || []).filter((a) => a.id !== id), extras, weekEdits };
    });

  const attachCustom = (slotKey, id) =>
    setData((prev) => {
      const cur = (prev.extras && prev.extras[slotKey]) || [];
      if (cur.includes(id)) return prev;
      return { ...prev, extras: { ...(prev.extras || {}), [slotKey]: [...cur, id] } };
    });

  const detachCustom = (slotKey, id) =>
    setData((prev) => {
      const cur = (prev.extras && prev.extras[slotKey]) || [];
      return { ...prev, extras: { ...(prev.extras || {}), [slotKey]: cur.filter((x) => x !== id) } };
    });

  const saveSession = (sess) =>
    setData((prev) => {
      const list = prev.customSessions || [];
      const i = list.findIndex((x) => x.id === sess.id);
      const next = i >= 0 ? list.map((x) => (x.id === sess.id ? sess : x)) : [...list, sess];
      return { ...prev, customSessions: next };
    });

  const deleteSession = (id) =>
    setData((prev) => {
      // any week using this session falls back to a safe built-in
      const plan = prev.plan
        ? prev.plan.map((s) => (s.ownSession === id ? { skill: "passing", session: 1 } : s))
        : prev.plan;
      return { ...prev, customSessions: (prev.customSessions || []).filter((s) => s.id !== id), plan };
    });

  // Skills courses live in the Library, independent of the block: saved on
  // this device, carried in backups with everything else.
  const saveCourse = (course) =>
    setData((prev) => {
      const list = prev.courses || [];
      const i = list.findIndex((x) => x.id === course.id);
      const next = i >= 0 ? list.map((x) => (x.id === course.id ? course : x)) : [...list, course];
      return { ...prev, courses: next };
    });

  const deleteCourse = (id) =>
    setData((prev) => {
      // a deleted course also comes off any weeks it was added to
      const wc = {};
      Object.entries(prev.weekCourses || {}).forEach(([wk, ids]) => {
        const left = ids.filter((x) => x !== id);
        if (left.length) wc[wk] = left;
      });
      const weekEdits = stripRefs(prev.weekEdits, (ref) => ref.kind === "course" && ref.id === id);
      return { ...prev, courses: (prev.courses || []).filter((c) => c.id !== id), weekCourses: wc, weekEdits };
    });

  // Remove any slot overrides matching a predicate — used when the thing a
  // slot points at is deleted from the library.
  const stripRefs = (weekEdits, gone) => {
    const next = {};
    Object.entries(weekEdits || {}).forEach(([wk, slots]) => {
      const kept = {};
      Object.entries(slots).forEach(([i, ref]) => { if (!gone(ref)) kept[i] = ref; });
      if (Object.keys(kept).length) next[wk] = kept;
    });
    return next;
  };

  // Swap one slot of one week (0 warm-up, 1 skill, 2 game) for something of
  // your own — or back to the plan with ref = null. Keyed by week number, so
  // it travels with the week when the block is rearranged.
  const setWeekSlot = (week, slotIndex, ref) =>
    setData((prev) => {
      const forWeek = { ...((prev.weekEdits || {})[week] || {}) };
      if (ref) forWeek[slotIndex] = ref;
      else delete forWeek[slotIndex];
      const weekEdits = { ...(prev.weekEdits || {}) };
      if (Object.keys(forWeek).length) weekEdits[week] = forWeek;
      else delete weekEdits[week];
      return { ...prev, weekEdits };
    });

  // Courses on a week's plan — keyed by week number so they work on any week
  // (built-in or your own session) and travel with the week when it moves.
  const attachCourseToWeek = (week, id) =>
    setData((prev) => {
      const cur = (prev.weekCourses && prev.weekCourses[week]) || [];
      if (cur.includes(id)) return prev;
      return { ...prev, weekCourses: { ...(prev.weekCourses || {}), [week]: [...cur, id] } };
    });

  const detachCourseFromWeek = (week, id) =>
    setData((prev) => {
      const cur = (prev.weekCourses && prev.weekCourses[week]) || [];
      const left = cur.filter((x) => x !== id);
      const wc = { ...(prev.weekCourses || {}) };
      if (left.length) wc[week] = left; else delete wc[week];
      return { ...prev, weekCourses: wc };
    });

  const setPlan = (slots, name) => setData({ ...data, plan: slots, planName: name });

  // Loading a block from the Today tab: set it AND jump to Sessions so the
  // coach sees it (setPlan alone left them on Today with no visible change),
  // and confirm before replacing a block that already exists.
  const loadPlanFromToday = (slots, name) => {
    if (data.plan && data.plan.length &&
        !window.confirm("Load this block? It replaces your current six weeks. Your squad, register and notes are kept.")) {
      return;
    }
    setPlan(slots, name);
    setOpenWeek(null);
    setTab("sessions");
  };
  const setSlot = (week, slot) => {
    const next = (data.plan || []).slice(); next[week - 1] = slot;
    setData({ ...data, plan: next, planName: "Custom block" });
  };
  // Move a week earlier or later. Progress and attendance are keyed by week
  // number, so they must travel with the week when it moves.
  const setOwnWeek = (week, sessionId) => {
    const next = (data.plan || []).slice(); next[week - 1] = { ownSession: sessionId };
    setData({ ...data, plan: next, planName: "Custom block" });
  };

  // A session observation: a short note, optionally nudging one skill level.
  // Everything is stamped with the date so the app can tell a coach when they
  // last saw a player, without keeping a full history.
  const recordObservation = (playerId, { note, homeNote, skillKey, level, week }) =>
    setData((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        const today = new Date().toLocaleDateString();
        const next = { ...p, lastNoted: today };
        if (note && note.trim()) {
          next.notes = [{ text: note.trim(), date: today, week }, ...(p.notes || [])];
        }
        if (homeNote && homeNote.trim()) {
          // Published for the parent to see — written deliberately, never
          // copied from the coach's private note.
          next.homeNotes = [{ text: homeNote.trim(), date: today, week }, ...(p.homeNotes || [])];
        }
        if (skillKey && level) {
          next.skills = { ...(p.skills || {}), [skillKey]: level };
          next.skillDates = { ...(p.skillDates || {}), [skillKey]: today };
        }
        return next;
      }),
    }));
  const moveWeek = (week, dir) => {
    const plan = (data.plan || []).slice();
    const from = week - 1, to = from + dir;
    if (to < 0 || to >= plan.length) return;
    [plan[from], plan[to]] = [plan[to], plan[from]];
    const swapKeys = (obj) => {
      const o = { ...(obj || {}) };
      const a = o[week], b = o[week + dir];
      if (a === undefined) delete o[week + dir]; else o[week + dir] = a;
      if (b === undefined) delete o[week]; else o[week] = b;
      return o;
    };
    setData({
      ...data, plan, planName: "Custom block",
      progress: swapKeys(data.progress),
      attendance: swapKeys(data.attendance),
      planB: swapKeys(data.planB),
      weekCourses: swapKeys(data.weekCourses),
      weekEdits: swapKeys(data.weekEdits),
    });
  };
  const toggleDone = (week) => {
    const cur = wState(data, week);
    setData({ ...data, progress: { ...data.progress, [week]: { ...cur, done: !cur.done } } });
  };
  const setReflection = (week, text) => {
    const cur = wState(data, week);
    setData({ ...data, progress: { ...data.progress, [week]: { ...cur, reflection: text } } });
  };

  // First run: the age grade drives safety, so it's decided before anything else.
  if (data && (!data.team || !data.team.ageGrade)) {
    return <Welcome onStart={(id) => setData({ ...data, team: { ...(data.team || {}), ageGrade: id } })} />;
  }

  return (
    <div className="rr-app min-h-screen pb-24" style={{ background: C.paper, color: C.ink }}>
      <header className="pitch-hero sticky top-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{ color: "#fff", borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
        <button onClick={() => setHome(true)} aria-label="Home and settings"
          className="flex items-center gap-2.5 text-left" style={{ color: "#fff" }}>
          <span className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: "#fff", padding: 3 }}>
            <img src="/crest.png" alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
          </span>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-xl" style={{ letterSpacing: "-.02em" }}>Glasgow Accies RFC</div>
            <div className="text-[11px] uppercase tracking-wide opacity-75" style={{ letterSpacing: ".08em" }}>Player development companion</div>
          </div>
        </button>
        <button onClick={() => setMode(mode === "coach" ? "parent" : "coach")}
          className="text-xs font-semibold rounded-full px-3 py-2"
          style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}>
          {mode === "coach" ? "Parent view" : "Coach view"}
        </button>
      </header>

      {home && (
        <Home data={data} ageGrade={data.team && data.team.ageGrade} setAgeGrade={setAgeGrade}
          syncStatus={syncStatus} syncDetail={syncDetail}
          onRestore={(restored) => { firstLoad.current = false; setData(restored); setHome(false); }}
          goTab={(t) => { setOpenWeek(null); setTab(t); }} onClose={() => setHome(false)} />
      )}

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {mode === "parent" ? (
          <ParentView data={data} child={parentChild} setChild={setParentChild} />
        ) : (
          <>
            {tab === "today" && (
              <Dashboard data={data}
                goSetup={() => { setOpenWeek(null); setTab("sessions"); }}
                goPlayers={() => setTab("players")}
                loadPlan={loadPlanFromToday}
                ageGrade={data.team && data.team.ageGrade}
                openWeekFn={(n) => { setOpenWeek(n); setTab("sessions"); }} />
            )}
            {tab === "sessions" && (
              <Sessions data={data} setPlan={setPlan} setSlot={setSlot} moveWeek={moveWeek} setOwnWeek={setOwnWeek} recordObservation={recordObservation} setAttendance={setAttendance} toggleAttendance={toggleAttendance}
                saveCustom={saveCustom} deleteCustom={deleteCustom}
                attachCustom={attachCustom} detachCustom={detachCustom}
                ageGrade={data.team && data.team.ageGrade}
                openWeek={openWeek} setOpenWeek={setOpenWeek}
                toggleDone={toggleDone} setReflection={setReflection} setPlanB={setPlanB}
                attachCourse={attachCourseToWeek} detachCourse={detachCourseFromWeek} setWeekSlot={setWeekSlot} />
            )}
            {tab === "players" && (
              <Players data={data}
                openPlayer={openPlayer} setOpenPlayer={setOpenPlayer}
                updatePlayer={(id, patch) => setData({ ...data,
                  players: data.players.map((p) => (p.id === id ? { ...p, ...patch } : p)) })}
                addPlayer={(p) => setData({ ...data, players: [...data.players, p] })} />
            )}
            {tab === "journey" && <Journey data={data} />}
            {tab === "library" && (
              <Library data={data}
                saveCustom={saveCustom} deleteCustom={deleteCustom}
                saveSession={saveSession} deleteSession={deleteSession}
                saveCourse={saveCourse} deleteCourse={deleteCourse} />
            )}
          </>
        )}
      </main>

      {mode === "coach" && (
        <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-5"
          style={{ background: C.card, borderTop: `1px solid ${C.line}`, boxShadow: "0 -6px 24px -16px rgba(16,53,43,.3)" }}>
          {[["today","Today"],["sessions","Sessions"],["library","Library"],["players","Players"],
            ["journey","Journey"]].map(([id, label]) => {
            const on = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} className="rr-nav-btn"
                style={{ color: on ? C.grass : C.mute }} aria-current={on ? "page" : undefined}>
                <span className="rr-nav-top" style={{ background: on ? C.gold : "transparent" }} />
                <span className="rr-nav-ico" style={{ background: on ? C.grassSoft : "transparent" }}>
                  <Icon name={id} size={20} />
                </span>
                <span className="text-[11px] font-semibold">{label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
