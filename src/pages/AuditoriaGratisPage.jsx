import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { trackAuditRequest, trackWhatsAppClick } from '@/lib/analytics';

const benefits = [
  { icon: "search_insights", title: "Análisis SEO Técnico", desc: "Revisamos indexación, meta tags, canonical URLs, robots.txt y sitemap de tu sitio." },
  { icon: "speed", title: "Core Web Vitals", desc: "Medimos LCP, FID y CLS para saber si tu web cumple los estándares de Google." },
  { icon: "trending_up", title: "Oportunidades de Keywords", desc: "Identificamos palabras clave con potencial real de tráfico orgánico para tu nicho." },
  { icon: "bug_report", title: "Errores Críticos", desc: "Detectamos links rotos, contenido duplicado, páginas huérfanas y errores 404." },
  { icon: "devices", title: "Mobile-First", desc: "Verificamos la experiencia móvil, responsive design y usabilidad táctil." },
  { icon: "security", title: "Seguridad y HTTPS", desc: "Comprobamos certificados SSL, mixed content y headers de seguridad." },
];

const auditFaqs = [
  {
    question: "¿La auditoría SEO es realmente gratuita?",
    answer: "Sí, 100% gratuita y sin compromiso. Analizamos tu sitio web y te entregamos un reporte con los hallazgos principales y recomendaciones accionables. No pedimos tarjeta de crédito ni datos de pago."
  },
  {
    question: "¿Cuánto tiempo tarda en recibir mi auditoría?",
    answer: "Entregamos tu auditoría personalizada en un máximo de 48 horas hábiles después de recibir tu solicitud. Para sitios grandes (+500 páginas) puede tomar hasta 72 horas."
  },
  {
    question: "¿Qué necesito para solicitar la auditoría?",
    answer: "Solo necesitamos la URL de tu sitio web, tu email y opcionalmente tu nombre y empresa. Con eso es suficiente para realizar un análisis completo."
  },
  {
    question: "¿Qué incluye el reporte de auditoría?",
    answer: "El reporte incluye: puntuación SEO general, análisis de meta tags, velocidad de carga, mobile-friendliness, estructura de URLs, oportunidades de keywords, errores técnicos y un plan de acción priorizado con las mejoras más impactantes."
  },
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-outline/10 bg-surface-variant/10 backdrop-blur-md overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left group">
        <h3 className="font-headline text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors pr-4">{faq.question}</h3>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="px-5 text-on-surface-variant text-sm leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};

const AuditoriaGratisPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.website) {
      toast({ title: "Campos requeridos", description: "Por favor ingresá tu email y la URL de tu sitio web.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name || 'Auditoría SEO',
          email: formData.email,
          message: `[AUDITORÍA SEO GRATUITA]\nSitio web: ${formData.website}\n\n${formData.message || 'Sin mensaje adicional'}`,
        }]);

      if (error) throw error;

      setSubmitted(true);
      trackAuditRequest(formData.website);
      toast({ title: "¡Solicitud enviada!", description: "Recibirás tu auditoría en menos de 48 horas." });
    } catch (err) {
      toast({ title: "Error", description: "No pudimos enviar tu solicitud. Intentá de nuevo.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Auditoría SEO Gratuita para tu Sitio Web | SEO Growthers</title>
        <meta name="description" content="Solicitá tu auditoría SEO gratuita. Analizamos tu sitio web y te entregamos un reporte con errores técnicos, oportunidades de keywords y plan de acción. Sin compromiso." />
        <link rel="canonical" href="https://seogrowthers.com/auditoria-seo-gratis" />
        <meta property="og:title" content="Auditoría SEO Gratuita | SEO Growthers" />
        <meta property="og:description" content="Descubrí los errores que frenan tu posicionamiento en Google. Auditoría SEO profesional gratuita en 48 horas." />
        <meta property="og:url" content="https://seogrowthers.com/auditoria-seo-gratis" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auditoría SEO Gratuita | SEO Growthers" />
        <meta name="twitter:description" content="Analizamos tu web gratis: errores técnicos, velocidad, keywords y plan de acción." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Auditoría SEO Gratuita",
          "description": "Análisis SEO completo de tu sitio web: meta tags, velocidad, mobile-first, keywords y errores técnicos. Entrega en 48 horas.",
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
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Auditoría SEO preliminar gratuita sin compromiso"
          },
          "url": "https://seogrowthers.com/auditoria-seo-gratis"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": auditFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          }))
        })}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />
        {/* Hero */}
        <section className="mb-20 text-center">
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Sin compromiso · 100% gratis</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
            Auditoría SEO <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Gratuita</span>
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8">
            Descubrí los errores invisibles que están frenando tu posicionamiento en Google.
            Te entregamos un reporte profesional con acciones concretas en <strong className="text-on-surface">menos de 48 horas</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-on-surface-variant">
            <span className="flex items-center gap-2 bg-surface-variant/20 px-4 py-2 rounded-full border border-outline/10">
              <span className="material-symbols-outlined text-primary text-base">check_circle</span> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2 bg-surface-variant/20 px-4 py-2 rounded-full border border-outline/10">
              <span className="material-symbols-outlined text-primary text-base">check_circle</span> Reporte en 48hs
            </span>
            <span className="flex items-center gap-2 bg-surface-variant/20 px-4 py-2 rounded-full border border-outline/10">
              <span className="material-symbols-outlined text-primary text-base">check_circle</span> Plan de acción incluido
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-8">
              ¿Qué analizamos en tu sitio?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-surface-variant/10 border border-outline/10 hover:border-primary/20 transition-all group">
                  <span className="material-symbols-outlined text-primary text-2xl mb-3 block group-hover:scale-110 transition-transform">{item.icon}</span>
                  <h3 className="font-headline text-sm font-bold text-on-surface mb-1">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-8 p-6 rounded-2xl bg-primary-container/5 border border-primary-container/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-2">
                  {['D', 'M', 'A', 'L'].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-surface-variant border-2 border-background flex items-center justify-center text-xs font-bold text-on-surface-variant">
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-on-surface-variant">+50 auditorías realizadas</span>
              </div>
              <p className="text-sm text-on-surface-variant italic">
                "Nos ayudaron a identificar errores que llevábamos meses sin detectar. El tráfico orgánico creció un 180% en 4 meses."
              </p>
              <p className="text-xs text-primary mt-2 font-bold">— Cliente en Neuquén, Argentina</p>
            </div>
          </div>

          {/* Form */}
          <div className="sticky top-28">
            <div className="p-8 rounded-[2rem] bg-surface-container-low border border-outline/10 shadow-2xl">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Solicitá tu auditoría ahora</h2>
              <p className="text-sm text-on-surface-variant mb-6">Completá el formulario y recibí tu reporte en tu email.</p>

              {submitted ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-primary text-6xl mb-4 block">task_alt</span>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">¡Solicitud recibida!</h3>
                  <p className="text-on-surface-variant mb-6">Estamos analizando tu sitio. Recibirás el reporte en tu email en menos de 48 horas.</p>
                  <Link to="/blog" className="text-primary font-bold text-sm hover:text-secondary transition-colors inline-flex items-center gap-2">
                    Mientras tanto, explorá nuestro blog
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Nombre (opcional)</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Tu nombre o empresa"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">URL de tu sitio web *</label>
                    <input
                      type="url"
                      required
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-mono"
                      placeholder="https://tusitio.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">¿Qué te preocupa de tu SEO? (opcional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder="Ej: No aparezco en Google, la web es lenta, no sé qué keywords usar..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-sm rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Auditoría Gratis
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-on-surface-variant text-center">
                    Al enviar aceptás nuestra <Link to="/privacy-policy" className="text-primary hover:underline">política de privacidad</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface text-center mb-8">
            Preguntas sobre la auditoría
          </h2>
          <div className="space-y-3">
            {auditFaqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <p className="text-on-surface-variant text-lg mb-4">¿Preferís hablar directamente con un especialista?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20solicitar%20una%20auditor%C3%ADa%20SEO%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('auditoria_page')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-variant border border-outline/20 text-on-surface font-bold rounded-xl hover:bg-surface-variant/80 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              Formulario de contacto
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuditoriaGratisPage;
