import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const UrbanTailorPage = () => {
  const images = [
    {
      id: 1,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Threemansuitbrick.avif",
      alt: "Three men in suits against brick wall",
    },
    {
      id: 2,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Mosesonsofa.avif",
      alt: "Moses on sofa in suit",
    },
    {
      id: 3,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/bluesuitcoolaf.avif",
      alt: "Blue suit portrait",
    },
    {
      id: 4,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Tanbuttondetail.avif",
      alt: "Tan suit button detail",
    },
    {
      id: 5,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/tablewithroseandwine.avif",
      alt: "Table setting with rose and wine",
    },
    {
      id: 6,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
      alt: "Moses in relaxed pose",
    },
    {
      id: 7,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Brownsuitlapeldetail.avif",
      alt: "Brown suit lapel detail",
    },
    {
      id: 8,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Moseshandonhip.avif",
      alt: "Moses with hand on hip",
    },
    {
      id: 9,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Richardmosesoutdoor.avif",
      alt: "Richard and Moses outdoor shot",
    },
    {
      id: 10,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Outdoorcoolmoses.avif",
      alt: "Moses outdoor cool pose",
    },
    {
      id: 11,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Greysuitcuffadjust.avif",
      alt: "Grey suit cuff adjustment",
    },
    {
      id: 12,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/greysuitbuttondetail.avif",
      alt: "Grey suit button detail",
    },
    {
      id: 13,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Slouchchairmoses.avif",
      alt: "Moses in slouch chair",
    },
    {
      id: 14,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/bluesuitlapeldetail.avif",
      alt: "Blue suit lapel detail",
    },
    {
      id: 15,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/blacksuitsunglasses.avif",
      alt: "Black suit with sunglasses",
    },
    {
      id: 16,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Waistcoatmoses.avif",
      alt: "Moses in waistcoat",
    },
    {
      id: 17,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Urbantailorbags.avif",
      alt: "UrbanTailor bags",
    },
    {
      id: 18,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Editorial.avif",
      alt: "Editorial",
    },
    {
      id: 19,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Foliage.avif",
      alt: "Foliage",
    },
    {
      id: 20,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Harbour.avif",
      alt: "Harbour",
    },
    {
      id: 21,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Purposeful.avif",
      alt: "Purposeful",
    },
    {
      id: 22,
      src: "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Restaurant.avif",
      alt: "Restaurant",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Project Header */}
      <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            UrbanTailor suits
          </h1>
          <div className="text-gray-600 text-base mt-1">
            Modern Gentlemen's tailoring · 2025
          </div>
          <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
            A study of contemporary tailoring. Clean lines, Sharp details.
            Minimal Branding; The posture says it all.
            <br />
            Scroll to explore:
            <br></br>
            Tailoring for the Urban Dweller.
            <br></br>
            Memoirs from a Sartorial Seaside.
          </p>
        </div>
      </section>

      {/* Masonry Gallery using CSS columns approach */}
      <main className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-0 p-0">
        {images.map((image, i) => (
          <figure
            key={image.id}
            className="break-inside-avoid m-0 hover:-translate-y-0.5 transition-transform duration-150 ease-out [content-visibility:auto] [contain-intrinsic-size:1px_600px]"
          >
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={600}
                className="w-full h-auto block"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                // Speed tweaks:
                priority={i < 6} // only first row or so
                fetchPriority={i < 6 ? "high" : "auto"}
                loading={i < 6 ? "eager" : "lazy"}
                quality={80} // lower quality = much smaller files, still looks great for photos
                placeholder="blur" // instant preview
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZWVlZWVlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+"
              />
            </div>
          </figure>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default UrbanTailorPage;
