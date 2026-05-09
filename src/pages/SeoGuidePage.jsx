import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import InteractiveGuide from '@/components/resources/InteractiveGuide';
import { seoGuideData, seoFaqs } from '@/data/seoGuideData';
import CompleteGuideButton from '@/components/resources/CompleteGuideButton';

const SeoGuidePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <Helmet>
        <title>Google Search Central & SEO Fundamentals - Guía Interactiva</title>
        <meta name="description" content="Guía interactiva basada en Google Search Central, Core Web Vitals, Crawl Budget y Enlazado Interno extraída con NotebookLM." />
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Recurso Premium Extraído de NotebookLM</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Google Search Central & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              SEO Fundamentals
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Aprende a fondo cómo los robots de Google entienden tu web, domina la optimización de los Core Web Vitals, asegura una indexación perfecta y comprende el presupuesto de rastreo.
          </p>
          
          {/* Mascot Branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 mb-4"
          >
            <img 
              src="/images/iconos/guiaspersonaje.webp" 
              alt="Mascota Oficial de las Guías SEO Growth" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-[0_15px_35px_rgba(34,211,238,0.5)] transition-transform duration-700 hover:scale-110 hover:-translate-y-4"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Interfaz de Guía Interactiva */}
      <section className="container mx-auto px-6">
        <InteractiveGuide 
          guideData={seoGuideData} 
          title="Google Search Central & SEO Fundamentals"
          subtitle="Aprende buenas prácticas de indexación con la IA"
          faqs={seoFaqs}
        />
      </section>
      
      <section className="container mx-auto px-6 py-16 mb-24 border-t border-slate-800/50">
        <CompleteGuideButton guideId="seo-fundamentals-notebooklm" />
      </section>

    </div>
  );
};

export default SeoGuidePage;
