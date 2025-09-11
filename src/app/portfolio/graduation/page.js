"use client";
import React from 'react';
import Image from 'next/image';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const GraduationPage = () => {
  const images = [
    {
      id: 1,
      src: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Grad/DSC05259.avif',
      alt: 'Graduate portrait with diploma'
    },
    {
      id: 2,
      src: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Grad/DSC05531.avif',
      alt: 'Graduation ceremony moment'
    },
    {
      id: 3,
      src: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Grad/DSC05545.avif',
      alt: 'Graduation celebration'
    },
    {
      id: 4,
      src: 'https://storage.googleapis.com/spurofthemoment/Portfolio/Grad/DSC05583-Edit.avif',
      alt: 'Graduate portrait outdoor'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      {/* Project Header */}
      <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Graduation</h1>
          <div className="text-gray-600 text-base mt-1">Your Finest Hour · 2025</div>
          <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
            Your Finest Hour. Years of hard work, frame by frame. Live out your future endeavours to the fullest.
            <br />
            Scroll the collage for their stories.
          </p>
        </div>
      </section>

      {/* Masonry Gallery using column-width approach */}
      <main 
        className="p-0 gap-0"
        style={{
          columnWidth: '360px',
          columnGap: 0,
        }}
      >
        <style jsx>{`
          @media (max-width: 1200px) {
            main {
              column-width: 320px;
            }
          }
          @media (max-width: 900px) {
            main {
              column-width: 280px;
            }
          }
          @media (max-width: 700px) {
            main {
              column-width: 240px;
            }
          }
          @media (max-width: 420px) {
            main {
              column-width: 100%;
            }
          }
        `}</style>
        
        {images.map((image) => (
          <figure 
            key={image.id} 
            className="break-inside-avoid m-0 hover:-translate-y-0.5 transition-transform duration-150 ease-out"
          >
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={360}
                height={540}
                className="w-full h-auto block"
                style={{ 
                  width: '100%', 
                  height: 'auto' 
                }}
                sizes="(max-width: 420px) 100vw, (max-width: 700px) 240px, (max-width: 900px) 280px, (max-width: 1200px) 320px, 360px"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </main>
       <Footer />
    </div>
  );
};

export default GraduationPage;