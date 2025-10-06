import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import DomeGallery from "@/app/components/domegallery";
import Link from "next/link";

// ———————————————
// 1) EDIT YOUR UPDATES HERE (newest first)
// ———————————————
const UPDATES = [
  
  {
    date: "2025-09-14",
    title: "Gift Shop is underway",
    body:
      "Three collections; Prints, Collaborations, and Merch under development. Focused on limited runs and small-batch drops.",
    links: [{ label: "Visit the shop →", href: "/shop" }],
    tags: ["Announcement", "Shop"],
  },
  {
    date: "2025-07-22",
    title: "UrbanTailor: new image set",
    body:
      "Extended the series with 'Tailoring for the Urban Dweller' and 'Memoirs of a Sartorial Seaside' portraits and detail studies.",
    links: [{ label: "View project →", href: "/portfolio/urbantailor" }],
    tags: ["Project"],
  },
  {
    date: "2025-01-29",
    title: "Open for brand collaborations",
    body:
      "Looking to partner with thoughtful creatives and labels.",
    links: [{ label: "Get in touch →", href: "/contact" }],
    tags: ["Collaboration"],
  },
];

// util: YYYY-MM-DD → e.g. 8 Mar 2025
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export const metadata = {
  title: "Updates – Yusrizalakbar",
  description:
    "Studio updates, new work, and announcements from Yusrizalakbar.",
  openGraph: {
    title: "Updates – Yusrizalakbar",
    description:
      "Studio updates, new work, and announcements from Yusrizalakbar.",
  },
};

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero with DomeGallery */}
      <section className="relative">
        <div className="h-[60vh] w-full">
          <DomeGallery
            fit={0.45}
            grayscale={false}
            overlayBlurColor="#f7f7f7"
            openedImageWidth="520px"
            openedImageHeight="520px"
            imageBorderRadius="18px"
            openedImageBorderRadius="18px"
          />
        </div>
      </section>

      {/* Title + intro below the dome */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Updates
        </h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          Updates, new work, and announcements from Yusrizalakbar. 
        </p>
      </section>

      {/* Updates list */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <ol className="relative border-l border-gray-200 pl-6">
          {UPDATES.map((u, i) => (
            <li key={i} className="mb-10 ml-2">
              {/* timeline dot */}
              <span className="absolute -left-[7px] mt-1 flex h-3.5 w-3.5 items-center justify-center">
                <span className="h-3.5 w-3.5 rounded-full bg-gray-900" />
              </span>

              <time className="text-xs text-gray-500">{formatDate(u.date)}</time>
              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                {u.title}
              </h2>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {u.body}
              </p>

              {/* tags / links */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {u.tags?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {u.links?.length ? (
                <div className="mt-3 flex flex-wrap gap-4">
                  {u.links.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.href}
                      className="text-sm underline underline-offset-4 text-gray-400"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        {/* optional CTA */}
        <div className="mt-12 rounded-2xl border border-gray-200 p-6 text-center">
          <p className="text-gray-800">
            Want updates in your inbox once in a while?{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Say hello
            </Link>{" "}
            and I’ll add you to the list.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
