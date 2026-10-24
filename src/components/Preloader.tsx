import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [perimeter, setPerimeter] = useState<number>(3000);
  const frameRef = useRef<HTMLDivElement>(null);

  // Measure frame perimeter for SVG stroke-dasharray
  useEffect(() => {
    const updatePerimeter = () => {
      if (frameRef.current) {
        const { width, height } = frameRef.current.getBoundingClientRect();
        const r = 28;
        // Perimeter of rounded rect: 2*(w - 2r) + 2*(h - 2r) + 2*PI*r
        const p = 2 * (width - 2 * r) + 2 * (height - 2 * r) + 2 * Math.PI * r;
        setPerimeter(Math.max(p, 1000));
      }
    };

    updatePerimeter();
    window.addEventListener('resize', updatePerimeter);
    return () => window.removeEventListener('resize', updatePerimeter);
  }, []);

  // Animate counter from 0 to 100
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4 seconds

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease-out
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);
      const currentPercent = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(currentPercent);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Complete
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Border draw starts at 35% and finishes at 92%
  const borderProgress = Math.min(Math.max((progress - 35) / (92 - 35), 0), 1);
  const strokeDashoffset = perimeter * (1 - borderProgress);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Viewport Frame Container */}
      <div
        ref={frameRef}
        className="absolute inset-3 md:inset-6 rounded-[28px] pointer-events-none overflow-hidden"
      >
        {/* Animated SVG Border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="28"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.5"
            strokeDasharray={perimeter}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Preloader Elements: Bottom-Left Counter */}
        <AnimatePresence>
          {!isFadingOut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
              className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none"
            >
              {/* Bottom-Left 0% -> 100% Counter */}
              <div className="flex items-baseline gap-1">
                <span className="font-light text-6xl md:text-8xl text-white/85 tracking-tighter tabular-nums select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                  {progress}
                </span>
                <span className="text-2xl md:text-3xl font-light text-white/50 select-none">
                  %
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
