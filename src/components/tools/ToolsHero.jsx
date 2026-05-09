
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LogoComponent from '@/components/shared/LogoComponent';

const ToolsHero = ({ onSearch }) => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1674949182306-584d93e1f682" 
          alt="Tools Center" 
          className="w-full h-full object-cover" 
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
            <span className="text-gray-500"></span>
            <span></span>
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
            Centro de Herramientas <br /> SEO Growthers
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
          >
            Acceso a herramientas premium seleccionadas por SEO Growthers para optimizar tu crecimiento digital.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="relative max-w-xl mx-auto w-full"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Busca una herramienta..." 
                onChange={e => onSearch && onSearch(e.target.value)} 
                className="pl-12 pr-4 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 rounded-full w-full shadow-2xl" 
              />
              <Button className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6">
                Buscar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
