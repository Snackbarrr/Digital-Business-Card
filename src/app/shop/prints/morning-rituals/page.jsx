import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from '@/app/components/purchase-panel';
import ProductPage from "@/app/components/product-page";

// Edit these fields for THIS product
const product = {
  slug: "a2-prints",
  title: "A2 Prints",
  price: "£50",
  category: "prints",
  intro:
    "Prints from the AlwaysAnotherAngle series. Limited edition fine-art prints. Museum-grade papers, archival inks, and optional framing.",
  images: [
    "https://storage.googleapis.com/spurofthemoment/shop/icon.avif",
    "https://storage.googleapis.com/spurofthemoment/shop/icon.avif",
  ],
  details: ["120gsm paper", "Lay-flat binding", "Embossed cover"],
  shipping: "Ships in 3–5 business days. Free UK returns within 14 days.",
  // Optional dropdown (delete if not needed)
 options: { label: "Picture", values: ["Unframed", "Framed"] },
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