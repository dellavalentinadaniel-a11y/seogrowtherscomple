
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Rocket, BarChart2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "Auditoría SEO",
    description: "Análisis profundo de tu sitio web para identificar oportunidades de tráfico orgánico con los estándares de SEO Growthers.",
    icon: Search,
    features: ["Auditoría Técnica", "Análisis de Keywords", "Optimización On-Page"],
    link: "/services/seo-audit",
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    id: 2,
    title: "Growth Hacking",
    description: "Estrategias de crecimiento acelerado basadas en datos y experimentación rápida.",
    icon: Rocket,
    features: ["Optimización de Funnel", "Viral Loops", "A/B Testing"],
    link: "/services/growth-hacking",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  },
  {
    id: 3,
    title: "Consultoría Digital",
    description: "Asesoramiento estratégico personalizado para la transformación digital de tu empresa.",
    icon: BarChart2,
    features: ["Plan de Marketing", "Analítica Web", "Automatización"],
    link: "/services/consulting",
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-[#111827]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Servicios <span className="text-cyan-400">SEO Growthers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Soluciones integrales de Web Development, SEO & Analytics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-lg ${service.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${service.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={16} className="text-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to={service.link}>
                  <Button 
                    variant="ghost" 
                    className="p-0 text-cyan-400 hover:text-cyan-300 hover:bg-transparent font-semibold flex items-center gap-2 group/btn"
                  >
                    Conocer más 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
