import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGuide from '@/components/resources/InteractiveGuide';
import CustomAudioPlayer from '@/components/shared/CustomAudioPlayer';
import CompleteGuideButton from '@/components/resources/CompleteGuideButton';
import { aiStudioGuideData, aiStudioFaqs } from '@/data/aiStudioGuideData';
import ScrollToTop from '@/components/layout/ScrollToTop';

const AiStudioGuidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Google AI Studio & Desarrollo Asistido (2026) | SEO Growthers</title>
        <meta name="description" content="Domina el paradigma de Vibe Coding, la configuraciÃ³n de entornos Full-Stack duales con React 19 y Node.js para orquestar la prÃ³xima generaciÃ³n de inteligencia distribuida." />
      </Helmet>

      <ScrollToTop />



      <main className="relative pt-32 pb-32 px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-label uppercase tracking-widest mb-6">
                PrÃ³logo: La Nueva Era
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-8 leading-tight">
                Google AI Studio &amp; <br/>
                <span className="bg-gradient-to-r from-[#c3f5ff] via-[#00e5ff] to-[#ddb7ff] bg-clip-text text-transparent" style={{ textShadow: '0 0 15px rgba(195, 245, 255, 0.3)' }}>
                    Desarrollo Asistido (2026)
                </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed">
                Domina el paradigma de <span className="text-secondary font-semibold">Vibe Coding</span>, la configuraciÃ³n de entornos Full-Stack duales con <span className="text-primary">React 19</span> y <span className="text-primary">Node.js</span> para orquestar la prÃ³xima generaciÃ³n de inteligencia distribuida.
            </p>
            <div className="mt-12 flex justify-center gap-6">
                <button className="px-8 py-4 rounded-xl bg-primary-container text-on-primary-container font-bold text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2">
                    Comenzar el Despliegue
                    <span className="material-symbols-outlined">rocket_launch</span>
                </button>
            </div>
          </motion.div>
        </header>

        {/* Bento Grid Laboratory */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {/* Main Terminal Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass-panel rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            style={{ background: 'rgba(51, 52, 62, 0.4)', backdropFilter: 'blur(20px)' }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-error/40"></span>
                    <span className="w-3 h-3 rounded-full bg-secondary/40"></span>
                    <span className="w-3 h-3 rounded-full bg-primary/40"></span>
                    <span className="ml-4 font-label text-xs text-white/40 tracking-widest uppercase">Laboratorio de Arquitectura</span>
                </div>
                <span className="material-symbols-outlined text-primary">terminal</span>
            </div>
            <div className="font-mono text-sm space-y-4">
                <div className="flex gap-4">
                    <span className="text-secondary">neural-core:~$</span>
                    <span className="text-on-surface">initialize --vibe-coding --full-stack</span>
                </div>
                <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <p className="text-primary/80 mb-2">// Analizando contexto del sistema...</p>
                    <p className="text-on-surface/60">Detectando React 19 Canary...</p>
                    <p className="text-on-surface/60">Optimizando Server Components...</p>
                    <p className="text-secondary mt-2">Vibe Sync: 98.4% - Listo para generaciÃ³n asÃ­ncrona.</p>
                </div>
            </div>
            <div className="mt-8 flex gap-4">
                <div className="h-24 flex-1 rounded-2xl bg-surface-container-high/40 p-4 border border-white/5">
                    <span className="block text-xs font-label text-white/30 mb-2">LATENCIA AI</span>
                    <div className="text-3xl font-headline font-bold text-primary">12ms</div>
                </div>
                <div className="h-24 flex-1 rounded-2xl bg-surface-container-high/40 p-4 border border-white/5">
                    <span className="block text-xs font-label text-white/30 mb-2">NODOS ACTIVOS</span>
                    <div className="text-3xl font-headline font-bold text-secondary">1,024</div>
                </div>
            </div>
          </motion.div>

          {/* Side Card: Models */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <div>
                <h3 className="text-2xl font-headline font-bold mb-4">Modelos AI</h3>
                <p className="text-on-surface-variant text-sm mb-6">Selecciona el nÃºcleo neuronal para tu flujo de trabajo de 2026.</p>
                <ul className="space-y-3">
                    <li className="p-3 rounded-xl bg-surface-container-highest border border-primary/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">smart_toy</span>
                            <span className="text-sm font-medium">Gemini 3.5 Pro</span>
                        </div>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded">ACTIVO</span>
                    </li>
                    <li className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-white/40 group-hover:text-secondary">psychology</span>
                            <span className="text-sm text-white/60">Neural Coder V2</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="mt-8">
                <img alt="Neural AI Visualization" className="w-full h-32 object-cover rounded-2xl opacity-50 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg5n88XqJWrLLSSH4RssHhhPjQnEG1fsDPlwGUuuKoRfNkD11ztY0l7M63mpx5hT3xOvmW_osbAFCZTqxIWIJioZSraxztZIftLLs_GeqURsOuG0YFhpfmPqXycvluL8VO_rx8qk6wTwbDjwwwOCeXnHnSu9_pTOlgmABwprLeW8i14jJnl-ng48HTlcsDp-4OP0mdExMHE1tfu6DMBkZSSbzTB2vnCGnET3a5hdH10BQIPWLztrbJ0YB_4F302kuZG7gg6eFseEs"/>
            </div>
          </motion.div>
        </section>

        {/* Informational Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-1 bg-primary"></div>
                    <span className="font-label text-sm text-primary tracking-widest uppercase">EvoluciÃ³n de Paradigma</span>
                </div>
                <h2 className="text-4xl font-headline font-bold mb-6">La Muerte del Boilerplate</h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                    En 2026, la ingenierÃ­a ya no se trata de escribir lÃ­neas de cÃ³digo repetitivas. Google AI Studio integra flujos de "Vibe Coding" donde la intenciÃ³n del desarrollador se traduce instantÃ¡neamente en estructuras de datos resilientes y UI reactiva de alto rendimiento.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <span className="material-symbols-outlined text-secondary">verified_user</span>
                        <div>
                            <h4 className="font-bold">Seguridad CuÃ¡ntica</h4>
                            <p className="text-xs text-white/40">Cifrado de grado militar nativo.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="material-symbols-outlined text-primary">hub</span>
                        <div>
                            <h4 className="font-bold">Nodos Edge</h4>
                            <p className="text-xs text-white/40">Despliegue global instantÃ¡neo.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-1 md:order-2 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent z-10"></div>
                <img alt="Infrastructure" className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEG13AiMaYLmZL_Xwqvk5SCtJVmiOdrlILOD1tKR5ynRTYgXuul5XQiyU_N8tyCmBWy5pMAFSVf8Xzoiy6FbXQ_Zwc5lgDKHfu_SlDttS7aeRsUVk_2OO4bTv4krwqAErsZV8KQn7zaY1o5zZoC2LtUvGFN5lhmsA0fCSkTo_EebSTvaJuYL2WeTdPUB8rfa71Fh0495KeyKY3Zuq2AwLtT4HS4n8fCiIhoEdDZcnX89SijrS4WGc4ltsDsfXjrDLWtqk1fQo9jWE"/>
                <div className="absolute bottom-8 left-8 z-20">
                    <div className="glass-panel p-4 rounded-2xl border border-white/10" style={{ background: 'rgba(51, 52, 62, 0.4)', backdropFilter: 'blur(20px)' }}>
                        <p className="text-sm font-medium">Infraestructura Core v2.0</p>
                        <p className="text-xs text-primary">SincronizaciÃ³n Neural Activa</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Custom Audio Player */}
        <section className="mb-16">
          <CustomAudioPlayer 
            src="/audio/vibe_coding.mp3" 
            title="Debate: Vibe Coding y el Fin de Programar"
            subtitle="Reproduce este anÃ¡lisis mientras lees la guÃ­a"
          />
        </section>

        {/* Interactive Guide embedded */}
        <section className="mb-24">
          <InteractiveGuide 
            guideData={aiStudioGuideData} 
            title="Manual de Arquitectura AI Studio 2026"
            subtitle="Aprende a desplegar aplicaciones complejas con agentes"
            faqs={aiStudioFaqs}
          />
        </section>

        <section className="mb-24 py-16 border-t border-slate-800/50">
          <CompleteGuideButton guideId="google-ai-studio-2026" />
        </section>

      </main>


    </div>
  );
};

export default AiStudioGuidePage;

