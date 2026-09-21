import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface AccordionItem {
  id: string;
  num: string;
  title: string;
  content: string;
}

export const About: React.FC = () => {
  const [openId, setOpenId] = useState<string>('acc-1');

  const items: AccordionItem[] = [
    {
      id: 'acc-1',
      num: '01.',
      title: 'Family-Owned Excellence',
      content:
        'When an AC repair technician shows up at your door, are you filled with dread? We eliminate all friction with transparent upfront flat pricing, background-checked technicians, and courteous care for your home.',
    },
    {
      id: 'acc-2',
      num: '02.',
      title: 'Best Price Assurance',
      content:
        'We match comparable certified estimates and offer 0% APR financing options on qualified high-efficiency Trane, Carrier, and Lennox HVAC system replacements.',
    },
    {
      id: 'acc-3',
      num: '03.',
      title: 'Top Rated Expertise',
      content:
        'Every staff member holds EPA Universal certification and undergoes 100+ hours of continuous seasonal training on variable refrigerant flow and smart thermostats.',
    },
    {
      id: 'acc-4',
      num: '04.',
      title: '24/7 Rapid Emergency Response',
      content:
        'Middle-of-the-night furnace breakdown or blistering midsummer heat wave? Our mobile service fleet is stocked with factory parts ready for same-day repair.',
    },
  ];

  return (
    <section className="py-24" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">— ABOUT US</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-2">
              Providing Charlotte, NC With AC Repair & Installation Services Since 1975
            </h2>
          </div>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-slate-300 hover:border-brand-navy text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-all group"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-100 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFBYYOEJqKqFDNxmEfqyZCssmqKptOe8LkQWFu18EUB9Ce8yssDh-X-4zZO7M5Od9tzKK-RP-YpyYp_TWHTGjtQawW_NoM2ex5QoCjQKEBAeh1EQrBArElEYU5BHWhgELqHhc1kDUTn_S_YT7Hvp7c22qfcpZ0GIcNmUElo60UkQXlsdCcbWQY0AZ_etzWW8vObG1kuAmp8w5AXFyAYPcqjB-oO7_fOcznLc9A3TQBpLW39ngvxYCi"
                alt="Two certified HVAC engineers calibrating outdoor condenser coil unit"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white flex items-center justify-between shadow-lg transform group-hover:translate-y-[-2px] transition-transform">
                <div>
                  <p className="text-xs uppercase font-extrabold text-amber-600">Certified Heritage</p>
                  <p className="text-sm font-bold text-brand-navy">Nearly 50 Years of Continuous Service</p>
                </div>
                <div className="text-xl font-black text-brand-navy">1975</div>
              </div>
            </div>
          </motion.div>

          {/* Right Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-4"
          >
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-amber-300"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-navy hover:text-amber-600 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-amber-500">{item.num}</span>
                      <span className="text-base sm:text-lg">{item.title}</span>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                        isOpen ? 'bg-brand-navy text-white rotate-180' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
