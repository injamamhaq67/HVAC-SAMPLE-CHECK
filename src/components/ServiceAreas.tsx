import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Plus, Minus } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const ServiceAreas: React.FC = () => {
  const { openModal } = useAppointment();
  const [zoomLevel, setZoomLevel] = useState(1);

  const neighborhoods = [
    { name: 'Deep Ellum', zip: '75226' },
    { name: 'Uptown', zip: '75201' },
    { name: 'Victory Park', zip: '75219' },
    { name: 'Arts District', zip: '75204' },
    { name: 'Lake Highlands', zip: '75238' },
  ];

  return (
    <section className="py-20" id="service-areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-card bg-slate-50 aspect-[4/3] group">
              <div 
                className="w-full h-full relative bg-[#e5e9ec] transition-transform duration-500 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg className="w-full h-full opacity-70" preserveAspectRatio="none" viewBox="0 0 600 450">
                  {/* Waterways */}
                  <path d="M0,80 Q150,120 300,90 T600,140 L600,180 Q450,130 300,160 T0,110 Z" fill="#c4d8e2" />
                  <path d="M400,0 Q430,200 480,450" fill="none" stroke="#c4d8e2" strokeWidth="20" />
                  {/* Grid road system */}
                  <path d="M0,50 L600,50 M0,120 L600,120 M0,200 L600,200 M0,300 L600,300 M0,380 L600,380" stroke="#ffffff" strokeWidth="6" />
                  <path d="M80,0 L80,450 M180,0 L180,450 M310,0 L310,450 M440,0 L440,450 M540,0 L540,450" stroke="#ffffff" strokeWidth="6" />
                  {/* Diagonal expressways */}
                  <line x1="0" y1="0" x2="600" y2="450" stroke="#fbd38d" strokeWidth="4" strokeDasharray="8 4" />
                  <line x1="600" y1="50" x2="0" y2="400" stroke="#fed7aa" strokeWidth="3" />
                </svg>

                {/* Main HQ Pulse Pin */}
                <div className="absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute" />
                  <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg relative z-10 text-xs">
                    <MapPin className="w-4 h-4 fill-white" />
                  </span>
                  <span className="mt-1 px-2.5 py-1 rounded bg-brand-navy text-white text-[10px] font-bold shadow-md whitespace-nowrap">
                    Fort Worth / Dallas HQ
                  </span>
                </div>

                {/* Secondary Location Pins */}
                <div className="absolute top-[28%] left-[65%] flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-brand-yellow border-2 border-white shadow" />
                  <span className="text-[9px] font-bold text-slate-700 bg-white/80 px-1 rounded">Uptown</span>
                </div>
                <div className="absolute top-[65%] left-[30%] flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-brand-yellow border-2 border-white shadow" />
                  <span className="text-[9px] font-bold text-slate-700 bg-white/80 px-1 rounded">Arts District</span>
                </div>
              </div>

              {/* Map UI Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white rounded-lg shadow-md border border-slate-200 p-1 z-20">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded text-xs active:scale-95 transition-transform"
                  aria-label="Zoom in map"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="w-full h-px bg-slate-200" />
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.9))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded text-xs active:scale-95 transition-transform"
                  aria-label="Zoom out map"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Neighborhoods List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">— SERVICE AREA</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
                Texas <span className="italic font-normal">NEIGHBORHOODS</span> We Proudly Serve
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Dispatching vetted and fully equipped vans across all major districts with guaranteed under 60-minute emergency windows.
              </p>
            </div>

            {/* Clickable Neighborhoods List */}
            <div className="space-y-3">
              {neighborhoods.map((item, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md hover:translate-x-1.5 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow ring-4 ring-amber-100 group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-500 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
