# Design

Recorded from the built world, not from intention. Seed `aff66747`, direction
**The Weighing Station** (grounded candidate 3 of 7, Persuade).

## Thesis

A pharmacy that compounds is a pharmacy that measures. The site is a calibrated
instrument. It refuses two things by name: the category default (white grid, green
accents, smiling-pharmacist stock photo, services cards) and its predictable opposite
(amber-bottle apothecary nostalgia).

## The one rule that governs everything

**Rules, never boxes.** Nothing on this site is a card. Structure is carried by engraved
hairlines, graduation rules, index marks, and baselines. There is no container with a
border and a background holding a heading and a paragraph — anywhere. Hover states slide
a row along its rule with `transform`; they never paint a temporary panel.

## Color

Strategy: **Committed**. `--chaar-green` owns whole regions as a field, not accents
scattered on neutral. The hero, the prescriber section, and every page's closing band are
full green fields.

| Token | Value | Role |
|---|---|---|
| `--chaar-green` | `#008454` | Field colour; owns whole sections. White on it = 4.74:1 |
| `--chaar-green-deep` | `#006c44` | Second field, lit readout text on light ground |
| `--chaar-green-soft` | `#e6f3ee` | Placeholder plate ground |
| `--chaar-gray` | `#4a4f54` | Secondary text on light |
| `--ink` | `#152321` | Body text, footer field |
| `--paper` | `#ffffff` | Raised plate |
| `--ground` | `#e8ece9` | Page ground — **cool grey-green, never cream** |
| `--rule` | `#c3cdc7` | The engraved hairline |

Light, not dark, chosen from the use scene: a patient reading on a phone in Lebanese
daylight, or standing at a lit counter.

## Type

Two faces. Both avoid the model-default list.

- **Archivo** (variable, `wdth 62–125`). Body at `wdth 100`. The display voice is the
  *same family* stretched to `wdth 112–118` via `.plate` — an instrument faceplate
  silkscreened wide, not a second font.
- **Martian Mono** — reserved strictly for measured values: quantities, tick labels,
  station numbers, times, batch fields. Never as a costume for "technical".

Display ceiling 6rem (hero caps at 4.375rem so the CTA clears the fold). Tracking floor
-0.04em. Prose measure 68ch.

## The signature

**Removed at the client's request.** The original signature was `.spine`, a graduation
rule fixed to the viewport's left edge whose index blade tracked scroll and reported it
as a measured mass. It is gone from the markup, the stylesheet, and the script.

The calibrated-rule motif survives in three places and still carries the world:
`.tare__rule` (the hero rule naming both pharmacists), `.close-band__rule`, and `.proc`
(stations hanging off one ticked bench rule). Anyone reinstating a signature element
should build it from these, not restore the fixed spine.

## Brand assets

Supplied kit, vendored as SVG to `assets/brand/`. Where it exists, it is used — nothing
is drawn to stand in for it.

| Asset | Used for |
|---|---|
| `logo-en.svg` | Header lockup, every page, 2.4rem tall |
| `logo-en-slogan.svg` | Footer lockup, carries "we care since 1950" |
| `mark-circle.svg` | Favicon |
| `mark.svg` | Oversized watermark bleeding off the closing band, 12% white |
| `circles.svg` | The hero's right column |
| `logo-ar.svg`, `mark-tag.svg` | Vendored, not yet placed |

The kit ships green + `#4A4F54`, which sinks on the ink footer and the green fields, so
those instances are knocked out with `filter: brightness(0) invert(1)` rather than
recoloured by hand — one rule, and it survives any future kit revision.

The logo's **C is a mortar and pestle**: the identity already carries the compounding
claim, which is why the hero no longer needs a photograph to make it. The mixing-circles
graphic is a trituration motion, so it rotates once every 90s (stopped under
`prefers-reduced-motion`) rather than sitting still.

## Pages

`index.html` landing · `about.html` · `team.html` the bench · `careers.html` open roles ·
`apply.html` **hidden per-role application slip**.

`apply.html` is `noindex, nofollow`, absent from every nav, and reachable only from a
role's Apply button as `apply.html?role=<slug>`. It reads the slug and dresses itself:
title, blurb, reference code, the hidden `role` field carried with the submission, and
the licence field's label, placeholder and required-ness. Slugs live in one `ROLES` map
at the top of the apply module in `app.js` — add a role there and to the careers link,
nothing else. An unrecognised slug falls back to the open application and says so
rather than rendering a form for a role that does not exist.

## Components

`.readout` live open/closed (a rule and a value, no pill, no pulsing dot) · `.tare` the
hero's calibrated rule naming both pharmacists · `.mono` formulation rows · `.proc`
stations hanging off one ruled bench · `.principals` · `.roster` + `.chip` underline
filters · `.acc` bare-glyph accordion · `.hours` · `.ph` labelled placeholder plates ·
`.disclose` placeholder disclosure line · `.mapwin` the map window.

`.mapwin` is a **live Google Maps embed**, not a drawn stand-in. It uses the keyless
`maps.google.com/maps?q=…&output=embed` form, so the address is geocoded by Google and
no coordinates are hard-coded. Tiles are lightly desaturated (`saturate(0.82)`) to seat
them in the chassis. The dark bar beneath is the only interactive chrome, so the map
itself stays pannable; a separate "Get directions" link uses `dir/?api=1&destination=`.
The address is set in English and Arabic (`.addr__ar`, `direction: rtl`).

If that legacy embed URL is ever withdrawn, the replacement is the official Maps Embed
API, which needs a billing-enabled key.

`.file` is the CV field: the native input is visually hidden but focusable, the label
triggers it, and the filename plus size is reported in markup. Validated for presence,
extension (`pdf|doc|docx`) and an 8 MB ceiling, each with its own recovery message.

## Motion

One authored entrance per surface: content rises 18–22px on `cubic-bezier(0.16,1,0.3,1)`
from an already-visible baseline. Compositing properties only. Full `prefers-reduced-motion`
and no-JS fallbacks; content is never hidden by default.

## Bans held

No eyebrow/kicker above a heading. No icon+heading+text card grid. No gradient text. No
glass or blur as decoration. No coloured `border-left` above 1px. No zero-blur block
shadows. No emoji standing in for icons — all icons are authored SVG at 1.5–1.8 stroke.
Section numbers appear only where sequence carries information (the four compounding
stations, which are not reorderable).

## Finish review

Reviewed by `impeccable-finish-reviewer` in a fresh context. First pass returned
**fix** with eight material findings; after one fix batch the verdict pass scored
**five resolved, two partial, one unresolved**, and named two regressions the batch
itself introduced. A second batch closed the two partials and both regressions.

Notable catches, all real defects that shipped and are now fixed:

- Everything below the hero rendered at `opacity: 0` — reveal depended entirely on the
  observer firing. Now guarded by a 2500ms failsafe plus a print override. A reveal
  effect can no longer be the reason content is invisible.
- Ten craft-floor-banned kickers (eyebrow above the hero `h1`, role label above every
  name). Removed; names lead.
- `--ink-45` measured ~2.7:1 and coloured day names, breadcrumbs, hints and **form
  placeholders**, which the floor names explicitly at 4.5:1. Raised to 0.75 alpha,
  ~6.5:1 on the ground.
- The map plate's placeholder disclosure was painted underneath its own opaque bar —
  the one unlabelled synthetic on a site whose discipline is labelling every synthetic.
- Martian Mono had spread to 52 label instances, contradicting this file and the
  stylesheet's own header. A `.label` class in the text face now carries label work.

**Open, and deliberately not closed:** the landing page has no evidence beat between the
hero claim and the address block. The client removed three sections there by explicit
instruction, so adding a replacement is their call, not the build's. Put to them as a
question; must not ship silently either way.

## Detector

`detect.mjs` final state across all five pages and the stylesheet: **empty result — 0
errors, 0 warnings, 0 advisories.**

Fixed along the way: three `layout-transition` warnings (hover animated `padding-left`;
now `transform: translateX`) and a `codex-grid-background` advisory on the placeholder
plate (was a two-axis field; now single-axis ruling). A second grid advisory sat on
`.spine__rule` and left with the spine.

`.mapwin`'s street grid does not trip the rule, and would be correct if it did: a map is
one of the surfaces the rule explicitly exempts.
