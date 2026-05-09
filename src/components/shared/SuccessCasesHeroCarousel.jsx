
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight, Star, ArrowRight, Trophy, Building2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const SuccessCasesHeroCarousel = () => {
  const [cases, setCases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const fetchCases = useCallback(async () => {
    try {
      // 1. Fetch de la base de datos
      const { data, error } = await supabase
        .from('success_cases')
        .select('id, title, description, image, result, industry, slug, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 2. Definir caso Aluvalle (Estático)
      const aluvalleCase = {
        id: 'aluvalle-static',
        title: 'Aluvalle: Transformación Digital y SEO',
        description: 'Rediseño completo y estrategia SEO para la tienda líder en carpintería de aluminio. Optimización radical de Core Web Vitals y conversión.',
        image: '/images/aluvalle-case.webp',
        result: '+300% Tráfico Orgánico',
        industry: 'Retail / Construcción',
        slug: 'aluvalle-transformacion-digital',
        url: '/services/success-cases/aluvalle-transformacion-digital'
      };

      // 3. Combinar y mapear
      const dbCases = (data || []).map(c => ({
        ...c,
        url: `/services/success-cases/${c.slug}`
      }));

      setCases([aluvalleCase, ...dbCases]);
    } catch (err) {
      console.error('Error fetching success cases for hero:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const nextSlide = useCallback(() => {
    if (cases.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  }, [cases.length]);

  useEffect(() => {
    if (cases.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [cases.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden bg-surface-container-high animate-pulse mb-16">
        <div className="w-full h-full flex items-center justify-center">
          <SkeletonLoader className="w-3/4 h-12" />
        </div>
      </div>
    );
  }

  if (cases.length === 0) return null;

  return (
    <section 
      className="mb-20 relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[2.5rem] bg-transparent border border-white/5 group shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={cases[currentIndex].image} 
            alt={cases[currentIndex].title}
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[15s] ease-out"
          />
          
          {/* Forum Recycled Gradient Style */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent hidden md:block"></div>
          
          <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end z-10">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="bg-amber-500/10 text-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-500/20 backdrop-blur-md flex items-center gap-2">
                  <Trophy size={12} />
                  CASO DE ÉXITO REAL
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 size={12} />
                  {cases[currentIndex].industry}
                </span>
              </motion.div>
              
              <Link to={cases[currentIndex].url}>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] tracking-tighter text-on-surface mb-8 hover:text-primary transition-colors cursor-pointer"
                >
                  {cases[currentIndex].title}
                </motion.h2>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                    {cases[currentIndex].description}
                  </p>
                  
                  <Link to={cases[currentIndex].url}>
                    <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-cyan-400 transition-all group/btn shadow-xl">
                      Analizar Estrategia
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group-hover:border-cyan-500/30 transition-colors"
                >
                  <BarChart3 className="text-cyan-400 mb-2" size={32} />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Impacto Generado</span>
                  <h4 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                    {cases[currentIndex].result}
                  </h4>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 right-10 z-20 flex flex-col gap-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length)}
          className="p-4 rounded-2xl bg-surface/20 hover:bg-surface/40 backdrop-blur-xl border border-white/10 text-white transition-all transform hover:scale-110 active:scale-90"
        >
          <ChevronRight className="rotate-180" size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-2xl bg-surface/20 hover:bg-surface/40 backdrop-blur-xl border border-white/10 text-white transition-all transform hover:scale-110 active:scale-90"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-3">
        {cases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              idx === currentIndex ? "w-12 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" : "w-3 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SuccessCasesHeroCarousel;
