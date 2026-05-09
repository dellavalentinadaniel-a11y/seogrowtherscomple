import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import LogoComponent from '@/components/shared/LogoComponent';
import ImageOptimized from '@/components/shared/ImageOptimized';

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 'welcome',
      type: 'welcome',
      title: 'Bienvenido a SEO Growthers',
      subtitle: 'Soluciones expertas en Web Development, SEO & Analytics para escalar tus resultados digitales.',
      image: '/images/fondo/site-background.webp',
      link: '/services',
      cta: 'Solicitar Auditoría Gratuita'
    },
    {
      id: 'aluvalle-hero',
      type: 'case',
      title: 'Aluvalle: Transformación Digital',
      subtitle: 'Rediseño de alta gama y posicionamiento SEO que multiplicó el tráfico x3 para la mayor carpintería de aluminio de la región.',
      image: '/images/aluvalle-premium.webp',
      link: '/services/success-cases/aluvalle-transformacion-digital',
      cta: 'Ver Caso de Estudio',
      badge: 'Destacado: Éxito en Retail'
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchCarouselData = useCallback(async () => {
    try {


      // Fetch latest 2 resources
      const { data: resourcesData } = await supabase
        .from('resources')
        .select('id, title, description, image, link')
        .order('created_at', { ascending: false })
        .limit(2);

      const dynamicSlides = [];



      if (resourcesData) {
        resourcesData.forEach(resource => {
          dynamicSlides.push({
            id: `resource-${resource.id}`,
            type: 'resource',
            title: resource.title,
            subtitle: resource.description || 'Explora nuestra biblioteca técnica avanzada.',
            image: resource.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
            link: resource.link || '/resources',
            cta: 'Ver Recurso',
            badge: 'Recursos Exclusivos'
          });
        });
      }

      setSlides(prev => [prev[0], ...dynamicSlides]);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarouselData();
  }, [fetchCarouselData]);

  // Auto-advance logic
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] md:h-[750px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <div className="relative w-full h-full">
            <ImageOptimized
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover"
              priority={currentSlide === 0}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              width={1920}
              height={1080}
            />
            {/* Multi-layered overlay for depth and "Neural" feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/80 via-[#0a0e27]/40 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color pointer-events-none"></div>
            
            {/* Animated particles or grain could go here */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 pointer-events-none"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeSlide.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-cyan-500/50"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase">
                  {activeSlide.badge || 'Sistema Neural Operativo'}
                </span>
              </div>

              {activeSlide.type === 'welcome' && (
                <div className="mb-8 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-float">
                  <LogoComponent size="large" variant="icon-only" isLink={false} />
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                {activeSlide.type === 'welcome' ? (
                  <>
                    Bienvenido a <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 animate-gradient-x">
                      SEO Growthers
                    </span>
                  </>
                ) : (
                  <span className="line-clamp-2 md:line-clamp-none">{activeSlide.title}</span>
                )}
              </h1>

              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl font-body font-light leading-relaxed">
                {activeSlide.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link to={activeSlide.link}>
                  <Button
                    size="lg"
                    className="group bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm md:text-base px-6 md:px-10 py-5 md:py-7 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {activeSlide.cta}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {activeSlide.type === 'welcome' && (
                  <Link to="/services/success-cases">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-[#0a0e27]/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 font-semibold text-sm md:text-base px-6 md:px-8 py-5 md:py-7 rounded-2xl transition-all duration-300"
                    >
                      Casos de Éxito
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Navigation Controls - Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center`}
            aria-label={`Ir a slide ${idx + 1}`}
          >
            <span className={`block rounded-full transition-all duration-500 ${
              currentSlide === idx
                ? 'w-10 h-1.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>

      {/* Optional Side Arrows for Desktop */}
      <div className="hidden lg:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-20">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all pointer-events-auto group"
        >
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_left</span>
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all pointer-events-auto group"
        >
          <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_right</span>
        </button>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
    </section>
  );
};

export default HomeHero;

