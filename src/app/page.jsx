'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

const inter = Inter({ subsets: ['latin'] });

/* -------------------------------------------------------------------------- */
/*                               REVEAL LOGIC                                 */
/* -------------------------------------------------------------------------- */

// Hook that triggers fade-in when element enters viewport
function useReveal() {
  const elRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return { elRef, show };
}

// Standalone Reveal component
function Reveal({ children }) {
  const { elRef, show } = useReveal();
  return (
    <div
      ref={elRef}
      className={`transition-all duration-700 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HOME                                     */
/* -------------------------------------------------------------------------- */

// ---------- Image Arrays ----------
const mobileImages = [
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Louis_BW_Mobile.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/FLOATER2_mobile-min.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Mosesmobile.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Ka_Issey_Miyake_Mobile-min.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/renaissance.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/MosesBlueMobile.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Mobile/FLOATER_mobile-min.avif',
];

const desktopImages = [
  'https://storage.googleapis.com/spurofthemoment/Landing/Louis_BW.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/cropped-daniel%20(1).avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Moses.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/RRL_BUDA.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Ka_Issey_Miyake.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/MosesBlueDesktop.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/cartierAA.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/Chromebrah.avif',
  'https://storage.googleapis.com/spurofthemoment/Landing/FLOATER.avif',
];

// ---------- Hero Captions ----------
const captions = [
  { h: 'Always another angle', p: 'Things you see a million times, for the first time.' },
  { h: 'Where light meets intention', p: 'Images designed to be felt before they are understood.' },
  { h: 'Stories that wear form', p: 'Fashion seen as narrative, not product.' },
];

/* -------------------------------------------------------------------------- */
/*                              MAIN PAGE FUNCTION                            */
/* -------------------------------------------------------------------------- */

export default function Home() {
  // ---------- State Variables ----------
  const [currentMobile, setCurrentMobile] = useState(0);
  const [currentDesktop, setCurrentDesktop] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef(null);

  // ---------- Media Query (so only one slideshow advances) ----------
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ---------- Page Visibility (pause when tab hidden) ----------
  useEffect(() => {
    const onVis = () => setIsVisible(document.visibilityState === 'visible');
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  /* ----------------------------- Slideshow Logic ----------------------------- */
  useEffect(() => {
    if (!isVisible) return; // pause when tab is hidden

    const interval = setInterval(() => {
      if (isDesktop) {
        setCurrentDesktop((prev) => (prev + 1) % desktopImages.length);
      } else {
        setCurrentMobile((prev) => (prev + 1) % mobileImages.length);
      }
      // advance a single caption step per tick
      setCaptionIdx((c) => (c + 1) % captions.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isDesktop, isVisible]);

  /* --------------------------- Scroll-linked Fade --------------------------- */
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(1, Math.max(0, (viewport - rect.bottom) / viewport + 0.05));
      setScrollProgress(progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cap = captions[captionIdx];

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className={inter.className}>
      <Navbar />

      {/* ---------------------------------------------------------------------- */}
      {/*                              HERO SECTION                              */}
      {/* ---------------------------------------------------------------------- */}
      <section ref={heroRef} className="relative w-full h-[90vh] overflow-hidden" aria-label="Featured work">
        {/* --- Mobile Slideshow --- */}
        <div className="md:hidden w-full h-full absolute inset-0" aria-hidden="true">
          {mobileImages.map((src, index) => {
            const isActive = index === currentMobile;
            return (
              <Link
                key={index}
                href="/portfolio"
                aria-label="Open portfolio"
                className={`absolute inset-0 ${isActive ? 'z-20 pointer-events-auto' : 'z-10 pointer-events-none'}`}
              >
                <Image
                  src={src}
                  alt="" // decorative; link has the label
                  fill
                  sizes="(max-width: 767px) 100vw, 0vw"
                  quality={85}
                  priority={index === 0}
                  className={`transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                />
              </Link>
            );
          })}
        </div>

        {/* --- Desktop Slideshow --- */}
        <div className="hidden md:block w-full h-full absolute inset-0" aria-hidden="true">
          {desktopImages.map((src, index) => {
            const isActive = index === currentDesktop;
            return (
              <Link
                key={index}
                href="/portfolio"
                aria-label="Open portfolio"
                className={`absolute inset-0 ${isActive ? 'z-20 pointer-events-auto' : 'z-10 pointer-events-none'}`}
              >
                <Image
                  src={src}
                  alt="" // decorative; link has the label
                  fill
                  sizes="(min-width: 768px) 100vw, 0vw"
                  quality={85}
                  priority={index === 0}
                  className={`transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                />
              </Link>
            );
          })}
        </div>

        {/* --- Gradient for readability --- */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, rgba(0,0,0,0.32), rgba(0,0,0,0.18) 20%, rgba(0,0,0,0.06) 45%, rgba(0,0,0,0) 70%)',
            opacity: 0.65 * (1 - scrollProgress),
          }}
          aria-hidden="true"
        />

        {/* --- Hero Text --- */}
        <div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 z-40 text-right px-4 select-none"
          style={{
            opacity: 1 - scrollProgress,
            transform: `translateY(calc(-50% + ${scrollProgress * 16}px))`,
          }}
        >
          <h1 className="text-lg md:text-3xl font-semibold tracking-wide text-white">{cap.h}</h1>
          <p className="text-sm md:text-base font-normal tracking-wide mt-2 text-white/85 max-w-xs md:max-w-sm">
            {cap.p}
          </p>
        </div>

        {/* --- Scroll Cue --- */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-[0.2em] z-40"
          style={{ opacity: 1 - scrollProgress }}
          aria-hidden="true"
        >
          SCROLL
          <span className="block w-px h-6 mx-auto mt-1 bg-white/70 animate-pulse" />
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                           MANIFESTO SECTION                            */}
      {/* ---------------------------------------------------------------------- */}
      <section className="relative w-full bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          {/* --- Sticky Title (with extended scroll space) --- */}
          <div className="relative h-[80vh] md:h-[100vh] mb-[10vh]">
            <div className="sticky top-16 md:top-24">
              <h2 className="text-[12vw] md:text-[9vw] font-semibold leading-none text-zinc-900 tracking-[-0.02em]">
                Yusrizalakbar
                <span className="block md:inline"> Studio</span>
              </h2>
              <p className="mt-3 text-[10px] md:text-xs tracking-[0.22em] text-zinc-500 uppercase">
                Visual Narrative — UK / Worldwide
              </p>
            </div>
          </div>

          {/* --- Manifesto Copy with Reveal Animations --- */}
          <div className="max-w-3xl mx-auto pb-24 space-y-10">
            <Reveal>
              <p className="text-xl text-gray-600">
                How do you capture the attention of a community that has seen it all? <br />
                Trends fade. <span className="font-semibold text-gray-900">But dreams last.</span>
              </p>
            </Reveal>

            <Reveal>
              <p className="text-lg text-gray-600 leading-relaxed">
                We turn products into stories. <br />
                Stories into Dreams <br />
                Dreams into something real that people can hold, wear, and live.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">Yusrizal Akbar Studios</span> is a UK-based
                production house specializing in visual storytelling through photography. We capture not
                just how it looks, but how it feels. Breathing life into fashion, brands, and ideas.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-lg text-gray-600 leading-relaxed">
                From bespoke tailoring by the sea to the surreal elegance and coming-of-age of a Graduation,
                we create imagery that lives beyond the frame.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-2xl font-bold text-gray-900 pt-2">Breathe life into your Vision.</p>
            </Reveal>

            {/* ------------------------------------------------------------------ */}
            {/*                     PORTFOLIO CTA BUTTON (NEW)                     */}
            {/* ------------------------------------------------------------------ */}
            <Reveal>
              <div className="pt-20 flex justify-center">
                <a
                  href="/portfolio"
                  className="inline-block border border-zinc-900 text-zinc-900 px-8 py-4 text-sm tracking-[0.25em] uppercase font-medium rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-500 ease-out"
                >
                  View Portfolio
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/*                            CONTACT SECTION                             */}
      {/* ---------------------------------------------------------------------- */}
      <section id="contact" className="relative py-16 md:py-20" aria-labelledby="contact-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 id="contact-heading" className="text-center text-3xl font-semibold mb-2 text-zinc-950">
            Let’s create something that lasts.
          </h2>
          <p className="text-center text-base text-gray-600 mb-8">Your story, in a new light.</p>

          {/* --- Contact Form --- */}
          <form action="https://formspree.io/f/xnndvvgd" method="POST" className="space-y-4">
            {/* Honeypot anti-spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  name="first-name"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 text-zinc-900 text-base border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="last-name" className="sr-only">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 text-base text-zinc-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 text-base border text-zinc-900 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="sr-only">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 text-base border text-zinc-900 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-3 text-base border border-gray-300 text-zinc-900 rounded-md bg-gray-50 resize-vertical focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-4 bg-zinc-900 text-white text-base font-medium tracking-wide rounded-md hover:bg-zinc-800 transition-colors"
            >
              Begin Conversation
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
