// Sends the six-week block to another coach as a link.

import React, { useState } from "react";
import { C } from "../data/constants.js";
import { Card, Label } from "./ui.jsx";
import { planLink, copyText } from "../lib/share.js";

export default function SharePlanCard({ plan, planName }) {
  const [copied, setCopied] = useState(false);
  if (!plan || !plan.length) return null;

  const link = planLink(plan, planName);

  async function share() {
    // On a phone this opens the normal share sheet (WhatsApp, Messages, email).
    if (navigator.share) {
      try {
        await navigator.share({
          title: planName || "Six-week block",
          text: "Here's the six-week block we're running:",
          url: link,
        });
        return;
      } catch {
        // cancelled — fall through to copying
      }
    }
    const ok = await copyText(link);
    setCopied(ok);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <Card>
      <div className="p-4">
        <Label>Share this block</Label>
        <p className="text-sm mt-1" style={{ color: C.mute }}>
          Sends the six sessions to another coach. Opening the link loads this
          exact block on their phone. No player names or notes are included.
        </p>
        <button
          onClick={share}
          className="w-full rounded-xl py-3 font-bold mt-3"
          style={{ background: C.grass, color: "#fff" }}
        >
          {copied ? "Link copied" : "Share block with a coach"}
        </button>
      </div>
    </Card>
  );
}
