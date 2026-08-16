"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StatusReadout } from "@/components/status-readout";
import logoEn from "@/public/brand/logo-en.svg";

/* Careers is deliberately absent: like the application slip, it is reachable
   only from the team page's "Open roles" button, not from the nav. */
const NAV = [
  { href: "/", label: "Dispensary" },
  { href: "/about", label: "About" },
  { href: "/team", label: "The bench" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stick = () => setStuck(window.scrollY > 8);
    stick();
    window.addEventListener("scroll", stick, { passive: true });
    return () => window.removeEventListener("scroll", stick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // A route change means the menu has done its job — including a back gesture,
  // which never goes through a link's own handler.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* The application slip is not in the nav; it belongs to Careers, and its
     header sends you back to the roles rather than to the counter. */
  const onApply = pathname === "/apply";
  const cta = onApply
    ? { href: "/careers#roles", label: "All roles" }
    : { href: "/#visit", label: "Visit us" };

  const current = (href: string) =>
    pathname === href ? ("page" as const) : undefined;

  return (
    <header className="header" data-stuck={String(stuck)}>
      <div className="wrap header__inner">
        <Link className="logo" href="/" aria-label="Chaar Pharmacy, home">
          <Image
            className="logo__img"
            src={logoEn}
            alt="Chaar Pharmacy"
            width={112}
            height={45}
            priority
          />
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header__end">
          <StatusReadout />
          <Link className="btn btn--primary" href={cta.href}>
            {cta.label}
          </Link>
          <button
            ref={burger}
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="mnav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className="mobile-nav" id="mnav" data-open={String(open)}>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current(item.href)}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="btn btn--primary"
          href={cta.href}
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </Link>
        <StatusReadout style={{ marginTop: "1.25rem" }} />
      </div>
    </header>
  );
}
