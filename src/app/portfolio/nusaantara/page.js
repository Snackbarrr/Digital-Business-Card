"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   NUSA ANTARA — CASE STUDY
   - Header (kept your copy)
   - NEW: Hero image with fullscreen button
   - Lightbox (Esc/←/→) for all images
   - Masonry layout for the remaining set
   ========================================================================== */

/* ---------- Reusable fullscreen button (matches Urban Tailor style) -------- */
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
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="opacity-90">
        <path fill="currentColor" d="M7 3H3v4h2V5h2V3zm12 0h-4v2h2v2h2V3zM5 17H3v4h4v-2H5v-2zm16 0h-2v2h-2v2h4v-4zM9 9h6v6H9z"/>
      </svg>
      <span className="hidden sm:inline">Full screen</span>
    </button>
  );
}

export default function NusaantaraPage() {
  /* ------------------------------- IMAGE SET -------------------------------- */
  const images = useMemo(() => [
    { id: 1, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Above_the_knee", alt: "Neck-tie close-up" },
    { id: 2, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/FullBody", alt: "Closest tree" },
    { id: 3, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Tie_blurr", alt: "Furthest tree" },
    { id: 4, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Close_up_tie", alt: "Knee to nose" },
  ], []);

  /* -------------------------------- LIGHTBOX -------------------------------- */
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openLightbox = useCallback((i) => { setIdx(i); setOpen(true); }, []);
  const closeLightbox = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLightbox, prev, next]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ---------------------------------------------------------------------- */}
      {/*                                HEADER                                  */}
      {/* ---------------------------------------------------------------------- */}
      <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Nusa Antara</h1>
          <div className="text-gray-600 text-base mt-1">Global Cultural Exchange.</div>
          <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
            We share one earth; our arts cannot exist in isolation. It finds meaning when we learn to see beauty
            through each other’s eyes. A photoseries taken for Nusa Antara, the global cultural exchange.
            <br />
            Scroll for the winners.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                         HERO WITH FULLSCREEN BUTTON                     */}
      {/* ---------------------------------------------------------------------- */}
      {images[0] && (
        <figure className="mx-2 md:mx-4 mt-4 mb-3 aspect-[3/2] relative overflow-hidden rounded-xl group">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjY3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
            onClick={() => openLightbox(0)}
          />
          <FullscreenButton
            onClick={() => openLightbox(0)}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100"
          />
        </figure>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/*                               MASONRY GRID                              */}
      {/*  - Keeps your column-width approach                                    */}
      {/* ---------------------------------------------------------------------- */}
      <main
        className="p-2 bg-white"
        style={{ columnWidth: "360px", columnGap: "8px" }}
      >
        <style jsx>{`
          figure { margin-bottom: 8px; background-color: white; }
          @media (max-width: 1200px) { main { column-width: 320px; } }
          @media (max-width: 900px)  { main { column-width: 280px; } }
          @media (max-width: 700px)  { main { column-width: 240px; } }
          @media (max-width: 420px)  { main { column-width: 100%; } }
        `}</style>

        {images.slice(1).map((image, i) => (
          <figure
            key={image.id}
            className="break-inside-avoid overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform duration-150 ease-out"
          >
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={360}
                height={540}
                className="w-full h-auto block cursor-zoom-in"
                sizes="(max-width: 420px) 100vw, (max-width: 700px) 240px, (max-width: 900px) 280px, (max-width: 1200px) 320px, 360px"
                loading={i < 4 ? "eager" : "lazy"}
                onClick={() => openLightbox(i + 1)}
              />
            </div>
          </figure>
        ))}
      </main>

      {/* ---------------------------------------------------------------------- */}
      {/*                                 LIGHTBOX                                */}
      {/* ---------------------------------------------------------------------- */}
      {open && (
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
              src={images[idx].src}
              alt={images[idx].alt}
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
