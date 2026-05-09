import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const About = () => {
  return (
    <section className="py-24 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Impulsamos el <span className="text-cyan-400">futuro digital</span> de tu negocio
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              En SEO Growthers, combinamos estrategia, diseño y tecnología para crear productos digitales
              excepcionales que conectan marcas con sus audiencias. No somos solo desarrolladores,
              somos socios en tu crecimiento.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Estrategia Digital', 'Desarrollo Web & App', 'Diseño UX/UI', 'Marketing & SEO', 'Consultoría Tech', 'Soporte 24/7'].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="bg-cyan-500/10 p-1 rounded-full">
                    <Check size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team working" 
              className="relative rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;