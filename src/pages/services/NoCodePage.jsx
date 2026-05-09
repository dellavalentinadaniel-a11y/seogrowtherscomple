import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick } from '@/lib/analytics';

const faqs = [
  { q: '¿Qué plataformas no-code usan?', a: 'Trabajamos principalmente con Make (ex Integromat), Zapier y n8n para automatizaciones. Para bases de datos usamos Airtable y Google Sheets. La elección depende de la complejidad y presupuesto del proyecto.' },
  { q: '¿Cuánto tarda en funcionar una integración?', a: 'Flujos simples (ej: formulario → CRM → email) pueden estar listos en 48-72 horas. Integraciones complejas con múltiples sistemas toman 1-2 semanas.' },
  { q: '¿Qué pasa si cambio de herramienta?', a: 'Las integraciones no-code son evolutivas: si cambiás de CRM o de proveedor de email, ajustamos el flujo en minutos sin reescribir código.' },
  { q: '¿Necesito conocimientos técnicos?', a: 'No. Nosotros diseñamos, implementamos y mantenemos los flujos. Vos solo definís las reglas de negocio y nosotros las traducimos a automatizaciones funcionales.' },
  { q: '¿Es más barato que desarrollo a medida?', a: 'Sí, significativamente. Las integraciones no-code cuestan una fracción del desarrollo custom y se implementan en días en lugar de meses. Son ideales para validar procesos antes de invertir en software a medida.' },
];

const useCases = [
  { tag: 'Ventas', title: 'De la consulta a la acción en 1 segundo', desc: 'Cuando un cliente llena un formulario, el sistema reacciona instantáneamente en múltiples canales.', points: ['Se crea una fila en Google Sheets/CRM', 'Alerta automática en canal de Slack', 'Email de bienvenida instantáneo desde Gmail'] },
  { tag: 'Operaciones', title: 'Control total sin revisar tableros', desc: 'Olvidate de revisar fechas de vencimiento manualmente. El sistema avisa cuando es necesario actuar.', points: ['Detección de vencimientos en Airtable/Monday', 'Recordatorio por Slack al responsable', 'Agendamiento automático en Google Calendar'] },
];

const NoCodePage = () => {
  const structuredData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Integraciones No-Code",
    "provider": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "description": "Integraciones no-code para empresas. Conectamos tus aplicaciones con Make, Zapier y Airtable para automatizar flujos de trabajo sin programar.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "No-Code Integration"
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Integraciones No-Code | Automatización sin Código - SEO Growthers</title>
        <meta name="description" content="Integraciones no-code para empresas: conectamos tus apps con Make, Zapier y Airtable. Automatización de flujos de trabajo en 48-72 horas sin programar." />
        <link rel="canonical" href="https://seogrowthers.com/services/integraciones-no-code" />
        <meta property="og:title" content="Integraciones No-Code | SEO Growthers" />
        <meta property="og:description" content="Conectamos tus aplicaciones para que la información fluya sin intervención manual. Make, Zapier, Airtable." />
        <meta property="og:url" content="https://seogrowthers.com/services/integraciones-no-code" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Integraciones+No-Code&subtitle=Make%2C+Zapier%2C+Airtable&type=service" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Automatización</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Hacé que tus apps <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">hablen entre sí</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            Conectamos tus herramientas favoritas para que la información fluya sin intervención manual. Sin código, sin esperas, sin fricción.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {['Make.com', 'Zapier', 'Airtable', 'Google Sheets', 'Slack', 'Gmail'].map(t => (
              <span key={t} className="px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/10 text-sm font-bold text-on-surface">{t}</span>
            ))}
          </div>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20necesito%20integraciones%20no-code" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('nocode_page')}
            className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
            Conectar mis aplicaciones <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </section>

        {/* Problem */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">¿Pasás el día saltando de una pestaña a otra?</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Usamos Google Sheets para el control, Gmail para comunicarnos y Slack para el equipo. El problema es que <strong className="text-on-surface">estas herramientas no se hablan.</strong>
            </p>
            <p className="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary text-on-surface-variant italic text-sm">
              "Perdemos horas copiando datos manualmente de un lugar a otro, y en ese camino, la información se pierde o llega tarde."
            </p>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 relative">
              {['table_chart', 'mail', 'forum', 'calendar_month'].map((icon, i) => (
                <div key={i} className="w-24 h-24 bg-surface-container-highest rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl">{icon}</span>
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center border-4 border-surface-container-low">
                  <span className="material-symbols-outlined text-error text-2xl">sync_problem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-12">Casos de uso reales</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((uc, i) => (
              <div key={i} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">{uc.tag}</span>
                <h3 className="font-bold text-on-surface text-xl mb-3">{uc.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{uc.desc}</p>
                <div className="space-y-3">
                  {uc.points.map((p, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-bold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-12">Beneficios del No-Code</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: 'savings', title: 'Costo-Efectivo', desc: 'Mucho más accesible que desarrollar software a medida desde cero.' },
              { icon: 'bolt', title: 'Velocidad', desc: 'Flujo de trabajo funcionando en 48-72 horas.' },
              { icon: 'sync', title: 'Evolutivo', desc: 'Si cambiás de herramienta, el puente se ajusta en minutos.' },
            ].map((b, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center group hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 block group-hover:scale-110 transition-transform">{b.icon}</span>
                <h3 className="font-bold text-on-surface text-lg mb-2">{b.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After */}
        <section className="mb-20 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Antes</h4>
            <p className="text-on-surface-variant italic text-lg">"Recibí un mail, avisame por WhatsApp, cargalo cuando puedas al Excel".</p>
          </div>
          <div className="p-8 rounded-2xl bg-primary-container/10 border border-primary/20">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Después</h4>
            <p className="text-on-surface font-bold text-lg">"El sistema lo detecta, lo carga, lo avisa y lo archiva solo".</p>
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
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">Implementación en tiempo récord</h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Dejá de ser el puente manual entre tus aplicaciones. Hacelas trabajar para vos.</p>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20un%20flujo%20automatizado" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('nocode_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10">
            Solicitar Mi Flujo Automatizado <span className="material-symbols-outlined text-sm">arrow_forward</span>
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

export default NoCodePage;
