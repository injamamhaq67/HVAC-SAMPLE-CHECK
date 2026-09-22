import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Snowflake, Flame, Wrench, RotateCcw, Truck, Sun, CloudSun, Moon, Zap, User, Phone, Home, MapPin, Shield, Lock, ArrowRight, Loader2, Mail } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { submitAppointmentLead } from '../services/api';

export const AppointmentModal: React.FC = () => {
  const { isModalOpen, closeModal, openSuccessModal, selectedService, setSelectedService } = useAppointment();
  const modalRef = useRef<HTMLDivElement>(null);

  // Dynamic Date calculations
  const getDates = () => {
    const days = ['Today', 'Tomorrow', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[d.getDay()],
        dateStr: `${months[d.getMonth()]} ${d.getDate()}`,
      };
    });
  };

  const availableDates = getDates();

  const [selectedDate, setSelectedDate] = useState(availableDates[0].dateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning (8:00 AM - 12:00 PM)');
  const [smsTracking, setSmsTracking] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    zipCode: '28202',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9()\s+-]{7,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) errs.address = 'Service address is required';
    if (!formData.zipCode.trim()) errs.zipCode = 'Zip code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        zipCode: formData.zipCode,
        service: selectedService,
        preferredDate: selectedDate,
        preferredTime: selectedTimeSlot,
        address: formData.address,
        message: formData.notes,
        smsTrackingAlerts: smsTracking,
      };

      const res = await submitAppointmentLead(payload);
      if (res.success) {
        openSuccessModal(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    { name: 'AC Repair', icon: Snowflake, isEmergency: false },
    { name: 'Furnace / Heating', icon: Flame, isEmergency: false },
    { name: 'Routine Tune-Up & Maintenance', label: 'Tune-Up & Check', icon: Wrench, isEmergency: false },
    { name: 'New System Installation', label: 'System Install', icon: RotateCcw, isEmergency: false },
    { name: 'Emergency 24/7', label: '24/7 Priority Emergency Dispatch', icon: Truck, isEmergency: true },
  ];

  const timeSlots = [
    { label: 'Morning', window: '8:00 AM - 12:00 PM', icon: Sun },
    { label: 'Afternoon', window: '12:00 PM - 4:00 PM', icon: CloudSun },
    { label: 'Evening', window: '4:00 PM - 7:00 PM', icon: Moon },
    { label: 'Urgent ASAP', window: 'Within 60 mins', icon: Zap, isUrgent: true },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-brand-navy/70 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={closeModal} />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.92, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 14 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-modal border border-slate-200/90 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white px-6 sm:px-8 pt-6 pb-5 relative flex-shrink-0">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-yellow/20 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all focus:outline-none hover:rotate-90 duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-brand-yellow mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fast Dispatch • Certified Technicians</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white" id="modal-title">
              Schedule Your Service Appointment
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Select your preferred date, time, and service type. Our certified HVAC specialists will confirm within 15 minutes.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto px-6 sm:px-8 py-5 space-y-6 text-slate-800 text-xs custom-scrollbar">
            {/* Section 1: Service Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                1. Select Service Type <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {services.map((s, idx) => {
                  const Icon = s.icon;
                  const isSelected = selectedService === s.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedService(s.name)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                        s.isEmergency
                          ? 'col-span-2 sm:col-span-2 border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold'
                          : isSelected
                          ? 'border-brand-yellow bg-amber-50/70 text-brand-navy font-bold ring-2 ring-brand-yellow/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                          s.isEmergency
                            ? 'bg-rose-100 text-rose-600'
                            : isSelected
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{s.label || s.name}</span>
                        {s.isEmergency && <span className="text-[10px] text-rose-600/80 font-normal">Fastest guaranteed technician arrival</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Preferred Date */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Preferred Appointment Date <span className="text-amber-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Same-day available</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {availableDates.map((item, idx) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-2.5 rounded-xl border text-center transition-all duration-200 hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'border-brand-yellow bg-amber-50/70 ring-2 ring-brand-yellow/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className={`block text-[10px] font-bold uppercase ${isSelected ? 'text-amber-600' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                      <span className={`block text-sm font-extrabold ${isSelected ? 'text-brand-navy' : 'text-slate-800'}`}>
                        {item.dateStr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Time Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                3. Preferred Arrival Window <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {timeSlots.map((slot, idx) => {
                  const Icon = slot.icon;
                  const slotStr = `${slot.label} (${slot.window})`;
                  const isSelected = selectedTimeSlot === slotStr;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slotStr)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-yellow bg-amber-50/70 ring-2 ring-brand-yellow/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${slot.isUrgent || isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span className={`font-bold ${isSelected ? 'text-brand-navy' : 'text-slate-700'}`}>{slot.label}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{slot.window}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Contact & Property */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                4. Contact & Property Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Andrew"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 border ${
                        errors.name ? 'border-rose-400' : 'border-slate-200'
                      } rounded-xl text-xs focus:ring-2 focus:ring-brand-yellow focus:bg-white outline-none transition-all`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(704) 555-0199"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 border ${
                        errors.phone ? 'border-rose-400' : 'border-slate-200'
                      } rounded-xl text-xs focus:ring-2 focus:ring-brand-yellow focus:bg-white outline-none transition-all`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@example.com"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 border ${
                        errors.email ? 'border-rose-400' : 'border-slate-200'
                      } rounded-xl text-xs focus:ring-2 focus:ring-brand-yellow focus:bg-white outline-none transition-all`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Zip Code *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="Zip code (e.g. 28202)"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 border ${
                        errors.zipCode ? 'border-rose-400' : 'border-slate-200'
                      } rounded-xl text-xs focus:ring-2 focus:ring-brand-yellow focus:bg-white outline-none transition-all`}
                    />
                  </div>
                  {errors.zipCode && <p className="text-[10px] text-rose-500 mt-0.5">{errors.zipCode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service Address / Street *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Home className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address or unit"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 border ${
                        errors.address ? 'border-rose-400' : 'border-slate-200'
                      } rounded-xl text-xs focus:ring-2 focus:ring-brand-yellow focus:bg-white outline-none transition-all`}
                    />
                  </div>
                  {errors.address && <p className="text-[10px] text-rose-500 mt-0.5">{errors.address}</p>}
                </div>
              </div>

              {/* SMS Alert Toggle */}
              <div className="mt-3.5 p-3 rounded-xl bg-amber-50/60 border border-brand-yellow/80 flex items-start justify-between gap-3">
                <label className="flex items-start gap-3 cursor-pointer select-none flex-1">
                  <input
                    type="checkbox"
                    checked={smsTracking}
                    onChange={(e) => setSmsTracking(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-yellow focus:ring-brand-yellow border-slate-300"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-navy">Send me real-time SMS status updates & technician dispatch alerts</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow text-brand-navy font-extrabold text-[10px] shadow-sm">
                        <Zap className="w-3 h-3 fill-brand-navy" /> Free SMS Alerts
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      (e.g. "Technician Marcus is 15 mins away with live GPS link"). Message & data rates may apply.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* GPS Tracking Live Preview Box */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              <div className="bg-brand-navy text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow">Live Tracking On Appointment Day</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-emerald-400 border border-white/15">Active GPS Ready</span>
              </div>
              <div className="p-4 space-y-3.5">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6RlIFbF0QcVC2v6TU1Y_YA8TwTx0vcUMmJzGQwm7Ibwbz_eoqEutRaCZNOjVzzzI5EfxaIEqlZtuzjyyhUeZ348pj5ANV1RVINndUDz-zsAeXtaWRkf4ZqqrmmEa8KLXLkGcJRPWSn5x7GmZDJFmRVqTz-H6_tWIf0UE0pMbp00j7T0vT9EasE9RBSC7TRiDld8En_a3zeTgWwggz0rAQbCEnlMIa3a-ddeHuMlNFWyBFBCjbaju9"
                      alt="Marcus Vance"
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow shadow-sm"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-brand-navy">Marcus Vance</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-extrabold text-[9px]">4.9 ★</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Master Certified HVAC Specialist</span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    <Shield className="w-3 h-3" /> Vetted & Screened
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="space-y-2 pt-1">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-brand-navy font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 group disabled:opacity-75 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-navy" />
                    <span>Booking Appointment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Book Service Appointment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit Encrypted & Privacy Protected</span>
                </span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={closeModal} className="text-slate-500 hover:text-brand-navy underline">
                    Cancel
                  </button>
                  <span>•</span>
                  <a href="tel:18008581922" className="font-bold text-brand-navy hover:text-amber-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-500" /> Call 1-800-858-1922
                  </a>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
