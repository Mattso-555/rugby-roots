// Builds the printable pocket-size session card and player register.
// Skills courses print as the same drawing the app shows — the layout is the
// point of a course, so the sheet carries the picture, not a description.

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PHASES } from "../data/index.js";
import { resolveWeek } from "./helpers.js";
import CourseDiagram from "../components/CourseDiagram.jsx";
import { kitSummary } from "./courses.js";
import { displaySlots, printableActivities } from "./weekEdits.js";

export function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
export function cardHTML(blockWeek, r) {
  const { skill, w, session } = r;
  const acts = w.activities.map((a) => `
    <div class="pc-act">
      <div class="pc-act-h">${esc(a.name)} <span class="pc-tag">${esc(a.type)}</span></div>
      <div class="pc-row"><b>Set up.</b> ${esc(a.setup)}</div>
      <div class="pc-row"><b>How to play.</b> ${esc(a.play)}</div>
      ${a.condition ? `<div class="pc-row pc-cond"><b>Condition.</b> ${esc(a.condition)}</div>` : ""}
      <div class="pc-row pc-good"><b>Good looks like.</b> ${esc(a.good)}</div>
      <div class="pc-row"><b>Points:</b> ${a.points.map(esc).join(" · ")}</div>
      ${a.questions ? `<div class="pc-row pc-ask"><b>Ask:</b> ${a.questions.map(esc).join(" · ")}</div>` : ""}
      <div class="pc-row pc-apes">APES ${a.apes.A}/${a.apes.P}/${a.apes.E}/${a.apes.S} &nbsp;·&nbsp; A·P·E·S</div>
    </div>`).join("");
  return `
    <section class="pc-card">
      <div class="pc-head">
        <div class="pc-eyebrow">Week ${blockWeek} of 6 &nbsp;·&nbsp; ${esc(skill.label)} &nbsp;·&nbsp; ${session ? esc(PHASES[session - 1]) : "Your session"}</div>
        <h2 class="pc-title">${esc(skill.emoji)} ${esc(w.title)}</h2>
        <div class="pc-obj">${esc(w.objective)}</div>
      </div>
      ${(w.coachingPoints && w.coachingPoints.length) ? `<div class="pc-focus"><b>Coaching focus:</b> ${w.coachingPoints.map(esc).join(" · ")}</div>` : ""}
      ${acts}
      <div class="pc-safety"><b>⚠ Safety:</b> ${w.safety.map(esc).join(" · ")}</div>
      <div class="pc-foot">Rugby Roots · fun, confidence &amp; participation first</div>
    </section>`;
}
// A full course card: the real drawing, dimensions, kit and the coach's note.
export function courseHTML(c) {
  const drawing = renderToStaticMarkup(
    React.createElement(CourseDiagram, { course: c, compact: true })
  );
  return `
    <section class="pc-card">
      <div class="pc-head">
        <div class="pc-eyebrow">Skills course &nbsp;·&nbsp; ${esc(c.size[0])}m × ${esc(c.size[1])}m${kitSummary(c) ? ` &nbsp;·&nbsp; ${esc(kitSummary(c))}` : ""}</div>
        <h2 class="pc-title">🏟 ${esc(c.name || "Skills course")}</h2>
      </div>
      <div class="pc-course">${drawing}</div>
      ${c.notes ? `<div class="pc-row"><b>How it runs.</b> ${esc(c.notes)}</div>` : ""}
      <div class="pc-foot">Distances are in metres — pace them out on the day</div>
    </section>`;
}

// Everything a week needs on paper: the card as it will actually run (your
// slot swaps applied), then a drawing for every course on the week — courses
// standing in a slot and courses added alongside.
export function weekSheetHTML(data, week, r) {
  const slots = displaySlots(data, week, r.w.activities, null);
  const card = cardHTML(week, { ...r, w: { ...r.w, activities: printableActivities(slots, []) } });
  const slotCourseIds = [];
  const courses = [];
  slots.forEach((v) => {
    if (v.course) { courses.push(v.course); slotCourseIds.push(v.course.id); }
  });
  const attachedIds = (data.weekCourses && data.weekCourses[week]) || [];
  attachedIds.forEach((id) => {
    if (slotCourseIds.includes(id)) return;
    const c = (data.courses || []).find((x) => x.id === id);
    if (c) courses.push(c);
  });
  return card + courses.map(courseHTML).join("");
}

export function checklistHTML(players) {
  const rows = (players.length ? players : [{ name:"" }, { name:"" }, { name:"" }, { name:"" }, { name:"" }, { name:"" }])
    .map((p) => `<tr><td class="pc-name">${esc(p.name) || "&nbsp;"}</td><td class="pc-box"></td><td class="pc-notes"></td></tr>`).join("");
  return `
    <section class="pc-card pc-check">
      <div class="pc-head"><div class="pc-eyebrow">Session register &amp; notes</div>
        <h2 class="pc-title">👦 Player checklist</h2></div>
      <table class="pc-table">
        <thead><tr><th class="pc-name">Player</th><th class="pc-box">Here</th><th class="pc-notes">Notes (effort, moments to praise)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="pc-foot">Tick attendance · jot one positive note per player</div>
    </section>`;
}
export function runPrint(title, cardsHTML) {
  const holder = document.getElementById("rr-print");
  if (!holder) return;
  holder.innerHTML = `<div class="pc-sheet"><div class="pc-doc-title">${esc(title)}</div>${cardsHTML}</div>`;
  const done = () => { holder.innerHTML = ""; window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  window.print();
}
export function printSession(blockWeek, r, players, courses = []) {
  runPrint(
    `${r.skill.label} · Week ${blockWeek}`,
    cardHTML(blockWeek, r) + courses.map(courseHTML).join("") + checklistHTML(players)
  );
}
export function printBlock(data) {
  const cards = (data.plan || [])
    .map((slot, i) => weekSheetHTML(data, i + 1, resolveWeek(data, slot)))
    .join("");
  runPrint(data.planName || "Six-week block", cards + checklistHTML(data.players));
}
