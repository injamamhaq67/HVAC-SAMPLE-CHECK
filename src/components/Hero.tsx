import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { EstimateForm } from './EstimateForm';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-brand-lightBg">
      {/* Decorative Ambient Lights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Rating Pill Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm cursor-pointer hover:border-amber-300 transition-all"
            >
              <div className="flex text-brand-yellow gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">5.0 (243 reviews)</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.12]"
            >
              Innovative and Personalized{' '}
              <span className="italic font-normal underline decoration-brand-yellow decoration-wavy decoration-2">
                HVAC
              </span>{' '}
              Solutions.
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base text-slate-600 max-w-xl leading-relaxed"
            >
              From precision AC installation and heating maintenance to fast emergency diagnostics, we keep your residential and commercial indoor air pristine and energy-efficient 365 days a year.
            </motion.p>

            {/* Technician Action Shot Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              className="relative pt-4 max-w-md"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4w6RtGCsVNw4K_7GqJDr-7by6-QOVbLtiy4q7_dONKzyCSgzFjUhYdSI17850xDiT8QyGW7C1TARBx4ZZdQj6Gz96wWPNVvqvRWCfNyNOAIRnTZTXSyyjw1dZUtHErbdUUtX_80K8hR82UMc1smhrmG6psiEacqwBvma5IwYaumZGeqptQ5266igWjKaSfQ6GK5kyOLwthWwNqQDrp4jCn0W-gpUIwjAJrKmo48LrsX5E8rjFnF5c"
                  alt="HVAC technician in yellow vest servicing outdoor cooling unit"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-navy/90 backdrop-blur-md rounded-2xl p-3 text-white flex items-center justify-between text-xs shadow-lg transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-medium">On-Duty Certified Specialists</span>
                  </div>
                  <span className="text-brand-yellow font-bold">24/7 Available</span>
                </div>
              </div>

              {/* Floating Airflow Graphic */}
              <svg
                className="absolute -top-12 -right-16 w-64 h-64 pointer-events-none hidden sm:block animate-float text-slate-300"
                fill="none"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20,120 C70,180 130,20 180,90 C200,120 140,160 120,130"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="6 6"
                  strokeWidth="2"
                />
                <circle cx="120" cy="130" r="14" fill="#FDB813" fillOpacity="0.2" />
                <circle cx="120" cy="130" r="4" fill="#FDB813" />
              </svg>
            </motion.div>
          </div>

          {/* Right Hero Estimate Form Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <EstimateForm />
          </div>
        </div>
      </div>
    </section>
  );
};
