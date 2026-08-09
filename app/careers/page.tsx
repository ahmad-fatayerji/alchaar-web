import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { RoleAccordion } from "@/components/role-accordion";
import { LISTINGS } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Licensed pharmacist and pharmacy technician roles at Chaar Pharmacy, a compounding pharmacy in Lebanon. Apply to work at the bench.",
};

/* The sequence carries information here — these are the four things that are
   true about the work, read in order — so the stations are numbered. */
const DIFFERENCES = [
  {
    n: "01",
    title: "You compound, daily",
    body: "Preparation is the core of the job, not an occasional exception squeezed between dispensing runs.",
  },
  {
    n: "02",
    title: "You speak to prescribers",
    body: "When a formulation is ambiguous you make the call yourself. Clinical judgement is part of the role, not escalated away from it.",
  },
  {
    n: "03",
    title: "Your name is on it",
    body: "A small bench means the work is attributable. That is a responsibility and it is also the reason the work is worth doing.",
  },
  {
    n: "04",
    title: "One branch, no rotation",
    body: "You work with the same two pharmacists and the same patients, and you learn both properly.",
  },
];

export default function Careers() {
  return (
    <main id="main">
      <section className="phero">
        <div className="wrap">
          <p className="crumbs label">
            <Link href="/">Dispensary</Link> / Careers
          </p>
          <div className="phero__grid">
            <h1 className="h1 plate">
              Most pharmacy jobs are counting. This one is preparing.
            </h1>
            <div>
              <p className="lede">
                If you trained to compound and have not touched a balance since,
                this is the bench where that changes.
              </p>
              <div className="btn-row mt-lg">
                <Link className="btn btn--primary" href="#roles">
                  See open roles
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">
                What is actually different about working here
              </h2>
              <p>No perks list. Three things that are true about the work itself.</p>
            </div>
          </div>
          <div className="proc">
            {DIFFERENCES.map((d) => (
              <div className="proc__step" key={d.n} data-reveal>
                <h3 className="h3">{d.title}</h3>
                <p className="label">{d.n}</p>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section panel" id="roles">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">Open roles</h2>
              <p>Read the role, then apply on the form below.</p>
            </div>
          </div>

          <RoleAccordion listings={LISTINGS} />
        </div>
      </section>

      <section className="section close-band field">
        <div className="wrap">
          <div className="close-band__rule" aria-hidden="true"></div>
          <h2 className="h1 plate" data-reveal>
            Not the right role,
            <br />
            but the right bench?
          </h2>
          <p className="lede" data-reveal>
            Send an open application. A pharmacy this size hires when the person
            turns up, not when the vacancy does.
          </p>
          <div className="btn-row" data-reveal>
            <Link className="btn btn--light" href="/apply?role=open">
              Open application
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
