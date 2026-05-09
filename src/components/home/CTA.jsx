
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-700/20"></div>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto p-12 md:p-20 rounded-[3rem] bg-slate-900/60 backdrop-blur-3xl border border-white/10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter relative z-10">
            ¿Listo para orquestar <br/> tu <span className="text-cyan-400">Evolución Digital</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
            Agenda una consulta estratégica con nuestro nodo central para llevar tus resultados al siguiente nivel.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/contact')}
            className="bg-white text-black hover:bg-cyan-400 font-black px-12 py-8 rounded-2xl text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,229,255,0.2)] transition-all duration-500 relative z-10"
          >
            Sincronizar Ahora <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
