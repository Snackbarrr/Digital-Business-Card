import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import PurchasePanel from '@/app/components/purchase-panel';
import ProductPage from "@/app/components/product-page";

// Edit these fields for THIS product
const product = {
  slug: "linen-tote-maker",
  title: "Linen Tote x Maker Co.",
  price: "£28",
  category: "collabs",
  intro:
    "Heavyweight linen tote bag made in collaboration with Maker Co. Durable and stylish for everyday use.",
  images: [
    "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
    "https://storage.googleapis.com/spurofthemoment/Portfolio/urbantailor/Balledupmoses.avif",
  ],
  details: ["120gsm paper", "Lay-flat binding", "Embossed cover"],
  shipping: "Ships in 3–5 business days. Free UK returns within 14 days.",
  // Optional dropdown (delete if not needed)
  options: { label: "Color", values: ["Black", "Tan"] },
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