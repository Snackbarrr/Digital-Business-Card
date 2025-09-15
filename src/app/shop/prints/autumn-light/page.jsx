import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from '@/app/components/purchase-panel';
import ProductPage from "@/app/components/product-page";

// Edit these fields for THIS product
const product = {
  slug: "The-old-gateway",
  title: "The Old gateway (A2)",
  price: "£70",
  category: "prints",
  intro:
    "A broken path to a long forgotten doorway. Long ago, this once led to something great, now it leads to nothing but the sky.",
  images: [
    "https://storage.googleapis.com/spurofthemoment/shop/camp%20grounds%20frame.avif",
    "https://storage.googleapis.com/spurofthemoment/shop/camp%20grounds%20frame.avif",
  ],
  details: ["120gsm paper", "Lay-flat binding", "Embossed cover"],
  shipping: "Ships in 3–5 business days. Free UK returns within 14 days.",
  // Optional dropdown (delete if not needed)
  
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