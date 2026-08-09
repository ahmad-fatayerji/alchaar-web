"use client";

import { useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";
import type { Role } from "@/lib/roles";

const MAX_CV_BYTES = 8 * 1024 * 1024;
const CV_EXT = /\.(pdf|doc|docx)$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "licence"
  | "experience"
  | "cv"
  | "start"
  | "consent";

type Errors = Partial<Record<FieldName, string>>;

/* Validated client-side so errors name the problem and the recovery.
   No endpoint is wired yet — see the PLACEHOLDER below. */
export function ApplyForm({ role }: { role: Role }) {
  const form = useRef<HTMLFormElement>(null);
  const cvInput = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [cv, setCv] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  /* A different role is a different slip: the page keys this component on the
     reference, so a role change remounts it and nothing already entered for
     the previous role survives. */

  const clear = (field: FieldName) =>
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const focusField = (field: FieldName) => {
    const el = form.current?.elements.namedItem(field);
    if (el instanceof HTMLElement) el.focus();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    const text = (k: FieldName) => String(data.get(k) ?? "").trim();

    if (!text("name")) next.name = "This field is required.";

    const email = text("email");
    if (!email) {
      next.email = "This field is required.";
    } else if (!EMAIL_RE.test(email)) {
      next.email = "Enter an email address we can reply to, e.g. name@example.com.";
    }

    if (role.licenceRequired && !text("licence")) {
      next.licence = "This field is required.";
    }

    if (!text("experience")) next.experience = "This field is required.";

    if (!cv) {
      next.cv = "Attach your CV as a PDF or Word document.";
    } else if (!CV_EXT.test(cv.name)) {
      next.cv =
        "That file type is not accepted. Save your CV as PDF, DOC or DOCX and attach it again.";
    } else if (cv.size > MAX_CV_BYTES) {
      next.cv = `That file is ${prettySize(cv.size)}. The limit is 8 MB — try exporting a smaller PDF.`;
    }

    if (!data.get("consent")) next.consent = "Please confirm before sending.";

    setErrors(next);

    const order: FieldName[] = [
      "name",
      "email",
      "licence",
      "experience",
      "cv",
      "consent",
    ];
    const bad = order.find((f) => next[f]);
    if (bad) {
      setStatus("");
      focusField(bad);
      return;
    }

    // PLACEHOLDER: POST to the real endpoint here. Nothing is transmitted.
    setSending(true);
    setStatus("Received. No endpoint is connected yet, so nothing was sent.");
    window.setTimeout(() => {
      form.current?.reset();
      setCv(null);
      setSending(false);
      setStatus("");
    }, 5000);
  };

  return (
    <form className="form" ref={form} onSubmit={onSubmit} noValidate data-reveal>
      {/* Carries the role through with the submission. */}
      <input
        type="hidden"
        name="role"
        value={`${role.title} (${role.ref})`}
        readOnly
      />

      <div className="form__row">
        <div className="field-group">
          <label htmlFor="f-name">Full name</label>
          <input
            id="f-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="As it appears on your licence"
            aria-invalid={errors.name ? true : undefined}
            onInput={() => clear("name")}
          />
          <span className="err" role="alert">
            {errors.name}
          </span>
        </div>
        <div className="field-group">
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={errors.email ? true : undefined}
            onInput={() => clear("email")}
          />
          <span className="err" role="alert">
            {errors.email}
          </span>
        </div>
      </div>

      <div className="form__row">
        <div className="field-group">
          <label htmlFor="f-phone">Telephone</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
          />
          <span className="err" role="alert"></span>
        </div>
        <div className="field-group">
          <label htmlFor="f-licence">{role.licence}</label>
          <input
            id="f-licence"
            name="licence"
            type="text"
            required={role.licenceRequired}
            placeholder={
              role.licenceRequired
                ? "Required for this role"
                : "Optional for this role"
            }
            aria-invalid={errors.licence ? true : undefined}
            onInput={() => clear("licence")}
          />
          <span className="err" role="alert">
            {errors.licence}
          </span>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="f-exp">{role.exp}</label>
        <textarea
          id="f-exp"
          name="experience"
          required
          placeholder="Two or three sentences is enough."
          aria-invalid={errors.experience ? true : undefined}
          onInput={() => clear("experience")}
        ></textarea>
        <span className="err" role="alert">
          {errors.experience}
        </span>
      </div>

      <div className="field-group">
        <label htmlFor="f-cv">Curriculum vitae</label>
        {/* The native control is visually hidden but focusable; the label
            triggers it and the filename is reported in markup, so the field
            matches the ruled worksheet. */}
        <div
          className="file"
          data-has={String(Boolean(cv))}
          aria-invalid={errors.cv ? true : undefined}
        >
          <input
            id="f-cv"
            name="cv"
            type="file"
            required
            ref={cvInput}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              setCv(e.target.files?.[0] ?? null);
              clear("cv");
            }}
          />
          <label className="file__btn" htmlFor="f-cv">
            Choose file
          </label>
          <span className="file__name">
            {cv ? `${cv.name} · ${prettySize(cv.size)}` : "No file chosen"}
          </span>
          <button
            className="file__clear"
            type="button"
            hidden={!cv}
            aria-label="Remove the chosen file"
            onClick={() => {
              if (cvInput.current) cvInput.current.value = "";
              setCv(null);
              cvInput.current?.focus();
            }}
          >
            Remove
          </button>
        </div>
        <span className="hint">PDF or Word, up to 8&nbsp;MB.</span>
        <span className="err" role="alert">
          {errors.cv}
        </span>
      </div>

      <div className="field-group">
        <label htmlFor="f-start">Earliest start</label>
        <input
          id="f-start"
          name="start"
          type="text"
          placeholder="Optional — e.g. immediately, or one month's notice"
        />
        <span className="err" role="alert"></span>
      </div>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          onChange={() => clear("consent")}
        />
        <span>
          I consent to Chaar Pharmacy holding these details for the purpose of
          this application.
        </span>
      </label>
      <span className="err" role="alert">
        {errors.consent}
      </span>

      <div className="btn-row">
        <button className="btn btn--primary" type="submit" disabled={sending}>
          Send application
          <ArrowIcon />
        </button>
      </div>
      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
