// Shared mode's front door. A coach types their email and taps the link
// that arrives — no password to remember on a cold touchline. Only emails
// the club has added (Home & settings → Coaches) can actually read or
// write anything once inside.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { signInWithEmail, verifyEmailCode, signInWithPassword } from "../lib/supabaseClient.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [pw, setPw] = useState("");

  const pwSignIn = async () => {
    const e = email.trim().toLowerCase();
    if (!e.includes("@")) { setError("Enter your email above first."); return; }
    if (!pw) { setError("Type your password."); return; }
    setBusy(true); setError(null);
    try {
      await signInWithPassword(e, pw);
      // onAuthStateChange in App takes over
    } catch {
      setError("Email and password didn't match. Use the email link instead, then set a password in Home & settings.");
      setBusy(false);
    }
  };

  const verify = async () => {
    if (code.trim().length < 6) { setCodeError("The code is 6 digits."); return; }
    setBusy(true); setCodeError(null);
    try {
      await verifyEmailCode(email.trim().toLowerCase(), code);
      // onAuthStateChange in App takes over from here
    } catch {
      setCodeError("That code didn't work — check it, or send a fresh email.");
      setBusy(false);
    }
  };

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

              <div className="flex items-center gap-3 mt-4">
                <div style={{ flex: 1, height: 1, background: C.line }} />
                <span className="text-xs font-bold" style={{ color: C.mute }}>ALREADY SET A PASSWORD?</span>
                <div style={{ flex: 1, height: 1, background: C.line }} />
              </div>
              <input value={pw} onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") pwSignIn(); }}
                type="password" placeholder="Your password" autoComplete="current-password"
                style={{ width: "100%", background: C.paper, border: `1px solid ${C.line}`,
                         borderRadius: 12, padding: "12px", fontSize: 16, marginTop: 10, outline: "none" }} />
              <button onClick={pwSignIn} disabled={busy}
                className="w-full rounded-xl py-3 font-bold mt-2"
                style={{ background: "#fff", color: C.pine, border: `1px solid ${C.line}`, fontSize: 15 }}>
                Sign in with password
              </button>
              <p className="text-xs mt-2" style={{ color: C.mute }}>
                First time here? Use the email button above — once you're in,
                you can set a password under <b>Home &amp; settings → Quick
                sign-in password</b> (tap the club crest, top-left) so future
                sign-ins skip the email.
              </p>
            </>
          ) : (
            <>
              <div className="font-display font-extrabold" style={{ fontSize: 18, color: C.pine }}>
                Check your email 📬
              </div>
              <p className="text-sm mt-1" style={{ color: C.mute }}>
                An email is on its way to <b>{email.trim()}</b>. <b>Tap the
                link in it on this device</b> and you're in. If your club's
                emails include a 6-digit code, typing it below works too.
              </p>
              <input value={code} onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                onKeyDown={(e) => { if (e.key === "Enter") verify(); }}
                inputMode="numeric" autoComplete="one-time-code" placeholder="123456" maxLength={6}
                style={{ width: "100%", background: C.paper, border: `1px solid ${C.line}`,
                         borderRadius: 12, padding: "12px", fontSize: 22, letterSpacing: "0.35em",
                         textAlign: "center", marginTop: 12, outline: "none" }} />
              {codeError && <p className="text-sm mt-2" style={{ color: "#B3401F" }}>{codeError}</p>}
              <button onClick={verify} disabled={busy}
                className="w-full rounded-xl py-4 font-bold mt-3"
                style={{ background: busy ? C.paper : C.grass, color: busy ? C.mute : "#fff", fontSize: 16 }}>
                {busy ? "Checking…" : "Sign in with the code"}
              </button>
              <p className="text-xs mt-3" style={{ color: C.mute }}>
                Nothing after a couple of minutes? Check spam — or your email may
                not be on the club's coach list yet.
              </p>
              <button onClick={() => { setSent(false); setCode(""); }} className="mt-2 text-sm font-bold" style={{ color: C.grass }}>
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
