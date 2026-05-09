
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import ImageOptimized from '@/components/shared/ImageOptimized';

const RecentArticlesCarousel = ({ title = "Últimas Publicaciones", subtitle = "RECIENTE" }) => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const fetchRecentArticles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          summary,
          featured_image,
          category,
          slug,
          created_at,
          author:profiles!author_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'published')
        .neq('category', 'Debates') // Usually for blog/services/tools we want articles, not forum threads
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error('Error fetching recent articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentArticles();
  }, [fetchRecentArticles]);

  const nextSlide = useCallback(() => {
    if (articles.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [articles.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-surface-container-high animate-pulse mb-16 border border-white/5">
        <div className="w-full h-full flex items-center justify-center">
          <SkeletonLoader className="w-3/4 h-12" />
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section 
      className="mb-16 relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-transparent border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageOptimized 
            src={articles[currentIndex].featured_image} 
            alt={articles[currentIndex].title}
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
          />
          
          {/* THE REQUESTED ELEMENT: Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-sm">
                  {subtitle}
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{articles[currentIndex].category}</span>
              </motion.div>
              
              <Link to={`/blog/${articles[currentIndex].category || 'general'}/${articles[currentIndex].slug}`}>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight tracking-tighter text-on-surface mb-6 hover:text-primary transition-colors cursor-pointer line-clamp-2"
                >
                  {articles[currentIndex].title}
                </motion.h2>
              </Link>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-on-surface-variant font-label text-xs uppercase tracking-widest mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 bg-surface">
                    <img 
                      src={articles[currentIndex].author?.avatar_url || "/images/iconos/guiaspersonaje.webp"} 
                      alt="Author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-white/80">{articles[currentIndex].author?.full_name || "REDACCIÓN"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span>5 MIN LECTURA</span>
                </div>
                <div className="flex items-center gap-2 hidden md:flex">
                  <BookOpen size={14} className="text-secondary" />
                  <span>KNOWLEDGE HUB</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to={`/blog/${articles[currentIndex].category || 'general'}/${articles[currentIndex].slug}`}>
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all group/btn">
                    Leer Publicación
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)}
          className="p-3 rounded-xl bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-xl bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentArticlesCarousel;
