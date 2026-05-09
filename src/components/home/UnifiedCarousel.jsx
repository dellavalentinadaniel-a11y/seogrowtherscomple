
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight, ArrowRight, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Button } from '@/components/ui/button';

const UnifiedCarousel = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch success cases
        const { data: casesData } = await supabase
          .from('success_cases')
          .select('id, title, description, image, result, industry, slug, category')
          .order('created_at', { ascending: false });

        // Add the manual Aluvalle case if it's not in DB yet (as we did before)
        const aluvalleCase = {
          id: 'aluvalle-static',
          type: 'case',
          title: 'Aluvalle: Transformación Digital e Impacto SEO',
          description: 'Implementamos una arquitectura digital escalable y una estrategia de contenidos avanzada, logrando resultados extraordinarios en visibilidad y tasa de conversión.',
          image: '/images/aluvalle-premium.webp',
          result: '+300% Tráfico Orgánico',
          industry: 'Retail / Construcción',
          slug: 'aluvalle-transformacion-digital',
          category: 'Retail',
          url: '/services/success-cases/aluvalle-transformacion-digital'
        };

        const cases = (casesData || []).map(c => ({
          ...c,
          type: 'case',
          tag: c.industry || 'Caso de Éxito',
          url: `/services/success-cases/${c.slug}`
        }));

        // Add Aluvalle at the beginning
        const finalCases = [aluvalleCase, ...cases];

        // Fetch articles
        const { data: articlesData } = await supabase
          .from('articles')
          .select('id, title, summary, featured_image, slug, category, created_at, status')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(5);

        const articles = (articlesData || []).map(a => ({
          ...a,
          type: 'article',
          description: a.summary,
          image: a.featured_image,
          tag: a.category || 'Blog',
          url: `/blog/${a.category || 'general'}/${a.slug}`,
          result: 'Knowledge Hub'
        }));

        // Interleave items
        const combined = [];
        const maxLength = Math.max(finalCases.length, articles.length);
        
        for (let i = 0; i < maxLength; i++) {
          if (i < finalCases.length) combined.push(finalCases[i]);
          if (i < articles.length) combined.push(articles[i]);
        }

        setItems(combined);
      } catch (err) {
        console.error('Error fetching unified data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [items.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full py-20 bg-black container mx-auto px-6">
        <SkeletonLoader className="w-full h-[500px] rounded-3xl" />
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-[#0C0D0D] overflow-hidden" id="unified-showcase">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-cyan-500"></span>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Featured</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Impacto & Conocimiento</h2>
          </div>
          <div className="flex gap-4">
             <Link to="/services/success-cases" className="text-sm text-gray-400 hover:text-white transition-colors">Casos</Link>
             <span className="text-gray-800">/</span>
             <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>

        <div 
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={items[currentIndex].image} 
                alt={items[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110 md:will-change-transform"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0D] via-[#0C0D0D]/70 to-transparent opacity-95"></div>
              
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-10">
                <div className="max-w-3xl">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                      items[currentIndex].type === 'case' 
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    }`}>
                      {items[currentIndex].type === 'case' ? 'Success Case' : 'Knowledge Hub'}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{items[currentIndex].tag}</span>
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight"
                  >
                    {items[currentIndex].title}
                  </motion.h3>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-6 mb-8"
                  >
                    {items[currentIndex].type === 'case' ? (
                      <p className="text-2xl md:text-3xl font-bold text-green-400 flex items-center gap-2">
                        <Star className="fill-green-400" size={24} />
                        {items[currentIndex].result}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 text-blue-400">
                        <BookOpen size={24} />
                        <span className="text-xl font-medium tracking-tight">Artículo de Interés</span>
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 text-lg md:text-xl line-clamp-2 md:line-clamp-none max-w-2xl mb-10 font-light leading-relaxed"
                  >
                    {items[currentIndex].description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link to={items[currentIndex].url}>
                      <Button className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold px-8 py-6 rounded-full transition-all duration-300 group/btn">
                        {items[currentIndex].type === 'case' ? 'Ver caso completo' : 'Leer artículo'}
                        <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={20} />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Thumbnail Indicators */}
        <div className="flex justify-start md:justify-center gap-3 mt-12 px-2 overflow-x-auto pb-4 scrollbar-hide touch-pan-x overscroll-contain">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 md:w-28 aspect-video rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                idx === currentIndex 
                  ? "border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10" 
                  : "border-white/5 opacity-40 hover:opacity-80 scale-100"
              }`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none" loading="lazy" />
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentIndex ? "bg-cyan-500/10" : "bg-black/60"
              }`}></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedCarousel;
