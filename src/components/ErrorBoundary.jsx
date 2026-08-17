// Catches any crash in the tree below it and shows a calm, useful message
// instead of a blank white screen. Also gives a one-tap reload, and (for a
// coach mid-session) reassurance that their saved data is safe on the device.

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crashed: false, detail: "" };
  }

  static getDerivedStateFromError(err) {
    return { crashed: true, detail: (err && err.message) || "" };
  }

  componentDidCatch(err, info) {
    // Leave a trace in the console for anyone debugging; never throws further.
    console.error("Something crashed in the UI:", err, info);
  }

  render() {
    if (!this.state.crashed) return this.props.children;

    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#EAEEF6", padding: 24, fontFamily: "Inter, sans-serif",
      }}>
        <div style={{
          maxWidth: 420, background: "#fff", borderRadius: 20, padding: 24,
          boxShadow: "0 12px 28px -12px rgba(11,31,69,.18)", textAlign: "center",
        }}>
          <div style={{ fontSize: 34 }}>🌱</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800,
            color: "#0B2E63", margin: "10px 0 0" }}>
            Something went wrong on this screen
          </h1>
          <p style={{ fontSize: 14, color: "#5B6779", margin: "8px 0 0", lineHeight: 1.5 }}>
            Your saved players, register and notes are safe on this device. This
            is usually fixed by reloading — if it keeps happening after an update,
            fully close the app and reopen it.
          </p>
          <button onClick={() => window.location.reload()}
            style={{ marginTop: 16, background: "#0A4DA0", color: "#fff", border: "none",
              borderRadius: 12, padding: "12px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Reload the app
          </button>
        </div>
      </div>
    );
  }
}
