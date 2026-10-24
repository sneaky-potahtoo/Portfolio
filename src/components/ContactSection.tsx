import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { PORTFOLIO_CONFIG, type ContactChannel } from "../config";
import { Mail, Copy, Check, ArrowUpRight, ChevronUp } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";

interface ContactSectionProps {
  onCopyEmail: (email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCopyEmail,
}) => {
  const [copied, setCopied] = useState(false);
  const { contact, footer, links } = PORTFOLIO_CONFIG;

  const handleCopy = () => {
    navigator.clipboard.writeText(links.email);
    setCopied(true);
    onCopyEmail(links.email);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cardVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index === 0 ? -35 : index === 2 ? 35 : 0,
      y: 45,
      scale: 0.95,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.1 + index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  const getChannelIcon = (id: string) => {
    switch (id) {
      case "github":
        return (
          <GithubIcon className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
        );
      case "linkedin":
        return (
          <LinkedInIcon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
        );
      case "email":
      default:
        return (
          <Mail
            size={24}
            className="group-hover:scale-110 transition-transform"
          />
        );
    }
  };

  const getChannelStyles = (id: string) => {
    switch (id) {
      case "github":
        return {
          glowColor: "rgba(255, 255, 255, 0.1)",
          iconBox:
            "bg-white/5 border-white/10 text-white/90 group-hover:border-white/30 group-hover:bg-white/10",
          topHighlight: "via-white/20",
          badgeColor: "text-white/40",
          btnClass:
            "bg-white/10 hover:bg-white text-white hover:text-slate-950 border-white/15",
          hoverTitle: "group-hover:text-amber-100",
        };
      case "linkedin":
        return {
          glowColor: "rgba(56, 189, 248, 0.12)",
          iconBox:
            "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/20",
          topHighlight: "via-cyan-400/30",
          badgeColor: "text-cyan-400/60",
          btnClass:
            "bg-white/10 hover:bg-white text-white hover:text-slate-950 border-white/15",
          hoverTitle: "group-hover:text-cyan-100",
        };
      case "email":
      default:
        return {
          glowColor: "rgba(245, 158, 11, 0.16)",
          iconBox:
            "bg-amber-500/15 border-amber-500/30 text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
          topHighlight: "via-amber-400",
          badgeColor: "text-amber-400/80",
          btnClass: "bg-white hover:bg-amber-400 text-slate-950",
          hoverTitle: "group-hover:text-amber-100",
        };
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-8 md:py-16 select-none scroll-mt-24"
    >
      {/* Signature Rounded Frame */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[28px] border border-white/15 bg-[#0c181e]/85 backdrop-blur-2xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl flex flex-col justify-between"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="mb-10 md:mb-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs uppercase tracking-wider mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {contact.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight"
          >
            <span>{contact.titleSolid}</span>
            <span className="text-hollow inline-block">
              {contact.titleOutline}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-sm md:text-base max-w-xl mt-3 font-normal leading-relaxed"
          >
            {contact.subtitle}
          </motion.p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
          {contact.channels.map((channel: ContactChannel, idx: number) => {
            const styles = getChannelStyles(channel.id);
            const isEmail = channel.id === "email";

            return (
              <motion.div
                key={channel.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <TiltCard
                  glowColor={styles.glowColor}
                  className={`h-full glass-panel rounded-3xl p-7 flex flex-col justify-between border ${
                    isEmail
                      ? "border-amber-400/25 hover:border-amber-400/50"
                      : "border-white/12 hover:border-white/30"
                  } hover:shadow-2xl transition-all group relative overflow-hidden`}
                >
                  {/* Ambient top highlight */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent ${styles.topHighlight} to-transparent`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all shadow-sm ${styles.iconBox}`}
                      >
                        {getChannelIcon(channel.id)}
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider ${styles.badgeColor}`}
                      >
                        {channel.categoryLabel}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-semibold text-white tracking-tight mb-2 flex items-center gap-2 transition-colors ${styles.hoverTitle}`}
                    >
                      <span>{channel.title}</span>
                      {channel.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/20">
                          {channel.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                      {channel.description}
                    </p>
                  </div>

                  <div>
                    {/* Metadata Row */}
                    <div className="pt-3 pb-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-white/45 font-mono text-[11px] uppercase">
                        {channel.metaLabel}
                      </span>
                      <span
                        className={`font-medium flex items-center gap-1.5 ${isEmail ? "text-amber-300" : "text-white/90"}`}
                      >
                        {channel.id === "github" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                        {channel.metaValue}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    {isEmail ? (
                      <div className="flex items-center gap-2">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={channel.url}
                          className="flex-1 bg-white hover:bg-amber-400 text-slate-950 font-medium py-3 rounded-full transition-colors duration-300 text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-black/20 hover:shadow-amber-400/25 cursor-pointer"
                        >
                          <span>{channel.actionText}</span>
                          <ArrowUpRight size={14} />
                        </motion.a>

                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={handleCopy}
                          title="Copy email to clipboard"
                          className={`p-3 rounded-full border transition-all duration-200 cursor-pointer ${
                            copied
                              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                              : "bg-white/10 border-white/15 text-white/80 hover:text-white hover:bg-white/20"
                          }`}
                          aria-label="Copy email"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </motion.button>
                      </div>
                    ) : (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full font-medium py-3 rounded-full border transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 group-hover:shadow-lg cursor-pointer ${styles.btnClass}`}
                      >
                        <span>{channel.actionText}</span>
                        <ArrowUpRight size={15} />
                      </motion.a>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Footer */}
        <div className="relative z-10 pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-mono">
          <div className="flex items-center gap-2">
            <span>{footer.copyright}</span>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>{footer.backToTopText}</span>
            <ChevronUp size={14} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
