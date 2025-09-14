import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Prints & Artwork – Shop",
  description:
    "Limited edition fine-art prints from my storytelling series. Museum-grade papers, archival inks, and optional framing.",
};

const cfg = {
  title: "Prints & Artwork",
  intro:
    "Limited edition fine-art prints from my storytelling series. Museum-grade papers, archival inks, and optional framing.",
  hero: {
    src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
    alt: "Fine art photography prints",
  },
  items: [
    {
      id: "p1",
      title: "Autumn Light (A2)",
      blurb: "Edition of 30, signed & numbered.",
      price: "£120",
      href: "/shop/prints/autumn-light",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "Autumn light print",
      badge: "Limited",
    },
    {
      id: "p2",
      title: "Morning Rituals (A3)",
      blurb: "Soft tones, uncoated Hahnemühle.",
      price: "£90",
      href: "/shop/prints/morning-rituals",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "Morning rituals print",
    },
    {
      id: "p3",
      title: "City Quiet (Framed)",
      blurb: "Black maple frame, ready to hang.",
      price: "£220",
      href: "/shop/prints/city-quiet",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "City quiet framed print",
      badge: "New",
    },
  ],
};

export default function PrintsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto pt-20 pb-16 px-6">
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

        {/* Hero */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl mb-10">
          <Image
            src={cfg.hero.src}
            alt={cfg.hero.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority={false}
          />
        </div>

        {/* Grid */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label={`${cfg.title} items`}
        >
          {cfg.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group"
              aria-label={`View ${item.title}`}
            >
              <article className="border border-gray-200 rounded-xl overflow-hidden transition-shadow group-hover:shadow-md bg-white flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                    {item.price && (
                      <span className="text-sm text-gray-800">{item.price}</span>
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
