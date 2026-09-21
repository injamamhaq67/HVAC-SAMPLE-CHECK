import React from 'react';
import { Shield, MapPin, Phone, Mail } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';

export const Footer: React.FC = () => {
  const { openModal } = useAppointment();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center text-brand-yellow shadow-md">
                <Shield className="w-4 h-4 fill-brand-yellow/20" />
              </div>
              <div>
                <span className="text-base font-extrabold text-brand-navy leading-none block">American Home Shield</span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">HVAC & Energy Care</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              American HVAC Inc. provides heating and air conditioning services for residential and commercial customers with dependable emergency response and certified factory parts.
            </p>

            {/* Social Media Icons using FontAwesome classes */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-yellow hover:text-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors hover:scale-110 active:scale-95"
              >
                <i className="fa-brands fa-twitter text-xs" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-yellow hover:text-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors hover:scale-110 active:scale-95"
              >
                <i className="fa-brands fa-instagram text-xs" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-yellow hover:text-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors hover:scale-110 active:scale-95"
              >
                <i className="fa-brands fa-linkedin-in text-xs" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-yellow hover:text-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors hover:scale-110 active:scale-95"
              >
                <i className="fa-brands fa-facebook-f text-xs" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Company */}
          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#about" className="hover:text-amber-600 transition-colors">About us</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Blog & Tips</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-amber-600 transition-colors">Contact us</a></li>
              <li><a href="#reviews" className="hover:text-amber-600 transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Links Column 2: Services */}
          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <button onClick={() => openModal('Furnace / Heating')} className="hover:text-amber-600 transition-colors text-left">
                  Heating Services
                </button>
              </li>
              <li>
                <button onClick={() => openModal('AC Repair')} className="hover:text-amber-600 transition-colors text-left">
                  Air Conditioning
                </button>
              </li>
              <li>
                <button onClick={() => openModal('Routine Tune-Up & Maintenance')} className="hover:text-amber-600 transition-colors text-left">
                  Indoor Air Quality
                </button>
              </li>
              <li>
                <button onClick={() => openModal('Furnace / Heating')} className="hover:text-amber-600 transition-colors text-left">
                  Gas/Furnace Heating
                </button>
              </li>
              <li>
                <button onClick={() => openModal('Refrigeration Install')} className="hover:text-amber-600 transition-colors text-left">
                  Refrigeration Install
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact Us */}
          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>1320 N. Tustin Ave. Anaheim, CA 92807</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:7144095681" className="hover:text-amber-600 transition-colors">(714) 409-5681</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:info@aamhvac.com" className="hover:text-amber-600 transition-colors">info@aamhvac.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            Licensed & Registered | Made with ❤️ Copyright © {new Date().getFullYear()} HVAC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Terms and Conditions</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Card Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
