import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isLoaded: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, isLoaded }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { items: navItems, ctaText } = PORTFOLIO_CONFIG.navigation;

  return (
    <header
      className={`fixed top-3 md:top-5 left-3 md:left-6 right-3 md:right-6 z-40 max-w-[1552px] mx-auto transition-all duration-500 ease-out ${
        isLoaded
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className={`w-full flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[#0c171b]/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/50 rounded-2xl md:rounded-full px-5 md:px-8 py-2.5 md:py-3'
            : 'bg-transparent border border-transparent px-3 md:px-6 py-2 md:py-3'
        }`}
      >
        {/* Brand Logo: Amber Pine Terminal Icon + Pranjal.dev */}
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
        >
          {/* Custom Warm Amber Pine/Cabin Terminal Icon */}
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
            <svg
              className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              {/* Stylized geometric pine + terminal cursor */}
              <path d="M12 2L4 11h3.5L5 15h4v5h6v-5h4l-2.5-4H20L12 2z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg md:text-xl tracking-tight group-hover:text-amber-200 transition-colors">
            {PORTFOLIO_CONFIG.brand}
          </span>
        </button>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm transition-all duration-200 relative cursor-pointer py-1 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top-Right CTA Pill Button: Solid white pill button */}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-white text-slate-950 font-medium px-5 py-2 rounded-full hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 text-sm shadow-md shadow-black/20 hover:shadow-amber-400/20 active:scale-95 cursor-pointer"
          >
            {ctaText}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white rounded-lg bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0c171b]/95 backdrop-blur-2xl border border-white/15 flex flex-col gap-3 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm py-2 px-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full mt-2 bg-white text-slate-950 font-medium py-2.5 rounded-full hover:bg-amber-400 transition text-sm text-center cursor-pointer"
          >
            {ctaText}
          </button>
        </div>
      )}
    </header>
  );
};
