// Skills courses on a week's plan. Attach any course from your library to
// tonight's session and its full layout appears here — the picture, the
// distances and your "how it runs" note — so setting it out is part of the
// plan, not a separate thing to remember.
//
// Attachments are keyed by week number (like the register and Plan B), so
// they work on any week — built-in or one of your own sessions — and travel
// with the week if the block is rearranged.

import React from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import CourseDiagram from "./CourseDiagram.jsx";
import { kitSummary } from "../lib/courses.js";

export default function WeekCourses({ data, week, attachCourse, detachCourse }) {
  const library = data.courses || [];
  const attachedIds = (data.weekCourses && data.weekCourses[week]) || [];
  const attached = attachedIds
    .map((id) => library.find((c) => c.id === id))
    .filter(Boolean);
  const available = library.filter((c) => !attachedIds.includes(c.id));

  if (!library.length) {
    return (
      <Card><div className="p-4">
        <Label>Skills courses</Label>
        <p className="text-sm mt-1" style={{ color: C.mute }}>
          Design a course on the Library tab — start gates, bags, ladders,
          hurdles — and you can add it to any week from here.
        </p>
      </div></Card>
    );
  }

  return (
    <Card><div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Skills courses tonight</Label>
        {attached.length > 0 && (
          <Pill bg={C.grassSoft} fg={C.pine}>
            {attached.length} in this week
          </Pill>
        )}
      </div>

      {attached.length === 0 && (
        <p className="text-xs mt-1" style={{ color: C.mute }}>
          Add a course from your library and its layout becomes part of this
          week's plan.
        </p>
      )}

      {attached.map((c) => (
        <div key={c.id} className="rounded-xl p-3 mt-3"
          style={{ background: C.paper, border: `1px solid ${C.line}` }}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-bold text-sm">{c.name || "Untitled course"}</div>
              <div className="text-xs mt-0.5" style={{ color: C.mute }}>
                {c.size[0]}m × {c.size[1]}m{kitSummary(c) ? ` · ${kitSummary(c)}` : ""}
              </div>
            </div>
            <button onClick={() => detachCourse(week, c.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-bold shrink-0"
              style={{ background: "#fff", color: C.mute, border: `1px solid ${C.line}` }}>
              Remove
            </button>
          </div>
          <CourseDiagram course={c} />
          {c.notes && (
            <div className="rounded-xl p-2.5 mt-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
              <Label>How it runs</Label>
              <p className="text-sm mt-1">{c.notes}</p>
            </div>
          )}
        </div>
      ))}

      {available.length > 0 && (
        <>
          <Label className="mt-3">{attached.length ? "Add another" : "Add a course"}</Label>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {available.map((c) => (
              <button key={c.id} onClick={() => attachCourse(week, c.id)}
                className="rounded-full px-3 py-2 text-sm font-semibold"
                style={{ background: "#fff", color: C.ink, border: `1px solid ${C.line}` }}>
                + {c.name || "Untitled course"}
              </button>
            ))}
          </div>
        </>
      )}
    </div></Card>
  );
}
