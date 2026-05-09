import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const faqs = [
  { q: '¿Qué es RPA y cómo funciona?', a: 'RPA (Robotic Process Automation) es un software que emula las acciones de un humano en una computadora: hace clics, copia datos, abre emails y navega por sistemas como SAP, Excel o webs bancarias, pero 10 veces más rápido y sin errores.' },
  { q: '¿Hay que cambiar los sistemas que ya uso?', a: 'No. El bot RPA trabaja sobre tus programas actuales sin modificarlos. Es una capa adicional que interactúa con tus herramientas existentes, por lo que no hay migración ni cambio de software.' },
  { q: '¿Cuánto tiempo tarda la implementación?', a: 'Un proceso simple puede automatizarse en 1-2 semanas. Procesos complejos con múltiples sistemas pueden tomar 4-6 semanas. Incluye etapas de análisis, desarrollo, testing y puesta en producción.' },
  { q: '¿El bot puede trabajar las 24 horas?', a: 'Sí, un bot RPA trabaja 24/7/365 sin descanso, equivaliendo a 3 jornadas laborales humanas. No se cansa, no comete errores por fatiga y cada acción queda registrada para auditoría.' },
  { q: '¿Qué procesos se pueden automatizar con RPA?', a: 'Conciliación bancaria, carga de facturas, migración de datos entre sistemas, generación de reportes, procesamiento de documentos PDF vía OCR, envío masivo de emails y cualquier tarea repetitiva basada en reglas.' },
];

const RpaAutomatizacionPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Automatización RPA (Robotic Process Automation)",
    "provider": { "@type": "Organization", "name": "SEO Growthers", "url": "https://seogrowthers.com" },
    "description": "Automatización de procesos empresariales con RPA. Bots de software que eliminan tareas repetitivas, reducen errores y operan 24/7.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "serviceType": "Robotic Process Automation"
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Automatización RPA | Bots de Procesos - SEO Growthers</title>
        <meta name="description" content="Automatización RPA para empresas en Argentina. Bots que eliminan tareas repetitivas, reducen errores humanos y operan 24/7. Conciliación bancaria, facturas y más." />
        <link rel="canonical" href="https://seogrowthers.com/services/rpa-automatizacion" />
        <meta property="og:title" content="Automatización RPA | SEO Growthers" />
        <meta property="og:description" content="Bots RPA que automatizan procesos empresariales: conciliación bancaria, facturas, reportes. 24/7 sin errores." />
        <meta property="og:url" content="https://seogrowthers.com/services/rpa-automatizacion" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Automatizaci%C3%B3n+RPA&subtitle=Bots+24%2F7+sin+errores&type=service" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />

        <section className="mb-20">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Automatización</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6">
            Automatiza la Operación, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">Libera el Talento</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            Sustituí las tareas repetitivas por procesos autónomos que funcionan con precisión quirúrgica. Un empleado digital para tus procesos más críticos.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[{ n: '3x', l: 'Disponibilidad', d: '24hs = 3 jornadas laborales' }, { n: '10x', l: 'Velocidad', d: 'Horas reducidas a minutos' }, { n: '100%', l: 'Compliance', d: 'Cada acción auditada' }].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center">
                <span className="text-3xl font-bold text-primary block">{s.n}</span>
                <span className="font-bold text-on-surface block">{s.l}</span>
                <span className="text-on-surface-variant text-xs">{s.d}</span>
              </div>
            ))}
          </div>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20automatización%20RPA" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('rpa_page')}
            className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
            Solicitar Diagnóstico RPA <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </section>

        {/* Problema */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">¿Cuánto le cuesta a tu empresa el error humano?</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Un empleado administrativo dedica hasta el <strong className="text-on-surface">40% de su jornada</strong> a tareas que no aportan valor estratégico: carga de facturas, conciliación de cuentas, copy-paste entre sistemas.
            </p>
            <p className="p-4 rounded-xl bg-surface-container-low border-l-4 border-primary text-on-surface-variant italic text-sm">
              "La fatiga administrativa genera costos operativos ocultos que drenan la rentabilidad de tu negocio."
            </p>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Pérdida de Valor Mensual</h4>
            <div><div className="flex justify-between text-sm mb-1"><span className="text-on-surface-variant">Tareas Estratégicas</span><span className="text-green-400 font-bold">60%</span></div><div className="h-3 bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-green-400/60 rounded-full" style={{width:'60%'}}></div></div></div>
            <div><div className="flex justify-between text-sm mb-1"><span className="text-on-surface-variant">Carga Manual / Copy-Paste</span><span className="text-primary font-bold">40%</span></div><div className="h-3 bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-primary/60 rounded-full" style={{width:'40%'}}></div></div></div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-4">Impacto: -16 horas semanales por empleado</p>
          </div>
        </section>

        {/* Soluciones */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-12">Soluciones RPA que implementamos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { tag: 'Finanzas', title: 'Cierre de caja en minutos, no en días', desc: 'El bot ingresa a tus homebankings, descarga extractos y los cruza con tu sistema contable de forma autónoma.', points: ['Identificación inmediata de discrepancias', 'Cruce automático de múltiples bancos', 'Reportes financieros listos a primera hora'] },
              { tag: 'Operaciones', title: 'Digitalización del ciclo de compras', desc: 'Extraemos datos de facturas PDF vía OCR y los cargamos automáticamente en tu ERP.', points: ['Eliminación total del copy-paste', 'Migración masiva de datos entre plataformas', 'Procesamiento de miles de documentos en segundos'] },
            ].map((s, i) => (
              <div key={i} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">{s.tag}</span>
                <h3 className="font-bold text-on-surface text-xl mb-3">{s.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{s.desc}</p>
                <div className="space-y-3">
                  {s.points.map((p, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-bold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-12 text-center">De la tarea manual a la autonomía digital</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Identificación (PDI)', desc: 'Elegimos la tarea más pesada y repetitiva para maximizar el impacto inicial.' },
              { step: '02', title: 'Desarrollo', desc: 'Programación de reglas, excepciones y lógicas de decisión del empleado digital.' },
              { step: '03', title: 'Go-Live', desc: 'El bot empieza a operar con supervisión inicial hasta alcanzar autonomía total.' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container font-bold mb-4">{s.step}</div>
                <h3 className="font-bold text-on-surface text-lg mb-2">{s.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
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
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">¿Cuál es tu proceso más lento hoy?</h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Permitì que tu equipo se enfoque en lo estratégico mientras nuestros bots hacen el trabajo pesado.</p>
          <a href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20un%20diagnóstico%20RPA" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('rpa_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10">
            Solicitar Diagnóstico RPA <span className="material-symbols-outlined text-sm">arrow_forward</span>
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

export default RpaAutomatizacionPage;
