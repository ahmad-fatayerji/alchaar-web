/* Trading hours: single source of truth.
   Confirmed from the pharmacy's own published hours.
   Index 0 = Sunday. `open: null` means closed that day. 24h clock. */

export type Day = {
  label: string;
  open: number | null;
  close: number | null;
};

export const HOURS: Day[] = [
  { label: "Sunday", open: null, close: null },
  { label: "Monday", open: 9, close: 21 },
  { label: "Tuesday", open: 9, close: 21 },
  { label: "Wednesday", open: 9, close: 21 },
  { label: "Thursday", open: 9, close: 21 },
  { label: "Friday", open: 9, close: 21 },
  { label: "Saturday", open: 9, close: 19 },
];

/* HOURS is indexed by getDay() (0 = Sunday) so the status logic stays simple,
   but the list reads Monday first the way the week is actually kept here —
   otherwise the single closed day leads it. */
export const WEEK = [1, 2, 3, 4, 5, 6, 0];

export function fmt(h: number): string {
  const s = h >= 12 ? "pm" : "am";
  const d = h % 12 === 0 ? 12 : h % 12;
  return `${d}${s}`;
}

export function dayHours(day: Day): string {
  return day.open == null || day.close == null
    ? "Closed"
    : `${fmt(day.open)} — ${fmt(day.close)}`;
}

export type Status = { open: boolean; text: string };

export function statusNow(now: Date = new Date()): Status {
  const day = HOURS[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (!day || day.open == null || day.close == null) {
    return { open: false, text: "Closed today" };
  }
  const o = day.open * 60;
  const c = day.close * 60;
  if (mins < o) return { open: false, text: `Opens ${fmt(day.open)}` };
  if (mins >= c) return { open: false, text: "Closed" };
  const left = c - mins;
  if (left <= 60) return { open: true, text: `Closing in ${left} min` };
  return { open: true, text: `Open until ${fmt(day.close)}` };
}
