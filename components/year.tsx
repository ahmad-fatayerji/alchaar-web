"use client";

import { useSyncExternalStore } from "react";

/* Never resubscribes: the year does not change while the page is open, it just
   has to be read from the visitor's clock rather than from the build's. */
const noop = () => () => {};

export function Year({ rendered }: { rendered: number }) {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => rendered,
  );
  return <>{year}</>;
}
