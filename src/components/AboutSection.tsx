import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Terminal } from "lucide-react";
import { PORTFOLIO_CONFIG, type SkillCategory } from "../config";
import { TiltCard } from "./TiltCard";
import { SkillIcon } from "./icons/SkillIcon";

export const AboutSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | SkillCategory>(
    "all",
  );

  const { skills } = PORTFOLIO_CONFIG;

  const filteredSkills =
    activeCategory === "all"
      ? skills.items
      : skills.items.filter((s) => s.category === activeCategory);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="relative w-full py-8 md:py-16 scroll-mt-24">
      {/* Signature Rounded Frame */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[28px] border border-white/15 bg-[#0a1418]/85 backdrop-blur-2xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Section Header */}
        <div className="mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {skills.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight"
          >
            <span>{skills.headingSolid}</span>
            <span className="text-hollow inline-block">
              {skills.headingOutline}
            </span>
          </motion.h2>
        </div>

        {/* Minimalist Tech Stack Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
        >
          <TiltCard
            glowColor="rgba(56, 189, 248, 0.12)"
            className="w-full glass-panel rounded-[24px] p-6 sm:p-8 md:p-10 border border-white/12 hover:border-white/30"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-sm">
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {skills.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    {skills.subtitle}
                  </p>
                </div>
              </div>

              {/* Tag / Badge */}
              <span className="self-start sm:self-auto text-xs font-mono uppercase tracking-widest text-white/40 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {filteredSkills.length} TECHNOLOGIES
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 max-w-md">
              {(["all", "frontend", "backend", "tools"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-1.5 px-3.5 text-xs font-mono capitalize rounded-xl transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white/20 text-white font-medium border border-white/30 shadow-sm"
                      : "bg-white/[0.03] text-white/50 border border-white/5 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tech Stack Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-pill rounded-xl px-3.5 py-3 flex items-center gap-2.5 text-xs font-medium text-white/90 hover:border-amber-400/50 hover:bg-white/[0.08] transition-colors group cursor-default"
                >
                  <SkillIcon
                    name={skill.icon}
                    className={`w-4 h-4 ${skill.color} shrink-0`}
                  />
                  <span className="truncate">{skill.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Minimal Footer Row */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-white/50">
              <span>{skills.footerNote}</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {skills.footerStatus}
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};
