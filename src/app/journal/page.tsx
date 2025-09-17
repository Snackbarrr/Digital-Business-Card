"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { PortableText } from "@portabletext/react";

export type JournalPost = {
  _id: string;
  title: string;
  body?: any;
  publishedAt?: string;
  _createdAt: string;
  authorName?: string;
  mainImage?: {
    asset?: {
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
  };
};

const LIMIT = 5;

function PostCard({ post }: { post: JournalPost }) {
  // keep the random placement on desktop, no fades
  const transform = useMemo(() => {
    if (typeof window === "undefined") return "none";
    const isMobile = window.innerWidth <= 600;
    if (isMobile) return "none";
    const direction = Math.random() < 0.5 ? -1 : 1;
    const percent = (10 + Math.random() * 10) * direction; // 10–20%
    return `translateX(${percent}%)`;
  }, [post._id]);

  const dateStr = useMemo(() => {
    const d = new Date(post.publishedAt ?? post._createdAt);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  }, [post.publishedAt, post._createdAt]);

  const dims = post.mainImage?.asset?.metadata?.dimensions;
  const ratio =
    dims?.aspectRatio ??
    (dims?.width && dims?.height ? dims.width / dims.height : 16 / 9); // lean wider -> shorter on screen

  const lqip = post.mainImage?.asset?.metadata?.lqip;

  return (
    <article
      className="mb-16 border-b border-zinc-200 pb-12"
      style={{
        transform,
        contentVisibility: "auto",
        containIntrinsicSize: "720px",
        willChange: "transform",
      }}
    >
      <h2 className="m-0 text-[1.4rem] md:text-[1.8rem] font-bold tracking-tight text-black">
        {post.title}
      </h2>

      <div className="text-zinc-700 text-[0.85rem] uppercase tracking-wide mt-2">
        By {post.authorName ?? "Unknown Author"} •{" "}
        <time dateTime={post.publishedAt ?? post._createdAt}>{dateStr}</time>
      </div>

      {post.mainImage?.asset?.url && (
        <div className="my-6">
          {/* tighter image container to make images smaller on screen */}
          <div
            className="relative w-full max-w-[680px] md:max-w-[720px] mx-auto overflow-hidden rounded"
            style={{ aspectRatio: String(ratio) }}
          >
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 62vw, 680px"
              quality={100}
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              priority={false}
            />
          </div>
        </div>
      )}

      {post.body && (
        <div className="text-black max-w-none">
          {/* clamp keeps scrolling light; remove if you want full bodies */}
          <div className="line-clamp-8 md:line-clamp-10">
            <PortableText value={post.body} />
          </div>
        </div>
      )}
    </article>
  );
}

function Pager({
  page,
  total,
  limit,
  onChange,
  isLoading,
}: {
  page: number;
  total?: number;
  limit: number;
  onChange: (nextPage: number) => void;
  isLoading: boolean;
}) {
  const totalPages = total ? Math.max(1, Math.ceil(total / limit)) : undefined;

  const go = (p: number) => {
    if (isLoading) return;
    if (totalPages) {
      if (p < 1 || p > totalPages) return;
    } else {
      if (p < 1) return;
    }
    onChange(p);
  };

  const hasTotal = typeof totalPages === "number";

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-6 select-none">
      {/* First */}
      <button
        className="px-3 py-1 rounded border border-zinc-300 text-sm text-zinc-700 disabled:opacity-40"
        disabled={isLoading || page <= 1 || !hasTotal}
        onClick={() => go(1)}
        aria-label="First page"
        title={hasTotal ? "First page" : "First page unavailable"}
      >
        « First
      </button>

      {/* Prev */}
      <button
        className="px-3 py-1 rounded border border-zinc-300 text-sm text-zinc-700 disabled:opacity-40"
        disabled={isLoading || page <= 1}
        onClick={() => go(page - 1)}
        aria-label="Previous page"
        title="Previous page"
      >
        ‹ Prev
      </button>

      {/* Numbered buttons if we know total */}
      {hasTotal &&
        Array.from({ length: totalPages! }, (_, i) => i + 1).map((n) => {
          const isActive = n === page;
          return (
            <button
              key={n}
              className={`px-3 py-1 rounded text-sm ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
              }`}
              onClick={() => go(n)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Go to page ${n}`}
            >
              {n}
            </button>
          );
        })}

      {/* Next */}
      <button
        className="px-3 py-1 rounded border border-zinc-300 text-sm text-zinc-700 disabled:opacity-40"
        disabled={
          isLoading ||
          (hasTotal ? page >= (totalPages as number) : false)
        }
        onClick={() => go(page + 1)}
        aria-label="Next page"
        title="Next page"
      >
        Next ›
      </button>

      {/* Last */}
      <button
        className="px-3 py-1 rounded border border-zinc-300 text-sm text-zinc-700 disabled:opacity-40"
        disabled={isLoading || !hasTotal || page >= (totalPages as number)}
        onClick={() => hasTotal && go(totalPages as number)}
        aria-label="Last page"
        title={hasTotal ? "Last page" : "Last page unavailable"}
      >
        Last »
      </button>
    </nav>
  );
}

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ref to scroll target (top of the list)
  const listTopRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(
    async (p: number) => {
      setLoading(true);
      setErrorMsg(null);
      const controller = new AbortController();
      try {
        const offset = (p - 1) * LIMIT;
        const res = await fetch(
          `/api/journal?page=${p}&offset=${offset}&limit=${LIMIT}`,
          { cache: "no-store", signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const newPosts: JournalPost[] = data.posts ?? [];
        setPosts(newPosts);
        setTotal(typeof data.total === "number" ? data.total : undefined);
      } catch (e: any) {
        if (e?.name !== "AbortError") setErrorMsg("Could not load entries.");
      } finally {
        setLoading(false);
      }
      return () => controller.abort();
    },
    []
  );

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  // scroll to the top of the list whenever the page changes
  useEffect(() => {
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  // handler that sets page (Pager calls this)
  const handleChangePage = (p: number) => setPage(p);

  return (
    <div className="bg-white">
      <Navbar />

      <main className="max-w-[900px] mx-auto mt-12 mb-24 px-2 sm:px-4">
        <h1 className="text-center text-3xl md:text-4xl font-medium tracking-tight text-black">
          AlwaysAnotherAngle
        </h1>
        {/* small description under the title */}
        <p className="mt-2 mb-8 text-center text-zinc-600">
          AlwaysAnotherAngle is a media gallery passion project in a journal format. From the beginning to the end, you can see a timeline of growth and learning. There is no agenda, just pure love of the game.
        </p>

        {/* top pager */}
        <Pager
          page={page}
          total={total}
          limit={LIMIT}
          onChange={handleChangePage}
          isLoading={loading}
        />

        {/* scroll anchor for returning to top of list */}
        <div ref={listTopRef} />

        <div id="journal" aria-busy={loading}>
          {errorMsg && (
            <div className="text-center text-red-600 my-8 text-sm">
              {errorMsg}
            </div>
          )}

          {!loading && posts.length === 0 && !errorMsg ? (
            <div className="text-center text-black my-8 text-sm">
              No entries found.
            </div>
          ) : null}

          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}

          {/* bottom pager */}
          <Pager
            page={page}
            total={total}
            limit={LIMIT}
            onChange={handleChangePage}
            isLoading={loading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
