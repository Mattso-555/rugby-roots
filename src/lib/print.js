// Builds the printable coaching pack: a title sheet, one section per week
// with every activity's diagram drawn exactly as the app shows it, skills
// courses in position, and a register page at the back.
//
// Drawings are the same React components the screens use, rendered to static
// markup — so paper and screen can never drift apart. Sizes are computed so
// a wide pitch prints wide and a square grid prints square, capped so no
// single picture swallows a page.

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PHASES } from "../data/index.js";
import { resolveWeek } from "./helpers.js";
import { activitiesForSlot } from "./customActivities.js";
import Diagram from "../components/Diagram.jsx";
import CourseDiagram from "../components/CourseDiagram.jsx";
import { kitSummary } from "./courses.js";
import { displaySlots } from "./weekEdits.js";

export function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

// --- figures ---------------------------------------------------------------
// Print width as a percentage of the page, so the figure's height never
// exceeds maxH millimetres on an A4 content width of ~186mm.
function figWidthPct(size, pad, maxH) {
  const [L, W] = size;
  const aspect = (W + pad * 2) / (L + pad * 2); // height / width
  return Math.max(38, Math.min(100, Math.round((maxH / (186 * aspect)) * 100)));
}

function activityFigHTML(a) {
  if (!a.diagram || !Array.isArray(a.diagram.size)) return "";
  const pct = figWidthPct(a.diagram.size, 1.6, 66);
  const markup = renderToStaticMarkup(
    React.createElement(Diagram, { diagram: a.diagram, compact: false })
  );
  return `<div class="pc-fig" style="width:${pct}%">${markup}</div>`;
}

function courseFigHTML(c) {
  const pct = figWidthPct(c.size, 2, 96);
  const markup = renderToStaticMarkup(
    React.createElement(CourseDiagram, { course: c, compact: true })
  );
  return `<div class="pc-fig" style="width:${pct}%">${markup}</div>`;
}

// --- one activity / one course, in its slot --------------------------------
function slotTag(i, a) {
  if (i === 0) return "Warm-up";
  if (i === 1) return "Skill Zone";
  if (i === 2) return "Game Zone";
  return a && a.type === "Gameplay" ? "Extra game" : "Extra";
}

export function actHTML(a, i) {
  const tag = slotTag(i, a);
  const game = i === 2 || a.type === "Gameplay";
  const apes = a.apes || {};
  return `
    <article class="pc-act${game ? " pc-game" : ""}">
      <div class="pc-act-h"><span class="pc-act-name">${esc(a.name)}</span><span class="pc-tag${game ? " pc-tag-g" : ""}">${esc(tag)}</span></div>
      ${activityFigHTML(a)}
      <div class="pc-row"><b>Set up.</b> ${esc(a.setup)}</div>
      <div class="pc-row"><b>How to play.</b> ${esc(a.play)}</div>
      ${a.condition ? `<div class="pc-row pc-cond"><b>The condition.</b> ${esc(a.condition)}</div>` : ""}
      <div class="pc-row pc-good"><b>Good looks like.</b> ${esc(a.good)}</div>
      ${(a.points || []).length ? `<div class="pc-row"><b>Points:</b> ${a.points.map(esc).join(" · ")}</div>` : ""}
      ${a.questions ? `<div class="pc-row pc-ask"><b>Ask, don't tell:</b> ${a.questions.map(esc).join(" · ")}</div>` : ""}
      ${apes.A != null ? `<div class="pc-meta">APES ${esc(apes.A)}·${esc(apes.P)}·${esc(apes.E)}·${esc(apes.S)} (Active · Purposeful · Enjoyable · Safe)</div>` : ""}
    </article>`;
}

export function courseSlotHTML(c, i) {
  return `
    <article class="pc-act pc-course">
      <div class="pc-act-h"><span class="pc-act-name">🏟 ${esc(c.name || "Skills course")}</span><span class="pc-tag">${esc(slotTag(i))} · your course</span></div>
      <div class="pc-meta">${esc(c.size[0])}m × ${esc(c.size[1])}m${kitSummary(c) ? ` · ${esc(kitSummary(c))}` : ""} — distances in metres, pace them out</div>
      ${courseFigHTML(c)}
      ${c.notes ? `<div class="pc-row"><b>How it runs.</b> ${esc(c.notes)}</div>` : ""}
    </article>`;
}

// A course added alongside the session (not standing in a slot).
export function courseHTML(c) {
  return `
    <article class="pc-act pc-course">
      <div class="pc-act-h"><span class="pc-act-name">🏟 ${esc(c.name || "Skills course")}</span><span class="pc-tag">Also tonight</span></div>
      <div class="pc-meta">${esc(c.size[0])}m × ${esc(c.size[1])}m${kitSummary(c) ? ` · ${esc(kitSummary(c))}` : ""} — distances in metres, pace them out</div>
      ${courseFigHTML(c)}
      ${c.notes ? `<div class="pc-row"><b>How it runs.</b> ${esc(c.notes)}</div>` : ""}
    </article>`;
}

// --- one week, as it will actually run --------------------------------------
// `slotViews` come from displaySlots (overrides applied; Plan B too when the
// coach prints from a live session). `extras` and `attached` follow.
export function weekHTML(blockWeek, r, slotViews, extras, attached) {
  const { skill, w, session } = r;
  const body = slotViews
    .map((v, i) => (v.course ? courseSlotHTML(v.course, i) : actHTML(v.activity, i)))
    .join("");
  const extraBody = (extras || []).map((a) => actHTML(a, 3)).join("");
  const attachedBody = (attached || []).map(courseHTML).join("");
  return `
    <section class="pc-week">
      <header class="pc-week-head">
        <div class="pc-wknum">${blockWeek}</div>
        <div class="pc-week-meta">
          <div class="pc-eyebrow">${esc(skill.emoji)} ${esc(skill.label)}${session ? ` &nbsp;·&nbsp; ${esc(PHASES[session - 1])}` : " &nbsp;·&nbsp; Your session"}</div>
          <h2 class="pc-title">${esc(w.title)}</h2>
          <div class="pc-obj">${esc(w.objective)}</div>
        </div>
      </header>
      ${(w.coachingPoints && w.coachingPoints.length) ? `<div class="pc-focus"><b>Coaching focus:</b> ${w.coachingPoints.map(esc).join(" · ")}</div>` : ""}
      ${body}
      ${extraBody}
      ${attachedBody}
      <div class="pc-safety"><b>⚠ Safety:</b> ${(w.safety || []).map(esc).join(" · ")}</div>
    </section>`;
}

// Compose a week's slot views and trimmings straight from saved data — used
// by the whole-block print, where no live Plan B is in play.
function weekFromData(data, week) {
  const r = resolveWeek(data, (data.plan || [])[week - 1]);
  const slots = displaySlots(data, week, r.w.activities, null);
  const isOwn = r.skillId === "own";
  const extras = !isOwn ? activitiesForSlot(data, r.skillId, r.session, []) : [];
  const slotIds = slots.filter((v) => v.course).map((v) => v.course.id);
  const attached = ((data.weekCourses && data.weekCourses[week]) || [])
    .filter((id) => !slotIds.includes(id))
    .map((id) => (data.courses || []).find((c) => c.id === id))
    .filter(Boolean);
  return weekHTML(week, r, slots, extras, attached);
}

// --- the title sheet ---------------------------------------------------------
export function coverHTML(data) {
  const rows = (data.plan || []).map((slot, i) => {
    const r = resolveWeek(data, slot);
    const edited = data.weekEdits && data.weekEdits[i + 1] && Object.keys(data.weekEdits[i + 1]).length > 0;
    return `<tr>
      <td class="pc-ov-n">${i + 1}</td>
      <td class="pc-ov-s">${esc(r.skill.emoji)} ${esc(r.skill.label)}</td>
      <td class="pc-ov-p">${r.session ? esc(PHASES[r.session - 1]) : "Your session"}</td>
      <td class="pc-ov-t">${esc(r.w.title)}${edited ? ` <span class="pc-tag">customised</span>` : ""}</td>
    </tr>`;
  }).join("");
  const squad = data.team && data.team.name ? data.team.name : "";
  return `
    <section class="pc-cover">
      <div class="pc-brand"><span class="pc-brand-mark">🌱</span> Rugby Roots</div>
      <div class="pc-cover-eyebrow">Six-week coaching block${squad ? ` &nbsp;·&nbsp; ${esc(squad)}` : ""}</div>
      <h1 class="pc-cover-title">${esc(data.planName || "Your block")}</h1>
      <div class="pc-cover-date">Printed ${esc(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }))}</div>
      <table class="pc-overview">
        <thead><tr><th>Wk</th><th>Skill</th><th>Phase</th><th>Session</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="pc-cover-note">Every session runs Warm-up → Skill Zone → Game Zone, and always finishes with the game.
        Diagrams are drawn to scale in metres. Short of time? Cut the practice, never the game.</div>
      <div class="pc-foot">Rugby Roots · fun, confidence &amp; participation first</div>
    </section>`;
}

// --- the register ------------------------------------------------------------
export function checklistHTML(players) {
  const rows = (players.length ? players : [{ name:"" }, { name:"" }, { name:"" }, { name:"" }, { name:"" }, { name:"" }])
    .map((p) => `<tr><td class="pc-name">${esc(p.name) || "&nbsp;"}</td><td class="pc-box"></td><td class="pc-notes"></td></tr>`).join("");
  return `
    <section class="pc-week pc-check">
      <header class="pc-week-head">
        <div class="pc-wknum">✓</div>
        <div class="pc-week-meta">
          <div class="pc-eyebrow">Session register &amp; notes</div>
          <h2 class="pc-title">Player checklist</h2>
          <div class="pc-obj">Tick attendance · jot one positive note per player</div>
        </div>
      </header>
      <table class="pc-table">
        <thead><tr><th class="pc-name">Player</th><th class="pc-box">Here</th><th class="pc-notes">Notes (effort, moments to praise)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`;
}

// --- entry points --------------------------------------------------------------
export function runPrint(title, cardsHTML) {
  const holder = document.getElementById("rr-print");
  if (!holder) return;
  holder.innerHTML = `<div class="pc-sheet">${cardsHTML}</div>`;
  const done = () => { holder.innerHTML = ""; window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  window.print();
}

// Print one session as it will actually run tonight. The session screen
// passes its own composed slot views (the coach's swaps and any live Plan B
// already applied); without them, the plan prints as saved.
export function printSession(blockWeek, r, players, opts = {}) {
  const slots = opts.slots || r.w.activities.map((a, i) => ({ i, activity: a }));
  const html =
    weekHTML(blockWeek, r, slots, opts.extras || [], opts.attached || []) +
    checklistHTML(players);
  runPrint(`${r.skill.label} · Week ${blockWeek}`, html);
}

// Print the whole block: title sheet, six weeks (slot swaps and courses
// included), register at the back.
export function printBlock(data) {
  const weeks = (data.plan || []).map((_, i) => weekFromData(data, i + 1)).join("");
  runPrint(data.planName || "Six-week block", coverHTML(data) + weeks + checklistHTML(data.players));
}
