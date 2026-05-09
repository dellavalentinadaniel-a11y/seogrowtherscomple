import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SuccessCasesHeroCarousel from '@/components/shared/SuccessCasesHeroCarousel';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-outline/10 bg-surface-variant/10 backdrop-blur-md overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <h3 className="font-headline text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors pr-4">
          {faq.question}
        </h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-on-surface-variant leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const serviceFaqs = [
  {
    question: "¿Cuánto cuesta un sitio web profesional?",
    answer: "Nuestros proyectos de desarrollo web comienzan desde $800 USD para landing pages de alta conversión. Sitios corporativos desde $1,500 USD y tiendas online desde $2,500 USD. Cada presupuesto incluye diseño responsive, optimización SEO básica y soporte post-lanzamiento."
  },
  {
    question: "¿Cuánto tiempo tarda en posicionarse mi sitio en Google?",
    answer: "Los resultados de SEO técnico (correcciones, velocidad, indexación) se ven en 2-4 semanas. El posicionamiento orgánico por keywords competitivas toma entre 3 y 6 meses. Nuestros clientes en Argentina suelen ver un aumento de tráfico del 150-300% en el primer semestre."
  },
  {
    question: "¿Qué incluye el servicio de Marketing Digital?",
    answer: "Incluye estrategia SEO completa, gestión de campañas SEM (Google Ads), community management en redes sociales, email marketing automatizado y reportes mensuales con métricas de rendimiento. Todo personalizado según tu industria y objetivos de negocio."
  },
  {
    question: "¿Qué es la automatización con IA y cómo beneficia a mi empresa?",
    answer: "La automatización con IA permite delegar tareas repetitivas a sistemas inteligentes: desde embudos de venta automáticos y chatbots, hasta integración de herramientas y agentes de IA autónomos. Reduce costos operativos hasta un 60% y permite escalar sin contratar proporcionalmente."
  },
  {
    question: "¿Trabajan con empresas fuera de Argentina?",
    answer: "Sí, trabajamos con empresas de toda Latinoamérica y España. Nuestro equipo opera de forma remota y nos adaptamos a diferentes zonas horarias. Facturamos en USD y aceptamos transferencias internacionales y criptomonedas."
  },
  {
    question: "¿Ofrecen auditoría SEO gratuita?",
    answer: "Sí, realizamos una auditoría preliminar gratuita de tu sitio web que incluye análisis técnico básico, revisión de meta tags, velocidad de carga y oportunidades de mejora inmediatas. Podés solicitarla desde nuestra página de contacto."
  }
];

// Datos de los servicios basados en las categorías solicitadas
const serviceCategories = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    description: "Construimos ecosistemas digitales de alto rendimiento. Interfaces inmersivas y arquitecturas robustas diseñadas para escalar y maximizar la conversión.",
    icon: "code",
    image: "/images/services/web-dev.webp",
    color: "primary",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    gradient: "from-primary/20 to-transparent",
    landingUrl: "/services/desarrollo-web-argentina",
    services: [
      { name: "Landing Page", desc: "Páginas de alta conversión optimizadas milimétricamente para campañas publicitarias y captura de leads.", icon: "web" },
      { name: "Sitio Web Corporativo", desc: "Presencia digital premium y profesional que proyecta la autoridad y los valores de tu empresa.", icon: "domain" },
      { name: "Tiendas Online", desc: "E-commerce escalables, seguros y optimizados para ofrecer la mejor experiencia de compra.", icon: "storefront" },
      { name: "Portafolio", desc: "Muestra tu trabajo al mundo con galerías dinámicas, impactantes y de carga ultrarrápida.", icon: "photo_library" },
    ]
  },
  {
    id: "marketing-digital",
    title: "Marketing Digital",
    description: "Estrategias omnicanal basadas en datos empíricos para amplificar tu alcance, dominar tu nicho y multiplicar tu retorno de inversión.",
    icon: "campaign",
    image: "/images/services/marketing.webp",
    color: "secondary",
    bgColor: "bg-secondary-container/10",
    borderColor: "border-secondary/30",
    textColor: "text-secondary",
    gradient: "from-secondary/20 to-transparent",
    landingUrl: "/services/seo-neuquen",
    services: [
      { name: "SEO", desc: "Posicionamiento orgánico de élite en motores de búsqueda para asegurar tráfico sostenible a largo plazo.", icon: "search_insights" },
      { name: "SEM (Ads)", desc: "Campañas publicitarias hiper-segmentadas en Google y redes sociales enfocadas en ROI positivo.", icon: "ads_click" },
      { name: "Redes Sociales", desc: "Gestión de comunidad y creación de contenido viral para construir fidelidad y embajadores de marca.", icon: "thumb_up" },
      { name: "Email Marketing", desc: "Sistemas de automatización de correos para nutrir leads, retener clientes y aumentar el LTV.", icon: "mail" },
    ]
  },
  {
    id: "automatizacion",
    title: "Automatización",
    description: "Optimizamos tus operaciones delegando tareas repetitivas a sistemas inteligentes. Escala tu negocio sin incrementar proporcionalmente tus costos.",
    icon: "smart_toy",
    image: "/images/services/automation.webp",
    color: "tertiary",
    bgColor: "bg-tertiary-container/10",
    borderColor: "border-tertiary/30",
    textColor: "text-tertiary",
    gradient: "from-tertiary/20 to-transparent",
    landingUrl: "/services/automatizacion-ia",
    services: [
      { name: "Marketing y Ventas", desc: "Embudos automatizados que cualifican prospectos y cierran ventas de forma autónoma 24/7.", icon: "trending_up" },
      { name: "RPA (Bots)", desc: "Bots de software que imitan acciones humanas para eliminar el trabajo administrativo monótono.", icon: "precision_manufacturing" },
      { name: "Integraciones No-Code", desc: "Conexión fluida entre tu stack tecnológico para que tus datos fluyan sin fricción.", icon: "cable" },
      { name: "IA Agéntica", desc: "Despliegue de agentes de inteligencia artificial autónomos que ejecutan flujos complejos.", icon: "psychology" },
    ]
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Servicios de SEO, Desarrollo Web y Automatización | SEO Growthers</title>
        <meta name="description" content="Descubre nuestros servicios premium: Desarrollo Web de alto rendimiento, Marketing Digital con ROI real y Automatización con IA. Crece con SEO Growthers." />
        <link rel="canonical" href="https://seogrowthers.com/services" />
        <meta property="og:title" content="Servicios Premium | SEO Growthers" />
        <meta property="og:description" content="Desarrollo Web, SEO, Marketing Digital y Automatización con IA. La agencia que impulsa tu crecimiento digital." />
        <meta property="og:url" content="https://seogrowthers.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "SEO Growthers",
          "description": "Agencia de Desarrollo Web, SEO, Marketing Digital y Automatización con IA para empresas en crecimiento.",
          "url": "https://seogrowthers.com/services",
          "telephone": "+54 9 2995504783",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AR",
            "addressLocality": "Neuquén"
          },
          "areaServed": [
            { "@type": "Country", "name": "Argentina" },
            { "@type": "Country", "name": "España" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Digitales",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo Web", "description": "Landing pages, sitios corporativos, e-commerce y portafolios de alto rendimiento." }},
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marketing Digital y SEO", "description": "Posicionamiento orgánico, campañas SEM, redes sociales y email marketing." }},
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automatización con IA", "description": "Embudos automatizados, RPA, integraciones no-code y agentes de IA autónomos." }}
            ]
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": serviceFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}</script>
      </Helmet>
      
      <ScrollToTop />

      <main className="pt-20 pb-32">
        <div className="px-8 max-w-7xl mx-auto">
          <Breadcrumbs className="mb-0" />
        </div>
        {/* Hero Section */}
        <section className="relative px-8 pt-20 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-variant/30 border border-outline/30 mb-6 backdrop-blur-sm">
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-on-surface-variant">Soluciones de Próxima Generación</span>
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight text-on-surface mb-6 max-w-5xl">
              Dominio <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Digital</span> de Vanguardia
            </h1>
            <p className="text-on-surface-variant text-lg md:text-2xl max-w-3xl leading-relaxed font-light">
              Ingeniería, marketing y automatización fusionados en una única fuerza impulsora para tu negocio.
            </p>
          </div>
          
          {/* Background Decorative Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl aspect-square bg-primary/5 rounded-full blur-[180px] pointer-events-none animate-pulse"></div>
        </section>

        <section className="px-8 max-w-7xl mx-auto mb-32 relative z-10">
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-outline/20 via-transparent to-outline/20">
            <div className="rounded-[2.4rem] overflow-hidden bg-surface/50 backdrop-blur-xl border border-white/5 shadow-2xl">
              <SuccessCasesHeroCarousel />
            </div>
          </div>
        </section>

        {/* Services Categories */}
        <div className="space-y-48">
          {serviceCategories.map((category, index) => (
            <section key={category.id} id={category.id} className="relative px-8 group/section">
              <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image/Visual Part */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                      <img 
                        src={category.image} 
                        alt={category.title} 
                        className="w-full h-full object-cover scale-105 group-hover/section:scale-100 transition-transform duration-1000"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} mix-blend-overlay opacity-40`}></div>
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
                    </div>
                    {/* Decorative element behind image */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${category.gradient} blur-3xl opacity-20 -z-10 animate-pulse`}></div>
                  </div>

                  {/* Content Part */}
                  <div className="w-full lg:w-1/2">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-start lg:items-end lg:text-right'}`}>
                      <div className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center border ${category.borderColor} mb-8 shadow-xl backdrop-blur-md`}>
                        <span className={`material-symbols-outlined text-3xl ${category.textColor}`}>{category.icon}</span>
                      </div>
                      <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-8 tracking-tight">
                        {category.title}
                      </h2>
                      <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 font-light">
                        {category.description}
                      </p>
                      
                      {/* Sub-services Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {category.services.map((service, sIndex) => (
                          <div 
                            key={sIndex} 
                            className="p-6 rounded-2xl bg-surface-variant/20 border border-outline/10 hover:bg-surface-variant/40 transition-all group/card cursor-default"
                          >
                            <div className="flex items-start gap-4">
                              <span className={`material-symbols-outlined text-2xl ${category.textColor} opacity-60 group-hover/card:opacity-100 transition-opacity`}>
                                {service.icon}
                              </span>
                              <div>
                                <h3 className="font-headline text-base font-bold text-on-surface mb-1">{service.name}</h3>
                                <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">
                                  {service.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12">
                        <Link
                          to={category.landingUrl}
                          className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl ${category.bgColor} border ${category.borderColor} ${category.textColor} font-headline font-bold uppercase tracking-widest text-xs hover:bg-opacity-20 transition-all shadow-lg`}
                        >
                          Explorar {category.title}
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mt-32 px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 block">Resolvemos tus dudas</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              Preguntas <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Frecuentes</span>
            </h2>
          </div>
          <div className="space-y-4">
            {serviceFaqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="text-primary text-sm font-bold tracking-widest hover:text-secondary transition-colors inline-flex items-center gap-2"
            >
              ¿Tenés otra pregunta? Contactanos
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="mt-32 px-8 max-w-5xl mx-auto">
          <div className="glass-panel relative rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-outline/20 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 opacity-50"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-6">workspace_premium</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6">
                  El Futuro es Ahora
                </h2>
                <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  No dejes que tu competencia se adelante. Implementa hoy las estrategias digitales que dominarán el mercado de mañana.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://studioseogrowthers.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2">
                    Iniciar Proyecto
                    <span className="material-symbols-outlined text-base">rocket</span>
                  </a>
                  <a href="https://studioseogrowthers.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-surface-variant border border-outline/30 text-on-surface font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-variant/80 transition-all flex items-center justify-center gap-2">
                    Agendar Consultoría
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                  </a>
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Services;
