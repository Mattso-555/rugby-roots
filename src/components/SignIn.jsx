// Shared mode's front door. A coach types their email and taps the link
// that arrives — no password to remember on a cold touchline. Only emails
// the club has added (Home & settings → Coaches) can actually read or
// write anything once inside.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { signInWithEmail } from "../lib/supabaseClient.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const send = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !e.includes("@")) { setError("That doesn't look like an email address."); return; }
    setBusy(true); setError(null);
    try {
      await signInWithEmail(e);
      setSent(true);
    } catch (err) {
      setError(err.message || "Couldn't send the link. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rr-sheet" style={{ background: C.pineDeep }}>
      <div className="rr-sheet-inner" style={{ maxWidth: 460 }}>
        <div className="text-center pt-10 pb-6">
          <div className="mx-auto flex items-center justify-center rounded-3xl"
            style={{ width: 84, height: 84, background: "#fff", padding: 8 }}>
            <img src="/crest.png" alt="Glasgow Accies RFC crest" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <h1 className="font-display font-extrabold text-white mt-4"
            style={{ fontSize: 28, letterSpacing: "-.02em" }}>Glasgow Accies RFC</h1>
          <p className="mt-1" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15 }}>
            Your club shares one squad, register and library.
          </p>
        </div>

        <div className="rounded-2xl p-4" style={{ background: "#fff" }}>
          {!sent ? (
            <>
              <div className="font-display font-extrabold" style={{ fontSize: 18, color: C.pine }}>
                Sign in as a coach
              </div>
              <p className="text-sm mt-1" style={{ color: C.mute }}>
                Enter the email your club added for you. We'll send a link —
                tap it and you're in. No password.
              </p>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                type="email" placeholder="you@example.com" autoComplete="email"
                style={{ width: "100%", background: C.paper, border: `1px solid ${C.line}`,
                         borderRadius: 12, padding: "12px", fontSize: 16, marginTop: 12, outline: "none" }} />
              {error && <p className="text-sm mt-2" style={{ color: "#B3401F" }}>{error}</p>}
              <button onClick={send} disabled={busy}
                className="w-full rounded-xl py-4 font-bold mt-3"
                style={{ background: busy ? C.paper : C.grass, color: busy ? C.mute : "#fff", fontSize: 16 }}>
                {busy ? "Sending…" : "Email me a sign-in link"}
              </button>
            </>
          ) : (
            <>
              <div className="font-display font-extrabold" style={{ fontSize: 18, color: C.pine }}>
                Check your email 📬
              </div>
              <p className="text-sm mt-1" style={{ color: C.mute }}>
                A sign-in link is on its way to <b>{email.trim()}</b>. Open it on
                this device. If nothing arrives in a couple of minutes, check
                spam — or your email may not be on the club's coach list yet:
                ask whoever runs the club to add you.
              </p>
              <button onClick={() => setSent(false)} className="mt-3 text-sm font-bold" style={{ color: C.grass }}>
                Use a different email
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs mt-4 pb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
          Registers still save on this phone first, so a night with no signal is never lost.
        </p>
      </div>
    </div>
  );
}
