// app/shop/[category]/page.tsx
import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// ---- Category data (edit this to add products/content) ----
type Item = {
  id: string;
  title: string;
  blurb?: string;
  price?: string; // show if relevant
  href: string;   // product/detail page
  imageSrc: string;
  imageAlt: string;
  badge?: string; // e.g., "Limited", "New"
};

type CategoryConfig = {
  title: string;
  intro: string;
  hero?: { src: string; alt: string };
  items: Item[];
};

const CATEGORIES: Record<string, CategoryConfig> = {
  prints: {
    title: "Prints & Artwork",
    intro:
      "Limited edition fine-art prints from my storytelling series. Museum-grade papers, archival inks, and optional framing.",
    hero: {
      src: "https://storage.googleapis.com/spurofthemoment/about/6K5A0639.jpg",
      alt: "Fine art photo print",
    },
    items: [
      {
        id: "p1",
        title: "Autumn Light (A2)",
        blurb: "Edition of 30, signed & numbered.",
        price: "£120",
        href: "/product/autumn-light-a2",
        imageSrc:
          "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Autumn light print",
        badge: "Limited",
      },
      {
        id: "p2",
        title: "Morning Rituals (A3)",
        blurb: "Soft tones, uncoated Hahnemühle.",
        price: "£90",
        href: "/product/morning-rituals-a3",
        imageSrc:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Morning rituals print",
      },
      {
        id: "p3",
        title: "City Quiet (Framed)",
        blurb: "Black maple frame, ready to hang.",
        price: "£220",
        href: "/product/city-quiet-framed",
        imageSrc:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "City quiet framed print",
        badge: "New",
      },
    ],
  },

  collabs: {
    title: "Collaboration Products",
    intro:
      "Small-batch objects created with artists, makers, and brands—each piece tied to a photo story.",
    hero: {
      src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
      alt: "Collaboration desk scene",
    },
    items: [
      {
        id: "c1",
        title: "Leather Journal x Atelier N.",
        blurb: "Story-embossed cover, 120gsm paper.",
        price: "£48",
        href: "/product/leather-journal-atelier",
        imageSrc:
          "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Leather journal collaboration",
      },
      {
        id: "c2",
        title: "Ceramic Mug x Studio H.",
        blurb: "Glazed with warm film tones.",
        price: "£32",
        href: "/product/ceramic-mug-studioh",
        imageSrc:
          "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Ceramic mug collaboration",
      },
      {
        id: "c3",
        title: "Linen Tote x Maker Co.",
        blurb: "Heavyweight canvas, stitched label.",
        price: "£28",
        href: "/product/linen-tote-makerco",
        imageSrc:
          "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Tote bag collaboration",
      },
    ],
  },

  merch: {
    title: "Merchandise",
    intro:
      "Studio tees, caps, and everyday goods—minimal, comfy, and built to last.",
    hero: {
      src: "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1600&auto=format&fit=crop",
      alt: "Merch display",
    },
    items: [
      {
        id: "m1",
        title: "Studio Cap",
        blurb: "Low profile, embroidered mark.",
        price: "£24",
        href: "/product/studio-cap",
        imageSrc:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Studio cap merch",
      },
      {
        id: "m2",
        title: "Story Tee",
        blurb: "Heavyweight 220gsm, relaxed fit.",
        price: "£30",
        href: "/product/story-tee",
        imageSrc:
          "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Story tee merch",
      },
      {
        id: "m3",
        title: "Everyday Tote",
        blurb: "12oz canvas, internal pocket.",
        price: "£18",
        href: "/product/everyday-tote",
        imageSrc:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
        imageAlt: "Everyday tote",
      },
    ],
  },
};

// ---- Metadata (SEO) ----
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const key = params.category?.toLowerCase();
  const cfg = CATEGORIES[key];
  const title = cfg ? `${cfg.title} – Shop` : "Shop";
  const description = cfg?.intro ?? "Story-driven photography goods and collaborations.";
  return { title, description };
}

// ---- Page ----
export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const key = params.category?.toLowerCase();
  const cfg = CATEGORIES[key];

  if (!cfg) {
    // Simple 404 for unknown categories
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
          <h1 className="text-3xl font-semibold text-gray-900">Category not found</h1>
          <p className="mt-3 text-gray-600">
            The page you’re looking for doesn’t exist.{" "}
            <Link href="/shop" className="underline underline-offset-4">
              Go back to Shop
            </Link>
            .
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-20 pb-16 px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/shop" className="underline underline-offset-4">
                Shop
              </Link>
            </li>
            <li aria-hidden> / </li>
            <li className="text-gray-900 font-medium">{cfg.title}</li>
          </ol>
        </nav>

        {/* Title + Intro */}
        <header className="mt-6 mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {cfg.title}
          </h1>
          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">{cfg.intro}</p>
        </header>

        {/* Hero (optional) */}
        {cfg.hero && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl mb-10">
            <Image
              src={cfg.hero.src}
              alt={cfg.hero.alt}
              fill
              priority={false}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        )}

        {/* (Optional) Filters/Sort placeholder */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select className="rounded-xl border px-3 py-2 text-sm">
            <option value="">All</option>
            <option value="limited">Limited</option>
            <option value="new">New</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
          <Link
            href="/contact"
            className="ml-auto text-sm underline underline-offset-4"
          >
            Need a custom piece?
          </Link>
        </div>

        {/* Items Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cfg.items.map((item) => (
            <Link key={item.id} href={item.href} className="group">
              <article className="border border-gray-200 rounded-xl overflow-hidden transition-shadow group-hover:shadow-md bg-white flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  {item.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/80 text-white text-xs px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.blurb && (
                    <p className="text-sm text-gray-600">{item.blurb}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    {item.price ? (
                      <span className="text-sm text-gray-800">{item.price}</span>
                    ) : (
                      <span />
                    )}
                    <span className="text-sm font-medium underline underline-offset-4">
                      View →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-gray-700">
            Questions about shipping, framing, or editions?{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
