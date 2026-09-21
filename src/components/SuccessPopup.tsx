import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, User, Phone, Wrench, X } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const SuccessPopup: React.FC = () => {
  const { isSuccessOpen, closeSuccessModal, lastBooking } = useAppointment();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSuccessOpen) {
        closeSuccessModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSuccessOpen, closeSuccessModal]);

  if (!isSuccessOpen || !lastBooking) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-navy/75 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        {/* Click Outside Backdrop */}
        <div className="fixed inset-0" onClick={closeSuccessModal} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-modal border border-slate-200 z-10 text-center space-y-6"
        >
          {/* Close button */}
          <button
            onClick={closeSuccessModal}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close success popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Success Checkmark */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
              className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center relative shadow-inner"
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Check className="w-10 h-10 stroke-[3]" />
              </motion.div>
            </motion.div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 mb-2">
              <Check className="w-3.5 h-3.5" />
              <span>Appointment request received</span>
            </div>

            <h3 className="text-2xl font-black text-brand-navy tracking-tight" id="success-modal-title">
              Appointment Booked!
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Thank you! Your appointment request has been received. Our team will contact you shortly to confirm the details.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Request Reference</span>
              <span className="font-mono font-bold text-brand-navy">{lastBooking.id || 'APT-849201'}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <User className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="font-semibold">{lastBooking.name}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{lastBooking.phone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Wrench className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="font-bold text-brand-navy">{lastBooking.service}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{lastBooking.preferredDate}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{lastBooking.preferredTime}</span>
            </div>
          </div>

          {/* Action Done Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={closeSuccessModal}
            className="w-full py-3.5 bg-brand-yellow hover:bg-amber-400 text-brand-navy font-extrabold text-sm rounded-xl shadow-md transition-colors"
          >
            Done
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
