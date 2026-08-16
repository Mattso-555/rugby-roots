// Shared-mode cards.
//
// ParentLinkCard sits on a player's detail screen: create the child's private
// link, copy or share it to the designated parent, and replace it (which
// kills the old one) if it ever ends up in the wrong hands. WHO receives the
// link is the club's decision made over email — the app deliberately doesn't
// try to adjudicate designated-parent questions.
//
// CoachesCard sits in Home & settings: see the club's coach list, add a new
// coach's email (they then sign themselves in), watch sync status, sign out.

import React, { useEffect, useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label, Pill } from "./ui.jsx";
import { supabase, signOut, setPassword } from "../lib/supabaseClient.js";
import { syncNowManual } from "../lib/storage.js";
import { copyText } from "../lib/share.js";

export function ParentLinkCard({ player }) {
  const [link, setLink] = useState(undefined); // undefined loading · null none · row
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    const { data } = await supabase().from("parent_links")
      .select("token,revoked,created_at").eq("player_id", player.id)
      .eq("revoked", false).limit(1);
    setLink(data && data.length ? data[0] : null);
  };
  useEffect(() => { load(); }, [player.id]);

  const url = link ? `${window.location.origin}/?parent=${link.token}` : null;

  const create = async () => {
    setBusy(true);
    const { data: rows } = await supabase().from("squads").select("id").limit(1);
    if (rows && rows.length) {
      await supabase().from("parent_links")
        .insert({ squad_id: rows[0].id, player_id: player.id, label: player.name });
      await load();
    }
    setBusy(false);
  };

  const replace = async () => {
    if (!window.confirm(
      "Replace the parent link?\n\nThe old link stops working immediately — send the new one to the parent."
    )) return;
    setBusy(true);
    await supabase().from("parent_links").update({ revoked: true })
      .eq("player_id", player.id).eq("revoked", false);
    await supabase().from("parent_links").insert({
      squad_id: (await supabase().from("squads").select("id").limit(1)).data[0].id,
      player_id: player.id, label: player.name,
    });
    await load();
    setBusy(false);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${player.name} — Glasgow Accies RFC`,
          text: `Private link to follow ${player.name}'s rugby — focus each week, achievements, and what to practise at home:`,
          url,
        });
        return;
      } catch { /* cancelled */ }
    }
    setCopied(await copyText(url));
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Card><div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Parent link</Label>
        {link && <Pill bg={C.grassSoft} fg={C.pine}>Active</Pill>}
      </div>
      <p className="text-xs mt-1" style={{ color: C.mute }}>
        A private page for {player.name}'s parent: this week's focus, awards,
        and your "for home" tips. It shows this child only. Send it to the
        parent the club has designated — and replace it if it ever leaks.
      </p>
      {link === undefined ? (
        <p className="text-sm mt-2" style={{ color: C.mute }}>Checking…</p>
      ) : !link ? (
        <button onClick={create} disabled={busy}
          className="w-full rounded-xl py-3 font-bold mt-3"
          style={{ background: C.grass, color: "#fff" }}>
          {busy ? "Creating…" : "Create parent link"}
        </button>
      ) : (
        <div className="flex gap-2 mt-3">
          <button onClick={share} className="flex-1 rounded-xl py-3 font-bold text-sm"
            style={{ background: C.grass, color: "#fff" }}>
            {copied ? "Link copied" : "Send to parent"}
          </button>
          <button onClick={replace} disabled={busy}
            className="rounded-xl px-3 py-3 font-bold text-sm"
            style={{ background: "#fff", color: "#B3401F", border: `1px solid ${C.line}` }}>
            Replace
          </button>
        </div>
      )}
    </div></Card>
  );
}

export function CoachesCard({ syncStatus, syncDetail }) {
  const [coaches, setCoaches] = useState(null);
  const [adding, setAdding] = useState("");
  const [msg, setMsg] = useState(null);

  const load = async () => {
    const { data, error } = await supabase().from("club_coaches")
      .select("email,name").order("added_at");
    setCoaches(error ? [] : data || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    const email = adding.trim().toLowerCase();
    if (!email.includes("@")) { setMsg("That doesn't look like an email address."); return; }
    const { error } = await supabase().from("club_coaches").insert({ email });
    setMsg(error ? "Couldn't add — are they already on the list?" : `${email} can now sign in.`);
    if (!error) { setAdding(""); load(); }
  };

  const STATUS = {
    synced:  ["All coaches in sync", C.grass],
    offline: ["No signal — saving to this phone, will sync when back", "#8a5a00"],
    error:   ["Shared store unreachable — saving to this phone", "#B3401F"],
    local:   ["Local mode", C.mute],
  };
  const [label, colour] = STATUS[syncStatus] || STATUS.local;

  return (
    <Card><div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label>Club coaches</Label>
        <span className="text-xs font-bold" style={{ color: colour }}>● {label}</span>
      </div>
      {syncDetail && (syncStatus === "error" || syncStatus === "offline") && (
        <p className="text-xs mt-1 font-semibold" style={{ color: "#B3401F" }}>{syncDetail}</p>
      )}
      <p className="text-xs mt-1" style={{ color: C.mute }}>
        Everyone here shares the squad, register, notes and library. Add a
        coach's email and they sign themselves in — no password. Removing a
        coach is done in your Supabase dashboard, deliberately.
      </p>
      {coaches === null ? (
        <p className="text-sm mt-2" style={{ color: C.mute }}>Loading…</p>
      ) : (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {coaches.map((c) => (
            <Pill key={c.email} bg={C.paper} fg={C.ink}>{c.name || c.email}</Pill>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-3">
        <input value={adding} onChange={(e) => setAdding(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") add(); }}
          type="email" placeholder="coach@example.com"
          className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
          style={{ background: C.paper, border: `1px solid ${C.line}` }} />
        <button onClick={add} className="rounded-xl px-4 font-bold text-white" style={{ background: C.grass }}>
          Add
        </button>
      </div>
      {msg && <p className="text-sm mt-2" style={{ color: C.mute }}>{msg}</p>}
      <div className="flex items-center justify-between mt-4">
        <button onClick={() => syncNowManual()}
          className="rounded-xl px-4 py-2.5 text-sm font-bold"
          style={{ background: C.grassSoft, color: C.pine }}>
          ⟳ Sync now
        </button>
        <button onClick={async () => { await signOut(); window.location.reload(); }}
          className="text-sm font-bold" style={{ color: "#B3401F" }}>
          Sign out on this device
        </button>
      </div>
    </div></Card>
  );
}


// Set (or change) the quick sign-in password for THIS coach's account.
// After this, new devices need only email + password — no email arriving.
export function QuickSignInCard() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (pw.length < 8) { setMsg({ bad: true, text: "At least 8 characters." }); return; }
    if (pw !== pw2) { setMsg({ bad: true, text: "The two boxes don't match." }); return; }
    setBusy(true);
    try {
      await setPassword(pw);
      setMsg({ bad: false, text: "Done. On any device: your email + this password, no email link needed." });
      setPw(""); setPw2("");
    } catch (e) {
      setMsg({ bad: true, text: e.message || "Couldn't set it — try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card><div className="p-4">
      <Label>Quick sign-in password</Label>
      <p className="text-xs mt-1" style={{ color: C.mute }}>
        Optional. Set a password and future sign-ins on any device are just
        email + password — no waiting for an email. Don't reuse a password
        from anywhere else.
      </p>
      <input value={pw} onChange={(e) => setPw(e.target.value)} type="password"
        placeholder="New password (8+ characters)" autoComplete="new-password"
        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none mt-2"
        style={{ background: C.paper, border: `1px solid ${C.line}` }} />
      <input value={pw2} onChange={(e) => setPw2(e.target.value)} type="password"
        placeholder="Same again" autoComplete="new-password"
        onKeyDown={(e) => { if (e.key === "Enter") save(); }}
        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none mt-2"
        style={{ background: C.paper, border: `1px solid ${C.line}` }} />
      {msg && <p className="text-sm mt-2" style={{ color: msg.bad ? "#B3401F" : C.grass }}>{msg.text}</p>}
      <button onClick={save} disabled={busy}
        className="rounded-xl px-4 py-2.5 text-sm font-bold mt-2"
        style={{ background: C.grass, color: "#fff" }}>
        {busy ? "Saving…" : "Set password"}
      </button>
    </div></Card>
  );
}
