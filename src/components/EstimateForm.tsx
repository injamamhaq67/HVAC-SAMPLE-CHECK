import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, ArrowRight, Lock, Zap, Snowflake, AlertCircle, Loader2 } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { submitAppointmentLead } from '../services/api';
import type { AppointmentData } from '../types/appointment';

export const EstimateForm: React.FC<{ defaultService?: string }> = ({ defaultService = 'AC Repair' }) => {
  const { openSuccessModal } = useAppointment();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    service: defaultService,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9()\s+-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.zipCode) newErrors.zipCode = 'Please select a ZIP code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const payload: AppointmentData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        zipCode: formData.zipCode,
        service: formData.service,
        preferredDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        preferredTime: 'Morning (8:00 AM - 12:00 PM)',
        message: formData.message,
        smsTrackingAlerts: true
      };

      const res = await submitAppointmentLead(payload);
      if (res.success) {
        openSuccessModal(res.data);
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          zipCode: '',
          service: defaultService,
          message: '',
        });
      }
    } catch (err: unknown) {
      setSubmitError('Failed to process estimate request. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-8 shadow-form border border-slate-100 relative hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Airflow icon badge on form edge */}
      <div className="absolute -top-4 -left-4 w-11 h-11 rounded-2xl bg-brand-yellow flex items-center justify-center text-brand-navy shadow-lg font-bold transform -rotate-6 hover:rotate-0 transition-transform duration-200">
        <Snowflake className="w-5 h-5 text-brand-navy" />
      </div>

      <div className="mb-6">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Fast & Free Quote</span>
        <h3 className="text-2xl font-bold text-brand-navy tracking-tight mt-1">Let Us Help You Today.</h3>
        <p className="text-xs text-slate-500 mt-1">No obligations. Instant response from our local dispatch.</p>
      </div>

      {submitError && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="David Andrew"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${
                errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              } rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow focus:bg-white transition-all outline-none`}
            />
          </div>
          {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="(704) 555-0199"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              } rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow focus:bg-white transition-all outline-none`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="david@example.com"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${
                errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              } rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow focus:bg-white transition-all outline-none`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Select Zip Code *</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </span>
            <select
              value={formData.zipCode}
              onChange={(e) => {
                setFormData({ ...formData, zipCode: e.target.value });
                if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
              }}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${
                errors.zipCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              } rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow focus:bg-white transition-all outline-none appearance-none`}
            >
              <option value="">Select your service zip code...</option>
              <option value="28202">28202 - Uptown / Downtown</option>
              <option value="28203">28203 - South End</option>
              <option value="75201">75201 - Downtown Dallas</option>
              <option value="75206">75206 - Lower Greenville</option>
              <option value="93534">93534 - Lancaster Central</option>
            </select>
          </div>
          {errors.zipCode && <p className="text-[11px] text-rose-500 mt-1">{errors.zipCode}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Write your comment / issue</label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Briefly describe what your AC or heater needs..."
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow focus:bg-white transition-all outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className="w-full py-3.5 bg-brand-yellow hover:bg-amber-400 text-brand-navy font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-navy" />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400" /> 256-bit Encrypted
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-brand-yellow fill-brand-yellow" /> Quick Dispatch
        </span>
      </div>
    </motion.div>
  );
};
