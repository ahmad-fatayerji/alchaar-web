import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "The bench",
  description:
    "Wassim Chaar and Rabih Chaar compound at the bench. Meet the pharmacists and the counter team at Chaar Pharmacy.",
};

const ROSTER = [
  {
    role: "Pharmacy technician · Preparation",
    body: "Assists at the bench with weighing, trituration and labelling.",
  },
  {
    role: "Pharmacist · Counter",
    body: "Dispensing, patient counselling, and prescription intake.",
  },
  {
    role: "Pharmacy assistant · Counter",
    body: "Front of house, stock, and collection.",
  },
  {
    role: "Records · Administration",
    body: "Batch records, ordering, and prescriber correspondence.",
  },
];

export default function Team() {
  return (
    <main id="main">
      <section className="phero field">
        <div className="wrap">
          <p className="crumbs label">
            <Link href="/">Dispensary</Link> / The bench
          </p>
          <div className="phero__grid">
            <h1 className="h1 plate">
              Two pharmacists compound here. Both of them have names.
            </h1>
            <div>
              <p className="lede">
                Ask who made your preparation and you will get an answer, not a
                department.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="principals">
            <article className="principal" data-reveal>
              <div className="principal__photo">
                <span
                  className="ph"
                  role="img"
                  aria-label="Placeholder portrait of Wassim Chaar"
                  data-ph="Placeholder — portrait"
                ></span>
              </div>
              <div className="stack-sm">
                <h3>Wassim Chaar</h3>
                <p className="label">Compounding pharmacist</p>
                <p>
                  Works the bench and takes the prescriber calls where a dose has
                  to be calculated rather than looked up. Verifies every
                  formulation before it is weighed.
                </p>
                <p className="disclose">Placeholder biography</p>
              </div>
            </article>
            <article className="principal" data-reveal>
              <div className="principal__photo">
                <span
                  className="ph"
                  role="img"
                  aria-label="Placeholder portrait of Rabih Chaar"
                  data-ph="Placeholder — portrait"
                ></span>
              </div>
              <div className="stack-sm">
                <h3>Rabih Chaar</h3>
                <p className="label">Compounding pharmacist</p>
                <p>
                  Works the bench and keeps the batch records. If a patient
                  returns in six months for the same preparation, the record is
                  what makes it the same.
                </p>
                <p className="disclose">Placeholder biography</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">The rest of the counter</h2>
              <p>The people you will actually meet when you walk in.</p>
            </div>
            <span className="meas">04 people</span>
          </div>

          <div className="roster">
            {ROSTER.map((m) => (
              <article className="member" key={m.role} data-reveal>
                <div className="member__photo">
                  <span
                    className="ph"
                    role="img"
                    aria-label="Placeholder portrait"
                    data-ph="Placeholder"
                  ></span>
                </div>
                <div className="stack-sm">
                  <h3 className="h3">Team member name</h3>
                  <p className="label">{m.role}</p>
                  <p>{m.body}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="disclose">
            The four roles above are placeholders; only Wassim Chaar and Rabih
            Chaar are confirmed
          </p>
        </div>
      </section>

      <section className="section close-band field">
        <div className="wrap">
          <div className="close-band__rule" aria-hidden="true"></div>
          <h2 className="h1 plate" data-reveal>
            There is room at the bench
            <br />
            for one more pharmacist.
          </h2>
          <div className="btn-row" data-reveal>
            <Link className="btn btn--light" href="/careers">
              Open roles
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
