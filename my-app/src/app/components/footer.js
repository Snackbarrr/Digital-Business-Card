'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      href: 'https://instagram.com/yusrizalakbar', 
      label: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 6.71.048 5.498.085 4.79.225 4.145.42a6.752 6.752 0 0 0-2.44 1.595A6.752 6.752 0 0 0 .42 4.455c-.195.645-.335 1.353-.373 2.565C.01 8.239 0 8.706 0 12.327s.01 4.088.048 5.307c.037 1.212.178 1.92.373 2.565a6.752 6.752 0 0 0 1.595 2.44 6.752 6.752 0 0 0 2.44 1.595c.645.195 1.353.335 2.565.373 1.219.038 1.686.048 5.307.048s4.088-.01 5.307-.048c1.212-.037 1.92-.178 2.565-.373a6.752 6.752 0 0 0 2.44-1.595 6.752 6.752 0 0 0 1.595-2.44c.195-.645.335-1.353.373-2.565.038-1.219.048-1.686.048-5.307s-.01-4.088-.048-5.307c-.037-1.212-.178-1.92-.373-2.565A6.752 6.752 0 0 0 19.985 1.705a6.752 6.752 0 0 0-2.44-1.595c-.645-.195-1.353-.335-2.565-.373C16.761.01 16.294 0 12.673 0H12.017zm-.32 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm6.406-2.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      href: 'mailto:hello@yusrizalakbar.com', 
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-xl font-semibold text-gray-900 no-underline hover:text-gray-700 transition-colors duration-200"
            >
              Yusrizalakbar Studio
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Visual storytelling through photography. Capturing not just how it looks but how it makes people feel.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Get in Touch
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Ready to bring your vision to life?
              </p>
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 border-b border-gray-900 hover:border-gray-600"
              >
                Let's work together →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Yusrizalakbar. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;