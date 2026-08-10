// ============================================================
// WHERE YOUR DATA LIVES
// ============================================================
// Everything the app saves — your squad, attendance, notes, progress —
// goes through the two functions at the bottom of this file: loadData
// and saveData. Nothing else in the app touches storage directly.
//
// Right now it saves to this browser only ("local"). That means:
//   ✓ works with no signal, instantly, for free, forever
//   ✓ nothing about your players ever leaves the coach's device
//   ✗ it does NOT sync between phones, and it is NOT a backup
//
// So use the "Back up season" button on the Today tab now and then.
//
// When you're ready for several coaches to share one squad list, you
// change ONE thing: the BACKEND line below, and fill in the cloud
// functions. No other file in the app needs to change.
// ============================================================

const BACKEND = "local"; // "local" — later: "supabase"

const KEY = "rugbyroots:v2";

// ------------------------------------------------------------
// LOCAL (this browser only) — in use today
// ------------------------------------------------------------
function localLoad() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    // Don't silently lose a season. Keep the broken blob for recovery and
    // tell the coach what happened rather than quietly starting fresh.
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
    // Usually means the browser storage is full or in private mode.
    console.error("Could not save", e);
    return false;
  }
}

// ------------------------------------------------------------
// CLOUD (shared between coaches) — not switched on yet
// ------------------------------------------------------------
// To turn this on later:
//   1. Create a free Supabase project.
//   2. npm install @supabase/supabase-js
//   3. Put your project URL and anon key in a .env file (see .env.example).
//   4. Fill in the two functions below.
//   5. Change BACKEND at the top of this file to "supabase".
//
// Keep the same shape: cloudLoad returns the saved object or null,
// cloudSave takes the object and returns true or false.

async function cloudLoad() {
  throw new Error(
    "Cloud storage is not set up yet. See the comments in src/lib/storage.js."
  );
}

async function cloudSave(/* data */) {
  throw new Error(
    "Cloud storage is not set up yet. See the comments in src/lib/storage.js."
  );
}

// ------------------------------------------------------------
// The only two functions the rest of the app uses
// ------------------------------------------------------------
export async function loadData() {
  if (BACKEND === "supabase") {
    try {
      return await cloudLoad();
    } catch (e) {
      console.error("Cloud load failed, falling back to this device", e);
      return localLoad();
    }
  }
  return localLoad();
}

export async function saveData(data) {
  // Always write locally first. On a pitch with no signal this is what
  // keeps the register from being lost.
  const ok = localSave(data);
  if (BACKEND === "supabase") {
    try {
      await cloudSave(data);
    } catch (e) {
      console.error("Cloud save failed — the local copy is still safe", e);
    }
  }
  return ok;
}

// Used by the "Start again" button.
export function clearData() {
  try {
    localStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}
