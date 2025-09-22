'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GATracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !("gtag" in window)) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    // @ts-ignore
    window.gtag("config", gaId, { page_path: url });
  }, [pathname, searchParams, gaId]);

  return null;
}
