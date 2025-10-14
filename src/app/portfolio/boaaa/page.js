"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ============================================================================
   ALWAYS ANOTHER ANGLE — MULTI-CATEGORY CASE STUDY
   - Category filter chips (you name them)
   - Hero with fullscreen button (for active category)
   - Lightbox (Esc/←/→)
   - Masonry for remaining images
   ========================================================================== */

/* ---------- Reusable fullscreen button (same styling as other pages) ------- */
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

/* ------------------------------- CATEGORIES --------------------------------
   Rename these to whatever you want (e.g., "Street", "Motion", "Portrait", …)
   ------------------------------------------------------------------------- */
const CATEGORIES = ["All", "Studio", "Arvin", "Clothingxchange",];

/* ------------------------------- IMAGE DATA --------------------------------
   Tag each image with a `category` that matches one of your CATEGORIES above.
   Start with "Set 1"/"Set 2"/"Set 3", then rename freely later.
   ------------------------------------------------------------------------- */
const ALL_IMAGES = [
  { id: 1,  src: "https://storage.googleapis.com/spurofthemoment/Landing/Ka_Issey_Miyake.avif",     alt: "ka issey miyake",      category: "Studio" },

  { id: 2,  src: "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Louis_BW_Mobile.avif",     alt: "Louis black and white",      category: "Studio" },
  { id: 3,  src: "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/FLOATER_mobile-min.avif",     alt: "Floater",      category: "Studio" },
  { id: 4,  src: "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/FLOATER2_mobile-min.avif",     alt: "Floater2",      category: "Studio" },
  { id: 5,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Amos-min.avif",     alt: "amos",      category: "Studio" },
  { id: 6,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Fightclub-min.avif",     alt: "Fightclub",      category: "Studio" },
  { id: 7,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Fightclub2-min.avif",     alt: "Fightclub",      category: "Studio" },

  { id: 8,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/hands_on_face.avif",     alt: "Hands on face portrait",      category: "Arvin" },
  { id: 9,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Through_arm.avif",       alt: "Through the arm",             category: "Clothingxchange" },
  { id: 10,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Distance_carpark.avif",  alt: "Carpark distance shot",       category: "Clothingxchange" },
  { id: 11,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Face_away.avif",         alt: "Face turned away",            category: "Set 2" },
  { id: 12,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Graffiti.avif",          alt: "Graffiti backdrop",           category: "Arvin" },
  { id: 13,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Smoke_Blur.avif",        alt: "Smoke blur",                  category: "Arvin" },
  { id: 14,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Bus_blur.avif",          alt: "Bus blur street frame",       category: "Clothingxchange" },
  { id: 15,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Close_up_Portrait.avif", alt: "Close-up portrait",           category: "Arvin" },
  { id: 16,  src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Through_window.avif",    alt: "Through the window",          category: "Arvin" },
  { id: 17, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Vogue_apparently.avif",  alt: "Editorial frame",             category: "Clothingxchange" },
  { id: 18, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Walk_cross_blur.avif",   alt: "Street crossing blur",        category: "Clothingxchange" },
  { id: 19, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Arvin_blur.avif",        alt: "Arvin motion blur portrait", category: "Arvin" },
  { id: 20, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/stand_car.avif",         alt: "Standing by car",             category: "Clothingxchange" },
  { id: 21, src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Cafe_blur.avif",         alt: "Cafe motion blur",            category: "Arvin" },
];

export default function AlwaysAnotherAnglePage() {
  /* -------------------------- FILTER: CATEGORY SELECTION -------------------- */
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[1] || "All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return ALL_IMAGES;
    return ALL_IMAGES.filter(i => i.category === activeCategory);
  }, [activeCategory]);

  /* -------------------------------- LIGHTBOX -------------------------------- */
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openLightbox = useCallback((i) => { setIdx(i); setOpen(true); }, []);
  const closeLightbox = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIdx(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % filtered.length), [filtered.length]);

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
      {/*                                 HEADER                                 */}
      {/* ---------------------------------------------------------------------- */}
      <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Always Another Angle</h1>
          <div className="text-gray-600 text-base mt-1">Pure love of the game.</div>
          <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
            No agendas. A never-ending chase for the perfect still.
            <br />
            Explore the wild side.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                          CATEGORY FILTER (STICKY)                      */}
      {/* ---------------------------------------------------------------------- */}
      <div className="sticky top-16 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 md:px-8 py-3 border-b border-zinc-100">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c === activeCategory;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  aria-pressed={active}
                  className={[
                    "px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.22em] rounded-full border transition",
                    active
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "border-zinc-300 text-zinc-700 hover:border-zinc-900",
                  ].join(" ")}
                >
                  {c}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/*                     HERO (ACTIVE CATEGORY) + FULLSCREEN                 */}
      {/* ---------------------------------------------------------------------- */}
      {filtered.length > 0 && (
        <figure className="mx-2 md:mx-4 mt-4 mb-3 aspect-[3/2] relative overflow-hidden rounded-xl group">
          <Image
            src={filtered[0].src}
            alt={filtered[0].alt}
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
          {/* Optional meta chip (shows current category) */}
          <span className="absolute left-3 bottom-3 text-[10px] tracking-[0.22em] text-white/85 uppercase">
            {activeCategory !== "All" ? activeCategory : (filtered[0].category || "Unsorted")}
          </span>
        </figure>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/*                               MASONRY GRID                              */}
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

        {filtered.slice(1).map((image, i) => (
          <figure
            key={image.id}
            className="break-inside-avoid overflow-hidden hover:-translate-y-0.5 transition-transform duration-150 ease-out"
          >
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={360}
                height={540}
                className="w-full h-auto block cursor-zoom-in"
                style={{ width: "100%", height: "auto" }}
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
              src={filtered[idx].src}
              alt={filtered[idx].alt}
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
