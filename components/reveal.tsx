"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* One orchestrated entrance per section group.
   Content is visible by default for anyone who never gets an observer: the
   hiding rule is armed by `html.reveal-on`, which REVEAL_BOOTSTRAP adds only
   when there is an observer to take it off again. */
export const REVEAL_BOOTSTRAP = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver" in window){document.documentElement.classList.add("reveal-on")}}catch(e){}})();`;

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!els.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("reveal-on");
      return;
    }
    document.documentElement.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    els.forEach((el) => {
      if (!el.style.getPropertyValue("--d")) {
        const i = Array.prototype.indexOf.call(el.parentNode!.children, el);
        el.style.setProperty("--d", `${Math.min(i, 6) * 65}ms`);
      }
      io.observe(el);
    });

    /* Failsafe. A reveal effect must never be the reason content is
       permanently invisible — to a reader, a print, a screenshot, or a
       crawler. If anything is still hidden a few seconds in, show it. */
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        if (!el.classList.contains("is-in")) {
          el.style.setProperty("--d", "0ms");
          el.classList.add("is-in");
        }
      });
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
