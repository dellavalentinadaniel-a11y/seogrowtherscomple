import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AluvalleShowcase = () => {
  const features = [
    {
      title: "DISEÑO UI SOFISTICADO",
      description: "Interfaz minimalista y funcional que resalta la calidad de los productos de aluminio.",
      icon: <Zap className="text-cyan-400" size={24} />
    },
    {
      title: "NARRATIVA DE MARCA",
      description: "Comunicación clara que posiciona a Aluvalle como el referente tecnológico del sector.",
      icon: <Users className="text-cyan-400" size={24} />
    },
    {
      title: "PORTAFOLIO IMPACTANTE",
      description: "Galería de proyectos de alta resolución que demuestra la versatilidad de sus sistemas.",
      icon: <BarChart3 className="text-cyan-400" size={24} />
    },
    {
      title: "MENSAJE SOSTENIBLE",
      description: "Enfoque en la eficiencia energética y la sostenibilidad de los materiales utilizados.",
      icon: <CheckCircle2 className="text-cyan-400" size={24} />
    }
  ];

  return (
    <section className="py-24 bg-[#0C0D0D] border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Emblematic Case Study</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            UN CASO DE ESTUDIO EN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DISEÑO EMBLEMÁTICO</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* List of features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start gap-4 group"
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white mb-2 tracking-widest uppercase">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large image/mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-20"></div>
            <img 
              src="/images/aluvalle-screens.webp" 
              alt="Aluvalle Mobile Screens" 
              className="relative rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] w-full h-auto hover:scale-[1.02] transition-transform duration-700"
            />
            
            <div className="absolute -bottom-8 -right-8 p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Resultado</p>
                  <p className="text-2xl font-black text-cyan-400">+300% Tráfico</p>
                </div>
                <div className="w-[1px] h-12 bg-white/10"></div>
                <Link to="/services/success-cases/aluvalle-transformacion-digital">
                  <Button size="icon" className="rounded-full bg-white text-black hover:bg-cyan-500 transition-colors">
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AluvalleShowcase;
