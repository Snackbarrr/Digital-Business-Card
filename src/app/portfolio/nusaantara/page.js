"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const NusaantaraPage = () => {
  const images = [
    {
      id: 1,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Above_the_knee",
      alt: "Neck-tie close-up",
    },
    {
      id: 2,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Close_up_tie",
      alt: "Closest tree",
    },
    {
      id: 3,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/FullBody",
      alt: "Furthest tree",
    },
    {
      id: 4,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/NusaAntara/Tie_blurr",
      alt: "Knee to nose",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Nusa Antara</h1>
          <div className="text-gray-600 text-base mt-1">
            Global Cultural Exchange.
          </div>
          <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
            We share one earth; our arts cannot exist in isolation. It finds
            meaning when we learn to see beauty through each other’s eyes. A
            photoseries taken for Nusa Antara, the global cultural exchange.
            <br />
            Scroll for the winners.
          </p>
        </div>
      </section>

      {/* Masonry Layout */}
      <main
        className="p-2 bg-white"
        style={{
          columnWidth: "360px",
          columnGap: "8px", // fine white space between columns
        }}
      >
        <style jsx>{`
          figure {
            margin-bottom: 8px; /* vertical spacing between images */
            background-color: white;
          }

          @media (max-width: 1200px) {
            main {
              column-width: 320px;
            }
          }
          @media (max-width: 900px) {
            main {
              column-width: 280px;
            }
          }
          @media (max-width: 700px) {
            main {
              column-width: 240px;
            }
          }
          @media (max-width: 420px) {
            main {
              column-width: 100%;
            }
          }
        `}</style>

        {images.map((image) => (
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
                className="w-full h-auto block"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                sizes="(max-width: 420px) 100vw, (max-width: 700px) 240px, (max-width: 900px) 280px, (max-width: 1200px) 320px, 360px"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default NusaantaraPage;