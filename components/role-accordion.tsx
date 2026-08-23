"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/icons";
import type { Listing } from "@/lib/roles";

/* Bare-glyph accordion, one panel open at a time. The panel animates its own
   grid row rather than a measured pixel height, so nothing has to be measured
   and nothing is a box. */
export function RoleAccordion({ listings }: { listings: Listing[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="acc">
      {listings.map((role) => {
        const isOpen = open === role.slug;
        const panelId = `role-${role.slug}`;
        const btnId = `${panelId}-btn`;
        return (
          <div className="acc__item" key={role.slug}>
            <button
              className="acc__btn"
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : role.slug)}
            >
              <span>
                <span className="acc__title">{role.title}</span>
                <span className="acc__sub">
                  {role.tags.map((t) => (
                    <span className="label" key={t}>
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span className="acc__plus" aria-hidden="true"></span>
            </button>
            <div
              className="acc__panel"
              id={panelId}
              data-open={String(isOpen)}
              role="region"
              aria-labelledby={btnId}
            >
              <div>
                <div className="acc__body">
                  <p>{role.summary}</p>
                  <h4>You need</h4>
                  <ul>
                    {role.need.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  {role.useful ? (
                    <>
                      <h4>Useful, not required</h4>
                      <ul>
                        {role.useful.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <p className="disclose">
                    Role description is a placeholder pending the pharmacy&rsquo;s
                    own wording
                  </p>
                  <Link
                    className="btn btn--primary"
                    href={`/apply?role=${role.slug}`}
                  >
                    Apply for this role
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
