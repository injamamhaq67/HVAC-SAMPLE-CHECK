import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, CalendarCheck, ChevronDown, Menu, X } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { openModal } = useAppointment();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-card py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-brand-yellow shadow-md group-hover:scale-105 group-hover:rotate-[-2deg] transition-all duration-300">
              <Shield className="w-5 h-5 fill-brand-yellow/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-brand-navy leading-none tracking-tight">American</span>
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Home Shield</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#" className="text-brand-navy hover:text-amber-500 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-yellow after:scale-x-100">
              Home
            </a>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 hover:text-amber-500 transition-colors focus:outline-none py-1"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 w-52 pt-2 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                      <a 
                        href="#services" 
                        onClick={() => openModal('AC Installation')}
                        className="block px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                      >
                        AC Installation
                      </a>
                      <a 
                        href="#services" 
                        onClick={() => openModal('Furnace / Heating')}
                        className="block px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                      >
                        Gas & Furnace Heating
                      </a>
                      <a 
                        href="#services" 
                        onClick={() => openModal('Refrigeration Install')}
                        className="block px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                      >
                        Refrigeration Repair
                      </a>
                      <a 
                        href="#services" 
                        onClick={() => openModal('Routine Tune-Up & Maintenance')}
                        className="block px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                      >
                        Air Duct Cleaning & Maintenance
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#service-areas" className="hover:text-amber-500 transition-colors">Service Areas</a>
            <a href="#reviews" className="hover:text-amber-500 transition-colors">Reviews</a>
            <a href="#about" className="hover:text-amber-500 transition-colors">About Us</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
          </nav>

          {/* Phone & CTA Button */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:18008581922" 
              className="hidden lg:flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-amber-600 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-brand-navy group-hover:bg-amber-100 group-hover:text-amber-700 transition-all">
                <Phone className="w-3.5 h-3.5" />
              </span>
              1-800-858-1922
            </a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('Routine Tune-Up & Maintenance')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-amber-400 text-brand-navy font-bold text-sm shadow-md hover:shadow-lg transition-all group"
            >
              <span>Get Free Estimate</span>
              <span className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <CalendarCheck className="w-3.5 h-3.5 text-brand-yellow" />
              </span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3 text-sm font-semibold">
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-brand-navy font-bold"
              >
                Home
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Services
              </a>
              <a 
                href="#service-areas" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Service Areas
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Reviews
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                About Us
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Contact
              </a>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                <a 
                  href="tel:18008581922" 
                  className="flex items-center gap-2 px-3 py-2 text-brand-navy font-bold"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  1-800-858-1922
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openModal();
                  }}
                  className="w-full py-3 bg-brand-yellow hover:bg-amber-400 text-brand-navy font-bold rounded-xl text-center shadow"
                >
                  Get Free Estimate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
