// Turns a six-week block into a link a coach can send by text or WhatsApp.
//
// A plan is only six pairs of (skill, session), so it fits comfortably in a
// web address — no database needed. Opening the link loads that exact block.
// The squad and attendance are NOT included, so nothing about any child
// travels in the link.

import { SKILLS } from "../data/index.js";

// A plan looks like: [{ skill: "passing", session: 1 }, ...]
// It encodes to:     passing-1.evasion-3.support-4...

export function planToCode(plan) {
  if (!Array.isArray(plan) || !plan.length) return "";
  return plan.map((s) => `${s.skill}-${s.session}`).join(".");
}

export function codeToPlan(code) {
  if (!code) return null;
  const slots = String(code)
    .split(".")
    .map((part) => {
      const [skill, session] = part.split("-");
      const n = Number(session);
      if (!SKILLS[skill] || !(n >= 1 && n <= 6)) return null;
      return { skill, session: n };
    });
  if (slots.length !== 6 || slots.some((s) => s === null)) return null;
  return slots;
}

export function planLink(plan, name) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("plan", planToCode(plan));
  if (name) url.searchParams.set("name", name);
  return url.toString();
}

// Called once when the app starts.
export function readPlanFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const plan = codeToPlan(params.get("plan"));
    if (!plan) return null;
    const name = params.get("name") || null;
    // Tidy the address bar so a refresh doesn't re-apply it.
    window.history.replaceState({}, "", window.location.pathname);
    return { plan, name };
  } catch {
    return null;
  }
}

// Copy helper that also works on older phone browsers.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}
