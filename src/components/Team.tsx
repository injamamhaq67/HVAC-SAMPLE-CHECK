import React from 'react';
import { motion } from 'framer-motion';

export const Team: React.FC = () => {
  const members = [
    {
      name: 'Marcus Vance',
      role: 'Master Technician',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6RlIFbF0QcVC2v6TU1Y_YA8TwTx0vcUMmJzGQwm7Ibwbz_eoqEutRaCZNOjVzzzI5EfxaIEqlZtuzjyyhUeZ348pj5ANV1RVINndUDz-zsAeXtaWRkf4ZqqrmmEa8KLXLkGcJRPWSn5x7GmZDJFmRVqTz-H6_tWIf0UE0pMbp00j7T0vT9EasE9RBSC7TRiDld8En_a3zeTgWwggz0rAQbCEnlMIa3a-ddeHuMlNFWyBFBCjbaju9',
    },
    {
      name: 'Jason Martinez',
      role: 'Wiring & Electrical Lead',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD391U7-OYhge1NIEfIe4tOuysB7JgeaDYjwig4KcHrzkKpmAZu-phKDlkw-2VevgoN1TNW7eq5z2qJPaYWALB_lbMj4pydFps7c7MMi67GLs6vFev7OVhXZ1EMkhWx28Lk1BH7kgH39iSd0oNYfCe5bmuTGdeghoRWLYvAkjuzYKgvDTF1FUj3Ry1fXl23EbquPTlAcZP2vsZOcZesUonSmVBaYnrveAjShLBgOAwsor4EOovYfWAG',
    },
    {
      name: 'Frank Sterling',
      role: 'Ductwork Specialist',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5nx44c-I7pr3BamCKfpakj96DzV0p4Bhv5t2SjBjYa4R2KhYH8xPii9DkP1_3eTLH44mPS2iY72bfDPqtVFGs3fqxCMhRyVyftfwfunQKUlvAo1y0AuMQrEQ8QVYn1eINqxAouipuT7hij88wZbIbzmbVFp92E3sZ0eBtr8E7X7RskBJ5tZyRJutBxu7zLMZWGlSlAwuT9XDp057g_xBpmWOzjXUixqkySYhNqUrjrZNmpkUG0IVQ',
    },
    {
      name: 'Elena Rostova',
      role: 'Heat Pump Engineer',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGBgbjYC3dsueqGFBdZQYZO8jZrPMe50JP38TZ3H7zKMhmTrEzHMTjXkEBd0DQBpPZp3VdeJnaeB86lDaVsiSCFGV3b3OmcLog34AfHU71sh-erH6VR_Y9WYCsuyGT-I6uD26CKqrNL9D6xVjXUV74cNbxLOKooiJzPGsqbuqeR9OTizjkwaTAC5-NdwtmN7y0S_kCpKJIzvwB8N1KJImmTR4XNETd90OsP6u0f25nnB6mgqBJg3jJ',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">— FIELD MASTERS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
            Meet Our Dedicated Team
          </h2>
        </motion.div>

        {/* 4 Columns Crew Action Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {members.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4] relative group shadow-sm"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white transform group-hover:translate-y-[-2px] transition-transform">
                <p className="text-xs font-bold">{m.name}</p>
                <p className="text-[10px] text-amber-300">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
