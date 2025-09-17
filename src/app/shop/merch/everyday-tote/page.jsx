import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from '@/app/components/purchase-panel';
import ProductPage from "@/app/components/product-page";

// Edit these fields for THIS product
const product = {
  slug: "everyday-tote",
  title: "Everyday Tote",
  price: "£10",
  category: "merch",
  intro:
    "100% cotton heavyweight tote bag. Features the image from the Mont Blanc series.",
  images: [
    "https://storage.googleapis.com/spurofthemoment/shop/updates-min.avif",
    "https://storage.googleapis.com/spurofthemoment/shop/updates-min.avif",
  ],
  details: ["200GSM cotton", "Inside Pocket", "Mont Blanc series print"],
  shipping: "Ships in 3–5 business days. Free UK returns within 14 days.",
  // Optional dropdown (delete if not needed)
  options: { label: "Size", values: ["One size",] },
};

export const metadata = {
  title: `${product.title} – Shop`,
  description: product.intro,
  openGraph: {
    title: `${product.title} – Shop`,
    description: product.intro,
    images: product.images?.length ? [{ url: product.images[0] }] : [],
  },
};

export default function Page() {
  return <ProductPage product={product} />;
}