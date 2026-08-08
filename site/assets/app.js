/* ==========================================================================
   CHAAR PHARMACY — one script, four pages.
   Behaviour is opt-in via data attributes, so each page only runs what it
   actually contains.
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---------- Trading hours: single source of truth ----------
     Confirmed from the pharmacy's own published hours.
     Index 0 = Sunday. `null` open = closed that day. 24h clock. */
  var HOURS = [
    { label: "Sunday",    open: null, close: null },
    { label: "Monday",    open: 9,  close: 21 },
    { label: "Tuesday",   open: 9,  close: 21 },
    { label: "Wednesday", open: 9,  close: 21 },
    { label: "Thursday",  open: 9,  close: 21 },
    { label: "Friday",    open: 9,  close: 21 },
    { label: "Saturday",  open: 9,  close: 19 }
  ];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Header ---------- */
  var header = $("[data-header]");
  if (header) {
    var stick = function () { header.setAttribute("data-stuck", window.scrollY > 8 ? "true" : "false"); };
    stick();
    window.addEventListener("scroll", stick, { passive: true });
  }

  /* ---------- 2. Mobile nav ---------- */
  var burger = $("[data-burger]");
  var mnav = $("[data-mobile-nav]");
  if (burger && mnav) {
    var setNav = function (open) {
      burger.setAttribute("aria-expanded", String(open));
      mnav.setAttribute("data-open", String(open));
    };
    burger.addEventListener("click", function () {
      setNav(burger.getAttribute("aria-expanded") !== "true");
    });
    $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setNav(false); burger.focus(); }
    });
  }

  /* ---------- 3. Reveal ----------
     One orchestrated entrance per section group. Content is visible by
     default for anyone who never gets an observer. */
  var reveals = $$("[data-reveal]");
  if (reveals.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      // Never arm the hiding rule at all: content stays visible.
    } else {
      // Arm the hiding rule only now, so a failed script can never leave the
      // page blank, and so print/full-page capture still shows everything.
      document.documentElement.classList.add("reveal-on");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });

      reveals.forEach(function (el) {
        if (!el.style.getPropertyValue("--d")) {
          var i = [].indexOf.call(el.parentNode.children, el);
          el.style.setProperty("--d", Math.min(i, 6) * 65 + "ms");
        }
        io.observe(el);
      });

      // Failsafe. A reveal effect must never be the reason content is
      // permanently invisible — to a reader, a print, a screenshot, or a
      // crawler. If anything is still hidden a few seconds in, show it.
      window.setTimeout(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains("is-in")) {
            el.style.setProperty("--d", "0ms");
            el.classList.add("is-in");
          }
        });
      }, 2500);
    }
  }

  /* ---------- 4. Accordion ---------- */
  $$("[data-acc]").forEach(function (acc) {
    var single = acc.getAttribute("data-acc") === "single";
    $$(".acc__btn", acc).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        if (single && !open) {
          $$(".acc__btn", acc).forEach(function (o) {
            o.setAttribute("aria-expanded", "false");
            var p = document.getElementById(o.getAttribute("aria-controls"));
            if (p) p.setAttribute("data-open", "false");
          });
        }
        btn.setAttribute("aria-expanded", String(!open));
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.setAttribute("data-open", String(!open));
      });
    });
  });

  /* ---------- 5. Live open / closed ---------- */
  function fmt(h) {
    var s = h >= 12 ? "pm" : "am";
    var d = h % 12 === 0 ? 12 : h % 12;
    return d + s;
  }

  function statusNow() {
    var now = new Date();
    var day = HOURS[now.getDay()];
    var mins = now.getHours() * 60 + now.getMinutes();
    if (!day || day.open == null) return { open: false, text: "Closed today" };
    var o = day.open * 60, c = day.close * 60;
    if (mins < o) return { open: false, text: "Opens " + fmt(day.open) };
    if (mins >= c) return { open: false, text: "Closed" };
    var left = c - mins;
    if (left <= 60) return { open: true, text: "Closing in " + left + " min" };
    return { open: true, text: "Open until " + fmt(day.close) };
  }

  $$("[data-status]").forEach(function (el) {
    var s = statusNow();
    el.setAttribute("data-open", String(s.open));
    var v = $(".readout__val", el);
    if (v) v.textContent = s.text;
  });

  var hours = $("[data-hours]");
  if (hours) {
    var today = new Date().getDay();
    hours.innerHTML = HOURS.map(function (d, i) {
      var when = d.open == null ? "Closed" : fmt(d.open) + " — " + fmt(d.close);
      return '<li data-today="' + (i === today) + '">' +
             '<span class="day">' + d.label + "</span><span>" + when + "</span></li>";
    }).join("");
  }

  /* ---------- 6. CV upload ----------
     The native control is visually hidden; the label triggers it and we report
     the chosen filename ourselves, so the field matches the ruled worksheet. */
  var MAX_CV_BYTES = 8 * 1024 * 1024;
  var CV_EXT = /\.(pdf|doc|docx)$/i;

  function prettySize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  }

  $$("[data-file]").forEach(function (wrap) {
    var input = $('input[type="file"]', wrap);
    var name = $("[data-file-name]", wrap);
    var clear = $("[data-file-clear]", wrap);
    if (!input || !name) return;

    var render = function () {
      var f = input.files && input.files[0];
      if (!f) {
        wrap.setAttribute("data-has", "false");
        name.textContent = "No file chosen";
        if (clear) clear.hidden = true;
        return;
      }
      wrap.setAttribute("data-has", "true");
      name.textContent = f.name + " · " + prettySize(f.size);
      if (clear) clear.hidden = false;
    };

    input.addEventListener("change", render);
    if (clear) {
      clear.addEventListener("click", function () {
        input.value = "";
        render();
        input.focus();
      });
    }
    render();
  });

  /* ---------- 7. Forms ----------
     Validated client-side so errors name the problem and the recovery.
     No endpoint is wired yet — see the PLACEHOLDER below. */
  $$("[data-form]").forEach(function (form) {
    var status = $("[data-form-status]", form);

    var fail = function (input, msg) {
      input.setAttribute("aria-invalid", "true");
      var slot = form.querySelector('[data-err="' + input.name + '"]');
      if (slot) slot.textContent = msg;
    };
    var clear = function (input) {
      input.removeAttribute("aria-invalid");
      var wrap = input.closest ? input.closest("[data-file]") : null;
      if (wrap) wrap.removeAttribute("aria-invalid");
      var slot = form.querySelector('[data-err="' + input.name + '"]');
      if (slot) slot.textContent = "";
    };

    $$("input, textarea, select", form).forEach(function (i) {
      i.addEventListener("input", function () { clear(i); });
      if (i.type === "file") i.addEventListener("change", function () { clear(i); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = null;

      $$("[required]", form).forEach(function (i) {
        if (i.type === "checkbox") {
          if (!i.checked) { fail(i, "Please confirm before sending."); bad = bad || i; }
          return;
        }
        if (i.type === "file") {
          var wrap = i.closest("[data-file]");
          var f = i.files && i.files[0];
          if (wrap) wrap.removeAttribute("aria-invalid");
          if (!f) {
            fail(i, "Attach your CV as a PDF or Word document.");
          } else if (!CV_EXT.test(f.name)) {
            fail(i, "That file type is not accepted. Save your CV as PDF, DOC or DOCX and attach it again.");
          } else if (f.size > MAX_CV_BYTES) {
            fail(i, "That file is " + prettySize(f.size) + ". The limit is 8 MB — try exporting a smaller PDF.");
          } else {
            return;
          }
          if (wrap) wrap.setAttribute("aria-invalid", "true");
          bad = bad || i;
          return;
        }
        if (!i.value.trim()) {
          fail(i, "This field is required.");
          bad = bad || i;
        } else if (i.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim())) {
          fail(i, "Enter an email address we can reply to, e.g. name@example.com.");
          bad = bad || i;
        }
      });

      if (bad) {
        if (status) status.textContent = "";
        bad.focus();
        return;
      }

      // PLACEHOLDER: POST to the real endpoint here. Nothing is transmitted.
      var btn = $('button[type="submit"]', form);
      if (btn) btn.disabled = true;
      if (status) status.textContent = "Received. No endpoint is connected yet, so nothing was sent.";
      window.setTimeout(function () {
        form.reset();
        // reset() empties the file input but fires no change event, so the
        // filename readout would keep showing a file that is no longer attached.
        $$('input[type="file"]', form).forEach(function (f) {
          f.dispatchEvent(new Event("change"));
        });
        if (btn) btn.disabled = false;
        if (status) status.textContent = "";
      }, 5000);
    });
  });

  /* ---------- 7. Per-role application page ----------
     apply.html is reached only from a role on careers.html and is not in the
     nav. It reads ?role= and dresses itself for that role. Add a role here and
     it works everywhere; the slug must match the careers.html link. */
  var ROLES = {
    "compounding-pharmacist": {
      ref: "CP-01",
      title: "Compounding pharmacist",
      blurb: "Full time, on site, licensed. You will prepare formulations at the bench alongside Wassim and Rabih.",
      licence: "Licence number",
      licenceRequired: true,
      exp: "Compounding experience"
    },
    "pharmacy-technician": {
      ref: "PT-02",
      title: "Pharmacy technician, preparation",
      blurb: "Full time, on site, certified. You will support the bench: weighing, labelling, and keeping the records straight.",
      licence: "Certification number",
      licenceRequired: false,
      exp: "Relevant experience"
    },
    "relief-pharmacist": {
      ref: "RP-03",
      title: "Relief pharmacist, counter",
      blurb: "Part time, on site, licensed. Counter dispensing and patient counselling, with a route into preparation work.",
      licence: "Licence number",
      licenceRequired: true,
      exp: "Dispensing experience"
    },
    "open": {
      ref: "OPEN",
      title: "Open application",
      blurb: "No specific vacancy. Tell us what you do and why this bench, and we will keep it on file.",
      licence: "Licence or certification number",
      licenceRequired: false,
      exp: "What you do"
    }
  };

  var applyPage = $("[data-apply]");
  if (applyPage) {
    var slug = new URLSearchParams(window.location.search).get("role") || "open";
    var role = ROLES[slug];

    if (!role) {
      // Unknown slug: fall back to the open application and say so, rather
      // than showing a form for a role that does not exist.
      role = ROLES.open;
      var warn = $("[data-role-unknown]");
      if (warn) warn.hidden = false;
    }

    document.title = role.title + " — Apply — Chaar Pharmacy";

    var set = function (sel, text) {
      var el = $(sel, applyPage);
      if (el) el.textContent = text;
    };
    set("[data-role-title]", role.title);
    set("[data-role-blurb]", role.blurb);
    set("[data-role-ref]", role.ref);
    set("[data-role-echo]", role.title);
    set("[data-licence-label]", role.licence);
    set("[data-exp-label]", role.exp);

    var hidden = $("[data-role-field]", applyPage);
    if (hidden) hidden.value = role.title + " (" + role.ref + ")";

    var lic = $("#f-licence", applyPage);
    if (lic) {
      if (role.licenceRequired) {
        lic.required = true;
        lic.placeholder = "Required for this role";
      } else {
        lic.placeholder = "Optional for this role";
      }
    }
  }

  /* ---------- 8. Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
