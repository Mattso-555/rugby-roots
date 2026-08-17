// A quiet reassurance strip: confirms the register and notes are safe, and in
// shared mode whether they've reached the other coaches yet. This is the thing
// a coach glances at in the rain to know the tap "took".

import React, { useEffect, useState } from "react";
import { C } from "../data/constants.js";
import { cloudEnabled } from "../lib/supabaseClient.js";
import { onSyncStatus, syncNowManual } from "../lib/storage.js";

export default function SaveStatus() {
  const [status, setStatus] = useState(cloudEnabled() ? "offline" : "local");
  useEffect(() => { onSyncStatus((s) => setStatus(s)); }, []);

  const MAP = {
    local:   ["✓ Saved on this device", C.grass, C.grassSoft],
    synced:  ["✓ Saved · shared with your coaches", C.grass, C.grassSoft],
    offline: ["✓ Saved here · will share when back online", "#8a5a00", C.goldSoft],
    error:   ["✓ Saved here · not shared yet", "#8a5a00", C.goldSoft],
  };
  const [text, fg, bg] = MAP[status] || MAP.local;
  const canRetry = cloudEnabled() && (status === "offline" || status === "error");

  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2"
      style={{ background: bg, border: `1px solid ${bg}` }}>
      <span className="text-xs font-bold" style={{ color: fg }}>{text}</span>
      {canRetry && (
        <button onClick={() => syncNowManual()} className="text-xs font-bold" style={{ color: C.pine }}>
          Try now
        </button>
      )}
    </div>
  );
}
