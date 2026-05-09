
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Button } from '@/components/ui/button';

const SuccessCasesCarousel = () => {
  const [cases, setCases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase
        .from('success_cases')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        const aluvalleCase = {
          id: 'aluvalle-static',
          title: 'Aluvalle: Transformación Digital y SEO',
          description: 'Rediseño completo y estrategia SEO para la tienda líder en carpintería de aluminio. Optimización de catálogo y mejora radical de la experiencia de usuario.',
          image: '/images/aluvalle-case.webp',
          result: '+300% Tráfico Orgánico',
          industry: 'Retail / Construcción',
          slug: 'aluvalle-transformacion-digital',
          created_at: new Date().toISOString()
        };
        setCases([aluvalleCase, ...data]);
      } else {
        const aluvalleCase = {
          id: 'aluvalle-static',
          title: 'Aluvalle: Transformación Digital y SEO',
          description: 'Rediseño completo y estrategia SEO para la tienda líder en carpintería de aluminio. Optimización de catálogo y mejora radical de la experiencia de usuario.',
          image: '/images/aluvalle-case.webp',
          result: '+300% Tráfico Orgánico',
          industry: 'Retail / Construcción',
          slug: 'aluvalle-transformacion-digital',
          created_at: new Date().toISOString()
        };
        setCases([aluvalleCase]);
      }
      setLoading(false);
    };

    fetchCases();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  }, [cases.length]);

  useEffect(() => {
    if (cases.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [cases.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full py-20 bg-black container mx-auto px-6">
        <SkeletonLoader className="w-full h-[400px] rounded-2xl" />
      </div>
    );
  }

  if (cases.length === 0) return null;

  return (
    <section className="py-20 bg-black overflow-hidden" id="success-cases">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Casos de Éxito</h2>
            <p className="text-gray-400">Resultados reales para empresas reales.</p>
          </div>
          <Link to="/services/success-cases" className="text-cyan-400 hover:text-cyan-300 hidden md:block">
            Ver todos los casos &rarr;
          </Link>
        </div>

        <div 
          className="relative w-full md:w-[90%] mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={cases[currentIndex].image} 
                alt={cases[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/40 to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    {cases[currentIndex].industry}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {cases[currentIndex].title}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-green-400 mb-4">
                    {cases[currentIndex].result}
                  </p>
                  <p className="text-gray-300 line-clamp-2 md:line-clamp-none max-w-xl">
                    {cases[currentIndex].description}
                  </p>
                </div>
                
                <Button 
                   onClick={() => window.location.href = `/services/success-cases/${cases[currentIndex].slug}`}
                   className="bg-white text-black hover:bg-gray-200 font-bold whitespace-nowrap"
                >
                  Ver caso completo
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {cases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesCarousel;
