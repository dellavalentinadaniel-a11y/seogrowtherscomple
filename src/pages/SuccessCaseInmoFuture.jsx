import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const SuccessCaseInmoFuture = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "InmoFuture: Ecosistema Digital para Real Estate",
    "author": { "@type": "Organization", "name": "SEO Growthers" },
    "publisher": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "datePublished": "2026-05-01",
    "dateModified": "2026-05-01",
    "description": "Caso de éxito: desarrollo de plataforma inmobiliaria premium con buscador inteligente, CRM integrado y diseño conversivo. +358% en conversión de visitantes."
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Caso de Éxito: InmoFuture - Plataforma Inmobiliaria | SEO Growthers</title>
        <meta name="description" content="Caso de éxito InmoFuture: plataforma inmobiliaria premium con buscador inteligente, CRM integrado. LCP de 4.5s a 1.2s, conversión de 1.2% a 5.5%." />
        <link rel="canonical" href="https://seogrowthers.com/services/success-cases/inmofuture-plataforma-inmobiliaria" />
        <meta property="og:title" content="Caso de Éxito: InmoFuture | SEO Growthers" />
        <meta property="og:description" content="Plataforma inmobiliaria premium: +358% en conversión, LCP 1.2s, CRM integrado." />
        <meta property="og:url" content="https://seogrowthers.com/services/success-cases/inmofuture-plataforma-inmobiliaria" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=InmoFuture%3A+Ecosistema+Digital&subtitle=%2B358%25+conversi%C3%B3n&type=case" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <header className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Caso de Éxito</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            InmoFuture: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Ecosistema Digital</span> para Real Estate
          </h1>
          <p className="max-w-3xl text-on-surface-variant text-lg leading-relaxed mb-8">
            Desarrollo de una plataforma integral de gestión inmobiliaria diseñada para maximizar la conversión de leads y automatizar el ciclo de venta de propiedades de lujo.
          </p>
          <a
            href="https://inmobiliaria-plantilla.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('inmofuture_visit_site')}
            className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
          >
            Visitar Sitio En Vivo <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </header>

        {/* Challenge */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-surface-container-low rounded-lg flex items-center justify-center text-primary text-sm font-bold">01</span>
            El Desafío Inmobiliario
          </h2>
          <div className="text-on-surface-variant space-y-4 leading-relaxed">
            <p>El sector inmobiliario tradicional sufre de procesos manuales y una desconexión crítica entre la oferta y el interés del usuario en tiempo real.</p>
            <div className="space-y-3">
              {['Experiencia de búsqueda frustrante en dispositivos móviles', 'Gestión ineficiente de consultas y seguimientos', 'Baja calidad visual en la presentación de propiedades premium', 'Falta de sincronización entre catálogo y portales externos'].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-surface-container-low rounded-lg flex items-center justify-center text-primary text-sm font-bold">02</span>
            La Solución
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: 'search', title: 'Buscador Inteligente', desc: 'Filtros avanzados y búsqueda por mapa con actualización instantánea de resultados.' },
              { icon: 'view_quilt', title: 'Diseño Conversivo', desc: 'Landing pages específicas para cada propiedad optimizadas para captar leads.' },
              { icon: 'database', title: 'CRM Integrado', desc: 'Panel de administración para agentes con seguimiento automático de clientes.' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-2xl mb-4 block">{s.icon}</span>
                <h3 className="font-bold text-on-surface text-lg mb-2">{s.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="mb-20">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-8 text-center">Impacto en el Negocio</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: 'bolt', label: 'Velocidad de Carga (LCP)', before: '4.5s', after: '1.2s' },
              { icon: 'trending_up', label: 'Conversión de Visitantes', before: '1.2%', after: '5.5%' },
              { icon: 'language', label: 'Productividad de Agentes', before: 'Base', after: '+40%' },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center group hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary text-2xl mb-4 block group-hover:scale-110 transition-transform">{kpi.icon}</span>
                <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">{kpi.label}</h4>
                <div className="space-y-2">
                  <div><span className="text-[10px] uppercase font-bold text-on-surface-variant block">Antes</span><span className="text-lg text-on-surface-variant line-through">{kpi.before}</span></div>
                  <div className="pt-2 border-t border-outline-variant/10"><span className="text-[10px] uppercase font-bold text-primary block">Después</span><span className="text-2xl font-bold text-on-surface">{kpi.after}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-16 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-2xl md:text-4xl font-bold text-on-surface mb-4 relative z-10">¿Listo para escalar tu negocio?</h2>
          <p className="text-on-surface-variant mb-8 max-w-2xl mx-auto relative z-10">
            InmoFuture es solo un ejemplo de cómo la tecnología puede revolucionar una industria tradicional. Podemos hacer lo mismo por tu empresa.
          </p>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20vi%20el%20caso%20InmoFuture%20y%20quiero%20algo%20similar" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('inmofuture_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10">
            Solicitar Consultoría Gratuita <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="webdev" />
      </main>
    </div>
  );
};

export default SuccessCaseInmoFuture;
