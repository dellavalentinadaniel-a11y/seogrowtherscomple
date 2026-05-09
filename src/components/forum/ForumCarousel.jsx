
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { ChevronRight, MessageSquare, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Button } from '@/components/ui/button';
import ImageOptimized from '@/components/shared/ImageOptimized';

const ForumCarousel = () => {
  const [threads, setThreads] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const fetchThreads = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, featured_image, category, created_at')
        .eq('category', 'Debates')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setThreads(data || []);
    } catch (err) {
      console.error('Error fetching forum threads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const nextSlide = useCallback(() => {
    if (threads.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % threads.length);
  }, [threads.length]);

  useEffect(() => {
    if (threads.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [threads.length, isPaused, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[450px] rounded-2xl overflow-hidden bg-surface-container-high animate-pulse mb-12">
        <div className="w-full h-full flex items-center justify-center">
          <SkeletonLoader className="w-3/4 h-12 mb-4" />
        </div>
      </div>
    );
  }

  // Placeholder if empty
  if (threads.length === 0) {
    return (
      <section className="mb-12 relative h-[450px] w-full overflow-hidden rounded-xl bg-surface-container-high border-t border-white/5 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        <div className="relative z-10 text-center p-8">
          <div className="bg-primary/20 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface mb-4">No hay debates recientes</h2>
          <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-body">
            Sé el primero en iniciar una conversación técnica con la comunidad de expertos en SEO.
          </p>
          <Button 
            className="bg-primary text-on-primary hover:bg-primary/90 font-bold px-8 py-6 rounded-xl transition-all hover:scale-105 active:scale-95"
            onClick={() => window.location.href = '/blog/create'}
          >
            INICIAR DEBATE
          </Button>
        </div>
        {/* Abstract background particles/lines */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-3xl rounded-full"></div>
      </section>
    );
  }

  return (
    <section 
      className="mb-12 relative h-[450px] w-full overflow-hidden rounded-xl bg-surface-container-high border-t border-white/5 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageOptimized 
            src={threads[currentIndex].featured_image} 
            alt={threads[currentIndex].title}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-7000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4 z-10">
            <div className="flex gap-3 mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-headline border border-primary/30">
                DEBATE DESTACADO
              </span>
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-headline">
                {threads[currentIndex].category}
              </span>
            </div>
            
            <Link to={`/blog/${threads[currentIndex].category}/${threads[currentIndex].slug}`}>
              <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight tracking-tighter text-on-surface mb-6 hover:text-primary transition-colors cursor-pointer">
                {threads[currentIndex].title}
              </h2>
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-label text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                <span>Admin Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-secondary" />
                <span>Hace 2 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                <span>Reciente</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev - 1 + threads.length) % threads.length)}
          className="p-3 rounded-full bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-90"
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-surface/20 hover:bg-surface/40 backdrop-blur-md border border-white/5 text-white transition-all transform hover:scale-110 active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {threads.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]" : "w-2 bg-on-surface/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ForumCarousel;
