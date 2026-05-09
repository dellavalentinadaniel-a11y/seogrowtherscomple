import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick } from '@/lib/analytics';

const cases = [
  {
    slug: 'aluvalle-transformacion-digital',
    title: 'Aluvalle',
    subtitle: 'Transformación Digital Completa',
    desc: 'De cero presencia online a dominar las búsquedas locales en Neuquén. Desarrollo web, SEO local y estrategia de contenido para empresa de aberturas de aluminio.',
    kpis: ['+300% tráfico orgánico', 'Top 3 en Google Local', 'LCP < 1.5s'],
    tags: ['SEO Local', 'Desarrollo Web', 'Google Maps'],
    icon: 'storefront',
  },
  {
    slug: 'inmofuture-plataforma-inmobiliaria',
    title: 'InmoFuture',
    subtitle: 'Ecosistema Digital para Real Estate',
    desc: 'Plataforma inmobiliaria premium con buscador inteligente, CRM integrado y diseño conversivo. Optimización de rendimiento y experiencia de usuario.',
    kpis: ['+358% conversión', 'LCP 1.2s', '+40% productividad'],
    tags: ['Plataforma Web', 'CRM', 'UX/UI'],
    icon: 'apartment',
  },
];

const SuccessCasesPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Casos de Éxito - SEO Growthers",
    "description": "Proyectos reales con resultados medibles. Conocé cómo ayudamos a empresas a crecer con SEO, desarrollo web y automatización.",
    "url": "https://seogrowthers.com/services/success-cases",
    "publisher": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": cases.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://seogrowthers.com/services/success-cases/${c.slug}`,
        "name": c.title
      }))
    }
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Casos de Éxito | Proyectos Reales con Resultados - SEO Growthers</title>
        <meta name="description" content="Casos de éxito reales: +300% tráfico orgánico, +358% conversión. Conocé cómo ayudamos a empresas a crecer con SEO, desarrollo web y automatización con IA." />
        <link rel="canonical" href="https://seogrowthers.com/services/success-cases" />
        <meta property="og:title" content="Casos de Éxito | SEO Growthers" />
        <meta property="og:description" content="Proyectos reales con resultados medibles. SEO, desarrollo web y automatización." />
        <meta property="og:url" content="https://seogrowthers.com/services/success-cases" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Casos+de+%C3%89xito&subtitle=Resultados+reales+y+medibles&type=case" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Portfolio</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Resultados que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">hablan solos</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
            Cada proyecto es una prueba de lo que podemos lograr juntos. Datos reales, métricas verificables y clientes satisfechos.
          </p>
        </section>

        {/* Cases Grid */}
        <section className="mb-20 space-y-8">
          {cases.map((c, i) => (
            <Link
              key={i}
              to={`/services/success-cases/${c.slug}`}
              className="block p-8 md:p-10 rounded-3xl bg-surface-container-low border border-outline-variant/10 group hover:border-primary/20 transition-all"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-2xl">{c.icon}</span>
                    </div>
                    <div>
                      <h2 className="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">{c.title}</h2>
                      <p className="text-on-surface-variant text-sm">{c.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 bg-surface-container-highest rounded-lg text-xs font-bold text-on-surface-variant">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {c.kpis.map((kpi, j) => (
                    <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-primary-container/10 border border-primary/10">
                      <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
                      <span className="text-sm font-bold text-on-surface">{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm">
                Ver caso completo <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">
            ¿Tu empresa será el próximo caso de éxito?
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">
            Contanos tu desafío y diseñamos la estrategia para superarlo.
          </p>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20vi%20los%20casos%20de%20éxito%20y%20quiero%20resultados%20similares" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('success_cases_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10">
            Quiero Resultados Así <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

export default SuccessCasesPage;
