import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, RefreshCw, Settings, Snowflake, Flame } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const ServiceCategories: React.FC = () => {
  const { openModal } = useAppointment();

  const categories = [
    { label: 'Maintenance', icon: Wrench, service: 'Routine Tune-Up & Maintenance' },
    { label: 'Renovation', icon: RefreshCw, service: 'New System Installation' },
    { label: 'Installation', icon: Settings, service: 'New System Installation' },
    { label: 'Cooling', icon: Snowflake, service: 'AC Repair' },
    { label: 'Heating', icon: Flame, service: 'Furnace / Heating' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-card border border-slate-200/80 p-3 sm:p-4 hover:shadow-xl transition-all duration-300"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {categories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => openModal(item.service)}
                className={`flex items-center justify-center gap-3 p-3 text-slate-700 hover:text-amber-500 transition-all duration-200 group relative overflow-hidden ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-yellow group-hover:w-12 transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
