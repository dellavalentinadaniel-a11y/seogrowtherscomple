
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ToolTestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase.from('tool_testimonials').select('*').eq('approved', true).order('created_at', { ascending: false });
      if (data) setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Lo que dicen los usuarios</h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote size={48} className="text-cyan-500/30 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-gray-200 font-light italic mb-8 leading-relaxed">
                "{testimonials[index].content}"
              </p>
              
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <img 
                      src={testimonials[index].avatar || `https://ui-avatars.com/api/?name=${testimonials[index].author}`} 
                      alt={testimonials[index].author}
                      className="w-full h-full object-cover"
                    />
                 </div>
                 <h4 className="text-lg font-bold text-white">{testimonials[index].author}</h4>
                 <p className="text-cyan-400 text-sm mb-2">{testimonials[index].role} @ {testimonials[index].company}</p>
                 <div className="flex gap-1 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < testimonials[index].rating ? "currentColor" : "none"} />
                    ))}
                 </div>
                 <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Sobre: {testimonials[index].tool_name}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-cyan-500' : 'w-1.5 bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolTestimonialsCarousel;
