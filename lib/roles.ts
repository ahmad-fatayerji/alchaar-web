/* The apply route is reached only from a role on /careers and is not in the nav.
   It reads ?role= and dresses itself for that role. Add a role here and to the
   listing below and it works everywhere; the slug is the link. */

export type Role = {
  ref: string;
  title: string;
  blurb: string;
  licence: string;
  licenceRequired: boolean;
  exp: string;
};

export const ROLES: Record<string, Role> = {
  "compounding-pharmacist": {
    ref: "CP-01",
    title: "Compounding pharmacist",
    blurb:
      "Full time, on site, licensed. You will prepare formulations at the bench alongside Wassim and Rabih.",
    licence: "Licence number",
    licenceRequired: true,
    exp: "Compounding experience",
  },
  "pharmacy-technician": {
    ref: "PT-02",
    title: "Pharmacy technician, preparation",
    blurb:
      "Full time, on site, certified. You will support the bench: weighing, labelling, and keeping the records straight.",
    licence: "Certification number",
    licenceRequired: false,
    exp: "Relevant experience",
  },
  "relief-pharmacist": {
    ref: "RP-03",
    title: "Relief pharmacist, counter",
    blurb:
      "Part time, on site, licensed. Counter dispensing and patient counselling, with a route into preparation work.",
    licence: "Licence number",
    licenceRequired: true,
    exp: "Dispensing experience",
  },
  open: {
    ref: "OPEN",
    title: "Open application",
    blurb:
      "No specific vacancy. Tell us what you do and why this bench, and we will keep it on file.",
    licence: "Licence or certification number",
    licenceRequired: false,
    exp: "What you do",
  },
};

/* An unrecognised slug falls back to the open application and says so, rather
   than rendering a form for a role that does not exist. */
export function resolveRole(slug: string | undefined): {
  role: Role;
  unknown: boolean;
} {
  const key = slug || "open";
  const role = ROLES[key];
  return role ? { role, unknown: false } : { role: ROLES.open, unknown: true };
}

/* The published vacancies, in the order they appear on /careers. */
export type Listing = {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  need: string[];
  useful?: string[];
};

export const LISTINGS: Listing[] = [
  {
    slug: "compounding-pharmacist",
    title: "Compounding pharmacist",
    tags: ["Full time", "Licensed", "On site"],
    summary:
      "You will prepare formulations at the bench alongside Wassim and Rabih: verifying prescriptions, weighing actives and excipients, preparing the form, and keeping the batch record that makes the next refill identical.",
    need: [
      "A current pharmacist licence valid in Lebanon",
      "Practical compounding experience, or training you are ready to use again",
      "Comfort calling a prescriber to resolve an ambiguous formulation",
      "The discipline to record a quantity as it is taken, every time",
    ],
    useful: ["Sterile preparation experience", "Paediatric dosing experience"],
  },
  {
    slug: "pharmacy-technician",
    title: "Pharmacy technician, preparation",
    tags: ["Full time", "Certified", "On site"],
    summary:
      "You will support the bench: preparing the station, weighing under supervision, labelling, and maintaining the balance and the records.",
    need: [
      "Pharmacy technician certification",
      "Careful, repeatable hands and honest record keeping",
      "Willingness to be trained on compounding technique",
    ],
  },
  {
    slug: "relief-pharmacist",
    title: "Relief pharmacist, counter",
    tags: ["Part time", "Licensed", "On site"],
    summary:
      "Counter dispensing and patient counselling on a part-time or relief basis, with the option to train into preparation work over time.",
    need: [
      "A current pharmacist licence valid in Lebanon",
      "Patient-facing experience",
    ],
  },
];
