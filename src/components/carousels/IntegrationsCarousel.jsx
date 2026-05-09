
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const IntegrationsCarousel = () => {
  const [integrations, setIntegrations] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchIntegrations = async () => {
      const { data } = await supabase.from('integrations').select('id, name, description, tool_count').eq('featured', true).order('tool_count', { ascending: false });
      if (data) setIntegrations(data);
    };
    fetchIntegrations();
  }, []);

  useEffect(() => {
    if (integrations.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % integrations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [integrations.length]);

  if (!integrations.length) return null;

  return (
    <section className="py-20 bg-[#111827] overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Integraciones Populares</h2>
        
        <div className="relative max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800">
          <AnimatePresence mode="wait">
             <motion.div
               key={index}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="flex flex-col md:flex-row items-center gap-8"
             >
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-4 flex-shrink-0">
                   {/* Fallback icon if no logo */}
                   <span className="text-4xl font-bold text-black">{integrations[index].name.charAt(0)}</span>
                </div>
                <div className="text-center md:text-left flex-1">
                   <h3 className="text-2xl font-bold text-white mb-2">{integrations[index].name}</h3>
                   <p className="text-gray-400 mb-4 text-lg">
                      {integrations[index].description || `Conecta ${integrations[index].name} con tus herramientas favoritas para automatizar flujos de trabajo.`}
                   </p>
                   <p className="text-cyan-400 font-medium mb-6">
                      +{integrations[index].tool_count} herramientas compatibles
                   </p>
                   <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                      Ver herramientas <ChevronRight size={16} className="ml-2" />
                   </Button>
                </div>
             </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {integrations.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsCarousel;
