"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const AlwaysAnotherAnglePage = () => {
  const images = [
    {
      id: 1,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Arvin_blur.avif",
      alt: "Graduate portrait with diploma",
    },
    {
      id: 2,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Bus_blur.avif",
      alt: "Graduation ceremony moment",
    },
    {
      id: 3,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Close_up_Portrait.avif",
      alt: "Graduation celebration",
    },
    {
      id: 4,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Distance_carpark.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 5,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Face_away.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 6,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Graffiti.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 7,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Smoke_Blur.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 8,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Through_arm.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 9,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Through_window.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 10,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Vogue_apparently.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 11,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Walk_cross_blur.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 12,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/hands_on_face.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 13,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/stand_car.avif",
      alt: "Graduate portrait outdoor",
    },
    {
      id: 14,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/AlwaysAnotherAngle/Cafe_blur.avif",
      alt: "Graduate portrait outdoor",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Project Header */}
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

      {/* Masonry Gallery */}
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
            className="break-inside-avoid overflow-hidden hover:-translate-y-0.5 transition-transform duration-150 ease-out"
          >
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={360}
                height={540}
                className="w-full h-auto block"
                style={{ width: "100%", height: "auto" }}
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

export default AlwaysAnotherAnglePage;
