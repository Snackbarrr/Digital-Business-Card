"use client";

import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   BOOKING — Yusrizal Akbar Studio
   Editorial, poetic, inviting. Clear offers with "From £" anchors.
   Public page = outcomes + vibe. Commercial mechanics live in private rate guide.
   ========================================================================== */

/* ------------------------------ CONFIG: PACKAGES --------------------------- */
const PACKAGES = [
  {
    id: "brand-campaigns",
    name: "Brand Campaigns",
    priceFrom: "From £2,300",
    blurb:
      "Art-directed shoots that define how your brand feels—purposeful, cinematic imagery that carries across web, social, and print.",
    includes: [
      "Creative direction",
      "Production coordination",
      "On-set lighting & styling guidance",
      "Professionally retouched final imagery",
    ],
    bestFor: "Seasonal drops · brand launches · lookbooks",
    ctaHref: "/portfolio?type=Campaign",
    ctaLabel: "See campaign work",
  },
  {
    id: "editorial-stories",
    name: "Editorial Stories",
    priceFrom: "From £850 (half-day)",
    blurb:
      "Story-led sessions built around mood, texture, and pace. Intimate yet polished sequences for press, founders, and magazines.",
    includes: [
      "Light pre-production",
      "Guided shoot & direction",
      "Professionally retouched finals",
    ],
    bestFor: "PR features · founder profiles · magazines",
    ctaHref: "/portfolio?type=Editorials",
    ctaLabel: "See editorials",
  },
  {
    id: "portrait-sessions",
    name: "Portrait Sessions",
    priceFrom: "From £350",
    blurb:
      "Cinematic portraiture with quiet confidence. Editorial energy for graduates, creatives, and personal brands.",
    includes: [
      "Studio or on-location",
      "Directional posing & expression coaching",
      "Professionally retouched finals",
    ],
    bestFor: "Graduates · creatives · personal branding",
    ctaHref: "/portfolio?type=Portraits",
    ctaLabel: "See portraits",
  },
  {
    id: "custom-projects",
    name: "Custom Projects",
    priceFrom: "By quotation",
    blurb:
      "Bespoke commissions that live between art and commerce. Fashion films, conceptual studies, or collaborative series.",
    includes: ["Discovery call", "Treatment development", "Tailored production & post"],
    bestFor: "Experimental briefs · collaborations",
    ctaHref: "/portfolio?type=custom",
    ctaLabel: "See custom work",
  },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* =========================================================================
         HERO / INTRO
         ========================================================================= */}
      <section className="px-6 md:px-8 pt-10 pb-6 border-b border-zinc-200">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Book Yusrizal Akbar Studio
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-700">
          Editorial photography for brands and individuals. Clear direction, refined images, reliable delivery.
          Share a brief; we’ll shape it into work that feels like you.
        </p>
        <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          UK / Worldwide · Fast turnarounds available
        </div>

        {/* Download: Discovery PDF (public, gentle CTA) */}
        <div className="mt-4">
          <a
            href="/Client_Discovery.pdf"
            download="Client_Discovery.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-4 py-2 text-xs uppercase tracking-[0.22em] hover:bg-zinc-900 hover:text-white transition"
            aria-label="Download Client Discovery PDF"
          >
            Download Client Discovery (PDF) →
          </a>
        </div>
      </section>

      {/* =========================================================================
         CONTENT: TWO COLUMNS
         ========================================================================= */}
      <section className="px-6 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ======================= LEFT: OFFER / PACKAGES ====================== */}
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
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <div className="text-xs text-zinc-700">{p.priceFrom}</div>
                  </div>

                  <p className="mt-1 text-sm text-zinc-700">{p.blurb}</p>

                  {p.includes?.length > 0 && (
                    <div>
                      <h4 className="mt-3 mb-1 text-xs font-medium tracking-wide uppercase text-zinc-600">
                        Includes
                      </h4>
                      <ul className="space-y-1.5 text-sm text-zinc-700">
                        {p.includes.map((i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-900" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.bestFor && (
                    <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                      {p.bestFor}
                    </div>
                  )}

                  <div className="mt-4">
                    <a
                      href={p.ctaHref}
                      className="inline-flex items-center gap-2 text-sm underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900"
                      aria-label={`${p.ctaLabel}`}
                    >
                      {p.ctaLabel} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PROCESS (plain language; editorial tone) */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Process
            </h2>
            <ol className="space-y-3">
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-600 p-4">
                <span className="font-medium text-zinc-900">1. Discovery.</span>{" "}
                Share your goals, references, timeline, usage, and a budget range.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-600 p-4">
                <span className="font-medium text-zinc-900">2. Treatment.</span>{" "}
                Mood, approach, and a simple plan—no jargon.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-600 p-4">
                <span className="font-medium text-zinc-900">3. Shoot.</span>{" "}
                Calm set. Efficient coverage. Editorial detail.
              </li>
              <li className="rounded-xl ring-1 ring-zinc-200 text-zinc-600 p-4">
                <span className="font-medium text-zinc-900">4. Delivery.</span>{" "}
                Contact sheet → selects → retouched finals.
              </li>
            </ol>
            <p className="mt-2 text-xs text-zinc-600">
              Licensing: digital brand channels are included by default; ads/OOH quoted on request. Full terms accompany the estimate.
            </p>
          </div>

          {/* FAQS (kept minimal; business edge without itemising fees) */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">FAQs</h2>
            <div className="divide-y divide-zinc-200 ring-1 ring-zinc-200 rounded-xl">
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium list-none">
                  What do you need to quote?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Project goal, references, location(s), looks or pieces, deliverables, usage, timeline, and a budget range.
                </p>
              </details>
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium list-none">
                  Do you travel?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Yes—UK/EU/worldwide. Travel and permits are itemised on the estimate.
                </p>
              </details>
              <details className="p-4 group">
                <summary className="cursor-pointer font-medium list-none">
                  How fast is delivery?
                </summary>
                <p className="mt-2 text-sm text-zinc-700">
                  Contact sheets typically within 24–72 hours; finals within 5–10 working days depending on volume. Rush options available.
                </p>
              </details>
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              Booking: 25% booking fee to secure dates. Flexible reschedules where possible.
            </p>
          </div>

          {/* TRUST CUES (optional placeholders; link out to case studies) */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-zinc-500 mb-3">
              Selected Work
            </h2>
            <div className="rounded-2xl ring-1 ring-zinc-200 p-5">
              <p className="text-sm text-zinc-700">
                Explore case studies and full projects on the{" "}
                <a
                  href="/portfolio"
                  className="underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900"
                >
                  portfolio
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* ======================= RIGHT: STICKY BRIEF FORM ===================== */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 rounded-2xl ring-1 ring-zinc-200 p-5">
            <h2 className="text-lg font-semibold">Start a Booking</h2>
            <p className="text-sm text-zinc-700 mt-1">
              Share the essentials—I'll reply with a treatment or a few sharp questions.
            </p>

            <form
              action="https://formspree.io/f/xnndvvgd"
              method="POST"
              className="mt-4 space-y-3"
              aria-label="Booking brief form"
            >
              {/* Honeypot (spam trap) */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Project Type (reflects public structure) */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Project
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Campaign", "Editorial", "Portrait", "Custom"].map((t) => (
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
                  <input
                    type="date"
                    name="preferred_date"
                    className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                    Backup Date
                  </label>
                  <input
                    type="date"
                    name="backup_date"
                    className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
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
                  placeholder="City / studio / on location"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                />
              </div>

              {/* Budget band (inclusive ranges; filters without scaring off) */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Budget
                </label>
                <select
                  name="budget_band"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 focus:ring-2 focus:ring-zinc-900 outline-none"
                  required
                >
                  <option value="">Select a range</option>
                  <option>£350–800</option>
                  <option>£850–1.5k</option>
                  <option>£1.5–3k</option>
                  <option>£3–6k</option>
                  <option>£6k+</option>
                  <option>Not sure</option>
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
                  placeholder="e.g., 12–15 finals + short loops"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                />
              </div>

              {/* Brand & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand / Org"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none"
                  required
                />
              </div>

              {/* Brief */}
              <div>
                <label className="block text-xs uppercase tracking-[0.22em] text-zinc-600 mb-1">
                  Brief, Usage & Notes
                </label>
                <textarea
                  name="brief"
                  rows={5}
                  placeholder="Share references, looks/pieces, timeline, talent count, usage, and anything non-negotiable."
                  className="w-full rounded-md ring-1 ring-zinc-200 px-3 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 outline-none resize-vertical"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-md bg-zinc-900 text-white text-sm px-4 py-3 tracking-wide hover:bg-zinc-800 transition"
              >
                Request Estimate
              </button>

              <p className="mt-2 text-[11px] text-zinc-500">
                We only use your details to reply to your enquiry.
              </p>
            </form>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
