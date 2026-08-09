"use client";

import { useSyncExternalStore } from "react";
import { statusNow } from "@/lib/hours";

/* The clock belongs to the visitor, not to the build, so the value is read
   from an external store: the server renders the neutral "Checking" state and
   the reading is taken — and retaken every minute — in the browser.
   The snapshot is a string so repeated reads compare equal. */
const SERVER_SNAPSHOT = "";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

function snapshot() {
  const s = statusNow();
  return `${s.open ? "1" : "0"}|${s.text}`;
}

/* An instrument reports state; it does not pulse for attention. */
export function StatusReadout({ style }: { style?: React.CSSProperties }) {
  const snap = useSyncExternalStore(
    subscribe,
    snapshot,
    () => SERVER_SNAPSHOT,
  );

  const open = snap ? snap.startsWith("1") : null;
  const text = snap ? snap.slice(2) : "Checking";

  return (
    <span
      className="readout"
      style={style}
      {...(open === null ? {} : { "data-open": String(open) })}
    >
      <span className="readout__key label">Counter</span>
      <span className="readout__val">{text}</span>
    </span>
  );
}
