import React from "react";
import { C, AWARDS } from "../data/constants.js";
import { PHASES } from "../data/index.js";
import { resolveWeek, wState, doneCount } from "../lib/helpers.js";
import { Card, Label, SectionTitle, Pill, MiniStat } from "./ui.jsx";

export default function Journey({ data }) {
  const plan = data.plan;
  const done = doneCount(data);
  const totalBadges = data.players.reduce((s, p) => s + p.awards.length, 0);
  const totalValues = data.players.reduce((s, p) => s + p.values.length, 0);

  return (
    <div className="space-y-4">
      <SectionTitle>Season Journey</SectionTitle>
      {!plan ? (
        <Card><div className="p-6 text-center">
          <div style={{ fontSize: 30 }}>🗺️</div>
          <p className="text-sm mt-2" style={{ color: C.mute }}>
            Build a six-week block on the Sessions tab and your trail across the pitch appears here.
          </p>
        </div></Card>
      ) : (
        <>
          <p className="text-sm" style={{ color: C.mute }}>
            Your <b>{data.planName || "six-week"}</b> trail across the pitch. Each stone lights up as you deliver it.
          </p>
          <Card><div className="p-5">
            <div>
              {plan.map((slot, i) => {
                const week = i + 1; const r = resolveWeek(data, slot);
                const wdone = wState(data, week).done;
                const current = !wdone && plan.slice(0, i).every((_, j) => wState(data, j + 1).done);
                const left = i % 2 === 0;
                let stoneStyle, mark;
                if (wdone) {
                  stoneStyle = { background: C.gold, color: C.pineDeep, boxShadow: `0 0 0 5px ${C.goldSoft}` };
                  mark = "★";
                } else if (current) {
                  stoneStyle = { background: "#fff", color: C.grass, boxShadow: `0 0 0 3px ${C.grass}` };
                  mark = week;
                } else {
                  stoneStyle = { background: C.grassSoft, color: C.grass };
                  mark = week;
                }
                return (
                  <div key={i} className="rr-rise" style={{ animationDelay: `${i * 70}ms` }}>
                    <div className={`flex items-center gap-3 ${left ? "" : "flex-row-reverse text-right"}`}>
                      <div className="flex flex-col items-center">
                        <div className="rr-stone" style={stoneStyle}>{mark}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: C.mute, letterSpacing: ".06em" }}>
                          Week {week} · {r.skill.emoji} {r.skill.label}
                        </div>
                        <div className="font-bold text-sm leading-tight" style={{ color: wdone ? C.pine : C.ink }}>{r.w.title}</div>
                        <div className="text-xs mt-0.5 flex items-center gap-1.5"
                          style={{ color: current ? C.grass : C.mute, justifyContent: left ? "flex-start" : "flex-end" }}>
                          {current && <span className="rr-ball" style={{ fontSize: 15 }}>🏉</span>}
                          {wdone ? "Delivered" : current ? "You are here" : PHASES[r.session - 1]}
                        </div>
                      </div>
                    </div>
                    {i < plan.length - 1 && (
                      <div className={`flex ${left ? "" : "flex-row-reverse"}`}>
                        <div style={{ width: 52 }} className="flex justify-center">
                          <div className="rr-connector" style={{ borderColor: wdone ? C.gold : C.line }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className={`flex items-center gap-3 mt-1 ${plan.length % 2 === 0 ? "" : "flex-row-reverse text-right"}`}>
                <div style={{ width: 52 }} className="flex justify-center">
                  <span style={{ fontSize: 24 }}>{done === 6 ? "🏆" : "🏁"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-extrabold text-sm" style={{ color: C.pine }}>
                    {done === 6 ? "Season complete!" : "Try line"}
                  </div>
                  <div className="text-xs" style={{ color: C.mute }}>
                    {done === 6 ? "What a block of coaching — celebrate the whole squad." : `${6 - done} to go`}
                  </div>
                </div>
              </div>
            </div>
          </div></Card>
        </>
      )}

      <div className="grid grid-cols-3 gap-3">
        <MiniStat value={done} label="weeks delivered" />
        <MiniStat value={totalBadges} label="badges earned" gold />
        <MiniStat value={totalValues} label="values shown" />
      </div>

      <Card><div className="p-4">
        <Label>Team badge wall</Label>
        <div className="mt-3 space-y-2">
          {AWARDS.map((a) => {
            const winners = data.players.filter((p) => p.awards.includes(a.id));
            return (
              <div key={a.id} className="flex items-center gap-3">
                <span style={{ fontSize: 22, filter: winners.length ? "none" : "grayscale(1) opacity(0.4)" }}>{a.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">{a.label}</div>
                  <div className="text-xs truncate" style={{ color: C.mute }}>
                    {winners.length ? winners.map((w) => w.name).join(", ") : a.note}
                  </div>
                </div>
                <Pill bg={winners.length ? C.goldSoft : C.paper} fg={winners.length ? "#8a5a00" : C.mute}>{winners.length}</Pill>
              </div>
            );
          })}
        </div>
      </div></Card>
    </div>
  );
}
