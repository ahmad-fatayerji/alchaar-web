import Image from "next/image";

type HoursRow = {
  dayEn: string;
  hoursEn: string;
  closed?: boolean;
};

const openingHours: HoursRow[] = [
  {
    dayEn: "Monday",
    hoursEn: "9:00 AM - 5:00 PM, 7:00 PM - 10:00 PM",
  },
  {
    dayEn: "Tuesday",
    hoursEn: "9:00 AM - 5:00 PM, 7:00 PM - 10:00 PM",
  },
  {
    dayEn: "Wednesday",
    hoursEn: "9:00 AM - 5:00 PM, 7:00 PM - 10:00 PM",
  },
  {
    dayEn: "Thursday",
    hoursEn: "9:00 AM - 5:00 PM, 7:00 PM - 10:00 PM",
  },
  {
    dayEn: "Friday",
    hoursEn: "9:00 AM - 5:00 PM, 7:00 PM - 10:00 PM",
  },
  {
    dayEn: "Saturday",
    hoursEn: "9:00 AM - 5:00 PM",
  },
  {
    dayEn: "Sunday",
    hoursEn: "Closed",
    closed: true,
  },
];

export default function Home() {
  return (
    <main className="wip-page">
      <div className="wip-background" aria-hidden="true" />

      <section className="wip-card">
        <p className="ramadan-banner">
          Ramadan Kareem |{" "}
          <span className="arabic" lang="ar" dir="rtl">
            رمضان كريم
          </span>
        </p>

        <div className="logo-row">
          <Image
            src="/chaar-logo-english.svg"
            alt="Chaar Pharmacy English logo"
            width={450}
            height={130}
            className="wip-logo"
            priority
          />
          <Image
            src="/Chaar%20Logo%20Arabic.svg"
            alt="Chaar Pharmacy Arabic logo"
            width={450}
            height={130}
            className="wip-logo"
            priority
          />
        </div>

        <div className="headline-wrap">
          <p className="construction-chip">
            Website Under Construction |{" "}
            <span className="arabic" lang="ar" dir="rtl">
              الموقع تحت الإنشاء
            </span>
          </p>
          <h1>Our new website is launching soon</h1>
          <p className="arabic" dir="rtl" lang="ar">
            نعمل حالياً على إطلاق موقع جديد بتصميم حديث وخدمات أوضح لراحتكم.
          </p>
        </div>

        <div className="info-grid info-grid-modern">
          <article className="info-card">
            <div className="section-title">
              <h2>Opening hours</h2>
              <h3 className="arabic" dir="rtl" lang="ar">
                ساعات العمل
              </h3>
            </div>

            <ul className="hours-list">
              {openingHours.map((item) => (
                <li key={item.dayEn} className="hours-row">
                  <span className="day-text">{item.dayEn}</span>
                  <span
                    className={`time-text ${item.closed ? "is-closed" : ""}`}
                  >
                    {item.hoursEn}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="info-card">
            <div className="section-title">
              <h2>Contact</h2>
              <h3 className="arabic" dir="rtl" lang="ar">
                التواصل
              </h3>
            </div>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Landline</span>
                <span className="contact-value">+961 1 633 222</span>
              </li>
              <li>
                <span className="contact-label">Mobile (with WhatsApp)</span>
                <span className="contact-value">+961 81 94 81 81</span>
              </li>
              <li>
                <span className="contact-label">Email</span>
                <span className="contact-value">contact@alchaarpharmacy.com</span>
                <span className="arabic" dir="rtl" lang="ar">
                  البريد: contact@alchaarpharmacy.com
                </span>
              </li>
            </ul>
          </article>
        </div>

        <p className="footer-note">
          Full website launch soon |{" "}
          <span className="arabic" lang="ar" dir="rtl">
            الإطلاق الكامل للموقع قريباً
          </span>
        </p>
      </section>
    </main>
  );
}
