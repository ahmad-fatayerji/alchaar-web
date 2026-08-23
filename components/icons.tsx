/* Authored SVG at 1.5–1.8 stroke. No emoji stands in for an icon anywhere. */

export function ArrowIcon({ size }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...(size ? { width: size, height: size } : {})}
    >
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
