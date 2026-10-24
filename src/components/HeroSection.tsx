import React from "react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_CONFIG } from "../config";
import { ArrowDownRight, ExternalLink } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface HeroSectionProps {
  isLoaded: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const { scrollY } = useScroll();
  const { hero, profile, links } = PORTFOLIO_CONFIG;

  // Scroll-linked exit transformations for rich kinetic feel (active after load)
  const headlineY = useTransform(scrollY, [0, 450], [0, -65]);
  const headlineOpacity = useTransform(scrollY, [0, 380], [1, 0.2]);
  const bottomElementsY = useTransform(scrollY, [0, 450], [0, 35]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-48px)] flex flex-col justify-between p-6 md:p-10 pt-20 md:pt-24 select-none scroll-mt-24"
    >
      {/* Hero Content: Strictly hidden until preloader finishes (isLoaded: true) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className={`w-full h-full flex flex-col justify-between flex-1 gap-8 transition-opacity duration-500 ${
          isLoaded
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Main 3-Line Headline with Scroll Parallax */}
        <motion.div
          variants={itemVariants}
          style={{ y: headlineY, opacity: isLoaded ? headlineOpacity : 0 }}
          className="pt-2 md:pt-4 max-w-3xl will-change-transform"
        >
          <h1 className="flex flex-col font-medium tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span className="text-white hover:text-amber-100 transition-colors">
              {hero.titleSolid1}
            </span>
            <span className="text-hollow my-0.5">{hero.titleOutline}</span>
            <span className="text-white hover:text-amber-100 transition-colors">
              {hero.titleSolid2}
            </span>
          </h1>
        </motion.div>

        {/* Bottom Elements Row: Bio (Left) | Vacant Center | Glassmorphic Card (Right) */}
        <motion.div
          style={{ y: bottomElementsY }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-auto pt-6 will-change-transform"
        >
          {/* Bottom-Left Description Paragraph */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 max-w-[340px]"
          >
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              {hero.bio}
            </p>
          </motion.div>

          {/* Vacant Middle Area for Peaceful Cabin Focus */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

          {/* Bottom-Right Glassmorphic Card with Prominent Name Focus */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-start lg:justify-end"
          >
            <TiltCard
              glowColor="rgba(245, 158, 11, 0.16)"
              className="w-full sm:max-w-[370px] glass-panel rounded-[24px] p-6 text-white shadow-2xl relative overflow-hidden backdrop-blur-2xl border border-white/16 hover:border-white/30"
            >
              {/* Subtle top edge glow border reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Card Header: Bold Focus on Name & Role */}
              <div className="flex items-start justify-between mb-5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
                      {profile.name}
                    </h3>
                  </div>
                  <p className="text-xs text-white/70 font-normal mt-1.5 flex items-center gap-1.5">
                    <span>{profile.role}</span>
                  </p>
                </div>

                {/* Circular Action Button */}
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shadow-sm shrink-0"
                  aria-label="View GitHub"
                >
                  <ExternalLink size={15} />
                </motion.a>
              </div>

              {/* Primary Card CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo("about")}
                className="w-full bg-white text-slate-950 font-medium py-2.5 px-4 rounded-xl hover:bg-amber-400 hover:text-slate-950 hover:shadow-lg hover:shadow-amber-400/25 transition-colors duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{hero.ctaText}</span>
                <ArrowDownRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </motion.button>
            </TiltCard>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
