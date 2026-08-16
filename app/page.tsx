import Image from "next/image";
import Link from "next/link";
import { HoursList } from "@/components/hours-list";
import { ArrowIcon } from "@/components/icons";
import {
  ADDRESS_AR,
  ADDRESS_EN,
  EMAIL,
  MAP_DIRECTIONS,
  MAP_EMBED,
  MAP_SEARCH,
  PHONE_LANDLINE,
  PHONE_LANDLINE_TEL,
  PHONE_MOBILE,
  WHATSAPP,
  WHATSAPP_PRESCRIPTION,
} from "@/lib/site";
import mark from "@/public/brand/mark.svg";

/* The four entries are the confirmed operating scope from PRODUCT.md: doses
   and forms that manufactured stock does not cover. Nothing here is an
   invented claim. */
const MONOGRAPH = [
  {
    meas: "Dose",
    title: "Paediatric and fractional strengths",
    body: "When the strength your prescriber wrote sits between two manufactured tablets, the preparation is made at the strength written, not the nearest one.",
    val: "as written",
  },
  {
    meas: "Excipient",
    title: "Allergen and excipient exclusions",
    body: "Lactose, gluten, a dye, a preservative — when the excipient is the thing your body refuses, the formulation is prepared without it.",
    val: "0 mg",
  },
  {
    meas: "Supply",
    title: "Discontinued formulations",
    body: "A medicine withdrawn from manufacture is not a medicine that stopped working. Where the active ingredient is available, it is prepared again.",
    val: "to record",
  },
  {
    meas: "Form",
    title: "Alternate delivery forms",
    body: "A capsule that has to become a suspension, a tablet that has to become a topical. The form changes; the dose does not.",
    val: "same dose",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: "Chaar Pharmacy",
  url: "https://alchaarpharmacy.com/",
  slogan: "we care since 1950",
  telephone: PHONE_LANDLINE_TEL,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Bechara El Khoury Highway, opposite Othman bin Affan Mosque, adjacent to Cima Laboratories",
    addressLocality: "Beirut",
    addressCountry: "LB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "19:00",
    },
  ],
  hasMap: MAP_SEARCH,
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* ============ HERO ============ */}
      <section className="hero field">
        <div className="wrap">
          <div className="hero__grid">
            <div className="hero__copy">
              <h1
                className="hero__title plate"
                data-load
                style={{ "--d": "80ms" } as React.CSSProperties}
              >
                We do not just
                <br />
                hand you the box. <em>We make what is in it.</em>
              </h1>
              <p
                className="lede"
                data-load
                style={{ "--d": "160ms" } as React.CSSProperties}
              >
                Most pharmacies dispense what a factory already decided. When the
                dose does not exist, when the excipient is the thing your body
                refuses, when the strength was discontinued — the preparation has
                to be made. We make it here, on the premises.
              </p>

              <div
                className="tare"
                data-load
                style={{ "--d": "240ms" } as React.CSSProperties}
              >
                <div className="tare__rule">
                  <span className="tare__mark"></span>
                </div>
                <div className="tare__names">
                  <b>Wassim Chaar</b>
                  <span>Compounding pharmacist</span>
                  <b>Rabih Chaar</b>
                  <span>Compounding pharmacist</span>
                </div>
              </div>

              <div
                className="btn-row mt-lg"
                data-load
                style={{ "--d": "320ms" } as React.CSSProperties}
              >
                <Link className="btn btn--light" href="#visit">
                  Visit the counter
                  <ArrowIcon />
                </Link>
                <Link className="btn btn--onfield" href="/about">
                  How we work
                </Link>
              </div>
            </div>

            <div
              className="hero__side"
              data-load
              style={{ "--d": "400ms" } as React.CSSProperties}
            >
              {/* The brand's own mark: the C as a mortar and pestle. Real brand
                  material, not a placeholder; swapped in for the mixing circles
                  at the client's request. */}
              <Image
                className="hero__circles"
                src={mark}
                alt=""
                aria-hidden="true"
                width={406}
                height={406}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE PRINCIPALS ============ */}
      <section className="section">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">
                The person who prepares it is a person you can name
              </h2>
              <p>
                This is the whole difference. A chain sends the preparation
                somewhere else, to someone you will never meet. Here, the two
                people who compound are the two people behind the counter.
              </p>
            </div>
            <Link className="tlink" href="/team">
              The full bench
              <ArrowIcon size={14} />
            </Link>
          </div>

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
                <p>
                  Prepares and verifies formulations at the bench, and takes the
                  prescriber calls where the dose has to be worked out rather
                  than looked up.
                </p>
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
                <p>
                  Prepares and verifies formulations at the bench, and keeps the
                  batch records that make a repeat preparation identical to the
                  first one.
                </p>
              </div>
            </article>
          </div>
          <p className="disclose">
            Portraits and biographies are placeholders pending real photography
          </p>
        </div>
      </section>

      {/* ============ THE MONOGRAPH ============
          What the bench prepares, set as pharmacopoeia rows on the .mono
          component. */}
      <section className="section">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 className="h2 plate">What the bench prepares</h2>
              <p>
                The preparations manufactured stock does not cover. Bring the
                prescription; if it can be compounded, it is compounded here.
              </p>
            </div>
            <Link className="tlink" href="/about">
              How we work
              <ArrowIcon size={14} />
            </Link>
          </div>

          <div className="mono">
            {MONOGRAPH.map((row) => (
              <div className="mono__row" data-reveal key={row.meas}>
                <span className="meas">{row.meas}</span>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
                <span className="mono__val">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISIT ============ */}
      <section className="section" id="visit">
        <div className="wrap">
          <div className="split">
            <div data-reveal>
              <h2 className="h2 plate">Come to the counter</h2>
              <p className="prose mt-lg">
                One branch, one bench, one set of hours. Bring the prescription,
                or call ahead if the preparation needs lead time and we will tell
                you honestly how long.
              </p>

              <div className="stack-md mt-lg">
                <div>
                  <span className="label">Where we are</span>
                  <address className="addr" style={{ marginTop: ".5rem" }}>
                    <p className="h3">{ADDRESS_EN}</p>
                    <p className="addr__ar" style={{ marginTop: ".75rem" }}>
                      {ADDRESS_AR}
                    </p>
                  </address>
                </div>
                <div>
                  <span className="label">Telephone</span>
                  <p className="h3" style={{ marginTop: ".35rem" }}>
                    <a href={`tel:${PHONE_LANDLINE_TEL}`}>{PHONE_LANDLINE}</a>
                  </p>
                  <p style={{ marginTop: ".5rem" }}>
                    <a
                      className="tlink"
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener"
                    >
                      {PHONE_MOBILE} — mobile &amp; WhatsApp
                    </a>
                  </p>
                </div>
                <div>
                  <span className="label">Prescription</span>
                  <p style={{ marginTop: ".35rem" }}>
                    Photograph the prescription and send it ahead; we will tell
                    you whether it can be prepared and how long it needs.
                  </p>
                  <p style={{ marginTop: ".5rem" }}>
                    <a
                      className="tlink"
                      href={WHATSAPP_PRESCRIPTION}
                      target="_blank"
                      rel="noopener"
                    >
                      Send it on WhatsApp
                      <ArrowIcon size={14} />
                    </a>
                  </p>
                </div>
                <div>
                  <span className="label">Email</span>
                  <p className="h3" style={{ marginTop: ".35rem" }}>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                </div>
                <a
                  className="tlink"
                  href={MAP_DIRECTIONS}
                  target="_blank"
                  rel="noopener"
                >
                  Get directions
                  <ArrowIcon size={14} />
                </a>
              </div>
            </div>

            <div data-reveal>
              <figure className="mapwin">
                <iframe
                  className="mapwin__map"
                  src={MAP_EMBED}
                  title="Map showing Chaar Pharmacy on Bechara El Khoury, Beirut"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
                <figcaption>
                  <a
                    className="mapwin__bar"
                    href={MAP_SEARCH}
                    target="_blank"
                    rel="noopener"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowIcon />
                  </a>
                </figcaption>
              </figure>

              <span
                className="label"
                style={{ display: "block", marginTop: "2rem" }}
              >
                Trading hours
              </span>
              <HoursList />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSE ============ */}
      <section className="section close-band field">
        <Image
          className="close-band__mark"
          src={mark}
          alt=""
          aria-hidden="true"
        />
        <div className="wrap">
          <div className="close-band__rule" aria-hidden="true"></div>
          <h2 className="h1 plate" data-reveal>
            Bring us the prescription
            <br />
            nobody else could fill.
          </h2>
          <div className="btn-row" data-reveal>
            <a
              className="btn btn--light"
              href={WHATSAPP_PRESCRIPTION}
              target="_blank"
              rel="noopener"
            >
              Send it on WhatsApp
              <ArrowIcon />
            </a>
            <Link className="btn btn--onfield" href="#visit">
              Visit the counter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
