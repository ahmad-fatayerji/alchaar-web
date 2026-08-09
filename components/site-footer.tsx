import Image from "next/image";
import Link from "next/link";
import { Year } from "@/components/year";
import {
  EMAIL,
  MAP_SEARCH,
  PHONE_LANDLINE,
  PHONE_LANDLINE_TEL,
  PHONE_MOBILE,
  PHONE_MOBILE_TEL,
} from "@/lib/site";
import logoEn from "@/public/brand/logo-en.svg";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <Link className="logo logo--light" href="/">
              <Image
                className="logo__img logo__img--footer"
                src={logoEn}
                alt="Chaar Pharmacy"
                width={150}
                height={60}
              />
            </Link>
            <p className="footer__slogan">we care since 1950</p>
            <p className="footer__blurb">
              A single-branch pharmacy in Lebanon that prepares compounded
              formulations on the premises.
            </p>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li>
                <Link href="/">Dispensary</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/team">The bench</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>At the counter</h4>
            <ul>
              <li>
                <Link href="/about">How we work</Link>
              </li>
              <li>
                <Link href="/team">The bench</Link>
              </li>
              <li>
                <Link href="/#visit">Hours and address</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${PHONE_LANDLINE_TEL}`}>{PHONE_LANDLINE}</a>
              </li>
              <li>
                <a href={`tel:${PHONE_MOBILE_TEL}`}>{PHONE_MOBILE}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={MAP_SEARCH} target="_blank" rel="noopener">
                  Bechara El Khoury, Beirut
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            &copy; <Year rendered={new Date().getFullYear()} /> Chaar Pharmacy
          </span>
          <span>Beirut, Lebanon</span>
        </div>
      </div>
    </footer>
  );
}
