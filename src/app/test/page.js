"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import DomeGallery from '@/app/components/domegallery';

function UrbanTailorPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Project Header */}
            <section className="px-8 py-5 border-b border-gray-200 flex justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        UrbanTailor suits
                    </h1>
                    <div className="text-gray-600 text-base mt-1">
                        Modern Gentlemen's tailoring · 2025
                    </div>
                    <p className="text-gray-700 text-base mt-2 max-w-3xl leading-relaxed">
                        A study of contemporary tailoring. Clean lines, Sharp details.
                        Minimal Branding; The posture says it all.
                        <br />
                        Scroll to explore:
                        <br></br>
                        Tailoring for the Urban Dweller.
                        <br></br>
                        Memoirs from a Sartorial Seaside.
                    </p>
                </div>
            </section>

            {/* Masonry Gallery using CSS columns approach */}
            <main >
                <div style={{ width: '100vw', height: '100vh' }}>
                    <DomeGallery />
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default UrbanTailorPage;
