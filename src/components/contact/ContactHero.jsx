
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoComponent from '@/components/shared/LogoComponent';

const ContactHero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-[#0a0e27]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560821630-1a7c45c3286e" 
          alt="Contact Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/80 via-[#0a0e27]/70 to-[#0C0D0D] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-cyan-400 mb-6 uppercase"
          >
            <Link to="/" className="hover:text-white transition-colors">INICIO</Link>
            <span className="text-gray-500">/</span>
            <span>CONTACTO</span>
          </motion.nav>

          <div className="mb-6">
            <LogoComponent size="large" variant="icon-only" isLink={false} />
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Contacta con SEO Growthers
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-0 max-w-2xl mx-auto font-light"
          >
            Estamos aquí para ayudarte. El equipo de SEO Growthers te responderá en 24 horas.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
