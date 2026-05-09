
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const WebinarsCarousel = () => {
  const [webinars, setWebinars] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchWebinars = async () => {
      const { data } = await supabase
        .from('webinars')
        .select('id, title, description, image, date, instructor_name, instructor_avatar, status')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });
      if (data) setWebinars(data);
    };
    fetchWebinars();
  }, []);

  const nextSlide = useCallback(() => {
    setIndex(prev => (prev + 1) % webinars.length);
  }, [webinars.length]);

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + webinars.length) % webinars.length);
  };

  useEffect(() => {
    if (webinars.length <= 1 || paused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [webinars.length, paused, nextSlide]);

  if (!webinars.length) return null;

  const current = webinars[index];

  return (
    <section className="py-20 bg-[#111827] overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Próximos Webinars</h2>

        <div 
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group bg-slate-900"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col md:flex-row h-full"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-full relative">
                <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111827] to-transparent md:hidden"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-center bg-[#111827] md:bg-transparent z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-4 w-fit">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   EN VIVO
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">{current.title}</h3>
                <p className="text-gray-400 mb-6">{current.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-cyan-400" />
                    {current.date && format(new Date(current.date), 'dd MMM yyyy • HH:mm', { locale: es })}
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={current.instructor_avatar} alt="" className="w-6 h-6 rounded-full" />
                    {current.instructor_name}
                  </div>
                </div>

                <Button className="w-fit bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8">
                   Registrarse Gratis
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500 hover:text-black transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500 hover:text-black transition-all">
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {webinars.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-cyan-500' : 'w-2 bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarsCarousel;
