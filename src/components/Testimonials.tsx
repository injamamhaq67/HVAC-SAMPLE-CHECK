import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  category: string;
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      category: 'Gas/Furnace Heating',
      quote:
        '"Francisco Jr. is a great young man! Excellent service, prompt, professional and trustworthy. He came out to my home on three occasions and each time he provided excellent and prompt service."',
      author: 'Paz Colon',
      company: 'Microsoft Corporation',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDMDY9Yb3zpR0ZZeAGaTsVg2i5AC-wsoOkpoPQqkZpmWfdVm8NxMg0brFt7_1gPc6TKGZx7nCIUczLNrcRn16OrPguiyt8_9j6qnSkk6UB7nRG4FvB8Xhh5eyZLXkrrHIL9UkTliWdmf2jUFvM_cZCuvrAeWWJXqlDSu3o71acPFmlwb9UuhHeH52ktZS0qAMCYosVjC24QgONGPqUT4YuKSjSTifj4IhNJPJYdDcBwt8fTHeQqCCoB',
    },
    {
      id: 2,
      category: 'Heater Installation',
      quote:
        '"We highly recommend USA Air Conditioning! Both Francisco Senior and Francisco Junior are incredible people who are extremely kind and knowledgeable. Saved us thousands on our new dual-zone condenser."',
      author: 'Matt Gais',
      company: 'USA Air Conditioning Inc',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuATH-DlgPvSdvf6hgFxdtZjrx29QnY3nPRCF853ERTdmU9qRlwC6vGnmCwIKx_gJjEp7Fx3t65UvgDdaShAvqAtF1EYZ6n1A_hUPX8myzo6tNXCfVkJ788fzQk5DiWVtQSIrvLTkBy1jqmmcYGrJro7K-H0OtKimr3RNMvrq7N5bb9iNPNWENV0lIwxd68nnFB8NRcmuXtS9jjahO9rbVJ6CuB_bpU3ItFBxlT0XdvbQ8xwy84Xtre9',
    },
    {
      id: 3,
      category: 'Refrigeration Install',
      quote:
        '"People go to Google reviews so they can discover something about a vendor. At one time, word of mouth served this role. I found out about USA Air Conditioning based on recommendation and they blew me away!"',
      author: 'Azadeh Vincent',
      company: '710Lab Agency',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBh_Lf-SSNe4x85EePcrLvZpdK6VE6SaBcO_MJXouPCszXFDK_MPmC5fQx9fwZmDeh0XMhRpnteCWPcqCfSM-Bc8I7hj773gZCWa47u7_bai91NA_ToGZU5kTLbdruB5bFFmFySynela4rGrm-80Nuiku06rPEALV2Ln6LQLE-ra1R1qAq41OIBRXj4FmTDP-G-Aq6C5aZXpPCxNY3tSs2QCEZedVd8yHcymI80WSgRk4eUTpEnuyAq',
    },
    {
      id: 4,
      category: 'AC Repair & Tuning',
      quote:
        '"Middle of July heat wave and our compressor quit at 9 PM. Their emergency technician arrived in under 40 minutes and replaced the capacitor on the spot. Absolute lifesavers!"',
      author: 'Rachel Sterling',
      company: 'Charlotte Resident',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD6RlIFbF0QcVC2v6TU1Y_YA8TwTx0vcUMmJzGQwm7Ibwbz_eoqEutRaCZNOjVzzzI5EfxaIEqlZtuzjyyhUeZ348pj5ANV1RVINndUDz-zsAeXtaWRkf4ZqqrmmEa8KLXLkGcJRPWSn5x7GmZDJFmRVqTz-H6_tWIf0UE0pMbp00j7T0vT9EasE9RBSC7TRiDld8En_a3zeTgWwggz0rAQbCEnlMIa3a-ddeHuMlNFWyBFBCjbaju9',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/60" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-brand-yellow text-sm mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
            ))}
            <span className="text-xs font-extrabold text-slate-700 ml-1">5.0 (243 reviews)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            What Our Customer Say About Us
          </h2>
        </motion.div>

        {/* Testimonials Grid / Slider */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col justify-between relative group hover:shadow-xl transition-all duration-300"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600 uppercase mb-4 tracking-wider">
                  {item.category}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">{item.quote}</p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-brand-yellow group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">{item.author}</h4>
                    <p className="text-[10px] text-slate-400">{item.company}</p>
                  </div>
                </div>
                <span className="text-brand-yellow text-2xl font-serif">“</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600 uppercase mb-4 tracking-wider">
                  {testimonials[currentIndex].category}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed italic">{testimonials[currentIndex].quote}</p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-brand-yellow"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">{testimonials[currentIndex].author}</h4>
                    <p className="text-[10px] text-slate-400">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
                <span className="text-brand-yellow text-2xl font-serif">“</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-8 h-8 rounded-full border border-slate-300 hover:border-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold font-mono text-slate-500">
            {currentIndex + 1} / {testimonials.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next review"
            className="w-8 h-8 rounded-full border border-slate-300 hover:border-brand-navy text-slate-600 flex items-center justify-center text-xs transition-colors active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
