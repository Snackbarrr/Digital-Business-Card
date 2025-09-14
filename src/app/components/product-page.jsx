import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from "@/app/components/purchase-panel"; // client component

/**
 * Server component template for a product page.
 * Pass a `product` object with:
 * slug, title, price, category ("collabs" | "prints" | "merch"),
 * intro, images[], details[], shipping, and optional options {label, values[]}
 */
export default function ProductPage({ product }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-20 pb-16 px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/shop" className="underline underline-offset-4">Shop</Link>
            </li>
            <li aria-hidden> / </li>
            <li>
              <Link href={`/shop/${product.category}`} className="underline underline-offset-4">
                {product.category[0].toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li aria-hidden> / </li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {product.title}
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">{product.intro}</p>
        </header>

        {/* Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[0]}
                alt={`${product.title} image`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {product.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
                  >
                    <Image src={img} alt={`${product.title} alt ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Purchase + info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <PurchasePanel
              slug={product.slug}
              price={product.price}
              options={product.options}
            />

            <div className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900">Details</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {product.details?.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900">Shipping & Returns</h2>
              <p className="mt-3 text-sm text-gray-700">{product.shipping}</p>
            </div>
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link href={`/shop/${product.category}`} className="text-sm underline underline-offset-4">
            ← Back to {product.category}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
