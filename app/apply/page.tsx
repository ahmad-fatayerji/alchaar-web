import type { Metadata } from "next";
import Link from "next/link";
import { ApplyForm } from "@/components/apply-form";
import { CheckIcon, InfoIcon } from "@/components/icons";
import { resolveRole } from "@/lib/roles";

type Search = { searchParams: Promise<{ role?: string | string[] }> };

function slugOf(role: string | string[] | undefined) {
  return Array.isArray(role) ? role[0] : role;
}

export async function generateMetadata({
  searchParams,
}: Search): Promise<Metadata> {
  const { role } = resolveRole(slugOf((await searchParams).role));
  return {
    title: `${role.title} — Apply`,
    description: "Apply for a role at Chaar Pharmacy.",
    // Reachable only from a role's Apply button; absent from every nav.
    robots: { index: false, follow: false },
  };
}

export default async function Apply({ searchParams }: Search) {
  const { role, unknown } = resolveRole(slugOf((await searchParams).role));

  return (
    <main id="main">
      {/* Head: the role this slip belongs to, read from the query string. */}
      <section className="phero field">
        <div className="wrap">
          <p className="crumbs label">
            <Link href="/careers">Careers</Link> /{" "}
            <Link href="/careers#roles">Open roles</Link> / Apply
          </p>
          <div className="phero__grid">
            <h1 className="h1 plate">{role.title}</h1>
            <div>
              <p className="lede">{role.blurb}</p>
              <p className="readout" style={{ marginTop: "1.25rem" }}>
                <span className="readout__key label">Reference</span>
                <span className="readout__val">{role.ref}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shown only when the query string names a role we do not publish. */}
      {unknown ? (
        <section className="section section--tight">
          <div className="wrap">
            <div className="callout">
              <InfoIcon />
              <span>
                That role is not open at the moment, so this has been switched to
                an open application.{" "}
                <Link className="tlink" href="/careers#roles">
                  See the roles we are hiring
                </Link>
              </span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap">
          <div className="split split--wide split--top">
            <div data-reveal>
              <h2 className="h2 plate">What happens next</h2>
              <ul className="checks">
                <li>
                  <CheckIcon />
                  <span>
                    Wassim or Rabih reads it. There is no applicant tracking
                    system here.
                  </span>
                </li>
                <li>
                  <CheckIcon />
                  <span>
                    You hear back either way, including when the answer is no.
                  </span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Licences are verified before interview, never before.</span>
                </li>
              </ul>

              <div className="mt-lg">
                <span className="label">Applying for</span>
                <p className="h3" style={{ marginTop: ".4rem" }}>
                  {role.title}
                </p>
                <Link
                  className="tlink"
                  href="/careers#roles"
                  style={{ marginTop: ".6rem" }}
                >
                  Apply for a different role instead
                </Link>
              </div>

              <div className="callout callout--plain mt-lg">
                <InfoIcon />
                <span>
                  This form has no backend connected yet. Submitting validates
                  your entries and clears the form; nothing is transmitted or
                  stored.
                </span>
              </div>
            </div>

            <ApplyForm key={role.ref} role={role} />
          </div>
        </div>
      </section>
    </main>
  );
}
