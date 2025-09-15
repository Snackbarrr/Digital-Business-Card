import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from '@/app/components/purchase-panel';
import ProductPage from "@/app/components/product-page";

// Edit these fields for THIS product
const product = {
  slug: "road-to-Courmayeur",
  title: "Road to Courmayeur (A4)",
  price: "£100",
  category: "prints",
  intro:
    "One Road. Smooth Wind. The road to the Italian city; Courmayeur.",
  images: [
    "https://storage.googleapis.com/spurofthemoment/shop/italy%20pictures.avif",
    "https://storage.googleapis.com/spurofthemoment/shop/italy%20pictures.avif",
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