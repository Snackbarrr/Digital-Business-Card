'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react';


export default function DigitalBusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Touch/mouse interaction state
  const rotateStateRef = useRef({
    rotateX: 0,
    rotateY: 0,
    velocityX: 0,
    velocityY: 0,
    lastTouchX: 0,
    lastTouchY: 0,
    spinning: false
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Load appropriate video
    if (videoRef.current) {
      const source = videoRef.current.querySelector('source');
      if (source) {
        source.src = isMobile 
          ? 'https://storage.googleapis.com/spurofthemoment/BackgroundMobile.mp4'
          : 'https://storage.googleapis.com/spurofthemoment/Background.mp4';
        videoRef.current.load();
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Copied: ${text}`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const animateSpin = () => {
    const state = rotateStateRef.current;
    if (!state.spinning || !cardInnerRef.current) return;
    
    state.rotateX += state.velocityX;
    state.rotateY += state.velocityY;
    state.velocityX *= 0.98;
    state.velocityY *= 0.98;
    
    cardInnerRef.current.style.transform = `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
    
    if (Math.abs(state.velocityX) > 0.01 || Math.abs(state.velocityY) > 0.01) {
      requestAnimationFrame(animateSpin);
    } else {
      state.spinning = false;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const state = rotateStateRef.current;
    state.lastTouchX = e.touches[0].clientX;
    state.lastTouchY = e.touches[0].clientY;
    state.spinning = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const state = rotateStateRef.current;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - state.lastTouchX;
    const deltaY = currentY - state.lastTouchY;
    
    state.rotateY += deltaX * 0.5;
    state.rotateX -= deltaY * 0.5;
    state.lastTouchX = currentX;
    state.lastTouchY = currentY;
    
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const state = rotateStateRef.current;
    state.velocityY = (e.changedTouches[0].clientX - state.lastTouchX) * 0.15;
    state.velocityX = -(e.changedTouches[0].clientY - state.lastTouchY) * 0.15;
    state.spinning = true;
    animateSpin();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXMouse = -(y - centerY) / 6;
    const rotateYMouse = (x - centerX) / 6;
    
    cardRef.current.style.transition = 'transform 0.2s ease-out';
    cardRef.current.style.transform = `rotateX(${rotateXMouse}deg) rotateY(${rotateYMouse}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    if (isMobile || !cardRef.current) return;
    
    cardRef.current.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handleClick = () => {
    if (isMobile || !cardInnerRef.current) return;
    
    setIsFlipped(!isFlipped);
    cardInnerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    cardInnerRef.current.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source 
          src={isMobile 
            ? 'https://storage.googleapis.com/spurofthemoment/BackgroundMobile.mp4'
            : 'https://storage.googleapis.com/spurofthemoment/Background.mp4'
          } 
          type="video/mp4" 
        />
      </video>
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 -z-10" />
      
      {/* Card Container */}
      <div
        ref={cardRef}
        className={`
          w-full max-w-80 h-[28rem] cursor-pointer
          transition-all duration-300 ease-out
          shadow-[0_10px_20px_rgba(0,0,0,0.15)]
          ${isMobile ? 'scale-85 m-4' : ''}
        `}
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        onClick={!isMobile ? handleClick : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <div
          ref={cardInnerRef}
          className="w-full h-full relative"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease-out'
          }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full bg-white rounded-2xl overflow-hidden
                       flex flex-col justify-center items-center 
                       px-5 py-10 md:py-10"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            <div className={`
              font-bold tracking-[2px] text-gray-900
              ${isMobile ? 'text-4xl' : 'text-5xl'}
            `}>
              YAJ
            </div>
          </div>
          
          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-white rounded-2xl overflow-hidden
                       flex flex-col justify-center items-center 
                       px-5 pt-16 pb-6"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Profile Image */}
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="https://res.cloudinary.com/dky6bti4g/image/upload/v1757542646/Profile_xsmmtb.jpg"
                alt="Photo of Yusrizal Akbar Junaedi"
                fill
                className="rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
            </div>
            
            {/* Name and Title */}
            <h1 className={`font-bold text-center mb-2 text-gray-900 ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              Yusrizal Akbar Junaedi
            </h1>
            
            <p className={`italic text-center mb-4 text-gray-700 ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              Media, Film and Photography
            </p>
            
            {/* Contact Section */}
            <h2 className={`font-semibold text-center mb-2 text-gray-900 ${
              isMobile ? 'text-sm' : 'text-lg'
            }`}>
              Contact
            </h2>
            
            <div className={`space-y-2 text-center ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {/* Email */}
              <div 
                className="flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard('akbar@yusrizalakbar.com');
                }}
              >
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="underline text-gray-700">akbar@yusrizalakbar.com</span>
              </div>
              
             
              
              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-2 pt-2">
                <div className="group relative">
                  <a
                    href="https://www.instagram.com/_snapbar_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="w-4 h-4 text-gray-600" />
                  </a>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1
                                   bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap
                                   opacity-0 group-hover:opacity-100 transition-all duration-200
                                   pointer-events-none">
                    Instagram
                  </span>
                </div>
                
                <div className="group relative">
                  <a
                    href="https://www.linkedin.com/in/yusrizal-junaedi-b9a67b249/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </a>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1
                                   bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap
                                   opacity-0 group-hover:opacity-100 transition-all duration-200
                                   pointer-events-none">
                    LinkedIn
                  </span>
                </div>
              </div>
            </div>
            
            {/* Continue Button */}
            <a
              href="/portfolio"
              className="mt-6 inline-block bg-black text-white text-sm font-semibold 
                         px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}