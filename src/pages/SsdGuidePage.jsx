import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';
import InteractiveGuide from '@/components/resources/InteractiveGuide';
import { ssdGuideData, ssdFaqs } from '@/data/ssdGuideData';
import CompleteGuideButton from '@/components/resources/CompleteGuideButton';

const SsdGuidePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <Helmet>
        <title>Mejores SSD para PS5 en 2026 - Guía de Almacenamiento</title>
        <meta name="description" content="Guía definitiva para ampliar el almacenamiento de tu PS5 en 2026. Comparativa de modelos, instalación de disipadores y optimización de rendimiento." />
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <HardDrive className="w-4 h-4" />
            <span>Guía Técnica Avanzada 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Dominando el Almacenamiento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              M.2 para tu PlayStation 5
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Aprende a elegir el SSD perfecto sin gastar de más. Desde la anatomía del disipador hasta la gestión de firmware para maximizar los 7,000 MB/s.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 mb-4"
          >
            <img 
              src="/images/iconos/guiaspersonaje.webp" 
              alt="Mascota Guías Hardware" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-[0_15px_35px_rgba(59,130,246,0.5)] transition-transform duration-700 hover:scale-110 hover:-translate-y-4"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Interfaz de Guía Interactiva */}
      <section className="container mx-auto px-6">
        <InteractiveGuide 
          guideData={ssdGuideData} 
          title="Guía de Optimización SSD PS5"
          subtitle="Hardware, Instalación y Estrategia de Inversión"
          faqs={ssdFaqs}
        />
      </section>
      
      <section className="container mx-auto px-6 py-16 mb-24 border-t border-slate-800/50 text-center">
        <h3 className="text-2xl font-bold text-white mb-8">¿Listo para el siguiente nivel?</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Esta guía es parte de nuestra biblioteca de recursos neuronales para entusiastas del hardware y el rendimiento digital.
        </p>
        <CompleteGuideButton guideId="ssd-ps5-optimization-2026" />
      </section>

    </div>
  );
};

export default SsdGuidePage;
