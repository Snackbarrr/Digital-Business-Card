"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { PortableText } from "@portabletext/react";

const inter = Inter({ subsets: ["latin"] });

export type JournalPost = {
  _id: string;
  title: string;
  body?: any;
  publishedAt?: string;
  _createdAt: string;
  authorName?: string;
  imageUrl?: string;
};

function PostCard({ post }: { post: JournalPost }) {
  const [transform, setTransform] = useState<string>("none");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth <= 600;
    if (!isMobile) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const percent = (10 + Math.random() * 10) * direction; // 10–20%
      setTransform(`translateX(${percent}%)`);
    } else {
      setTransform("none");
    }
  }, []);

  const dateStr = new Date(
    post.publishedAt ?? post._createdAt
  ).toLocaleDateString();

  return (
    <article
      className="mb-16 border-b border-zinc-200 pb-12 transition-transform"
      style={{ transform }}
    >
      <h2 className="m-0 text-[1.4rem] md:text-[1.8rem] font-bold tracking-tight">
        {post.title}
      </h2>
      <div className="text-zinc-500 text-[0.85rem] uppercase tracking-wide mt-2">
        By {post.authorName ?? "Unknown Author"} • {dateStr}
      </div>

      {post.imageUrl && (
        <div className="my-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1600}
            height={900}
            className="w-full h-auto rounded"
            sizes="(max-width: 640px) 90vw, 900px"
            priority={false}
          />
        </div>
      )}

      {post.body && (
        <div className="prose prose-zinc max-w-none">
          <PortableText value={post.body} />
        </div>
      )}
    </article>
  );
}

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 5;

  async function loadMore() {
    if (loading || done) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?offset=${offset}&limit=${LIMIT}`);
      const data = await res.json();
      const newPosts: JournalPost[] = data.posts ?? [];
      if (newPosts.length === 0) {
        setDone(true);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setOffset((o) => o + newPosts.length);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) loadMore();
        });
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef.current, loading, done]);

  return (
    <div className={inter.className}>
      <Navbar />

      <main className="max-w-[900px] mx-auto mt-12 mb-24 px-2 sm:px-4">
        <h1 className="text-center text-3xl md:text-4xl font-medium mb-12 tracking-tight">
          Photo Journal
        </h1>

        <div id="journal">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}

          {loading && (
            <div className="text-center text-zinc-500 my-8 text-sm">
              Loading…
            </div>
          )}
          {done && (
            <div className="text-center text-zinc-500 my-8 text-sm">
              No more entries.
            </div>
          )}
          <div ref={sentinelRef} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
