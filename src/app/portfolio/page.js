"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   PORTFOLIO CATEGORY PAGE
   - Editorial grid with focal hero card
   - Consistent aspect ratio, legible overlays, accessible links
   ========================================================================== */

// Each portfolio item object follows this structure:
// { id, href, image, title, subtitle, alt, tag, year }

const ALL_ITEMS = [
  {
    id: 1,
    href: "/portfolio/boaaa",
    image:
      "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Close_up_Portrait.avif",
    title: "Always Another Angle",
    subtitle: "Visual Experimentation. Learning & Growth",
    alt: "Always Another Angle cover",
    tag: "Editorial",
    year: "2025",
  },
  {
    id: 2,
    href: "/portfolio/urbantailor",
    image: "https://storage.googleapis.com/spurofthemoment/Portfolio/Moses",
    title: "Urban Tailor Suits",
    subtitle: "Tailoring lookbook; studio + location.",
    alt: "Urban Tailor Suits cover",
    tag: "Lookbook",
    year: "2025",
  },
  {
    id: 3,
    href: "/portfolio/graduation",
    image: "https://storage.googleapis.com/spurofthemoment/Portfolio/Grad",
    title: "Graduation Portraits",
    subtitle: "Graduation editorial; Hybrid location.",
    alt: "Graduation portraits cover",
    tag: "Graduations",
    year: "2024",
  },
  {
    id: 4,
    href: "/portfolio/nusaantara",
    image:
      "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Batik-Neck-tie-Close-up",
    title: "Nusa Antara",
    subtitle: "The Global Cultural Exchange. Campaign for Nusa Antara.",
    alt: "Nusa Antara cover",
    tag: "Campaign",
    year: "2024",
  },
];

export default function PortfolioPage() {
  /* ------------------------------- FILTER STATE ------------------------------ */
  const FILTERS = ["All", "Campaign", "Editorial", "Lookbook", "Personal"];
  const [active, setActive] = useState("All");

  const items = useMemo(() => {
    if (active === "All") return ALL_ITEMS;
    return ALL_ITEMS.filter((i) => i.tag === active);
  }, [active]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* =======================================================================
          PAGE HEADER + FILTERS (sticky, minimal)
         ==================================================================== */}
      <header className="px-6 md:px-8 pt-6 pb-4">
        {/* Visible h1 for accessibility; style minimal */}
        <h1 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900">
          Portfolio
        </h1>

        {/* Filter chips */}
        <div className="sticky top-16 z-10 mt-4 -mx-2 px-2 py-3 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <ul className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const activeChip = active === f;
              return (
                <li key={f}>
                  <button
                    type="button"
                    onClick={() => setActive(f)}
                    className={[
                      "px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.22em] rounded-full border transition",
                      activeChip
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "border-zinc-300 text-zinc-700 hover:border-zinc-900",
                    ].join(" ")}
                    aria-pressed={activeChip}
                  >
                    {f}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {/* =======================================================================
          GRID (hero card + standard cards)
         ==================================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-8 pb-12">
        {items.map((item, idx) => {
          const heroClasses =
            idx === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "";

          return (
            <article key={item.id} className={`${heroClasses}`}>
              <Link
                href={item.href}
                aria-label={`${item.title} — ${item.subtitle}`}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-zinc-200 hover:ring-zinc-900 hover:shadow-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                {/* ---- Image Wrapper with consistent aspect ---- */}
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={idx < 4}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  />

                  {/* Gradient for caption legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition" />

                  {/* Small meta chip (category/year) */}
                  <div className="absolute top-3 left-3 text-[10px] tracking-[0.22em] text-white/85 uppercase">
                    {item.tag}
                    {item.year ? ` — ${item.year}` : ""}
                  </div>
                </div>

                {/* ---- Overlay Title + Subtitle ---- */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-white font-semibold tracking-wide translate-y-0 group-hover:-translate-y-0.5 transition">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">{item.subtitle}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}
