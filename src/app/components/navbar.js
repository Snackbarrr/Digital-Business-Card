'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/shop', label: 'Shop' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 z-50 bg-white">
      {/* Logo */}
      <Link 
        href="/" 
        className="text-xl font-semibold text-gray-900 no-underline hover:text-gray-700 transition-colors duration-200"
      >
        Yusrizalakbar
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-900 no-underline font-normal hover:text-gray-600 transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300 ease-out"></span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-2xl text-gray-900 bg-none border-none cursor-pointer p-1 hover:text-gray-600 transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className={`block transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''}`}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 md:hidden" />
          
          {/* Mobile Menu */}
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full right-8 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 min-w-[160px] transform transition-all duration-200 ease-out"
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-gray-900 no-underline font-medium hover:text-gray-600 hover:bg-gray-50 px-4 py-3 transition-colors duration-200 ${
                    index === 0 ? 'rounded-t-lg' : ''
                  } ${
                    index === navLinks.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;