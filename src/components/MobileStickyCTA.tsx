import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const MobileStickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useAppointment();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 400px (past hero)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 bg-white/90 backdrop-blur-md border-t border-slate-200/80 shadow-2xl pb-safe"
        >
          <div className="flex items-center gap-2">
            <a
              href="tel:18008581922"
              className="p-3 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center font-bold active:scale-95 transition-transform"
              aria-label="Call HVAC Dispatch"
            >
              <Phone className="w-5 h-5 text-amber-600" />
            </a>

            <button
              onClick={() => openModal()}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-yellow hover:bg-amber-400 text-brand-navy font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-brand-navy" />
              <span>Get Free Estimate</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
