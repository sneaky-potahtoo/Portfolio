import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0c171b]/95 backdrop-blur-2xl border border-amber-400/30 text-white shadow-2xl shadow-black/60"
        >
          <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Check size={14} className="stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Copied to Clipboard</span>
            <span className="text-[11px] text-white/60">{message}</span>
          </div>
          <button
            onClick={onClose}
            className="ml-2 text-white/40 hover:text-white text-xs px-1 cursor-pointer"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
