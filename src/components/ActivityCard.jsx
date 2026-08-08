// One activity on a session card: warm-up, skill zone or game zone.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill, ApesBar } from "./ui.jsx";

export default function ActivityCard({ a }) {
  const [showStep, setShowStep] = useState(false);
  const apesOk = Object.values(a.apes).every((v) => v >= 4);
  const isGame = a.type === "Gameplay";
  return (
    <Card style={isGame ? { borderColor: C.gold, borderWidth: 2 } : undefined}>
      <div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="font-bold">{a.name}</div>
        <Pill bg={isGame ? C.goldSoft : C.grassSoft} fg={isGame ? "#8a5a00" : C.pine}>
          {isGame ? "🏉 Game Zone" : a.type}
        </Pill>
      </div>

      <div className="mt-2">
        <Label>Set up</Label>
        <p className="text-sm mt-1">{a.setup}</p>
      </div>
      <div className="mt-3">
        <Label>How to play</Label>
        <p className="text-sm mt-1">{a.play}</p>
      </div>

      {a.condition && (
        <div className="mt-3 rounded-xl p-2.5" style={{ background: C.goldSoft, border: `1px solid ${C.gold}` }}>
          <Label>The condition</Label>
          <p className="text-sm mt-1 font-semibold" style={{ color: "#7a4f00" }}>{a.condition}</p>
          <p className="text-xs mt-1" style={{ color: "#8a6a2a" }}>
            This one rule is what makes the skill show up. Set it, then let them play.
          </p>
        </div>
      )}
      <div className="mt-3 rounded-xl p-2.5" style={{ background: C.grassSoft }}>
        <Label>What good looks like</Label>
        <p className="text-sm mt-1" style={{ color: C.pine }}>{a.good}</p>
      </div>

      <div className="mt-3">
        <Label>Coaching points</Label>
        <ul className="mt-1.5 space-y-1">
          {a.points.map((p, i) => (
            <li key={i} className="text-sm flex gap-2"><span style={{ color: C.gold }}>›</span>{p}</li>
          ))}
        </ul>
      </div>

      {a.questions && (
        <div className="mt-3 rounded-xl p-2.5" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          <Label>Ask, don't tell</Label>
          <p className="text-xs mt-1 mb-2" style={{ color: C.mute }}>
            Stop the game rarely. When you do, ask one of these and wait for the answer.
          </p>
          <ul className="space-y-1">
            {a.questions.map((q, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: C.pine }}>
                <span style={{ color: C.grass }}>?</span>{q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <Label>APES review</Label>
          <Pill bg={apesOk ? C.grassSoft : C.goldSoft} fg={apesOk ? C.pine : "#8a5a00"}>
            {apesOk ? "Well balanced" : "Could improve"}
          </Pill>
        </div>
        <ApesBar apes={a.apes} />
      </div>

      <button onClick={() => setShowStep(!showStep)} className="mt-3 text-sm font-semibold"
        style={{ color: C.grass }}>
        {showStep ? "Hide STEP adaptations" : "STEP adaptations ↓"}
      </button>
      {showStep && (
        <div className="mt-2 space-y-2">
          {["Space","Task","Equipment","People"].map((k) => (
            <div key={k} className="rounded-xl p-2.5" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
              <span className="font-bold text-sm" style={{ color: C.pine }}>{k}: </span>
              <span className="text-sm">{a.step[k]}</span>
            </div>
          ))}
        </div>
      )}
    </div></Card>
  );
}
