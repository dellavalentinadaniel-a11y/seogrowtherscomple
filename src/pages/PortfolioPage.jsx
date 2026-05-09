import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackCTAClick, trackWhatsAppClick } from '@/lib/analytics';

const projects = [
  {
    id: 1, category: 'landing', title: "NutriLife Landing",
    desc: "Página de aterrizaje optimizada para conversión de suplementos naturales.",
    tags: ["React", "Tailwind", "SEO"]
  },
  {
    id: 2, category: 'corporativa', title: "Constructora Delta",
    desc: "Sitio institucional robusto con catálogo de obras y sección de servicios.",
    tags: ["WordPress", "Custom UI"]
  },
  {
    id: 3, category: 'ecommerce', title: "Glow Beauty Shop",
    desc: "Tienda online completa con pasarela de pagos y gestión de stock.",
    tags: ["WooCommerce", "MercadoPago"]
  },
  {
    id: 4, category: 'landing', title: "SaaS Analytics One",
    desc: "One page para plataforma de software con planes de precios dinámicos.",
    tags: ["Next.js", "Framer Motion"]
  },
  {
    id: 5, category: 'corporativa', title: "Estudio Contable Pérez",
    desc: "Web profesional para firma de servicios financieros.",
    tags: ["Minimalist", "Fast Load"]
  },
  {
    id: 6, category: 'ecommerce', title: "Urban Fit Wear",
    desc: "E-commerce de indumentaria deportiva con filtros avanzados.",
    tags: ["Tienda Nube", "Custom CSS"]
  },
  {
    id: 7, category: 'corporativa', title: "Chrons Gaming",
    desc: "Portal de noticias y comunidad gaming con actualización en tiempo real.",
    link: "https://throneandlibertylatam.icu/",
    tags: ["News Portal", "Gaming", "SEO"]
  },
  {
    id: 8, category: 'corporativa', title: "Aluvalle SAS",
    desc: "Sitio corporativo y catálogo para empresa líder en perfiles de aluminio.",
    link: "https://www.aluvalle.store/",
    tags: ["Industrial", "Catalog", "Premium"]
  },
  {
    id: 9, category: 'corporativa', title: "SEO Growthers Platform",
    desc: "Ecosistema digital completo: Blog, Comunidad, Herramientas SEO y Servicios profesionales.",
    link: "https://seogrowthers.com/",
    tags: ["Platform", "SEO Tools", "Community"]
  },
  {
    id: 10, category: 'corporativa', title: "InmoFuture Platform",
    desc: "Plataforma inmobiliaria premium con gestión de propiedades y CRM integrado.",
    link: "https://inmobiliaria-plantilla.vercel.app/",
    tags: ["Real Estate", "React", "Management"]
  }
];

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'landing', label: 'Landing Pages' },
  { id: 'corporativa', label: 'Corporativas' },
  { id: 'ecommerce', label: 'E-Commerce' },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio - SEO Growthers",
    "description": "Galería de proyectos web realizados por SEO Growthers. Landing pages, sitios corporativos y tiendas online.",
    "url": "https://seogrowthers.com/portfolio",
    "publisher": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    }
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Portfolio Web | Proyectos y Casos de Éxito - SEO Growthers</title>
        <meta name="description" content="Explorá nuestra galería de proyectos web: landing pages de alta conversión, sitios corporativos y tiendas online. Desarrollos reales con resultados medibles." />
        <link rel="canonical" href="https://seogrowthers.com/portfolio" />
        <meta property="og:title" content="Portfolio Web | SEO Growthers" />
        <meta property="og:description" content="Galería de proyectos web realizados: landing pages, sitios corporativos y e-commerce." />
        <meta property="og:url" content="https://seogrowthers.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Portfolio+Web&subtitle=Proyectos+reales+con+resultados&type=case" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="text-center mb-16">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Showcase</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Biblioteca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Ejemplos Web</span>
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg leading-relaxed">
            Explorá nuestra galería de desarrollos realizados. Desde landing pages ágiles hasta tiendas online complejas.
          </p>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2.5 rounded-full border text-sm font-bold transition-all ${
                filter === btn.id
                  ? 'border-primary-container bg-primary-container/10 text-primary tracking-wide'
                  : 'border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary-container/10 to-secondary-container/10 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-primary/30 text-6xl group-hover:scale-110 transition-transform">
                  {project.category === 'landing' ? 'web' : project.category === 'ecommerce' ? 'storefront' : 'domain'}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => trackCTAClick('portfolio_visit_site')}
                  >
                    <span className="bg-white text-background px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2">
                      Visitar Sitio <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </span>
                  </a>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-container/10 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <h2 className="font-headline text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      {project.category === 'landing' ? 'smartphone' : project.category === 'ecommerce' ? 'shopping_cart' : 'language'}
                    </span>
                    {project.category}
                  </span>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">¿Te gusta lo que ves?</h2>
          <p className="text-on-surface-variant text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Podemos crear una solución similar o 100% personalizada para tu negocio. Hagamos que tu proyecto despegue.
          </p>
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20vi%20el%20portfolio%20y%20quiero%20un%20proyecto%20similar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('portfolio_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Iniciar mi Proyecto <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="webdev" />
      </main>
    </div>
  );
};

export default PortfolioPage;
