// Sets the squad's age grade. This is what locks contact for under-9s.

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import { AGE_GRADES, gradeById, CONTACT_LOCK_REASON } from "../data/ageGrades.js";

export default function AgeGradeCard({ ageGrade, setAgeGrade, compact }) {
  const current = gradeById(ageGrade);

  return (
    <Card style={!current ? { borderColor: C.gold, borderWidth: 2 } : undefined}>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Label>Age grade</Label>
          {!current && <Pill bg={C.goldSoft} fg="#8a5a00">Set this first</Pill>}
        </div>

        {!current && (
          <p className="text-sm mt-1" style={{ color: C.mute }}>
            Tell the app how old your squad is. It decides which sessions are
            safe and legal to run.
          </p>
        )}

        <div className="grid grid-cols-3 gap-2 mt-3">
          {AGE_GRADES.map((g) => {
            const on = g.id === ageGrade;
            return (
              <button
                key={g.id}
                onClick={() => setAgeGrade(g.id)}
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: on ? C.pine : "#fff",
                  color: on ? "#fff" : C.ink,
                  border: `1px solid ${on ? C.pine : C.line}`,
                }}
              >
                <div className="font-extrabold" style={{ fontSize: 15 }}>{g.label}</div>
                <div style={{ fontSize: 10, lineHeight: "13px", opacity: 0.75 }}>{g.years}</div>
              </button>
            );
          })}
        </div>

        {current && !current.contact && (
          <div
            className="rounded-xl p-2.5 mt-3"
            style={{ background: C.goldSoft, border: `1px solid ${C.gold}` }}
          >
            <div className="font-bold text-sm" style={{ color: "#7a4f00" }}>
              Non-contact age group
            </div>
            <p className="text-sm mt-1" style={{ color: "#7a4f00" }}>
              {CONTACT_LOCK_REASON}
            </p>
            <p className="text-xs mt-2" style={{ color: "#7a5d22" }}>
              The tackling sessions are hidden while {current.label} is selected.
            </p>
          </div>
        )}

        {current && current.contact && !compact && (
          <p className="text-xs mt-3" style={{ color: C.mute }}>
            Contact sessions are available. Tackle height is waist and below —
            check your union's current age grade law variations before the block
            starts, as they change between seasons.
          </p>
        )}
      </div>
    </Card>
  );
}
