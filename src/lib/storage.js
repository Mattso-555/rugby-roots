// ============================================================
// WHERE YOUR DATA LIVES
// ============================================================
// Everything the app saves goes through loadData and saveData below.
//
// LOCAL MODE (no environment variables set): saves to this browser only.
//   ✓ works with no signal, instantly, for free, forever
//   ✓ nothing about your players ever leaves the coach's device
//   ✗ does not sync between phones, and is not a backup
//
// SHARED MODE (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY set): every save
// still lands on this phone FIRST — a register taken in a field with no
// signal is never lost — and then syncs to the club's shared store, section
// by section, merging with what other coaches have done (rules: lib/sync.js).
// Setup: docs/GOING-SHARED.md and docs/going-shared.sql.
// ============================================================

import { cloudEnabled, supabase } from "./supabaseClient.js";
import { SECTIONS, splitSections, joinSections, changedSections, mergeRemote } from "./sync.js";

const KEY = "rugbyroots:v2";
const META = "rugbyroots:sync";

// ------------------------------------------------------------
// LOCAL (always on — the offline cache in shared mode)
// ------------------------------------------------------------
function localLoad() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Could not read saved data", e);
    try { localStorage.setItem(KEY + ":recovery", raw); } catch { /* full */ }
    try {
      window.alert(
        "Your saved data couldn't be read, so the app has started fresh.\n\n" +
        "A copy of the unreadable data has been kept. If you have a backup " +
        "file, restore it from Home & settings (tap the logo, top-left)."
      );
    } catch { /* non-browser */ }
    return null;
  }
}

function localSave(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Could not save", e);
    return false;
  }
}

// ------------------------------------------------------------
// Sync bookkeeping (shared mode only)
// ------------------------------------------------------------
function meta() {
  try { return JSON.parse(localStorage.getItem(META)) || {}; } catch { return {}; }
}
function setMeta(patch) {
  try { localStorage.setItem(META, JSON.stringify({ ...meta(), ...patch })); } catch { /* full */ }
}

const clientId = (() => {
  const m = meta();
  if (m.clientId) return m.clientId;
  const id = `c${Date.now()}${Math.floor(Math.random() * 1e6)}`;
  setMeta({ clientId: id });
  return id;
})();

let squadId = meta().squadId || null;
// The sections this phone last successfully sent — PERSISTED, so a reload
// doesn't mistake stale local data for fresh edits and revert other coaches.
let lastPushed = meta().pushedSnapshot || null;
function rememberPushed() { setMeta({ pushedSnapshot: lastPushed }); }
let remoteCb = null;       // App's listener for merged remote changes
let statusCb = null;       // UI listener: "local" | "synced" | "offline" | "error"
let syncing = false;
let pushTimer = null;

function notifyStatus(s, detail) { if (statusCb) statusCb(s, detail || null); }

async function ensureSquad() {
  if (squadId) return squadId;
  const sb = supabase();
  const { data: rows, error } = await sb.from("squads").select("id").limit(1);
  if (error) throw error;
  if (rows && rows.length) squadId = rows[0].id;
  else {
    const { data: made, error: e2 } = await sb.from("squads")
      .insert({ name: "Main squad" }).select("id").single();
    if (e2) throw e2;
    squadId = made.id;
  }
  setMeta({ squadId });
  return squadId;
}

// Pull sections newer than our last look, merge them into local, tell App.
async function pull() {
  const sb = supabase();
  const sq = await ensureSquad();
  const since = meta().lastPullAt || "1970-01-01";
  const { data: rows, error } = await sb.from("squad_sections")
    .select("section,data,updated_at,updated_by")
    .eq("squad_id", sq).gt("updated_at", since);
  if (error) throw error;
  const incoming = {};
  let newest = since;
  for (const r of rows || []) {
    if (r.updated_at > newest) newest = r.updated_at;
    if (r.updated_by === clientId) continue; // our own echo
    incoming[r.section] = r.data;
  }
  if (Object.keys(incoming).length) {
    const rawLocal = localLoad();
    const local = rawLocal || {};
    // What counts as "this phone's edits" in a conflict:
    //  · normally: sections changed since our last push
    //  · a brand-new phone: nothing — it adopts the club wholesale
    //  · a phone with old LOCAL data joining an existing club for the first
    //    time: its registers, notes and week records merge in (those unions
    //    lose nothing), but the club's plan, team and library are adopted —
    //    stale local copies must not overwrite what the club runs.
    let dirty;
    if (lastPushed) dirty = new Set(changedSections(joinSections(lastPushed), local));
    else if (!rawLocal) dirty = new Set();
    else dirty = new Set(["players", "progress", "attendance", "planB", "weekEdits", "weekCourses"]);
    const merged = mergeRemote(local, incoming, dirty);
    localSave(merged);
    // treat the merged state as pushed for the pulled sections, so we don't
    // immediately echo them back unchanged
    const snap = splitSections(merged);
    lastPushed = lastPushed || {};
    for (const name of Object.keys(incoming)) lastPushed[name] = snap[name];
    rememberPushed();
    if (remoteCb) remoteCb(merged);
  }
  setMeta({ lastPullAt: newest });
}

// Push only the sections this device has changed since its last push.
async function push(data) {
  const sb = supabase();
  const sq = await ensureSquad();
  const now = splitSections(data);
  const dirty = lastPushed ? changedSections(joinSections(lastPushed), data) : SECTIONS.slice();
  if (!dirty.length) return;
  const rows = dirty.map((section) => ({
    squad_id: sq, section, data: now[section],
    updated_at: new Date().toISOString(), updated_by: clientId,
  }));
  const { error } = await sb.from("squad_sections").upsert(rows);
  if (error) throw error;
  lastPushed = lastPushed || {};
  for (const s of dirty) lastPushed[s] = now[s];
  rememberPushed();
}

// One serialised sync cycle: take the world's news, then send ours.
async function syncNow() {
  if (!cloudEnabled() || syncing) return;
  syncing = true;
  try {
    await pull();
    const local = localLoad();
    if (local) await push(local);
    notifyStatus("synced");
  } catch (e) {
    console.error("Sync failed — the local copy is safe", e);
    notifyStatus(navigator.onLine === false ? "offline" : "error", friendly(e));
  } finally {
    syncing = false;
  }
}

// Turn database refusals into a sentence a coach can act on.
function friendly(e) {
  const m = (e && e.message) || String(e || "");
  if (/row-level security|violates|permission|policy/i.test(m)) {
    return "The club's store refused this account — the signed-in email isn't matching the club_coaches list. (" + m.slice(0, 90) + ")";
  }
  if (/JWT|token|expired|invalid/i.test(m)) {
    return "Your sign-in has gone stale — sign out and back in.";
  }
  if (/Failed to fetch|NetworkError|network/i.test(m)) {
    return "Couldn't reach the store — check the connection.";
  }
  return m.slice(0, 140);
}

function schedulePush() {
  clearTimeout(pushTimer);
  pushTimer = setTimeout(syncNow, 1500); // batch rapid taps into one push
}

// ------------------------------------------------------------
// The functions the rest of the app uses
// ------------------------------------------------------------
export async function loadData() {
  const local = localLoad();
  if (!cloudEnabled()) return local;
  try {
    await pull(); // may merge newer club data into local
    const after = localLoad();
    // First run on a fresh phone with an existing club: adopt the club data.
    // First run of a whole club: seed the store from this phone.
    if (after) await push(after);
    notifyStatus("synced");
    return after;
  } catch (e) {
    console.error("Shared store unreachable — using this device's copy", e);
    notifyStatus(navigator.onLine === false ? "offline" : "error", friendly(e));
    return local;
  }
}

export async function saveData(data) {
  // Always the phone first. Signal or no signal, tonight's register is safe.
  const ok = localSave(data);
  if (cloudEnabled()) schedulePush();
  return ok;
}

// A visible "Sync now" for coaches who want certainty right now.
export function syncNowManual() { return syncNow(); }

// App subscribes to hear when another coach's changes have been merged in.
export function onRemoteChange(cb) { remoteCb = cb; }
export function onSyncStatus(cb) { statusCb = cb; if (!cloudEnabled()) cb("local"); }

// Background freshness: when the app regains focus or signal, and gently on
// an interval while open.
export function startSyncLoop() {
  if (!cloudEnabled()) return () => {};
  const onWake = () => syncNow();
  window.addEventListener("online", onWake);
  window.addEventListener("focus", onWake);
  const iv = setInterval(syncNow, 45000);
  return () => {
    window.removeEventListener("online", onWake);
    window.removeEventListener("focus", onWake);
    clearInterval(iv);
  };
}

// Used by the "Start again" button. Clears THIS DEVICE only — in shared mode
// the club's store is untouched and will repopulate on next sign-in.
export function clearData() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(META);
    return true;
  } catch {
    return false;
  }
}
