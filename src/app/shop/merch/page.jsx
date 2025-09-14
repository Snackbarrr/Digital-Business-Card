import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Merchandise – Shop",
  description: "Studio tees, caps, and everyday goods—minimal, comfy, and built to last.",
};

const cfg = {
  title: "Merchandise",
  intro: "Studio tees, caps, and everyday goods—minimal, comfy, and built to last.",
  hero: {
    src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
    alt: "Studio merchandise display",
  },
  items: [
    {
      id: "m1",
      title: "Studio Cap",
      blurb: "Low profile, embroidered mark.",
      price: "£24",
      href: "/shop/merch/studio-cap",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "Studio cap",
    },
    {
      id: "m2",
      title: "Story Tee",
      blurb: "Heavyweight 220gsm, relaxed fit.",
      price: "£30",
      href: "/shop/merch/story-tee",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "Story tee",
    },
    {
      id: "m3",
      title: "Everyday Tote",
      blurb: "12oz canvas, internal pocket.",
      price: "£18",
      href: "/shop/merch/everyday-tote",
      imageSrc:
        "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      imageAlt: "Everyday tote",
    },
  ],
};

export default function MerchPage() {
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
