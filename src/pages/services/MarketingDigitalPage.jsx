import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const channels = [
  { icon: 'search', title: 'SEO On-Page', desc: 'Optimización técnica y de contenido para aparecer en Google.', link: '/services/seo-neuquen' },
  { icon: 'ads_click', title: 'Google Ads (SEM)', desc: 'Campañas segmentadas para aparecer en búsquedas inmediatas.', link: null },
  { icon: 'campaign', title: 'Social Ads', desc: 'Publicidad en Facebook, Instagram y LinkedIn con segmentación precisa.', link: null },
  { icon: 'trending_up', title: 'Data Analytics', desc: 'Medición exhaustiva de cada peso invertido en marketing.', link: null },
  { icon: 'mouse', title: 'CRO', desc: 'Mejoramos tu web para que convierta más visitantes en clientes.', link: null },
  { icon: 'mail', title: 'Email Marketing', desc: 'Automatización de flujos para nutrir y convertir leads.', link: null },
  { icon: 'smartphone', title: 'Mobile First', desc: 'Estrategias pensadas para el dispositivo más usado.', link: null },
  { icon: 'star', title: 'Reputación Online', desc: 'Gestión de reseñas y presencia en Google Maps.', link: null },
];

const faqs = [
  { q: '¿Qué incluye el servicio de Marketing Digital?', a: 'Incluye estrategia SEO completa, gestión de campañas SEM (Google Ads), community management en redes sociales, email marketing automatizado y reportes mensuales con métricas de rendimiento. Todo personalizado según tu industria.' },
  { q: '¿En cuánto tiempo veo resultados?', a: 'Las campañas de pago (SEM/Social Ads) generan resultados inmediatos desde el primer día. El SEO orgánico muestra resultados significativos entre 3 y 6 meses, con un crecimiento sostenido a largo plazo.' },
  { q: '¿Cuánto hay que invertir en publicidad?', a: 'Recomendamos un mínimo de $100-300 USD mensuales en pauta publicitaria para campañas de Google Ads o Social Ads. El monto ideal depende de tu industria, competencia y objetivos de conversión.' },
  { q: '¿Cómo miden el retorno de inversión?', a: 'Implementamos tracking completo con GA4, conversion tracking, UTM parameters y dashboards personalizados. Cada mes recibís un reporte detallado con métricas de rendimiento y ROI.' },
  { q: '¿Trabajan con empresas pequeñas?', a: 'Sí, trabajamos con empresas de todos los tamaños. Adaptamos las estrategias y presupuestos a la escala de cada negocio, desde emprendedores hasta empresas establecidas.' },
];

const MarketingDigitalPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing Digital",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Servicios de marketing digital en Argentina: SEO, SEM, Social Ads, Email Marketing y Analytics. Estrategias orientadas a resultados y ROI medible.",
    "areaServed": [
      { "@type": "Country", "name": "Argentina" },
      { "@type": "AdministrativeArea", "name": "Neuquén" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Marketing Digital",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Orgánico" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads (SEM)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Ads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email Marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Analytics y Reportes" } }
      ]
    },
    "serviceType": "Digital Marketing"
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
        <title>Marketing Digital Argentina | SEO, SEM, Redes - SEO Growthers</title>
        <meta name="description" content="Servicios de marketing digital en Argentina: SEO orgánico, Google Ads, publicidad en redes sociales, email marketing y analytics. Resultados medibles y ROI garantizado." />
        <link rel="canonical" href="https://seogrowthers.com/services/marketing-digital" />
        <meta property="og:title" content="Marketing Digital Argentina | SEO Growthers" />
        <meta property="og:description" content="Estrategias de marketing digital orientadas a resultados. SEO, SEM, Social Ads y Analytics." />
        <meta property="og:url" content="https://seogrowthers.com/services/marketing-digital" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Marketing+Digital&subtitle=SEO%2C+Google+Ads%2C+redes+sociales&type=service" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Marketing Digital</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Marketing Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Orientado a Resultados</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            No solo atraemos tráfico, atraemos clientes calificados. Estrategias integrales diseñadas para maximizar tu retorno de inversión.
          </p>

          <div className="space-y-4 mb-10">
            {["Estrategia de SEO avanzado", "Gestión de campañas de pago (Ads)", "Optimización de tasa de conversión (CRO)", "Analítica y reportes mensuales"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-base font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20marketing%20digital"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick('marketing_digital_page'); trackCTAClick('marketing_hero_cta'); }}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Consultar Estrategia
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/auditoria-seo-gratis" className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
              Auditoría SEO Gratis
            </Link>
          </div>
        </section>

        {/* Services detail */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">Escalamos tu presencia en buscadores y redes</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Utilizamos datos y creatividad para posicionar tu marca donde tus clientes están buscando. Metodología basada en mejora continua.
            </p>
            <div className="space-y-6">
              {[
                { title: "SEO Orgánico (Google)", desc: "Optimizamos tu sitio para que aparezca en los primeros resultados sin pagar por cada clic, construyendo autoridad a largo plazo." },
                { title: "Publicidad en Meta y Google Ads", desc: "Llegamos a tu público ideal con campañas segmentadas por intereses, comportamientos y keywords de alta intención." },
                { title: "Marketing de Contenidos", desc: "Creamos contenido de valor que educa a tu audiencia y los guía a través del embudo de ventas hasta la conversión." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-bold text-on-surface text-lg mb-1">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
            <div className="space-y-4">
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant w-8">{['Ene','Feb','Mar','Abr','May','Jun','Jul'][i]}</span>
                  <div className="flex-1 bg-surface-container-highest rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all" style={{ width: `${h}%` }}></div>
                  </div>
                  <span className="text-xs text-primary font-bold w-10 text-right">+{h}%</span>
                </div>
              ))}
              <p className="text-center text-xs text-on-surface-variant mt-4">Crecimiento promedio de tráfico orgánico</p>
            </div>
          </div>
        </section>

        {/* Channels Grid */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">Tu marca en todas partes</h2>
          <p className="text-on-surface-variant mb-12">Estrategias multicanal para una cobertura digital completa.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {channels.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="font-bold text-on-surface text-lg mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-3">{item.desc}</p>
                {item.link && (
                  <Link to={item.link} className="text-primary text-xs font-bold tracking-wider hover:underline inline-flex items-center gap-1">
                    Ver más <span className="material-symbols-outlined text-xs">chevron_right</span>
                  </Link>
                )}
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
            Empezá a vender <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">de verdad</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Nuestro equipo de expertos en crecimiento digital a tu disposición.</p>
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20una%20estrategia%20de%20marketing%20digital"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('marketing_digital_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Quiero una Auditoría <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

        <InternalLinkingCTA variant="seo" />
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

export default MarketingDigitalPage;
