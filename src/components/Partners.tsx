import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Partners: React.FC = () => {
  const partners = [
    { name: 'amazon', style: 'font-black text-xl tracking-tighter text-slate-800' },
    { name: 'Garrett', style: 'font-bold text-lg tracking-widest text-red-600' },
    { name: 'Rheem', style: 'font-serif text-xl font-bold text-slate-700' },
    { name: 'ADELTA', style: 'font-sans text-xl font-black text-blue-900 tracking-wider' },
    { name: 'CAIXA', style: 'font-mono text-lg font-bold text-slate-800' },
    { name: 'ASCII', style: 'font-extrabold text-xl tracking-widest text-slate-800' },
  ];

  return (
    <section className="py-14 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-brand-navy tracking-tight text-center md:text-left">
            We're Proud To Partner With The Best
          </h3>
          <div className="flex gap-2">
            <button
              aria-label="Previous partner"
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-brand-navy flex items-center justify-center text-xs text-slate-600 transition-colors active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              aria-label="Next partner"
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-brand-navy flex items-center justify-center text-xs text-slate-600 transition-colors active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Partner Logos Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
        >
          {partners.map((p, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center hover:scale-105 transition-all duration-200 cursor-pointer ${p.style}`}
            >
              {p.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
