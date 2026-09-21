import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Thermometer, Snowflake, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const Services: React.FC = () => {
  const { openModal } = useAppointment();
  const [activePageIndex, setActivePageIndex] = useState(0);

  const serviceSets = [
    [
      {
        icon: Flame,
        title: 'Gas/Furnace Heating',
        desc: 'Complete diagnostic tune-up, heat exchanger safety inspections, pilot burner repair, and complete high-AFUE furnace retrofits.',
        serviceName: 'Furnace / Heating',
        hasGraphic: false,
      },
      {
        icon: Thermometer,
        title: 'Heater Installation',
        desc: 'Energy Star certified heat pumps and ductless mini-split systems installed with factory warranties and smart zoning capabilities.',
        serviceName: 'New System Installation',
        hasGraphic: false,
      },
      {
        icon: Snowflake,
        title: 'Refrigeration Install',
        desc: 'We came out to my home on three occasions and each time provided excellent, prompt commercial refrigeration service.',
        serviceName: 'AC Repair',
        hasGraphic: true,
        graphicImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa6C1W5SklXz3XntxLPceRqIAIx2R68NK2zQhGNZkMZBhWmHszurkn-WXaZaHALBu-zP4ZjvUJquInV5DXe7MZFADw3sAMyXgLIp7EjzUz42TxxTvx1p_9FHBTlDEgdFHFYWIk5xGCovnZQX7JlIOxT3PyjwTw0CPwi5eXUKuk_EAqz9TRITAaF3l_EOAQ1FTPJHrAfsniWN-M4F4MtOlBm0Tw7yawtlDAJD1E8Q82xMbTKK5AXAE1',
      },
    ],
    [
      {
        icon: Snowflake,
        title: 'AC Repair & Tuning',
        desc: 'Rapid diagnostic pinpointing of compressor leaks, capacitor failures, and sensor errors with upfront flat-rate pricing.',
        serviceName: 'AC Repair',
        hasGraphic: false,
      },
      {
        icon: Thermometer,
        title: 'Duct Cleaning & Care',
        desc: 'High-pressure HEPA duct vacuuming, antimicrobial coil sanitizing, and airflow balancing for residential air quality.',
        serviceName: 'Routine Tune-Up & Maintenance',
        hasGraphic: false,
      },
      {
        icon: Flame,
        title: 'Commercial HVAC Fleet',
        desc: 'Design, installation, and ongoing preventative maintenance agreements for multi-unit commercial real estate.',
        serviceName: 'Emergency 24/7',
        hasGraphic: true,
        graphicImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa6C1W5SklXz3XntxLPceRqIAIx2R68NK2zQhGNZkMZBhWmHszurkn-WXaZaHALBu-zP4ZjvUJquInV5DXe7MZFADw3sAMyXgLIp7EjzUz42TxxTvx1p_9FHBTlDEgdFHFYWIk5xGCovnZQX7JlIOxT3PyjwTw0CPwi5eXUKuk_EAqz9TRITAaF3l_EOAQ1FTPJHrAfsniWN-M4F4MtOlBm0Tw7yawtlDAJD1E8Q82xMbTKK5AXAE1',
      },
    ],
  ];

  const handlePrev = () => {
    setActivePageIndex((prev) => (prev === 0 ? serviceSets.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePageIndex((prev) => (prev === serviceSets.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark Shell Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-brand-cardDark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Header row inside card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">Our Specializations</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Top HVAC Services In Lancaster CA
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal()}
                className="px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-amber-400 text-brand-navy text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Book An Appointment
              </button>
              {/* Carousel controls */}
              <button
                onClick={handlePrev}
                aria-label="Previous service slide"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-brand-yellow flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next service slide"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-brand-yellow flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {serviceSets[activePageIndex].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 text-slate-900 flex flex-col justify-between shadow-lg border border-transparent hover:border-brand-yellow/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy leading-snug">{card.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.desc}</p>
                    </div>

                    <div>
                      <div className="pt-6">
                        <button
                          onClick={() => openModal(card.serviceName)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy hover:text-amber-600 transition-colors uppercase tracking-wider group/btn"
                        >
                          <span>Schedule Service</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>

                      {card.hasGraphic && card.graphicImg && (
                        <div className="bg-slate-100 h-24 mt-4 rounded-xl overflow-hidden relative border-t border-slate-100 -mb-2">
                          <img
                            src={card.graphicImg}
                            alt={card.title}
                            className="w-full h-full object-cover object-center filter contrast-125 group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
