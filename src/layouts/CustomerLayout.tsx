import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui';
import { Menu, X, Globe, Share2 } from 'lucide-react';

export const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '#' },
    { name: 'Events', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col relative">
      {/* Top Glass Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-8 h-20 md:h-24 flex justify-between items-center relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary hover:scale-110 transition-transform md:hidden z-50"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="relative h-20 flex items-center">
            <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 z-50">
              <img
                src="/src/assets/logo-black.png"
                alt="Bohemians Logo"
                className="h-24 md:h-32 w-auto object-contain transition-all duration-500 ease-out hover:scale-105"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
            {/* Spacer to preserve space in the flex flow for the logo */}
            <div className="w-32 md:w-72" />
          </div>

          <nav className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-headline font-bold tracking-tighter uppercase transition-all duration-300 hover:text-primary ${location.pathname === link.path ? "text-primary border-b-2 border-primary" : "text-on-surface/70"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="primary" size="md">
              CONTACT
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        {children}
      </main>

      {/* Footer (Magazine Style) */}
      <footer className="bg-stone-900 rounded-t-[4rem] mt-20 py-20 px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <img
              src="/src/assets/logo-magenta.png"
              alt="Bohemians Logo"
              className="h-16 md:h-24 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:scale-110 hover:brightness-150 transition-all duration-700 font-black cursor-pointer"
              style={{ imageRendering: 'crisp-edges' }}
            />
            <p className="text-stone-400 font-label text-sm tracking-wide text-center md:text-left">
              © 2024 – The Social House. <br /> Stay Electric.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 font-label text-sm tracking-wide">
            {['Privacy Policy', 'Terms', 'Careers', 'Press'].map((link) => (
              <a key={link} href="#" className="text-stone-400 hover:text-secondary transition-colors uppercase font-bold tracking-widest">
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {[Globe, Share2].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-surface hover:bg-primary transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Background Accent */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
      </footer>
    </div>
  );
};
