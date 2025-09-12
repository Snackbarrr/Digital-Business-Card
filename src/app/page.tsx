'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const inter = Inter({ subsets: ['latin'] });

const mobileImages = [
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Montblanc.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Mosesmobile.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Newborn.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/renaissance.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/HkMarket.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Guangzhou.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Chongqing.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Mobile/Library.avif",
];

const desktopImages = [
  "https://storage.googleapis.com/spurofthemoment/Landing/Montblancdesktop.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Moses.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Chongqingdesktop.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Beijing.avif",
  "https://storage.googleapis.com/spurofthemoment/Landing/Italy.avif"
];

export default function Home() {
  const [currentMobile, setCurrentMobile] = useState(0);
  const [currentDesktop, setCurrentDesktop] = useState(0);

  useEffect(() => {
    const mobileInterval = setInterval(() => {
      setCurrentMobile((prev) => (prev + 1) % mobileImages.length);
    }, 5000);

    const desktopInterval = setInterval(() => {
      setCurrentDesktop((prev) => (prev + 1) % desktopImages.length);
    }, 5000);

    return () => {
      clearInterval(mobileInterval);
      clearInterval(desktopInterval);
    };
  }, []);

  return (
    <div className={inter.className}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        {/* Mobile Slideshow */}
        <div className="md:hidden w-full h-full absolute inset-0">
          {mobileImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Mobile slide ${index + 1}`}
              fill
              sizes="(max-width: 767px) 100vw, 0vw"
              quality={85}
              priority={index === 0}
              className={`transition-opacity duration-1000 ease-in-out ${
                index === currentMobile ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          ))}
        </div>

        {/* Desktop Slideshow */}
        <div className="hidden md:block w-full h-full absolute inset-0">
          {desktopImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Desktop slide ${index + 1}`}
              fill
              sizes="(min-width: 768px) 100vw, 0vw"
              quality={85}
              priority={index === 0}
              className={`transition-opacity duration-1000 ease-in-out ${
                index === currentDesktop ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          ))}
        </div>

        {/* Hero Text */}
        <div className="absolute top-[60%] right-[5%] -translate-y-1/2 text-white z-40 text-right px-4">
          <h1 className="text-lg md:text-3xl font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal">
            Always another angle
          </h1>
          <p className="text-sm font-normal tracking-wide mt-2 opacity-85 max-w-xs overflow-hidden line-clamp-2">
            Things you see a million times, for the first time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-24 bg-white">
        <h2 className="text-4xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[13rem] font-semibold leading-none mb-8 text-gray-900 text-center break-words">
          Yusrizalakbarstudio
        </h2>
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg leading-relaxed text-gray-600 text-center">
            How do you capture the attention of a community that already has seen it all?
            <br /><br />
            An idea can only sell itself so far.
            <br /><br />
            Eventually, the desire fades.
            <br /><br />
            What truly sells is a <strong className="text-gray-900">Dream</strong>.
            <br /><br />
            Pair a product with a story and it becomes more than material, you've created 
            <br />
            <strong className="text-gray-900"> A Dream.</strong>
            <br />
            <br />
            <strong>A following.</strong>
            <br />
            <br />
            <strong>A lifestyle.</strong>
            <br />
            <br />
            <strong>A culture.</strong>
            <br />
            <br />  
            <strong>A Brand.</strong>
            Storytelling turns distant aspirations into something people can hold, wear, and live.
            <br /><br />
            <strong className="text-gray-900">Yusrizal Akbar Studios</strong> focuses on storytelling through photography. Visual storytelling turns your ideas into an experience, Capturing not just how it looks but how it makes people feel. It breathes life into business.
            <br /><br />
            From fashion that evokes bespoke tailoring in a sartorial seaside, or surreal elegance of a graduation coming of age. 
            <br /><br />
            <br />
            Breathe life into your world.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-white" id="contact">
        <h2 className="text-center text-3xl font-semibold mb-2 text-zinc-950">Contact Me</h2>
        <p className="text-center text-base text-gray-600 mb-8">
          Get in touch with me. Let's make it happen.
        </p>

        <form
          action="https://formspree.io/f/xnndvvgd"
          method="POST"
          className="max-w-2xl mx-auto space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
              required
              className="flex-1 px-4 py-3 text-zinc-900 text-base border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <input
              type="text"
              name="last-name"
              placeholder="Last Name"
              required
              className="flex-1 px-4 py-3 text-base text-zinc-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 text-base border text-zinc-900 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full px-4 py-3 text-base border text-zinc-900 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full px-4 py-3 text-base border border-gray-300 text-zinc-900 rounded-md bg-gray-50 resize-vertical focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full px-4 py-4 bg-gray-900 text-white text-base font-medium uppercase border-none cursor-pointer rounded-md hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
