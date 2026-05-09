
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const ContactTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const dummyTestimonials = [
    { id: 1, author: "Marta López", role: "Marketing Manager", company: "TechCorp", content: "La respuesta fue increíblemente rápida y el equipo entendió nuestras necesidades al instante.", rating: 5, avatar: "" },
    { id: 2, author: "Juan Pérez", role: "CEO", company: "StartUp Inc", content: "Excelente servicio al cliente. Nos guiaron en todo el proceso con gran profesionalidad.", rating: 5, avatar: "" }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('id, author, role, company, content, rating, avatar')
          .eq('approved', true)
          .order('created_at', { ascending: false });
        
        if (error || !data || data.length === 0) setTestimonials(dummyTestimonials);
        else setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials(dummyTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="py-20 bg-[#0C0D0D]">
         <div className="container mx-auto px-6 max-w-2xl">
            <SkeletonLoader className="h-48 w-full rounded-2xl" />
         </div>
      </section>
    );
  }

  const current = testimonials[index];

  return (
    <section className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Clientes Felices</h2>

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
              <Quote size={48} className="text-[#00d9ff]/30 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-gray-200 font-light italic mb-8 leading-relaxed">
                "{current.content}"
              </p>
              
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-800 rounded-full mb-4 overflow-hidden border-2 border-[#00d9ff]/30">
                    <img 
                      src={current.avatar || `https://ui-avatars.com/api/?name=${current.author}&background=0D8ABC&color=fff`} 
                      alt={current.author}
                      className="w-full h-full object-cover"
                    />
                 </div>
                 <h4 className="text-lg font-bold text-white">{current.author}</h4>
                 <p className="text-[#00d9ff] text-sm mb-2">{current.role} {current.company && `@ ${current.company}`}</p>
                 <div className="flex gap-1 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < current.rating ? "currentColor" : "none"} />
                    ))}
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#00d9ff]' : 'w-1.5 bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;
