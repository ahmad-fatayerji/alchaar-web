# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, hand-authored, no build step. User's explicit choice: four plain HTML
pages sharing one stylesheet and one script, deployable to any static host.

## Users

Primary: patients and walk-in customers in a single Lebanese neighbourhood who need a
prescription filled or a formulation prepared. They arrive by name and reputation rather
than search, often for a recurring need, and frequently on behalf of someone else — a
parent, a child, a patient at home.

Secondary: prescribing physicians and clinics who need a pharmacy that can actually
compound what they write, and who need to trust the preparation.

Tertiary: licensed pharmacists and pharmacy technicians evaluating whether to work here.

## Product Purpose

Chaar Pharmacy is a single-branch pharmacy in Lebanon that prepares compounded
formulations in-house. The site exists so that a first-time visitor understands within
seconds that this is a pharmacy that *makes* medicine, not only one that dispenses it —
and so that patients, prescribers, and prospective staff can each find their route.

Success: a prescriber sends a compounding request; a patient walks in or calls; a
qualified pharmacist applies.

## Positioning

Compounding prepared in-house by two named pharmacists, Wassim Chaar and Rabih Chaar.
A chain cannot truthfully claim this: chains dispense manufactured stock, and the
preparation, if it happens at all, happens somewhere else, by someone the patient will
never meet. Here the people who prepare the formulation are the people behind the
counter, and they are nameable.

## Operating Context

- Walk-in counter trade plus prescription intake from local physicians.
- A preparation area/lab on the premises where formulations are actually made — this is
  the physical fact the whole site rests on.
- Recurring/chronic patients returning for refills of a preparation specific to them.
- Doses and forms that manufactured stock does not cover: paediatric strengths, allergen
  and excipient exclusions, discontinued formulations, alternate delivery forms.

## Capabilities and Constraints

- Confirmed: in-house compounding; two compounding pharmacists (Wassim Chaar, Rabih Chaar).
- Confirmed: hiring licensed pharmacists and pharmacy technicians; the careers page needs
  a real application form (backend to be connected by the user).
- CONFIRMED location (supplied by the client from the pharmacy's Google Maps listing):
  Bechara El Khoury Highway, Beirut — opposite Othman bin Affan Mosque, adjacent to Cima
  Laboratories, just before Shukri Hammasni. Arabic form of record:
  مقابل جامع عثمان بن عفّان رضي الله عنه، ملاصق لمختبرات سيما، قبل شكري حماصني، اوتوستراد بشارة الخوري، بيروت
  Google entity id `/g/1td9mx2t`.
- CONFIRMED founding year: **1950**, taken from the brand's own slogan lockup
  ("we care since 1950"). 75 years of trading as of 2026.
- CONFIRMED contact, from the pharmacy's own published holding page:
  landline **+961 1 633 222**, mobile/WhatsApp **+961 81 94 81 81**,
  email **contact@alchaarpharmacy.com**.
- CONFIRMED trading hours: Monday–Friday 9:00–21:00, Saturday 9:00–19:00,
  **Sunday closed**. Held in one `HOURS` array at the top of `assets/app.js`.
- UNDECIDED — must not be invented as fact: licence/registration numbers, delivery
  radius, insurance and third-party payer arrangements, pricing.
- OPEN QUESTION — the Google Maps listing and the git repository both read
  **Al-Chaar** (`alchaar-web`), while the supplied logo lockup reads **CHAAR
  PHARMACY**. The site uses "Chaar Pharmacy" throughout, matching the logo. Confirm
  which is the trading name before launch.
- All photography is a placeholder; no real imagery exists yet.

## Brand Commitments

- Name: **Chaar Pharmacy**.
- Binding palette, supplied by the user and not to be substituted:
  `--chaar-green: #008454`, `--chaar-green-deep: #006c44`, `--chaar-green-soft: #e6f3ee`,
  `--chaar-gray: #4a4f54`, `--ink: #152321`, `--paper: #ffffff`.
- Two named principals: Wassim Chaar and Rabih Chaar, both compounding pharmacists.
- Language: English.
- **Supplied brand kit**, vendored to `assets/brand/` as SVG:
  `logo-en.svg` (primary lockup), `logo-en-slogan.svg` (lockup + slogan),
  `logo-ar.svg` (Arabic lockup), `mark.svg` / `mark-circle.svg` / `mark-tag.svg`
  (the C), `circles.svg` (mixing circles).
- The logo's **C is a mortar and pestle** — the identity already states the
  compounding positioning. Nothing drawn may stand in for it.
- Slogan: **"we care since 1950"**.
- Kit colours are `#008454`, `#008755` and `#4A4F54`, confirming the binding palette.

## Evidence on Hand

- Real: the two principals' names and their role as the compounders; the brand palette.
- Absent, and not to be fabricated as claims: testimonials, patient counts, years in
  operation, physician endorsements, awards, accreditation numbers, prices.
- Placeholder-and-label: all photography, all team members beyond the two principals,
  all job listings, all street/contact details, all trading hours.

## Product Principles

1. **The preparation is the product.** Show the making, not stock imagery of pills.
2. **Name the people.** The differentiator is that the compounder is a person you can
   name; anonymity would erase the entire position.
3. **A pharmacy is a place of record.** Precision, legibility, and correctness read as
   competence here; decoration reads as risk.
4. **Never invent a clinical or commercial claim.** Placeholders are marked as such and
   handed back for replacement.
5. **Three audiences, three routes.** Patient, prescriber, and applicant must each find
   their path without reading the others' content.

## Accessibility & Inclusion

Patients include older adults and people managing chronic illness, frequently reading on
a phone. WCAG 2.1 AA is the floor: 4.5:1 body contrast, real focus states, keyboard-
operable navigation and forms, and no essential information carried by colour alone.
