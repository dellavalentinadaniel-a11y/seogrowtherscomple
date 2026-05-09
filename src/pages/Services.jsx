import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SuccessCasesHeroCarousel from '@/components/shared/SuccessCasesHeroCarousel';

// Datos de los servicios basados en las categorías solicitadas
const serviceCategories = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    description: "Construimos ecosistemas digitales de alto rendimiento. Interfaces inmersivas y arquitecturas robustas diseñadas para escalar y maximizar la conversión.",
    icon: "code",
    image: "/images/services/web-dev.png",
    color: "primary",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    gradient: "from-primary/20 to-transparent",
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
    image: "/images/services/marketing.png",
    color: "secondary",
    bgColor: "bg-secondary-container/10",
    borderColor: "border-secondary/30",
    textColor: "text-secondary",
    gradient: "from-secondary/20 to-transparent",
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
    image: "/images/services/automation.png",
    color: "tertiary",
    bgColor: "bg-tertiary-container/10",
    borderColor: "border-tertiary/30",
    textColor: "text-tertiary",
    gradient: "from-tertiary/20 to-transparent",
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
        <title>Servicios Premium | SEO Growthers</title>
      </Helmet>
      
      <ScrollToTop />

      <main className="pt-20 pb-32">
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
                        <a 
                          href="https://studioseogrowthers.vercel.app/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl ${category.bgColor} border ${category.borderColor} ${category.textColor} font-headline font-bold uppercase tracking-widest text-xs hover:bg-opacity-20 transition-all shadow-lg`}
                        >
                          Explorar {category.title}
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

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
