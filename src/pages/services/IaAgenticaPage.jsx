import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick } from '@/lib/analytics';

const faqs = [
  { q: '¿Qué diferencia hay entre un chatbot y un agente de IA?', a: 'Un chatbot sigue scripts predefinidos con respuestas fijas. Un agente de IA razona, entiende contexto, usa herramientas activamente (CRMs, APIs, bases de datos) y toma decisiones autónomas para resolver problemas complejos.' },
  { q: '¿Los agentes de IA son seguros?', a: 'Sí. Implementamos "guardrails" (barreras de seguridad) que limitan lo que el agente puede hacer. Para acciones críticas como pagos o envíos masivos, configuramos aprobación humana obligatoria (human-in-the-loop).' },
  { q: '¿Qué tipo de tareas puede resolver un agente?', a: 'Soporte al cliente nivel 2 (resolver reclamos, emitir compensaciones), research de mercado (análisis de competencia), coordinación de cadena de suministro, generación de reportes complejos y cualquier proceso multietapa.' },
  { q: '¿Necesito infraestructura especial?', a: 'No. Los agentes se integran con tus herramientas existentes vía APIs. Funcionan en la nube y no requieren servidores propios ni hardware especializado.' },
  { q: '¿Cuánto cuesta implementar un agente de IA?', a: 'Depende de la complejidad. Un agente de soporte básico puede implementarse desde $1,500 USD. Agentes complejos con múltiples integraciones y lógica de negocio avanzada se presupuestan según requerimientos.' },
];

const IaAgenticaPage = () => {
  const structuredData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Agentes de IA Autónomos",
    "provider": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "description": "Desarrollo de agentes de inteligencia artificial autónomos para empresas. Colaboradores digitales que razonan, usan herramientas y toman decisiones.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "AI Agent Development"
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Agentes de IA Autónomos | Inteligencia Artificial - SEO Growthers</title>
        <meta name="description" content="Desarrollo de agentes de IA autónomos para empresas. Colaboradores digitales que razonan, usan herramientas y resuelven problemas complejos de forma autónoma." />
        <link rel="canonical" href="https://seogrowthers.com/services/ia-agentica-agentes" />
        <meta property="og:title" content="Agentes de IA Autónomos | SEO Growthers" />
        <meta property="og:description" content="IA que razona y actúa: agentes autónomos para soporte, research, operaciones y más." />
        <meta property="og:url" content="https://seogrowthers.com/services/ia-agentica-agentes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Agentes+de+IA+Aut%C3%B3nomos&subtitle=IA+que+razona+y+act%C3%BAa&type=service" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        {/* Hero */}
        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Inteligencia Artificial</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Agentes de IA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Autonomía Real</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            No son scripts rígidos. Son colaboradores digitales que entienden el contexto, razonan y toman decisiones para cumplir tus objetivos.
          </p>
          <div className="grid sm:grid-cols-4 gap-4 mb-10">
            {[{ icon: 'psychology', l: 'Razonar' }, { icon: 'construction', l: 'Usar Herramientas' }, { icon: 'trending_up', l: 'Aprender' }, { icon: 'bolt', l: 'Autonomía' }].map((c, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-2 block">{c.icon}</span>
                <span className="font-bold text-on-surface text-sm">{c.l}</span>
              </div>
            ))}
          </div>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20un%20agente%20de%20IA" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('ia_agentica_page')}
            className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
            Desplegar mi primer agente <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </section>

        {/* Evolution */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">Del bot rígido al agente inteligente</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              La automatización tradicional sigue reglas fijas: <em>"Si pasa A, haz B"</em>. Los Agentes de IA no solo ejecutan tareas; entienden el contexto y deciden el mejor camino, tal como lo haría un experto.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                <h4 className="font-bold text-on-surface-variant text-xs uppercase mb-2">Bot Tradicional</h4>
                <p className="text-sm text-on-surface-variant italic">"No entiendo el comando. Reintentar."</p>
              </div>
              <div className="p-4 rounded-xl bg-primary-container/10 border border-primary/20">
                <h4 className="font-bold text-primary text-xs uppercase mb-2">Agente de IA</h4>
                <p className="text-sm text-on-surface font-medium">"El sistema está caído, intentaré contactar al soporte y avisar al cliente."</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 space-y-6">
            {[{ icon: 'visibility', title: 'Percepción', desc: 'Analiza el entorno y los datos' }, { icon: 'psychology', title: 'Razonamiento', desc: 'Evalúa alternativas lógicas' }, { icon: 'bolt', title: 'Acción', desc: 'Ejecuta la solución de forma autónoma' }].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">{s.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{s.title}</h4>
                  <p className="text-xs text-on-surface-variant">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-12">Aplicaciones prácticas</h2>
          <div className="space-y-8">
            {[
              { tag: 'Soporte Nivel 2', title: 'Resolución de problemas, no solo respuestas', desc: 'El agente recibe una queja, verifica el estado del envío, decide si corresponde compensación y emite un cupón de forma autónoma.', result: 'Soporte humano solo para casos críticos.' },
              { tag: 'Research Estratégico', title: 'Inteligencia de mercado en tiempo real', desc: 'Analizá precios de la competencia y ajustá ofertas. El agente navega, extrae datos y ejecuta cambios basados en tus parámetros de rentabilidad.', result: 'Navegación web autónoma + ajuste automático.' },
              { tag: 'Operaciones', title: 'Coordinación total multietapa', desc: 'Detecta falta de stock, contacta proveedores, pide presupuestos y presenta la mejor opción lista para firmar.', result: '98% de eficiencia operativa.' },
            ].map((app, i) => (
              <div key={i} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{app.tag}</span>
                  <h3 className="font-bold text-on-surface text-xl mb-3">{app.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{app.desc}</p>
                </div>
                <div className="p-4 rounded-xl bg-primary-container/10 border border-primary/10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  <span className="text-sm font-bold text-on-surface">{app.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="mb-20 p-8 md:p-12 rounded-3xl bg-primary-container/5 border border-primary/10">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-8">Tú pones los límites, el Agente hace el trabajo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-on-surface text-lg mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary">shield</span> Barreras de Seguridad</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Definimos "guardrails" estrictos: qué puede y qué no puede decidir el agente bajo ningún concepto.</p>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-lg mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary">visibility</span> Supervisión Humana</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Configurá el sistema para que pida aprobación manual antes de acciones críticas como pagos o envíos masivos.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (<FAQItem key={i} question={faq.q} answer={faq.a} />))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 md:p-20 rounded-3xl border border-primary-container/10 relative overflow-hidden mb-12" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">¿Cuál es el primer proceso complejo que querés delegar?</h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Hacemos una prueba piloto y observá la inteligencia en acción.</p>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20hablar%20con%20un%20especialista%20en%20IA" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('ia_agentica_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10">
            Hablar con un Especialista en IA <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}><p className="px-6 text-on-surface-variant leading-relaxed">{answer}</p></div>
    </div>
  );
};

export default IaAgenticaPage;
