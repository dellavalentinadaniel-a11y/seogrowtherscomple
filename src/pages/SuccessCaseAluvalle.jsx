
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, BarChart3, Globe, Zap, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SuccessCaseAluvalle = () => {
  const metrics = [
    { label: 'Core Web Vitals (LCP)', before: '4.2s', after: '1.1s', icon: <Zap className="text-yellow-500" /> },
    { label: 'Tráfico Orgánico', before: '~150', after: '+1,200', icon: <Users className="text-cyan-500" /> },
    { label: 'Tasa de Conversión', before: '0.5%', after: '3.8%', icon: <BarChart3 className="text-green-500" /> },
  ];

  const metadata = {
    title: "Aluvalle: Transformación Digital e Impacto SEO | SEOGrowthers",
    description: "Descubre cómo SEOGrowthers transformó la presencia digital de Aluvalle, logrando un aumento del 300% en tráfico orgánico y optimizando sus Core Web Vitals.",
    image: "/images/aluvalle-case.webp",
    url: "https://seogrowthers.com/services/success-cases/aluvalle-transformacion-digital"
  };

  return (
    <div className="min-h-screen text-white pt-32 pb-20">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={metadata.url} />
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group">
          <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Volver al Inicio
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-cyan-500"></span>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Caso de Éxito</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Aluvalle: Transformación Digital e <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Impacto SEO</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              De una presencia digital limitada a una plataforma de alto rendimiento capaz de captar leads cualificados y posicionar la marca como líder en carpintería de aluminio.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Retail</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">E-commerce</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">Construcción</div>
            </div>

            <a 
              href="https://www.aluvalle.store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-400 font-bold transition-all group mb-8"
            >
              <Globe size={18} className="animate-pulse" />
              Ver sitio web en vivo
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-30"></div>
            <img 
              src="/images/aluvalle-case.webp" 
              alt="Aluvalle Preview" 
              className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white/5 border-y border-white/10 py-16 mb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex justify-center mb-4 text-3xl opacity-80 group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{metric.label}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-gray-600 line-through text-lg">{metric.before}</span>
                  <ArrowRight size={16} className="text-cyan-500" />
                  <span className="text-3xl font-bold text-white">{metric.after}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-16">
          {/* El Desafío */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-cyan-500 text-sm font-mono">01.</span> El Desafío
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Aluvalle presentaba un sitio web con tecnología obsoleta que no cumplía con los estándares modernos de usabilidad (UX) ni con las métricas de Core Web Vitals de Google. La visibilidad orgánica era casi nula, y los clientes potenciales tenían dificultades para navegar por el catálogo.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Velocidad de carga extremadamente lenta (LCP 4.2s)',
                'Arquitectura de información confusa y poco intuitiva',
                'Baja visibilidad para keywords estratégicas',
                'Falta de una identidad visual coherente'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={18} className="text-cyan-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Nuestra Solución */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-cyan-500 text-sm font-mono">02.</span> Nuestra Solución Técnica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Implementamos una estrategia 360° que abarcó desde el rediseño completo de la interfaz hasta una optimización SEO On-Page profunda para cada categoría de producto.
                </p>
                <ul className="space-y-4">
                  {[
                    'Rediseño UX/UI centrado en conversión (Leads)',
                    'Migración a arquitectura moderna y ligera',
                    'Optimización agresiva de Core Web Vitals',
                    'Estrategia de contenidos SEO enfocada en intención de búsqueda'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img 
                  src="/images/Gemini_Generated_Image_xd0u2jxd0u2jxd0u.webp" 
                  alt="SEO Strategy" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Conclusión */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Conclusión del Proyecto</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              El proyecto Aluvalle demuestra que la combinación de un desarrollo técnico impecable con una estrategia SEO orientada al usuario es la clave para el éxito en el entorno digital actual. Logramos no solo mejorar la estética, sino convertir el sitio en una verdadera herramienta de generación de negocio.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-6 rounded-full transition-all group w-full md:w-auto">
                  ¿Quieres resultados similares?
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a 
                href="https://www.aluvalle.store/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 px-8 py-6"
              >
                <Globe size={18} />
                Explorar aluvalle.store
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessCaseAluvalle;
