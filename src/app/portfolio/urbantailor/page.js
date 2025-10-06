"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   URBAN TAILOR — CASE STUDY
   - Quick facts + sticky section nav
   - Two narrative blocks: Urban Dweller / Sartorial Seaside
   - Masonry columns (unchanged)
   - Lightbox (Esc/←/→)
   - NEW: Full screen button on the two hero images only
   ========================================================================== */

/* ---------- Reusable, minimal fullscreen button (styling matches site) ----- */
function FullscreenButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View full screen"
      className={[
        "absolute top-3 right-3 z-10",
        "inline-flex items-center gap-2 rounded-full border border-white/70 bg-black/40",
        "px-3 py-1.5 text-[11px] tracking-[0.12em] text-white backdrop-blur",
        "hover:bg-black/60 hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
        "transition",
        className,
      ].join(" ")}
    >
      {/* icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="opacity-90">
        <path fill="currentColor" d="M7 3H3v4h2V5h2V3zm12 0h-4v2h2v2h2V3zM5 17H3v4h4v-2H5v-2zm16 0h-2v2h-2v2h4v-4zM9 9h6v6H9z"/>
      </svg>
      <span className="hidden sm:inline">Full screen</span>
    </button>
  );
}

const ALL_IMAGES = [
  // --- Urban Dweller (1..17) ---
  { id: 1,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",  alt: "Three men in suits against brick wall" },
  { id: 2,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Mosesonsofa.avif",     alt: "Moses on sofa in suit" },
  { id: 3,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/bluesuitcoolaf.avif",   alt: "Blue suit portrait" },
  { id: 4,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Tanbuttondetail.avif",  alt: "Tan suit button detail" },
  { id: 5,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/tablewithroseandwine.avif", alt: "Table setting with rose and wine" },
  { id: 6,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Threemansuitbrick.avif",    alt: "Moses in relaxed pose" },
  { id: 7,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Brownsuitlapeldetail.avif", alt: "Brown suit lapel detail" },
  { id: 8,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Moseshandonhip.avif",    alt: "Moses with hand on hip" },
  { id: 9,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Richardmosesoutdoor.avif", alt: "Richard and Moses outdoors" },
  { id: 10, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Outdoorcoolmoses.avif",  alt: "Moses outdoor cool pose" },
  { id: 11, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Greysuitcuffadjust.avif", alt: "Grey suit cuff adjustment" },
  { id: 12, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/greysuitbuttondetail.avif", alt: "Grey suit button detail" },
  { id: 13, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Slouchchairmoses.avif", alt: "Moses in slouch chair" },
  { id: 14, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/bluesuitlapeldetail.avif", alt: "Blue suit lapel detail" },
  { id: 15, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/blacksuitsunglasses.avif", alt: "Black suit with sunglasses" },
  { id: 16, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Waistcoatmoses.avif",   alt: "Moses in waistcoat" },
  { id: 17, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Urbantailorbags.avif",  alt: "Urban Tailor garment bags" },

  // --- Sartorial Seaside (18..22) ---
  { id: 18, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Purposeful.avif",  alt: "Editorial portrait near water" },
  { id: 19, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Foliage.avif",    alt: "Portrait among foliage" },
  { id: 20, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Editorial.avif",    alt: "Harbour scene with tailored suit" },
  { id: 21, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Harbour.avif", alt: "Purposeful stride by the sea" },
  { id: 22, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Restaurant.avif", alt: "Outdoor restaurant portrait" },
];

export default function UrbanTailorPage() {
  /* --------------------------- SPLIT INTO SECTIONS --------------------------- */
  const urbanImages = useMemo(() => ALL_IMAGES.filter(i => i.id <= 17), []);
  const seasideImages = useMemo(() => ALL_IMAGES.filter(i => i.id >= 18), []);

  /* -------------------------------- LIGHTBOX -------------------------------- */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const all = useMemo(() => [...urbanImages, ...seasideImages], [urbanImages, seasideImages]);

  const openLightbox = useCallback((globalIndex) => {
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(() => setLightboxIndex(i => (i - 1 + all.length) % all.length), [all.length]);
  const next = useCallback(() => setLightboxIndex(i => (i + 1) % all.length), [all.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ---------------------------------------------------------------------- */}
      {/*                                 HEADER                                 */}
      {/* ---------------------------------------------------------------------- */}
      <section className="px-6 md:px-8 py-6 border-b border-zinc-200">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
          Urban Tailor Suits
        </h1>

        {/* Quick facts */}
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          <li>Client: Urban Tailors</li>
          <li>Role: Photography</li>
          <li>Location: Bristol</li>
          <li>Year: 2025</li>
        </ul>

        <p className="mt-3 max-w-3xl text-zinc-700 leading-relaxed">
          A study of contemporary tailoring. Clean lines, sharp details. The posture says it all.
        </p>

        {/* Sticky mini-TOC */}
        <nav className="sticky top-16 z-10 mt-4 text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          <a href="#urban" className="mr-6 hover:text-zinc-900">Urban Dweller ↓</a>
          <a href="#seaside" className="hover:text-zinc-900">Sartorial Seaside ↓</a>
        </nav>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                          SECTION 1 — URBAN DWELLER                      */}
      {/* ---------------------------------------------------------------------- */}
      <section id="urban" className="px-2 pt-6">
        {/* HERO with fullscreen button */}
        <figure className="mx-2 md:mx-4 mb-3 aspect-[3/2] relative overflow-hidden rounded-xl group">
          <Image
            src={urbanImages[0].src}
            alt={urbanImages[0].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjY3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
            onClick={() => openLightbox(0)}
          />
          {/* --- FULLSCREEN BUTTON (hero only) --- */}
          <FullscreenButton
            onClick={() => openLightbox(0)}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100"
          />
        </figure>

        {/* Masonry block */}
        <Masonry
          images={urbanImages.slice(1)}
          baseIndex={1}
          onOpen={openLightbox}
        />
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                       SECTION 2 — SARTORIAL SEASIDE                     */}
      {/* ---------------------------------------------------------------------- */}
      <section id="seaside" className="px-2 pt-10">
        <h3 className="px-4 mb-4 text-[12px] uppercase tracking-[0.22em] text-zinc-500">
          Memoirs from a Sartorial Seaside
        </h3>

        {/* HERO with fullscreen button */}
        <figure className="mx-2 md:mx-4 mb-3 aspect-[3/2] relative overflow-hidden rounded-xl group">
          <Image
            src={seasideImages[0].src}
            alt={seasideImages[0].alt}
            fill
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjY3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
            onClick={() => openLightbox(urbanImages.length)}
          />
          {/* --- FULLSCREEN BUTTON (hero only) --- */}
          <FullscreenButton
            onClick={() => openLightbox(urbanImages.length)}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100"
          />
        </figure>

        <Masonry
          images={seasideImages.slice(1)}
          baseIndex={urbanImages.length + 1}
          onOpen={openLightbox}
        />
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                                CREDITS + CTA                            */}
      {/* ---------------------------------------------------------------------- */}
      <section className="px-6 md:px-8 mt-12 mb-16">
        <div className="border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          <h4 className="uppercase tracking-[0.22em] text-zinc-500 mb-2">Credits</h4>
          <p>
            Photography: Yusrizal Akbar · Styling: Urban Tailors · Grooming: Individual · Talent: Moses, Richard · Producer: Yusrizal Akbar
          </p>
        </div>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-block border border-zinc-900 text-zinc-900 px-6 py-3 text-xs uppercase tracking-[0.25em] rounded-full hover:bg-zinc-900 hover:text-white transition"
          >
            Discuss a Similar Campaign
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                                 LIGHTBOX                                */}
      {/* ---------------------------------------------------------------------- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white text-xl"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
          >
            ×
          </button>

          <button
            className="absolute left-4 md:left-6 text-white/70 hover:text-white text-2xl"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ←
          </button>

          <div className="relative w-[92vw] h-[85vh]">
            <Image
              src={all[lightboxIndex].src}
              alt={all[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            className="absolute right-4 md:right-6 text-white/70 hover:text-white text-2xl"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            →
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* ============================================================================
   MASONRY COMPONENT (unchanged)
   ========================================================================== */
function Masonry({ images, baseIndex = 0, onOpen }) {
  return (
    <main className="p-2 bg-white" style={{ columnGap: "8px" }}>
      <style jsx>{`
        figure { margin-bottom: 8px; background-color: white; }
      `}</style>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {images.map((image, i) => {
          const globalIndex = baseIndex + i;
          return (
            <figure
              key={image.id ?? globalIndex}
              className="break-inside-avoid overflow-hidden hover:-translate-y-0.5 transition-transform duration-150 ease-out [content-visibility:auto] [contain-intrinsic-size:1px_600px]"
            >
              <div className="relative w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto block cursor-zoom-in"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  priority={i < 6}
                  fetchPriority={i < 6 ? "high" : "auto"}
                  loading={i < 6 ? "eager" : "lazy"}
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+"
                  onClick={() => onOpen(globalIndex)}
                />
              </div>
            </figure>
          );
        })}
      </div>
    </main>
  );
}
