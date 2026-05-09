import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0C0D0D] to-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          Lo que dicen <span className="text-cyan-400">nuestros clientes</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative"
            >
              <Quote className="text-cyan-500/20 absolute top-6 left-6" size={40} />
              <p className="text-gray-300 mb-6 relative z-10 italic">
                "AGENCY transformó completamente nuestra presencia online. Su atención al detalle y capacidad técnica superaron todas nuestras expectativas."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Carlos Rodríguez</p>
                  <p className="text-gray-500 text-xs">CEO, TechStart</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;