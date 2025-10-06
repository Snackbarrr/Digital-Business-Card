"use client";

import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   BOOKING — Yusrizal Akbar Studio
   - Minimal, editorial layout
   - Clear packages with prices
   - Transparent day rates & usage
   - Add-ons, process, FAQs, policy highlights
   - Sticky brief form (Formspree-ready)
   ========================================================================== */

/* ------------------------------ CONFIG: PACKAGES --------------------------- */
const PACKAGES = [
  {
    id: "campaign",
    name: "Campaign",
    priceFrom: "from £1,800",
    blurb:
      "Lookbook / ad assets. Location or studio. Art direction and production handled.",
    includes: [
      "Pre-production: treatment, shot-list, schedule",
      "Full-day shoot (8–10h)",
      "Talent/crew coordination (core)",
      "Up to 20 retouched finals",
      "Usage: Social + Web + E-com (12 months)",
    ],
    bestFor: "Seasonal drops / brand campaigns",
  },
  {
    id: "editorial",
    name: "Editorial",
    priceFrom: "from £450 (half-day)",
    blurb:
      "Story-led imagery for press and owned media. Nimble crew; location-first.",
    includes: [
      "Half-day to full-day shoot (4h-9h)",
      "Up to 10 retouched finals",
      "Location scouting",
      "Usage: Social + Web (12 months)",
    ],
    bestFor: "Brand world-building / PR features",
  },
  {
    id: "lookbook",
    name: "Lookbook",
    priceFrom: "from £1,350",
    blurb:
      "Clean, consistent coverage of full collection: front, back, key details.",
    includes: [
      "Studio or on-location",
      "Efficiency-led flow (per-look coverage)",
      "Colour-consistent retouch",
      "Usage: Social + Web + Wholesale (12 months)",
    ],
    bestFor: "Sell-in decks / line sheets / e-com",
  },
  {
    id: "graduation",
    name: "Graduation",
    priceFrom: "from £350",
    blurb:
      "Cinematic portrait session with a fashion edge—simple setups, editorial polish.",
    includes: [
      "2–3 hour shoot · campus/city (studio hour optional)",
      "Direction & light location scouting",
      "6 retouched finals (web + print JPGs)",
      "Delivery: contact sheet in 48–72h; finals in 5–7 working days",
      "Usage: Personal & Social (non-commercial)",
    ],
    bestFor: "Graduates, small teams, alumni features",
  },
];

/* ------------------------------ CONFIG: RATES ------------------------------ */
const RATES = [
  { label: "Creative / Photographer Day (6–8h)", value: "£500" },
  { label: "Half Day (4–5h)", value: "£350" },
  { label: "Pre-production (treatment, scheduling)", value: "£150–£250 / project" },
  { label: "Retouching (per final)", value: "£25–£35 / image" },
  { label: "Studio & Lighting (typical)", value: "£25–£40 / hr (pass-through)" },
  { label: "Assistant / Digital Tech (per day)", value: "£120–£180 / day" },
];

/* --------------------------- CONFIG: USAGE EXTENSIONS ---------------------- */
const USAGE = [
  { label: "Social + Web", value: "Included in most packages" },
  { label: "E-commerce / Wholesale", value: "Included in Lookbook" },
  { label: "Paid Ads (Social / Display)", value: "+10–30% of project fee" },
  { label: "OOH / Print / POS", value: "Quoted per market / term" },
  { label: "Exclusivity (category/market)", value: "Quoted on request" },
];

/* ------------------------------- CONFIG: ADD-ONS --------------------------- */
const ADDONS = [
  { label: "Extra Finals (Retouched)", value: "£25–£35 each" },
  { label: "Casting & Talent", value: "Coordination £100–£200 + talent fees" },
  { label: "Studio Hire", value: "Pass-through +10% handling (from £25–£40/hr)" },
  { label: "Behind-the-Scenes Stills", value: "£60 add-on (or included in Campaign)" },
  { label: "Advanced Retouching / Colour", value: "from £45 per image (complex skin/cleanup)" },
  { label: "Rush Delivery", value: "+20–30% of project fee" },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* =========================================================================
         HERO / INTRO
         ========================================================================= */}
      <section className="px-6 md:px-8 pt-10 pb-6 border-b border-zinc-200">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
          Book Yusrizal Akbar Studio
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-700">
          Fashion, felt. Campaigns, editorials, and lookbooks produced with intention.
          Share your brief, I'll shape the treatment and make it move.
        </p>
        <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          UK / Worldwide · Fast turnarounds available
        </div>

        {/* === NEW: DOWNLOAD TREATMENT (PDF) ===================================== */}
        <div className="mt-4">
          <a
            href="/Client_Company_Name.pdf"
            download="Client_Company_Name_Treatment.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-900 hover:bg-zinc-900 hover:text-white transition"
            aria-label="Download example treatment PDF"
          >
            Download Sample Treatment (Spec .PDF) →
          </a>
        </div>
        {/* ======================================================================= */}
      </section>

      {/* =========================================================================
         CONTENT: TWO COLUMNS
         ========================================================================= */}
      <section className="px-6 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ======================= LEFT: OFFER / PRICING ======================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* SERVICES / PACKAGES */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Service Packages
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {PACKAGES.map((p) => (
                <article
                  key={p.id}
                  className="rounded-2xl ring-1 ring-zinc-200 p-5 hover:ring-zinc-900 transition"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-zinc-900">{p.name}</h3>
                    <div className="text-xs text-zinc-700">{p.priceFrom}</div>
                  </div>
                  <p className="mt-1 text-sm text-zinc-700">{p.blurb}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                    {p.includes.map((i, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900"></span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    {p.bestFor}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RATES */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Rates & Post-Production
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="rounded-2xl ring-1 ring-zinc-200 p-5 divide-y divide-zinc-200">
                {RATES.slice(0, Math.ceil(RATES.length / 2)).map((r) => (
                  <li key={r.label} className="py-2 flex items-center justify-between gap-4">
                    <span className="text-sm text-zinc-800">{r.label}</span>
                    <span className="text-sm font-medium text-zinc-900">{r.value}</span>
                  </li>
                ))}
              </ul>
              <ul className="rounded-2xl ring-1 ring-zinc-200 p-5 divide-y divide-zinc-200">
                {RATES.slice(Math.ceil(RATES.length / 2)).map((r) => (
                  <li key={r.label} className="py-2 flex items-center justify-between gap-4">
                    <span className="text-sm text-zinc-800">{r.label}</span>
                    <span className="text-sm font-medium text-zinc-900">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* USAGE */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Usage & Rights
            </h2>
            <ul className="rounded-2xl ring-1 ring-zinc-200 p-5 divide-y divide-zinc-200">
              {USAGE.map((u) => (
                <li key={u.label} className="py-2 flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-800">{u.label}</span>
                  <span className="text-sm font-medium text-zinc-900">{u.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-zinc-600">
              Notes: Usage defined by channel + term. Global paid or OOH use is quoted per market, term,
              and exclusivity. Happy to align with brand/legal frameworks.
            </p>
          </div>

          {/* ADD-ONS */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Addons
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="rounded-2xl ring-1 ring-zinc-200 p-5 divide-y divide-zinc-200">
                {ADDONS.slice(0, Math.ceil(ADDONS.length / 2)).map((r) => (
                  <li key={r.label} className="py-2 flex items-center justify-between gap-4">
                    <span className="text-sm text-zinc-800">{r.label}</span>
                    <span className="text-sm font-medium text-zinc-900">{r.value}</span>
                  </li>
                ))}
              </ul>
              <ul className="rounded-2xl ring-1 ring-zinc-200 p-5 divide-y divide-zinc-200">
                {ADDONS.slice(Math.ceil(ADDONS.length / 2)).map((r) => (
                  <li key={r.label} className="py-2 flex items-center justify-between gap-4">
                    <span className="text-sm text-zinc-800">{r.label}</span>
                    <span className="text-sm font-medium text-zinc-900">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PROCESS */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Process
            </h2>
            <ol className="space-y-3">
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-500 p-4">
                <span className="font-medium">1. Discovery.</span> Share brief, references, usage, timeline, budget band.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-500 p-4">
                <span className="font-medium">2. Treatment.</span> Mood, shot-list, schedule, crew & locations.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-500 p-4">
                <span className="font-medium">3. Production & Shoot.</span> Calm set, efficient coverage.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-500 p-4">
                <span className="font-medium">4. Post & Delivery.</span> Contact sheet → selects → retouched finals.
              </li>
            </ol>
          </div>

          {/* FAQS */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">FAQs</h2>
            <div className="divide-y divide-zinc-200 ring-1 ring-zinc-200 rounded-xl">
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium text-zinc-900 list-none">
                  What do you need to quote?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Project goal, references, date range, location(s), number of looks, deliverables, usage, and deadline.
                  A budget band helps me tailor production options.
                </p>
              </details>
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium text-zinc-900 list-none">
                  Do you travel?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Yes—UK/EU/worldwide. Travel, permits, and per diem are itemised on the estimate.
                </p>
              </details>
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium text-zinc-900 list-none">
                  How fast can you deliver?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Contact sheets within 24–72h for most shoots. Finals typically 5–10 working days depending on volume.
                  Rush options available.
                </p>
              </details>
            </div>
          </div>

          {/* POLICY HIGHLIGHTS */}
          <div className="text-xs text-zinc-600">
            * 25% deposit to secure dates. Reschedules ≥7 days free when feasible. Full T&Cs supplied with estimate.
          </div>
        </div>

        {/* ======================= RIGHT: STICKY BRIEF FORM ===================== */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 rounded-2xl ring-1 ring-zinc-200 p-5">
            <h2 className="text-lg font-semibold text-zinc-900">Start a Booking</h2>
            <p className="text-sm text-zinc-700 mt-1">
              Share the essentials, I'll reply with a treatment or a few sharp questions.
            </p>

            {/* Formspree: replace the action with your endpoint if different */}
            <form
              action="https://formspree.io/f/xnndvvgd"
              method="POST"
              className="mt-4 space-y-3"
            >
              {/* Honeypot (spam trap) */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Project Type */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Project
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Campaign", "Editorial", "Lookbook", "Graduation", "Other"].map((t) => (
                    <label key={t} className="flex items-center gap-2 rounded-lg ring-1 ring-zinc-200 p-2 cursor-pointer">
                      <input type="radio" name="project_type" value={t} className="accent-zinc-900" required />
                      <span className="text-sm text-zinc-800">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                    Preferred Date
                  </label>
                  <input type="date" name="preferred_date" className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                    Backup Date
                  </label>
                  <input type="date" name="backup_date" className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Bristol, London etc / studio, Outdoors / Park Street / On campus / Other"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-500 focus:ring-2 focus:ring-zinc-900 outline-none"
                />
              </div>

              {/* Budget band */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Budget
                </label>
                <select name="budget_band" className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none" required>
                  <option value="">Select a range</option>
                  <option>£100-300</option>
                  <option>£400-500</option>
                  <option>£600-900</option>
                  <option>£1–3k</option>                                                     
                </select>
              </div>

              {/* Deliverables */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Deliverables
                </label>
                <input
                  type="text"
                  name="deliverables"
                  placeholder="e.g., 15 finals + BTS stills"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-500 focus:ring-2 focus:ring-zinc-900 outline-none"
                />
              </div>

              {/* Brand & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand / Org"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-500 focus:ring-2 focus:ring-zinc-900 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-500 focus:ring-2 focus:ring-zinc-900 outline-none"
                  required
                />
              </div>

              {/* Brief */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Brief, Usage and Notes
                </label>
                <textarea
                  name="brief"
                  rows={5}
                  placeholder="Share refs, looks, timeline, talent count, and anything non-negotiable."
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-500 focus:ring-2 focus:ring-zinc-900 outline-none resize-vertical"
                  required
                />
              </div>

              {/* Options */}

              <button
                type="submit"
                className="w-full mt-2 rounded-md bg-zinc-900 text-white text-sm px-4 py-3 tracking-wide hover:bg-zinc-800 transition"
              >
                Request Estimate
              </button>
            </form>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
