import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const features = [
  { icon: 'grid_view', title: 'Multisección', desc: 'Hasta 5 secciones principales para organizar tu información.' },
  { icon: 'groups', title: 'Nosotros y Equipo', desc: 'Humaniza tu marca mostrando quiénes están detrás del proyecto.' },
  { icon: 'draw', title: 'Diseño a Medida', desc: 'Sin plantillas genéricas. Diseño 100% original para tu marca.' },
  { icon: 'search', title: 'SEO Ready', desc: 'Estructura optimizada para motores de búsqueda desde el día 1.' },
  { icon: 'lock', title: 'Seguridad Total', desc: 'Protección contra ataques y certificados SSL incluidos.' },
  { icon: 'mail', title: 'Correos Pro', desc: 'Configuración de cuentas corporativas para todo tu equipo.' },
  { icon: 'share', title: 'Social Connect', desc: 'Integración completa con tus redes sociales y perfiles.' },
  { icon: 'chat', title: 'WhatsApp Directo', desc: 'Botón flotante para consultas rápidas de clientes.' },
];

const faqs = [
  { q: '¿Qué secciones incluye un sitio web corporativo?', a: 'Incluye secciones de Inicio, Nosotros, Servicios, Equipo y Contacto. Podemos agregar secciones adicionales como Blog, Casos de Éxito y Testimonios según las necesidades de tu empresa.' },
  { q: '¿Cuánto tiempo lleva desarrollar un sitio corporativo?', a: 'El desarrollo toma entre 3 y 6 semanas dependiendo de la complejidad. Incluye etapas de diseño, desarrollo, revisiones y lanzamiento con soporte post-publicación.' },
  { q: '¿Puedo gestionar el contenido yo mismo?', a: 'Sí, incluimos un sistema de gestión de contenidos (CMS) intuitivo para que puedas actualizar textos, imágenes y publicaciones de blog sin conocimientos técnicos.' },
  { q: '¿Incluye optimización SEO?', a: 'Sí, todos nuestros sitios corporativos incluyen SEO on-page avanzado: meta tags optimizados, schema markup, sitemap XML, robots.txt, Core Web Vitals y estructura semántica para Google.' },
  { q: '¿Ofrecen mantenimiento después del lanzamiento?', a: 'Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo de seguridad, soporte técnico y optimización continua.' },
];

const WebCorporativaPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño Web Corporativo",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Diseño y desarrollo de sitios web corporativos profesionales. Presencia digital de alto impacto con SEO integrado.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "offers": {
      "@type": "Offer",
      "price": "1500",
      "priceCurrency": "USD",
      "description": "Sitio web corporativo multisección con diseño a medida y SEO avanzado"
    },
    "serviceType": "Corporate Website Design"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Diseño Web Corporativo | Sitios Profesionales - SEO Growthers</title>
        <meta name="description" content="Diseño de sitios web corporativos profesionales en Argentina. Presencia digital de alto impacto con SEO, diseño a medida y CMS. Desde $1,500 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/web-corporativa" />
        <meta property="og:title" content="Diseño Web Corporativo | SEO Growthers" />
        <meta property="og:description" content="Sitios web corporativos que proyectan profesionalismo y solidez. Diseño a medida con SEO integrado." />
        <meta property="og:url" content="https://seogrowthers.com/services/web-corporativa" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Web+Corporativa&subtitle=Desde+%241500+USD+con+SEO+avanzado&type=service" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Desarrollo Web</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Web Corporativa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">de Autoridad</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            El ecosistema digital de tu empresa. Robustez técnica y estética premium para marcas que lideran su sector.
          </p>

          <div className="space-y-4 mb-10">
            {["Sitio multisección (Inicio, Nosotros, Servicios, Contacto)", "Dominio y hosting profesional por 1 año", "Optimización SEO avanzada", "Correos corporativos ilimitados"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-base font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <span className="text-on-surface-variant block mb-1 text-sm">Inversión desde:</span>
            <span className="text-4xl font-bold text-on-surface">$1,500 <span className="text-lg text-on-surface-variant">USD</span></span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20un%20sitio%20web%20corporativo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick('web_corporativa_page'); trackCTAClick('web_corporativa_hero_cta'); }}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Solicitar Presupuesto
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/portfolio" className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
              Ver Portfolio
            </Link>
          </div>
        </section>

        {/* About */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">Presencia digital que genera confianza</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              No es solo una web, es la cara de tu empresa al mundo. Diseñamos estructuras que proyectan profesionalismo y solidez.
            </p>
            <div className="space-y-6">
              {[
                { title: "Diseño coherente con tu marca", desc: "Alineamos cada píxel con tu identidad corporativa para que tu mensaje sea claro y potente en cada sección." },
                { title: "SEO on-page estratégico", desc: "Arquitectura pensada para que Google indexe tu contenido rápidamente y tus clientes potenciales te encuentren." },
                { title: "Blog y gestión de contenidos", desc: "Sistema autogestionable para educar a tu audiencia, compartir noticias y atraer tráfico orgánico de calidad." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-bold text-on-surface text-lg mb-1">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
            <div className="aspect-square bg-gradient-to-br from-primary-container/20 to-secondary-container/20 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-8xl">domain</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">Potencia tu empresa</h2>
          <p className="text-on-surface-variant mb-12">Todo lo necesario para una presencia institucional de primer nivel.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="font-bold text-on-surface text-lg mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">
            Lleva tu empresa al <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">siguiente nivel</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Solicitá hoy mismo tu presupuesto para un sitio web corporativo de alto impacto.</p>
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20necesito%20un%20sitio%20web%20corporativo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('web_corporativa_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Empezar Proyecto <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="services" />
      </main>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low overflow-hidden transition-all">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left group">
        <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{question}</h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-on-surface-variant leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default WebCorporativaPage;
