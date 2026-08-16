/* Confirmed contact and location details, held in one place so a change lands
   everywhere. The Arabic address is the form of record supplied by the client. */

export const ADDRESS_EN =
  "Opposite Othman bin Affan Mosque, adjacent to Cima Laboratories, just before Shukri Hammasni. Bechara El Khoury Highway, Beirut.";

export const ADDRESS_AR =
  "مقابل جامع عثمان بن عفّان رضي الله عنه، ملاصق لمختبرات سيما، قبل شكري حماصني، اوتوستراد بشارة الخوري، بيروت";

export const PHONE_LANDLINE = "+961 1 633 222";
export const PHONE_LANDLINE_TEL = "+9611633222";
export const PHONE_MOBILE = "+961 81 94 81 81";
export const PHONE_MOBILE_TEL = "+96181948181";
export const EMAIL = "contact@alchaarpharmacy.com";

/* WhatsApp is the channel patients actually use here. The deep link opens a
   chat with the counter; the prescription variant arrives with its purpose
   already typed. */
export const WHATSAPP = `https://wa.me/${PHONE_MOBILE_TEL.replace("+", "")}`;
export const WHATSAPP_PRESCRIPTION = `${WHATSAPP}?text=${encodeURIComponent(
  "Hello, I have a prescription I would like compounded.",
)}`;

/* Keyless Google Maps forms: the address is geocoded by Google, so no
   coordinates are hard-coded here. */
export const MAP_EMBED =
  "https://maps.google.com/maps?q=Chaar%20Pharmacy%2C%20Bechara%20El%20Khoury%2C%20Beirut%2C%20Lebanon&z=17&output=embed";

export const MAP_SEARCH = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Chaar Pharmacy ${ADDRESS_AR}`,
)}`;

export const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS_AR,
)}`;
