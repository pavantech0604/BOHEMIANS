import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui';
import { Menu, X, Globe, Share2, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

// Import assets correctly for Vite
import logoBlack from '../assets/logo-black.png';
import logoMagenta from '../assets/logo-magenta.png';

export const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('contact-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToContact: true } });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col relative">
      {/* Top Glass Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-outline-variant/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex justify-between items-center relative">
          
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:scale-110 transition-transform md:hidden z-[60]"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={logoBlack}
                alt="Bohemians Logo"
                className="h-23 md:h-32 w-auto object-contain transition-all duration-500 ease-out hover:scale-105"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
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
            <Button 
              variant="primary" 
              size="md"
              className="px-6 md:px-8"
              onClick={handleContactClick}
            >
              CONTACT
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[55] md:hidden"
              />
              <motion.nav 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-surface z-[60] md:hidden flex flex-col p-12"
              >
                <div className="mb-16">
                  <img src={logoBlack} alt="Bohemians" className="h-20 w-auto" />
                </div>
                <ul className="space-y-8">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-4xl font-headline font-black uppercase tracking-tighter leading-none transition-all ${
                          location.pathname === link.path ? "text-primary ml-4" : "text-on-surface/40"
                        }`}
                      >
                         {location.pathname === link.path && <span className="text-primary mr-4">/</span>}
                         {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10 border-t border-stone-200">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/20 mb-6">Social Connexion</p>
                    <div className="flex gap-4">
                      {['IG', 'FB', 'TW'].map(social => (
                        <span key={social} className="text-xs font-black text-primary">{social}</span>
                      ))}
                    </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 md:pt-28">
        {children}
      </main>

      {/* High-Fidelity Mega Footer - Compact & Refined */}
      <footer id="footer" className="bg-[#0c0c01] rounded-t-[2.5rem] md:rounded-t-[4rem] mt-16 py-12 md:py-16 px-6 md:px-12 overflow-hidden relative border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-12">
            {/* Col 1: Brand Identity & Story */}
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="space-y-4">
                <Link to="/">
                  <img
                    src={logoMagenta}
                    alt="Bohemians Logo"
                    className="h-16 md:h-24 w-auto object-contain brightness-110 transition-all duration-700 hover:scale-110"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </Link>
                <p className="text-white/50 font-body text-base md:text-lg leading-relaxed max-w-sm italic">
                  A collision of heritage and rebellion. Curating experiences for the restless.
                </p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-white font-headline font-black uppercase text-[10px] tracking-[0.3em] opacity-40">Digital Command</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Globe, label: 'Website' },
                    { icon: Share2, label: 'Social' },
                    { icon: Mail, label: 'Email' }
                  ].map((item, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-500">
                      <item.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Navigation & Salon */}
            <div className="md:col-span-4 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-white font-headline font-black uppercase text-[10px] tracking-[0.4em] text-primary">Explore</h4>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-white/30 hover:text-white transition-all flex items-center gap-2 group text-sm md:text-base">
                        <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-500" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-white font-headline font-black uppercase text-[10px] tracking-[0.4em] text-primary">The Salon</h4>
                <ul className="space-y-3 text-white/30">
                  {['Careers', 'Press', 'Gift Cards', 'Privacy'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-all text-sm md:text-base flex items-center gap-2 group">
                        <span className="opacity-0 group-hover:opacity-100 transition-all text-primary">/</span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 3: Synchronized Contact & Location */}
            <div className="md:col-span-3 space-y-8">
               <div>
                 <h4 className="text-white font-headline font-black uppercase text-[10px] tracking-[0.4em] text-primary mb-6">Local Sanctuary</h4>
                 <div className="space-y-6">
                    <div className="flex gap-4 group items-start">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <MapPin size={18} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-white font-headline font-bold text-sm leading-tight">Indiranagar Branch</p>
                         <p className="text-white/40 text-[11px] leading-snug max-w-[150px]">966, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560008</p>
                      </div>
                    </div>
                    <div className="flex gap-4 group items-center">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <Phone size={18} />
                      </div>
                      <a href="tel:+919876543210" className="text-white/40 hover:text-primary transition-colors text-sm font-headline font-bold italic">+91 98765 43210</a>
                    </div>
                    <div className="flex gap-4 group items-center">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <Mail size={18} />
                      </div>
                      <a href="mailto:hello@bohemians.live" className="text-white/40 hover:text-primary transition-colors text-sm font-headline font-bold italic">hello@bohemians.live</a>
                    </div>
                 </div>
               </div>
               
               <button 
                 onClick={() => window.open('https://maps.app.goo.gl/bohemians', '_blank')}
                 className="w-full h-12 rounded-xl border border-white/5 flex items-center justify-center gap-2 text-white/60 font-headline font-black uppercase text-[10px] tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-500"
               >
                 Navigate
                 <ArrowUpRight size={14} />
               </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-white/10 text-[10px] font-label uppercase tracking-widest">
              © 2024 Bohemians. The Social House.
            </p>
            <button onClick={handleContactClick} className="flex items-center gap-3 text-white/10 grayscale hover:grayscale-0 transition-all">
               <span className="text-[10px] font-black uppercase">Identity by</span>
               <img src={logoBlack} alt="Bohemians" className="h-4 brightness-200 opacity-50" />
            </button>
          </div>
        </div>

        {/* Accents */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
      </footer>
    </div>
  );
};
