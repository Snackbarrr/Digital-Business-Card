import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GATracker from "./ga-tracker"; // 👈 add this

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YAJ",
  description: "Yusrizal Akbar Junaedi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // If testing, you can temporarily hardcode: const GA_ID = "G-Z374HTPFE2";
  const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="" />
        {GA_ID && (
          <>
            {/* Load GA library */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            {/* Init GA */}
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Tracks client-side route changes */}
        {GA_ID && <GATracker gaId={GA_ID} />}
        {children}
      </body>
    </html>
  );
}
