import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_CONFIG } from './config';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Toast } from './components/Toast';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AmbientAtmosphere } from './components/AmbientAtmosphere';

// Centralized configuration re-exported directly for quick 5-second customization
export { PORTFOLIO_CONFIG };

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();

  // Cinematic Parallax camera moves through misty pine forest as user scrolls
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.01, 1.12]);
  const overlayDarken = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.65, 0.85]);

  // Trigger preloader completion
  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0c171b] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* ========================================================= */}
      {/* 4K BACKGROUND ATMOSPHERIC LAYER WITH SCROLL PARALLAX */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Full-bleed 4K background image with dynamic scroll zoom & translation */}
        <motion.div
          style={{ y: backgroundY, scale: backgroundScale }}
          className="absolute -inset-8 bg-cover bg-center bg-no-repeat crisp-img will-change-transform"
        >
          <img
            src="/cabin-bg.png"
            alt="Misty cabin in pine forest at dusk"
            className="w-full h-full object-cover crisp-img"
            loading="eager"
          />
        </motion.div>

        {/* Ambient Dark Slate-Teal Gradient Overlay that gently deepens on scroll */}
        <motion.div
          style={{ opacity: overlayDarken }}
          className="absolute inset-0 bg-[#070e11] will-change-opacity"
        />

        {/* Gradient vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c171b]/40 via-transparent to-[#0a1215]/95" />

        {/* Vignette Overlay (Darker edges matching the reference visual) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,11,14,0.78)_100%)]" />

        {/* Dynamic Warm Amber Glow Behind Cabin Windows */}
        <div className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-amber-600/15 rounded-full blur-[130px] animate-pulse" />
      </div>

      {/* Floating Canvas Embers & Misty Wisps */}
      <AmbientAtmosphere />

      {/* ========================================================= */}
      {/* PRELOADER & BORDER-DRAW SEQUENCE */}
      {/* ========================================================= */}
      {!isLoaded && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Fixed Navigation Bar at top of viewport */}
      <Navbar activeSection={activeSection} isLoaded={isLoaded} />

      {/* ========================================================= */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full min-h-screen flex flex-col p-3 md:p-6 max-w-[1600px] mx-auto">
        {/* ========================================================= */}
        {/* SIGNATURE INNER VIEWPORT FRAME (Hero Area) */}
        {/* Inset from edges with 28px rounded border */}
        {/* ========================================================= */}
        <div
          className={`relative w-full rounded-[28px] transition-all duration-700 overflow-hidden flex flex-col justify-between ${
            isLoaded
              ? 'border border-white/25 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-[1px]'
              : 'border border-transparent'
          }`}
          style={{ minHeight: 'calc(100vh - 48px)' }}
        >
          {/* Subtle frame corner glass reflections */}
          <div className="absolute inset-0 pointer-events-none rounded-[28px] bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05]" />

          {/* Section 1: Hero Section */}
          <HeroSection isLoaded={isLoaded} />
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT ME ("Inside the Cabin") */}
        {/* ========================================================= */}
        <div className="mt-8 md:mt-14">
          <AboutSection />
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: CONTACT ME ("Send a Signal to the Cabin") */}
        {/* ========================================================= */}
        <div className="mt-8 md:mt-14 mb-6">
          <ContactSection onCopyEmail={(email) => setToastMessage(email)} />
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE ACCESSORIES */}
      {/* ========================================================= */}
      {/* Toast Notification for Email Copy */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
