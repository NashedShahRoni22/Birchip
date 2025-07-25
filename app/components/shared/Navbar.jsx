'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Motel', href: '/motel' },
    { name: 'Caravan', href: '/caravan' },
    { name: 'Food', href: '/food' },
    { name: 'Gas Station', href: '/gas' },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${pathname === '/'
        ? (scrolled
          ? 'bg-black/30 backdrop-blur-xl shadow border-b border-white/20'
          : 'bg-transparent'
        )
        : 'sticky bg-black/80 backdrop-blur-xl shadow border-b border-white/20'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-white/90 transition-all duration-300"
          >
            Birchip
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${pathname === link.href
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''
                  }`}></span>
              </Link>
            ))}

            <Link
              href="/auth"
              className="ml-4 bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-full hover:bg-button transition-all duration-300 transform shadow hover:shadow-lg border border-white/20"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 text-white/80 hover:text-white focus:outline-none transition-colors duration-300"
            >
              <div className="w-6 h-6 relative">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="bg-black/30 backdrop-blur-xl border-t border-white/20 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 text-base font-medium transition-all duration-300 ${pathname === link.href
                  ? 'text-white pl-4 border-l-4 border-white'
                  : 'text-white/80 hover:text-white hover:pl-4'
                }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/auth"
            onClick={() => setMobileMenuOpen(false)}
            className="block mt-4 bg-white/20 backdrop-blur-sm text-white text-center px-6 py-3 rounded-full hover:bg-button transition-all duration-300 transform shadow border border-white/20"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}