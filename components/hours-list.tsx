"use client";

import { useSyncExternalStore } from "react";
import { HOURS, WEEK, dayHours } from "@/lib/hours";

const noop = () => () => {};

/* The full week, with today marked. Today is read from the visitor's clock, so
   a prerendered page can never highlight the wrong row: the server marks none. */
export function HoursList() {
  const today = useSyncExternalStore(
    noop,
    () => new Date().getDay(),
    () => -1,
  );

  return (
    <ul className="hours">
      {WEEK.map((i) => {
        const day = HOURS[i];
        const closed = day.open == null;
        return (
          <li
            key={day.label}
            data-today={String(i === today)}
            data-closed={String(closed)}
          >
            <span className="day">{day.label}</span>
            <span>{dayHours(day)}</span>
          </li>
        );
      })}
    </ul>
  );
}
