// What a parent sees when they open their child's private link. The link's
// token fetches ONE child's published view from the shared store: name,
// awards, values, the coach's "for home" tips, and the block so this week's
// focus can be shown. Coach notes, the register and every other child are
// never sent to this page — the database function enforces it, not the UI.

import React, { useEffect, useState } from "react";
import { C, AWARDS } from "../data/constants.js";
import { SKILLS, PHASES } from "../data/index.js";
import { Card, Label, Pill } from "./ui.jsx";
import WhatToBring from "./WhatToBring.jsx";
import { supabase } from "../lib/supabaseClient.js";

export default function ParentPortal({ token }) {
  const [state, setState] = useState({ loading: true, view: null, error: null });

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase().rpc("get_parent_view", { p_token: token });
        if (error) throw error;
        setState({ loading: false, view: data, error: null });
      } catch (e) {
        setState({ loading: false, view: null, error: e.message || "Couldn't load." });
      }
    })();
  }, [token]);

  if (state.loading) {
    return <Shell><p className="text-sm text-center" style={{ color: C.mute }}>Loading…</p></Shell>;
  }

  if (!state.view) {
    return (
      <Shell>
        <Card><div className="p-5 text-center">
          <div style={{ fontSize: 30 }}>🔗</div>
          <div className="font-bold mt-2">This link isn't active</div>
          <p className="text-sm mt-1" style={{ color: C.mute }}>
            It may have been replaced with a new one, or typed incorrectly.
            Ask your child's coach to send the current link.
          </p>
        </div></Card>
      </Shell>
    );
  }

  const v = state.view;
  const slots = (v.plan && v.plan.slots) || null;
  // this week = first week not marked delivered
  let focus = null;
  if (slots && slots.length) {
    let idx = slots.findIndex((_, i) => !(v.done && v.done[i + 1] === true));
    if (idx === -1) idx = slots.length - 1;
    const slot = slots[idx];
    const skill = slot && slot.skill ? SKILLS[slot.skill] : null;
    if (skill) {
      const w = skill.weeks[slot.session - 1];
      focus = { week: idx + 1, skill, phase: PHASES[slot.session - 1], w };
    }
  }

  return (
    <Shell>
      <div className="text-sm font-bold" style={{ color: C.mute }}>{v.name}'s rugby</div>

      {focus && (
        <Card className="pitch-hero rr-rise"><div className="p-5 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80" style={{ letterSpacing: ".08em" }}>
            This week's focus · week {focus.week} of {slots.length}
          </div>
          <h2 className="font-display text-2xl font-extrabold mt-1">
            {focus.skill.emoji} {focus.skill.label}
          </h2>
          <p className="text-sm opacity-90 mt-1">{focus.w.title}</p>
        </div></Card>
      )}

      {focus && (
        <Card><div className="p-4">
          <Label>What they'll be working on</Label>
          <p className="text-sm mt-1.5" style={{ color: C.ink }}>{focus.w.objective}</p>
          <p className="text-xs mt-2" style={{ color: C.mute }}>
            Every session is built around fun and confidence, and always finishes
            with a game. Ask them afterwards what they tried — not whether they won.
          </p>
        </div></Card>
      )}

      <WhatToBring team={{ bring: v.bring, whatToBring: v.whatToBring }} />

      <Card><div className="p-4">
        <Label>What to practise at home</Label>
        {(v.homeNotes || []).length === 0 ? (
          <p className="text-sm mt-2" style={{ color: C.mute }}>
            Tips from the coaches will appear here as the season goes on.
          </p>
        ) : (
          <div className="mt-2 space-y-2">
            {v.homeNotes.map((n, i) => (
              <div key={i} className="text-sm rounded-xl p-2.5" style={{ background: C.grassSoft }}>
                <div style={{ color: C.pine }}>{n.text}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.mute }}>{n.date}{n.week ? ` · week ${n.week}` : ""}</div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs mt-3" style={{ color: C.mute }}>
          Little and often beats long and rare — five minutes in the garden counts.
          Cheer effort, not just tries.
        </p>
      </div></Card>

      <Card><div className="p-4">
        <Label>Achievements</Label>
        {(v.awards || []).length === 0 && (v.values || []).length === 0 ? (
          <p className="text-sm mt-2" style={{ color: C.mute }}>Achievements appear here as they're earned.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mt-2">
              {(v.awards || []).map((id) => {
                const a = AWARDS.find((x) => x.id === id);
                return a ? (
                  <span key={id} className="rounded-xl px-3 py-2 text-sm font-semibold flex items-center gap-1.5"
                    style={{ background: C.goldSoft, color: "#8a5a00" }}>
                    <span style={{ fontSize: 18 }}>{a.emoji}</span>{a.label}
                  </span>
                ) : null;
              })}
            </div>
            {(v.values || []).length > 0 && (
              <>
                <Label className="mt-4">Rugby values shown</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {v.values.map((x) => <Pill key={x} bg={C.grassSoft} fg={C.pine}>{x}</Pill>)}
                </div>
              </>
            )}
          </>
        )}
      </div></Card>

      <p className="text-xs text-center pb-6" style={{ color: C.mute }}>
        This private page shows only {v.name}. Keep the link to yourself —
        the coach can replace it at any time.
      </p>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen" style={{ background: C.paper, color: C.ink }}>
      <header className="pitch-hero px-4 py-3 flex items-center gap-2.5" style={{ color: "#fff" }}>
        <span className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "#fff", padding: 3 }}>
          <img src="/crest.png" alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
        </span>
        <div className="leading-tight">
          <div className="font-display font-extrabold text-xl" style={{ letterSpacing: "-.02em" }}>Glasgow Accies RFC</div>
          <div className="text-[11px] uppercase tracking-wide opacity-75" style={{ letterSpacing: ".08em" }}>Parent view</div>
        </div>
      </header>
      <main className="max-w-xl mx-auto px-4 pt-4 space-y-4">{children}</main>
    </div>
  );
}
