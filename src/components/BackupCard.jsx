// Back up the season to a file, or restore one. Shown on the Today tab.

import React, { useRef, useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";
import { exportSeason, importSeason } from "../lib/backup.js";

export default function BackupCard({ data, onRestore }) {
  const fileRef = useRef(null);
  const [msg, setMsg] = useState(null);

  const playerCount = (data.players || []).length;

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // let the same file be picked again
    if (!file) return;
    try {
      const restored = await importSeason(file);
      const n = (restored.players || []).length;
      const ok = window.confirm(
        `Restore this backup?\n\nIt contains ${n} player${n === 1 ? "" : "s"}.\n\n` +
          `This replaces everything currently on this device.`
      );
      if (!ok) return;
      onRestore(restored);
      setMsg({ tone: "good", text: "Backup restored." });
    } catch (err) {
      setMsg({ tone: "bad", text: err.message });
    }
  }

  return (
    <Card>
      <div className="p-4">
        <Label>Back up &amp; move device</Label>
        <p className="text-sm mt-1" style={{ color: C.mute }}>
          Your squad and register are saved on this device only. They are not
          sent anywhere. Save a backup file now and then, and keep it somewhere
          safe — it's also how you move to a new phone.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => exportSeason(data)}
            className="rounded-xl py-3 font-bold text-sm"
            style={{ background: C.grass, color: "#fff" }}
          >
            Back up season
          </button>
          <button
            onClick={() => fileRef.current && fileRef.current.click()}
            className="rounded-xl py-3 font-bold text-sm"
            style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}` }}
          >
            Restore backup
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          style={{ display: "none" }}
        />

        {msg && (
          <p
            className="text-sm mt-2"
            style={{ color: msg.tone === "good" ? C.grass : "#B3401F" }}
          >
            {msg.text}
          </p>
        )}

        <p className="text-xs mt-3" style={{ color: C.mute }}>
          {playerCount
            ? `${playerCount} player${playerCount === 1 ? "" : "s"} on this device.`
            : "No players added yet."}
        </p>
      </div>
    </Card>
  );
}
