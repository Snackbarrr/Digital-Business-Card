import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto pt-20 pb-16 px-6">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-10">
          Gift Shop
        </h1>

        {/* Intro blurb (optional) */}
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Curated items from my studio—limited prints, collaborative drops, and everyday
          essentials. Thoughtful, minimal, and made to last.
        </p>

        {/* Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Prints & Artwork */}
          <Link href="/shop/prints" className="group">
            <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow group-hover:shadow-md">
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src="https://storage.googleapis.com/spurofthemoment/about/6K5A0639.jpg"
                  alt="Prints & Artwork"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Prints &amp; Artwork
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Limited edition fine-art prints and framed pieces.
                </p>
                <span className="inline-block mt-4 text-sm font-medium underline underline-offset-4">
                  Shop prints →
                </span>
              </div>
            </div>
          </Link>

          {/* Collaboration Products */}
          <Link href="/shop/collabs" className="group">
            <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow group-hover:shadow-md">
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src="https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif"
                  alt="Collaboration Products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Collaboration Products
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Limited drops with artists, makers, and brands.
                </p>
                <span className="inline-block mt-4 text-sm font-medium underline underline-offset-4">
                  Explore collabs →
                </span>
              </div>
            </div>
          </Link>

          {/* Merchandise */}
          <Link href="/shop/merch" className="group">
            <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow group-hover:shadow-md">
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src="https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif"
                  alt="Merchandise"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900">Merchandise</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Tees, caps, and studio essentials for everyday wear.
                </p>
                <span className="inline-block mt-4 text-sm font-medium underline underline-offset-4">
                  View merch →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Optional: Featured note / CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700">
            Looking for something custom?{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Get in touch
            </Link>{" "}
            for commissions and special requests.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
