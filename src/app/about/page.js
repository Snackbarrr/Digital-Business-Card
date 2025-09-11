"use client";
import React from 'react';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto pt-20 pb-16 px-6">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-6">
          About
        </h1>
        
        <div className="space-y-6 text-center">
          <p className="text-lg leading-relaxed text-gray-700">
            AlwaysAnotherAngle is a media portfolio by Yusrizalakbar. A raw gallery and reflection on daily life. From interiors and fashion to journeys to foreign lands and collaborations with creators, it offers a fresh perspective through film and photography: A new idea, A different method, A unique angle on the moments worth capturing. This space exists to share those products and stories with minds alike, future clients and collaborators. Over time, it will become a timeline of growth, learning, and connection.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700">
            ... And i hope <strong className="font-semibold">you</strong> can be apart of it. - Yusrizalakbar
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700">
            <strong className="font-semibold">It takes one perfect click, one perfect frame to immortalize your vision</strong>
          </p>
        </div>
        
        <div className="mt-12">
          <Image 
            className="w-full rounded-lg shadow-sm" 
            src="https://storage.googleapis.com/spurofthemoment/about/6K5A0639.jpg" 
            alt="About Visual"
            height={1000}
            width={800}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;