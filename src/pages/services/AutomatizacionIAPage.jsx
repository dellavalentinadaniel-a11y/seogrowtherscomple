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
  { question: "¿Qué es la automatización con IA?", answer: "Es el uso de inteligencia artificial para ejecutar tareas repetitivas de forma autónoma: responder consultas, procesar datos, enviar emails, generar reportes, calificar leads y más. Reducís costos operativos y escalás tu negocio sin contratar proporcionalmente." },
  { question: "¿Cuánto se puede ahorrar con automatización?", answer: "Nuestros clientes reportan ahorros del 40-70% en tiempo operativo. Un chatbot de IA puede atender 500+ consultas diarias que antes requerían 3 personas. Los embudos automatizados convierten leads 24/7 sin intervención humana." },
  { question: "¿Necesito conocimientos técnicos para usar las automatizaciones?", answer: "No. Diseñamos interfaces simples y dashboards intuitivos. Las automatizaciones corren en segundo plano y vos solo ves los resultados. Además, incluimos capacitación y documentación para tu equipo." },
  { question: "¿Qué herramientas de IA utilizan?", answer: "Trabajamos con Claude (Anthropic), GPT-4 (OpenAI), Google AI, Make (Integromat), n8n y desarrollo custom con APIs. Elegimos la herramienta según el caso de uso, priorizando costo-beneficio y privacidad de datos." },
  { question: "¿Cuánto tiempo toma implementar una automatización?", answer: "Un chatbot básico puede estar funcionando en 3-5 días. Embudos de venta automatizados en 1-2 semanas. Sistemas de IA agéntica complejos entre 3 y 6 semanas. Empezamos con un MVP y lo iteramos según resultados." },
];

const useCases = [
  { icon: "support_agent", title: "Chatbots con IA", desc: "Atención al cliente 24/7 que resuelve el 80% de consultas sin intervención humana. Respuestas naturales basadas en tu base de conocimiento.", tag: "Atención" },
  { icon: "trending_up", title: "Embudos de Venta", desc: "Captura, califica y nutre leads automáticamente. Emails personalizados, seguimientos y scoring sin tocar un botón.", tag: "Ventas" },
  { icon: "description", title: "Generación de Contenido", desc: "Artículos SEO, posts para redes y newsletters generados con IA, revisados por humanos y publicados automáticamente.", tag: "Marketing" },
  { icon: "analytics", title: "Reportes Automáticos", desc: "Dashboards que se actualizan solos. Métricas de ventas, tráfico y rendimiento enviadas a tu email cada semana.", tag: "Analytics" },
  { icon: "integration_instructions", title: "Integraciones", desc: "Conectamos tu CRM, email, WhatsApp, facturación y más. Los datos fluyen entre herramientas sin intervención manual.", tag: "Operaciones" },
  { icon: "psychology", title: "Agentes de IA", desc: "Agentes autónomos que investigan, analizan y ejecutan tareas complejas: desde auditorías SEO hasta análisis de competencia.", tag: "IA Avanzada" },
];

const AutomatizacionIAPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Automatización con IA para Empresas | Chatbots, Embudos y Agentes | SEO Growthers</title>
        <meta name="description" content="Automatizá tu negocio con inteligencia artificial. Chatbots 24/7, embudos de venta automáticos, generación de contenido y agentes de IA. Reducí costos hasta un 60%. Consultá gratis." />
        <link rel="canonical" href="https://seogrowthers.com/services/automatizacion-ia" />
        <meta property="og:title" content="Automatización con IA para Empresas | SEO Growthers" />
        <meta property="og:description" content="Chatbots, embudos automáticos y agentes de IA para escalar tu negocio sin contratar. Reducí costos operativos hasta un 60%." />
        <meta property="og:url" content="https://seogrowthers.com/services/automatizacion-ia" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="automatizacion ia, chatbot inteligencia artificial, embudo de ventas automatico, agentes ia, automatizar negocio, rpa argentina" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Automatización con Inteligencia Artificial",
          "description": "Servicio de automatización empresarial con IA: chatbots, embudos de venta, generación de contenido y agentes autónomos.",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SEO Growthers",
            "url": "https://seogrowthers.com",
            "telephone": "+54 9 2995504783"
          },
          "areaServed": [
            { "@type": "Country", "name": "Argentina" },
            { "@type": "Country", "name": "España" }
          ],
          "serviceType": "Automatización con IA"
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
          <span className="font-label text-xs tracking-[0.2em] text-tertiary uppercase mb-4 block">Automatización · Inteligencia Artificial</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
            Automatización con <span className="bg-gradient-to-r from-tertiary via-secondary to-primary bg-clip-text text-transparent">Inteligencia Artificial</span>
          </h1>
          <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
            Delegá las tareas repetitivas a sistemas inteligentes. Chatbots que atienden, embudos que venden y agentes de IA que ejecutan. Tu negocio trabaja mientras dormís.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" onClick={() => trackCTAClick('ia_hero', '/contact')} className="px-8 py-4 bg-tertiary text-on-tertiary font-bold rounded-xl text-sm tracking-wider hover:shadow-lg transition-all">
              Consulta Gratuita
            </Link>
            <a href="#casos" className="px-8 py-4 border border-tertiary/30 text-tertiary font-bold rounded-xl text-sm tracking-wider hover:bg-tertiary/10 transition-all">
              Ver Casos de Uso
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "-60%", label: "Reducción de costos operativos" },
            { value: "24/7", label: "Atención sin pausa" },
            { value: "500+", label: "Consultas/día automatizadas" },
            { value: "3x", label: "Velocidad de ejecución" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <p className="font-headline text-3xl md:text-4xl font-bold text-tertiary mb-2">{stat.value}</p>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Use Cases */}
        <section className="mb-20" id="casos">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            ¿Qué podemos automatizar?
          </h2>
          <p className="text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
            Casos de uso reales que implementamos para empresas de todos los tamaños.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-tertiary/20 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className="material-symbols-outlined text-tertiary text-3xl group-hover:scale-110 transition-transform">{uc.icon}</span>
                  <span className="text-[10px] font-bold text-tertiary bg-tertiary/10 px-3 py-1 rounded-full uppercase tracking-wider">{uc.tag}</span>
                </div>
                <h3 className="font-headline font-bold text-on-surface mb-2 text-lg">{uc.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-12">
            Cómo implementamos la automatización
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Diagnóstico", desc: "Mapeamos tus procesos actuales e identificamos las tareas que se pueden automatizar con mayor impacto en tiempo y costos.", icon: "search" },
              { step: "02", title: "Desarrollo", desc: "Construimos la automatización con la tecnología ideal: chatbots, workflows, integraciones API o agentes de IA custom.", icon: "build" },
              { step: "03", title: "Despliegue y Optimización", desc: "Lanzamos, monitoreamos métricas en tiempo real y optimizamos continuamente. Tu equipo recibe capacitación completa.", icon: "rocket_launch" },
            ].map((p) => (
              <div key={p.step} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-2xl">{p.icon}</span>
                </div>
                <span className="font-headline text-sm font-bold text-tertiary/50 block mb-2">PASO {p.step}</span>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="contact" />

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Preguntas frecuentes sobre automatización con IA
          </h2>
          <p className="text-on-surface-variant text-center max-w-xl mx-auto mb-10">
            Resolvemos las dudas más comunes sobre implementar IA en tu empresa.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </section>

        <InternalLinkingCTA variant="seo" />
      </main>
    </div>
  );
};

export default AutomatizacionIAPage;
