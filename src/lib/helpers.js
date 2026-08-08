// Small shared functions for reading the plan and the squad.

import { SKILLS } from "../data/index.js";
import { AREA_TO_SKILL } from "../data/constants.js";

export const planFor = (id) => (SKILLS[id] ? SKILLS[id].weeks : []);           // a skill's 6 sessions
export const resolveSlot = (slot) => {                                         // {skill,session} -> content
  const s = SKILLS[slot.skill]; if (!s) return null;
  return { skillId: slot.skill, skill: s, session: slot.session, w: s.weeks[slot.session - 1] };
};
export const wState = (data, week) =>
  (data.progress && data.progress[week]) || { done:false, reflection:"" };
export const doneCount = (data) =>
  (data.plan || []).filter((_, i) => wState(data, i + 1).done).length;

// build a 6-slot plan of a single skill's progression
export const buildSingle = (id) => planFor(id).map((w) => ({ skill:id, session:w.week }));

// curated mixed block that builds toward playing a game
export const PRESETS = {
  matchready: {
    name:"Match ready",
    tag:"Recommended",
    note:"A mixed block that builds the parts of a game in order — handle the ball, use space, link up, defend, then play. Week 5 is a safe, non-contact defence intro you can adapt to your age group.",
    slots:[ {skill:"passing",session:1}, {skill:"catching",session:3}, {skill:"evasion",session:3},
            {skill:"support",session:4}, {skill:"tackling",session:1}, {skill:"support",session:6} ],
  },
  allrounder: {
    name:"All-rounder",
    tag:"Balanced",
    note:"One week on each core skill, finishing with a game. A great first block if you're not sure where to start.",
    slots:[ {skill:"passing",session:1}, {skill:"catching",session:2}, {skill:"evasion",session:2},
            {skill:"support",session:2}, {skill:"kicking",session:1}, {skill:"evasion",session:6} ],
  },
  attack: {
    name:"Attack & flair",
    tag:"Attack",
    note:"Beating defenders, using space and linking up — an exciting attacking block that ends in a game.",
    slots:[ {skill:"passing",session:2}, {skill:"evasion",session:2}, {skill:"evasion",session:4},
            {skill:"support",session:3}, {skill:"passing",session:4}, {skill:"support",session:6} ],
  },
};

export function recommendFocus(players) {
  const counts = {};
  players.forEach((p) => Object.entries(p.skills || {}).forEach(([k, lvl]) => {
    if (lvl === "Not Yet Observed" || lvl === "Emerging") counts[k] = (counts[k] || 0) + 1;
  }));
  return Object.entries(counts).map(([k, count]) => {
    const [area, sub] = k.split("::"); return { area, sub, count };
  }).sort((a, b) => b.count - a.count).slice(0, 3);
}
export function recommendSkill(players) {
  const areaCounts = {};
  players.forEach((p) => Object.entries(p.skills || {}).forEach(([k, lvl]) => {
    if (lvl === "Not Yet Observed" || lvl === "Emerging") {
      const area = k.split("::")[0]; areaCounts[area] = (areaCounts[area] || 0) + 1;
    }
  }));
  const top = Object.entries(areaCounts).sort((a, b) => b[1] - a[1])[0];
  return top ? AREA_TO_SKILL[top[0]] : null;
}
