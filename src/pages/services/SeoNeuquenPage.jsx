import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackCTAClick } from '@/lib/analytics';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-outline/10 bg-surface-variant/10 backdrop-blur-md overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left group">
        <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{faq.question}</h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-5 text-on-surface-variant leading-relaxed text-sm">{faq.answer}</p>
      </div>
    </div>
  );
};

const faqs = [
  { question: "¿Cuánto cuesta el SEO en Neuquén?", answer: "Nuestros planes de SEO local arrancan desde $300 USD/mes para negocios locales. Incluyen optimización de Google Business Profile, SEO on-page, creación de contenido local y reportes mensuales. El precio varía según la competencia de tu industria y los objetivos." },
  { question: "¿Cuánto tarda en posicionarse mi negocio en Google?", answer: "Para búsquedas locales como 'servicio + Neuquén', los resultados suelen verse entre 2 y 4 meses. Keywords más competitivas a nivel nacional pueden tomar 4-8 meses. Desde el primer mes implementamos mejoras técnicas que generan resultados inmediatos." },
  { question: "¿Qué diferencia hay entre SEO local y SEO nacional?", answer: "El SEO local se enfoca en posicionar tu negocio para búsquedas geográficas (ej: 'abogado Neuquén'), optimiza Google Maps y Google Business Profile, y trabaja con directorios locales. El SEO nacional compite por keywords sin intención geográfica y requiere estrategias de contenido y linkbuilding más agresivas." },
  { question: "¿Necesito tener un sitio web para hacer SEO?", answer: "Sí, un sitio web propio es fundamental. Sin embargo, podemos empezar optimizando tu Google Business Profile mientras desarrollamos tu web. Lo ideal es tener ambos: una presencia web optimizada + un perfil de Google completo y con reseñas." },
  { question: "¿Trabajan solo en Neuquén?", answer: "No, trabajamos con empresas de toda Argentina, Latinoamérica y España. Sin embargo, tenemos experiencia específica en el mercado de Neuquén y la Patagonia, lo que nos da una ventaja para negocios locales de la región." },
];

const benefits = [
  { icon: "location_on", title: "Google Maps & Local Pack", desc: "Posicionamos tu negocio en el mapa de Google para que te encuentren primero cuando busquen en Neuquén." },
  { icon: "star", title: "Gestión de Reseñas", desc: "Estrategia para conseguir y gestionar reseñas positivas que aumentan tu confianza y CTR." },
  { icon: "search", title: "Keywords Locales", desc: "Investigamos y atacamos las búsquedas que hacen tus clientes reales en Neuquén y la Patagonia." },
  { icon: "speed", title: "Core Web Vitals", desc: "Optimizamos la velocidad de tu web para cumplir los estándares de Google y superar a la competencia." },
  { icon: "edit_note", title: "Contenido Local", desc: "Creamos contenido relevante para tu audiencia local que posiciona y genera confianza." },
  { icon: "monitoring", title: "Reportes Mensuales", desc: "Dashboard con métricas claras: posiciones, tráfico, leads y ROI de tu inversión en SEO." },
];

const SeoNeuquenPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Agencia SEO en Neuquén | Posicionamiento Web Local | SEO Growthers</title>
        <meta name="description" content="Agencia SEO en Neuquén Capital. Posicionamos tu negocio en Google Maps y resultados orgánicos. Auditoría gratis + estrategia personalizada. Resultados desde el primer mes." />
        <link rel="canonical" href="https://seogrowthers.com/services/seo-neuquen" />
        <meta property="og:title" content="Agencia SEO en Neuquén | SEO Growthers" />
        <meta property="og:description" content="Posicionamos tu negocio en los primeros resultados de Google en Neuquén. SEO local, Google Maps y contenido optimizado." />
        <meta property="og:url" content="https://seogrowthers.com/services/seo-neuquen" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="agencia seo neuquen, seo neuquen, posicionamiento web neuquen, marketing digital neuquen, google maps neuquen" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SEO en Neuquén",
          "description": "Servicio de posicionamiento web SEO local para empresas en Neuquén Capital y la Patagonia Argentina.",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SEO Growthers",
            "url": "https://seogrowthers.com",
            "telephone": "+54 9 2995504783",
            "address": { "@type": "PostalAddress", "addressLocality": "Neuquén Capital", "addressRegion": "Neuquén", "addressCountry": "AR" },
            "geo": { "@type": "GeoCoordinates", "latitude": -38.9516, "longitude": -68.0591 }
          },
          "areaServed": { "@type": "City", "name": "Neuquén" },
          "serviceType": "SEO Local"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
        })}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20 text-center">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">SEO Local · Neuquén Capital</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
            Agencia <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">SEO en Neuquén</span>
          </h1>
          <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
            Posicionamos tu negocio en los primeros resultados de Google. Más visibilidad, más clientes, más ventas. Estrategia SEO local diseñada para empresas de Neuquén y la Patagonia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auditoria-seo-gratis"
              onClick={() => trackCTAClick('seo_neuquen_hero', '/auditoria-seo-gratis')}
              className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl text-sm tracking-wider hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Auditoría SEO Gratis
            </Link>
            <Link
              to="/contact"
              onClick={() => trackCTAClick('seo_neuquen_hero', '/contact')}
              className="px-8 py-4 border border-primary/30 text-primary font-bold rounded-xl text-sm tracking-wider hover:bg-primary/10 transition-all"
            >
              Hablar con un Experto
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "+300%", label: "Aumento de tráfico promedio" },
            { value: "48hs", label: "Tiempo de auditoría" },
            { value: "Top 5", label: "Posiciones en Google Maps" },
            { value: "4.9★", label: "Satisfacción de clientes" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <p className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Benefits Grid */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            ¿Qué incluye nuestro servicio de SEO en Neuquén?
          </h2>
          <p className="text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
            Un servicio integral que cubre todos los pilares del posicionamiento web local.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{b.icon}</span>
                <h3 className="font-headline font-bold text-on-surface mb-2">{b.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-12">
            Nuestro proceso de trabajo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Auditoría", desc: "Analizamos tu sitio, competencia y oportunidades de mercado local." },
              { step: "02", title: "Estrategia", desc: "Diseñamos un plan SEO personalizado con keywords y objetivos claros." },
              { step: "03", title: "Ejecución", desc: "Implementamos mejoras técnicas, contenido optimizado y linkbuilding local." },
              { step: "04", title: "Resultados", desc: "Medimos, reportamos y optimizamos continuamente para maximizar el ROI." },
            ].map((p) => (
              <div key={p.step} className="text-center p-6">
                <span className="font-headline text-5xl font-bold text-primary/20 block mb-4">{p.step}</span>
                <h3 className="font-headline font-bold text-on-surface mb-2">{p.title}</h3>
                <p className="text-on-surface-variant text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="audit" />

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Preguntas frecuentes sobre SEO en Neuquén
          </h2>
          <p className="text-on-surface-variant text-center max-w-xl mx-auto mb-10">
            Respondemos las dudas más comunes de empresas que quieren posicionarse en Google.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </section>

        <InternalLinkingCTA variant="webdev" />
      </main>
    </div>
  );
};

export default SeoNeuquenPage;
