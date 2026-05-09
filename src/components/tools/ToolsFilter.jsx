
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'TODO',
  'SEO',
  'ANÁLISIS',
  'PRODUCTIVIDAD',
  'MARKETING',
  'DISEÑO',
  'DESARROLLO',
  'INTEGRACIONES'
];

const ToolsFilter = ({ activeCategory, onCategoryChange }) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setIsSticky(window.scrollY > 400);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "sticky top-16 md:top-20 z-40 py-4 transition-all duration-300 border-b border-transparent",
        isSticky ? "bg-[#0C0D0D]/90 backdrop-blur-md border-white/10 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 text-gray-300 shrink-0">
          <Filter size={16} />
          <span className="text-sm font-medium">Filtrar</span>
        </div>

        <div className="flex-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                  isActive 
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                    : "bg-slate-900/50 border-slate-800 text-gray-500 hover:text-white hover:bg-slate-800"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsFilter;
