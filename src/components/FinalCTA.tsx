import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppointment } from '../context/AppointmentContext';

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const { openModal } = useAppointment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      openModal('Routine Tune-Up & Maintenance');
    }
  };

  return (
    <section className="py-16" id="final-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-brand-navy rounded-3xl overflow-hidden relative shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Text & Inline Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 z-10 space-y-6">
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">
                Seasonal Promo & Savings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get The Best Heating & Air Conditioning Services
              </h2>
              <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                Schedule your seasonal preventative checkup today and receive a $75 instant rebate voucher on any service call.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-yellow hover:bg-amber-400 text-brand-navy font-bold text-sm shadow-md whitespace-nowrap transition-colors"
                >
                  Get Estimate
                </button>
              </form>
            </div>

            {/* Right Image Banner */}
            <div className="lg:col-span-5 h-72 sm:h-96 relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm_5sS_Ve83Pw7QSd67j-hTCpoSJtqwBtpkjdR1HKyWqmN7eD1ublx6Vf_MkoRo9L_6ZKi64-upnY5fkTwwVq6t3srQpGcNEyOy92g08WUgpMhhMyAgLd7NEqLCKUbEwLh7t-H2A7wNy47ZmKk9rvdysBcGC5CyOUfVujA7St0eWpO3HkpV-TJRPH8i2pYfDYzROzSVnvvf-yHgFtq2zQe2TW6UZJyqyTLvS6IyqBVSUOLCEiMy2d9"
                alt="Technician on ladder working on AC compressor"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
