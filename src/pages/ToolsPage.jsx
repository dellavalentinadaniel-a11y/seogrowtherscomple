import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RecentArticlesCarousel from '@/components/shared/RecentArticlesCarousel';

const ToolsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Herramientas Premium para Crecimiento Digital | SEO Growthers</title>
        <meta name="description" content="Descubre las mejores herramientas de SEO, analytics, marketing digital y desarrollo web recomendadas por SEO Growthers. Compara y elige la ideal para tu negocio." />
        <link rel="canonical" href="https://seogrowthers.com/tools" />
        <meta property="og:title" content="Herramientas Premium | SEO Growthers" />
        <meta property="og:description" content="Las mejores herramientas de SEO, analytics, marketing y desarrollo web curadas por expertos." />
        <meta property="og:url" content="https://seogrowthers.com/tools" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Herramientas&subtitle=Las+mejores+herramientas+de+SEO&type=tool" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />

      {/* Main Canvas */}
      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        <Breadcrumbs className="mb-4" />
        {/* Hero/Section Title */}
        <div className="mb-16">
          <span className="font-label text-primary tracking-[0.2em] text-xs uppercase mb-4 block">Laboratorio de Arquitectura</span>
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tight mb-6">
            Herramientas de <span className="bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">Nueva Generación</span>
          </h2>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
            Accede a utilidades de alto rendimiento diseñadas para el flujo de trabajo del ingeniero de 2026. Analizadores neuronales, simulación de nodos y terminales de baja latencia.
          </p>
        </div>

        <div className="mb-20">
          <RecentArticlesCarousel title="Documentación & Tutoriales" subtitle="LATEST TOOLS" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-none md:grid-rows-2 gap-6">

          {/* Feature Card: Terminal (Large) */}
          <div className="md:col-span-4 md:row-span-2 glass-panel rounded-[2rem] p-8 flex flex-col border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-container/20 rounded-xl">
                  <span className="material-symbols-outlined text-primary-container text-3xl">terminal</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-white">Terminal Interactiva</h3>
                  <p className="text-slate-400 text-sm">Vibe Coding Node v4.2.0</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              </div>
            </div>

            <div className="flex-grow bg-surface-container-lowest rounded-xl p-6 font-mono text-sm border border-outline-variant/30 relative z-10 flex flex-col">
              <div className="flex gap-2 mb-2">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-primary-fixed">initiating neural_sync...</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-on-surface">analyzing branch: evolution/2026</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="text-secondary">engine@neural:~$</span>
                <span className="text-primary-container">system status: OPTIMAL</span>
              </div>

              <div className="h-[200px] w-full mt-auto flex items-end gap-1">
                <div className="w-full bg-primary-container/20 h-[30%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/40 h-[45%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/30 h-[25%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/60 h-[70%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/50 h-[55%] rounded-t-sm"></div>
                <div className="w-full bg-primary-container/80 h-[90%] rounded-t-sm animate-pulse"></div>
                <div className="w-full bg-primary-container/40 h-[40%] rounded-t-sm"></div>
              </div>
              <div className="mt-4 animate-pulse inline-block w-2 h-4 bg-primary-container"></div>
            </div>

            <button className="mt-6 self-start px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:scale-105 transition-transform flex items-center gap-2 relative z-10">
              <span>Abrir Sesión</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

          {/* Feature Card: Code Analyzer (Tall) */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 border-t-2 border-t-secondary-container flex flex-col group">
            <div className="mb-6">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4 block group-hover:rotate-12 transition-transform">analytics</span>
              <h3 className="font-headline text-xl font-bold text-white mb-2">Analizador de Código</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Escaneo heurístico profundo con IA para detectar patrones de arquitectura evolutiva.
              </p>
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between text-xs font-label text-slate-500">
                <span>CALIDAD DE SINTAXIS</span>
                <span className="text-secondary">98%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-secondary"></div>
              </div>
              <button className="w-full py-3 border border-secondary/20 text-secondary rounded-xl hover:bg-secondary/10 transition-colors font-bold text-xs uppercase tracking-widest">
                Ejecutar Diagnóstico
              </button>
            </div>
          </div>

          {/* Feature Card: Node Simulator (Small) */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-6 border border-white/5 border-t-2 border-t-primary-container flex flex-col group">
            <div className="flex items-start justify-between mb-4">
              <span className="material-symbols-outlined text-primary-container text-4xl group-hover:scale-110 transition-transform">hub</span>
              <span className="text-[10px] font-label px-2 py-1 bg-primary-container/20 text-primary-container rounded">PRO</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-white mb-2">Simulador de Nodos</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Pruebas de latencia en redes distribuidas.
            </p>
            <div className="flex -space-x-2 mt-auto">
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center text-[10px] text-white">N1</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-700 flex items-center justify-center text-[10px] text-white">N2</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-600 flex items-center justify-center text-[10px] text-white">N3</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary-container/20 flex items-center justify-center text-[10px] text-primary-container">+5</div>
            </div>
          </div>
        </div>

        {/* Secondary Grid: Quick Tools */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-primary-container mb-4">auto_fix_high</span>
            <h4 className="font-headline text-white font-bold mb-1">Refactorizador</h4>
            <p className="text-xs text-slate-500">Optimización instantánea de algoritmos.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-secondary/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-secondary mb-4">security</span>
            <h4 className="font-headline text-white font-bold mb-1">Vault Auditor</h4>
            <p className="text-xs text-slate-500">Seguridad criptográfica integrada.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-tertiary-container/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-tertiary mb-4">database</span>
            <h4 className="font-headline text-white font-bold mb-1">Schema Mapper</h4>
            <p className="text-xs text-slate-500">Visualización de grafos de datos.</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group cursor-pointer shadow-xl">
            <span className="material-symbols-outlined text-primary mb-4">cloud_sync</span>
            <h4 className="font-headline text-white font-bold mb-1">Neural Bridge</h4>
            <p className="text-xs text-slate-500">Sincronización multi-cluster.</p>
          </div>
        </div>
      </main>

      {/* Side Decorative Elements */}
      <div className="fixed top-[20%] -right-20 w-80 h-80 bg-secondary-container/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] -left-20 w-64 h-64 bg-primary-container/5 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default ToolsPage;
