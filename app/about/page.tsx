import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Chaar Pharmacy compounds on the premises, how a preparation is made and recorded, and the standards the bench holds itself to.",
};

const VALUES = [
  {
    title: "The compounder is named",
    n: "01",
    body: "Every preparation is made by a pharmacist you can name and speak to. Wassim Chaar and Rabih Chaar do this work themselves; it is not sent out and it is not delegated to someone the patient never meets.",
  },
  {
    title: "Every quantity is recorded",
    n: "02",
    body: "Weights are read and written as they are taken, not reconstructed from memory afterwards. The batch record is what makes the second preparation identical to the first.",
  },
  {
    title: "The prescriber is consulted, not guessed at",
    n: "03",
    body: "Where a formulation is ambiguous, we call. A compounded preparation made from an assumption is a preparation nobody should dispense.",
  },
  {
    title: "Lead time is told honestly",
    n: "04",
    body: "Some preparations take hours and some take days. A patient who is told the truth can plan; a patient who is told what they want to hear cannot.",
  },
];

export default function About() {
  return (
    <main id="main">
      <section className="phero">
        <div className="wrap">
          <p className="crumbs label">
            <Link href="/">Dispensary</Link> / About
          </p>
          <div className="phero__grid">
            <h1 className="h1 plate">
              Compounding is not a service we added. It is the reason the bench
              exists.
            </h1>
            <div>
              <p className="lede">
                Serving the same neighbourhood since 1950. Two pharmacists, one
                preparation room, and a record of every quantity that has ever
                gone into a patient&rsquo;s formulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="split">
            <div className="split__media" data-reveal>
              <span
                className="ph"
                role="img"
                aria-label="Placeholder: the preparation room"
                data-ph="Placeholder — preparation room"
              ></span>
            </div>
            <div data-reveal>
              <h2 className="h2 plate">What compounding actually means</h2>
              <div className="prose mt-lg">
                <p>
                  Manufactured medicine is made for the average patient. It is
                  made in fixed strengths, in a fixed form, with a fixed set of
                  excipients, because that is what mass production requires and
                  it serves most people well.
                </p>
                <p>
                  Compounding is what happens when a patient is not the average
                  patient. A pharmacist takes the active ingredient and prepares
                  it to the strength, the form, and the composition that this
                  prescription actually calls for.
                </p>
                <p>
                  It is ordinary pharmaceutical practice, older than the industry
                  that displaced it, and it requires a licensed pharmacist, a
                  calibrated balance, and a written record. All three are here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">What the bench holds itself to</h2>
              <p>
                Four commitments. They are the reason a prescriber can send a
                patient here and the reason a refill in six months matches the
                one from today.
              </p>
            </div>
          </div>

          <div className="values">
            {VALUES.map((v) => (
              <div className="value" key={v.n} data-reveal>
                <h3 className="h3">{v.title}</h3>
                <p className="label">{v.n}</p>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">How the pharmacy got here</h2>
              <p>A short record of the bench.</p>
            </div>
          </div>
          <ul className="timeline">
            <li data-reveal>
              <span className="year">1950</span>
              <div>
                <h3 className="h3">Chaar Pharmacy opens</h3>
                <p>
                  The date the pharmacy has carried in its own mark ever since:{" "}
                  <em>we care since 1950</em>. Seventy-five years on the same
                  trade.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className="year">0000</span>
              <div>
                <h3 className="h3">The preparation room is built</h3>
                <p>
                  Placeholder entry. Replace with the year compounding moved
                  on-site and what equipment made it possible.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className="year">0000</span>
              <div>
                <h3 className="h3">Wassim and Rabih at the bench</h3>
                <p>
                  Placeholder entry. Replace with the real milestone and its
                  date.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className="year">Today</span>
              <div>
                <h3 className="h3">One branch, one bench</h3>
                <p>
                  Still a single location, which is deliberate: the pharmacists
                  who compound are the pharmacists at the counter.
                </p>
              </div>
            </li>
          </ul>
          <p className="disclose">
            1950 is confirmed from the brand mark; the remaining dated entries
            are placeholders
          </p>
        </div>
      </section>

      <section className="section close-band field">
        <div className="wrap">
          <div className="close-band__rule" aria-hidden="true"></div>
          <h2 className="h1 plate" data-reveal>
            Meet the people who
            <br />
            make the preparation.
          </h2>
          <div className="btn-row" data-reveal>
            <Link className="btn btn--light" href="/team">
              The bench
              <ArrowIcon />
            </Link>
            <Link className="btn btn--onfield" href="/#visit">
              Hours and address
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
