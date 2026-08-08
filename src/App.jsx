// The app shell: loads saved data, holds the current tab, saves on every change.

import React, { useState, useEffect, useRef } from "react";
import { C } from "./data/constants.js";
import { SKILLS } from "./data/index.js";
import { loadData, saveData } from "./lib/storage.js";
import { readPlanFromUrl } from "./lib/share.js";
import { buildSingle, resolveSlot } from "./lib/helpers.js";
import { Icon } from "./components/ui.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Sessions from "./components/Sessions.jsx";
import Players from "./components/Players.jsx";
import Journey from "./components/Journey.jsx";
import ParentView from "./components/ParentView.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("today");
  const [mode, setMode] = useState("coach");
  const [openWeek, setOpenWeek] = useState(null);
  const [openPlayer, setOpenPlayer] = useState(null);
  const [parentChild, setParentChild] = useState(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    (async () => {
      const saved = await loadData();
      const base = { team:{ name:"My Squad" }, players:[], plan:null, planName:null, progress:{} };
      let d = saved ? { ...base, ...saved, players: saved.players || [] } : base;
      // migrate old single-skill saves (focusSkill + progress[skill][week])
      if (!d.plan && saved && saved.focusSkill && SKILLS[saved.focusSkill]) {
        d.plan = buildSingle(saved.focusSkill);
        d.planName = `${SKILLS[saved.focusSkill].label} block`;
        const old = (saved.progress && saved.progress[saved.focusSkill]) || {};
        const flat = {}; Object.keys(old).forEach((k) => { flat[k] = old[k]; });
        d.progress = flat;
      }
      if (!Array.isArray(d.plan)) d.plan = null;
      if (!d.progress || Array.isArray(d.progress)) d.progress = {};
      delete d.focusSkill;

      // Did another coach send us a block? If so, load it.
      const shared = readPlanFromUrl();
      if (shared) {
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
  }, []);

  useEffect(() => {
    if (!data) return;
    if (firstLoad.current) { firstLoad.current = false; return; }
    saveData(data);
  }, [data]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: C.paper }}>
      <div style={{ color: C.mute }}>Loading…</div>
    </div>;
  }

  const setPlan = (slots, name) => setData({ ...data, plan: slots, planName: name });
  const setSlot = (week, slot) => {
    const next = (data.plan || []).slice(); next[week - 1] = slot;
    setData({ ...data, plan: next, planName: "Custom block" });
  };
  const toggleDone = (week) => {
    const cur = wState(data, week);
    setData({ ...data, progress: { ...data.progress, [week]: { ...cur, done: !cur.done } } });
  };
  const setReflection = (week, text) => {
    const cur = wState(data, week);
    setData({ ...data, progress: { ...data.progress, [week]: { ...cur, reflection: text } } });
  };

  return (
    <div className="rr-app min-h-screen pb-24" style={{ background: C.paper, color: C.ink }}>
      <header className="pitch-hero sticky top-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{ color: "#fff", borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center rounded-xl"
            style={{ width: 34, height: 34, background: "rgba(255,255,255,0.12)", fontSize: 18 }}>🌱</span>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-xl" style={{ letterSpacing: "-.02em" }}>Rugby Roots</div>
            <div className="text-[11px] uppercase tracking-wide opacity-75" style={{ letterSpacing: ".08em" }}>Player development companion</div>
          </div>
        </div>
        <button onClick={() => setMode(mode === "coach" ? "parent" : "coach")}
          className="text-xs font-semibold rounded-full px-3 py-2"
          style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}>
          {mode === "coach" ? "Parent view" : "Coach view"}
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {mode === "parent" ? (
          <ParentView data={data} child={parentChild} setChild={setParentChild} />
        ) : (
          <>
            {tab === "today" && (
              <Dashboard data={data}
                goSetup={() => { setOpenWeek(null); setTab("sessions"); }}
                goPlayers={() => setTab("players")}
                setPlan={setPlan}
                onRestore={(restored) => { firstLoad.current = false; setData(restored); }}
                openWeekFn={(n) => { setOpenWeek(n); setTab("sessions"); }} />
            )}
            {tab === "sessions" && (
              <Sessions data={data} setPlan={setPlan} setSlot={setSlot}
                openWeek={openWeek} setOpenWeek={setOpenWeek}
                toggleDone={toggleDone} setReflection={setReflection} />
            )}
            {tab === "players" && (
              <Players data={data}
                openPlayer={openPlayer} setOpenPlayer={setOpenPlayer}
                updatePlayer={(id, patch) => setData({ ...data,
                  players: data.players.map((p) => (p.id === id ? { ...p, ...patch } : p)) })}
                addPlayer={(p) => setData({ ...data, players: [...data.players, p] })} />
            )}
            {tab === "journey" && <Journey data={data} />}
          </>
        )}
      </main>

      {mode === "coach" && (
        <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-4"
          style={{ background: C.card, borderTop: `1px solid ${C.line}`, boxShadow: "0 -6px 24px -16px rgba(16,53,43,.3)" }}>
          {[["today","Today"],["sessions","Sessions"],["players","Players"],
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
