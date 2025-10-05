"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const PortfolioPage = () => {
  const portfolioItems = [
    {
      id: 1,
      href: '/portfolio/boaaa',
      image: 'https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Close_up_Portrait.avif',
      title: 'AlwaysAnotherAngle',
      subtitle: 'No agendas, Pure love of the game.',
      alt: 'AlwaysAnotherAngle'
    },
    {
      id: 2,
      href: '/portfolio/urbantailor',
      image: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Moses',
      title: 'UrbanTailor suits',
      subtitle: 'The Modern Gentleman, tailored to your experience.',
      alt: 'UrbanTailor suits'
    },
    {
      id: 3,
      href: '/portfolio/graduation',
      image: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Grad',
      title: 'Graduation',
      subtitle: 'Years of sacrifice, in a final moment.',
      alt: 'Graduation'
    },
    {
      id: 4,
      href: '/portfolio/nusaantara',
      image: 'https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Batik-Neck-tie-Close-up',
      title: 'Nusa Antara',
      subtitle: 'The Artisanal Cultural Exchange.',
      alt: 'NusaAntara'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      {/* Portfolio Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {portfolioItems.map((item) => (
          <Link 
            key={item.id}
            href={item.href}
            className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 block"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              
              {/* Overlay Text */}
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4">
                <h3 className="text-white font-semibold text-lg text-center">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm mt-2 text-center">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default PortfolioPage;