import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import { trackWhatsAppClick, trackCTAClick } from '@/lib/analytics';

const features = [
  { icon: 'smartphone', title: 'Diseño responsive', desc: 'El sitio web se adapta a todos los tamaños de pantallas.' },
  { icon: 'view_quilt', title: 'Fácil navegación', desc: 'Navegación clara y bien organizada para el usuario.' },
  { icon: 'bolt', title: 'Carga rápida', desc: 'Optimizamos el tiempo de carga para máximo rendimiento.' },
  { icon: 'search', title: 'Posicionamiento SEO', desc: 'Contenido relevante con palabras clave para posicionar.' },
  { icon: 'lock', title: 'Sitio seguro (SSL)', desc: 'Proporcionamos seguridad entre tu web y el visitante.' },
  { icon: 'mail', title: 'Correos corporativos', desc: 'Configuramos correos personalizados con tu dominio.' },
  { icon: 'share', title: 'Redes sociales', desc: 'Aplicamos tus perfiles sociales para aumentar tu alcance.' },
  { icon: 'chat', title: 'WhatsApp flotante', desc: 'Botón de WhatsApp para que los clientes se comuniquen.' },
];

const services = [
  { icon: 'language', title: 'Dominio', desc: 'Registramos el dominio que identifica a tu sitio en Internet.' },
  { icon: 'dns', title: 'Hosting', desc: 'Alojamos tu web en un hosting seguro y de alta calidad.' },
  { icon: 'support_agent', title: 'Soporte', desc: 'Brindamos ayuda rápida y efectiva cuando lo necesites.' },
  { icon: 'sync', title: 'Actualizaciones', desc: 'Mantenemos tu página web actualizada con las últimas mejoras.' },
  { icon: 'monitoring', title: 'Monitoreo', desc: 'Monitoreamos la disponibilidad y el rendimiento del sitio.' },
  { icon: 'build', title: 'Mantenimiento', desc: 'Realizamos el mantenimiento regular de tu web.' },
  { icon: 'shield', title: 'Anti-Spam/Antivirus', desc: 'Configuramos protección anti-spam y antivirus.' },
  { icon: 'backup', title: 'Backups', desc: 'Realizamos copias de seguridad regulares de tu sitio.' },
];

const faqs = [
  { q: '¿Qué incluye el diseño de landing page?', a: 'Incluye diseño de 1 página completa, dominio y hosting por 1 año, certificado SSL, 1 correo corporativo, diseño responsive, optimización SEO básica y botón de WhatsApp flotante.' },
  { q: '¿Cuánto tiempo tarda en estar lista mi landing page?', a: 'El tiempo promedio de entrega es de 7 a 14 días hábiles, dependiendo de la complejidad del contenido y las revisiones necesarias.' },
  { q: '¿Puedo modificar mi landing page después?', a: 'Sí, ofrecemos soporte post-lanzamiento y podés solicitar modificaciones. También incluimos un panel de gestión para cambios básicos de contenido.' },
  { q: '¿La landing page es autoadministrable?', a: 'Dependiendo del plan, podemos integrar un CMS liviano para que gestiones textos e imágenes sin necesidad de conocimientos técnicos.' },
  { q: '¿Sirve una landing page para campañas de Google Ads?', a: 'Absolutamente. Las landing pages están diseñadas específicamente para maximizar las conversiones de tus campañas publicitarias, con estructura optimizada para Quality Score.' },
];

const LandingPagesPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño de Landing Pages",
    "provider": {
      "@type": "Organization",
      "name": "SEO Growthers",
      "url": "https://seogrowthers.com"
    },
    "description": "Diseño profesional de landing pages de alta conversión. Páginas optimizadas para campañas publicitarias y captura de leads.",
    "areaServed": { "@type": "Country", "name": "Argentina" },
    "offers": {
      "@type": "Offer",
      "price": "800",
      "priceCurrency": "USD",
      "description": "Landing page de alta conversión con dominio, hosting y SSL incluido"
    },
    "serviceType": "Landing Page Design"
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
        <title>Diseño de Landing Pages | Alta Conversión - SEO Growthers</title>
        <meta name="description" content="Diseño profesional de landing pages de alta conversión en Argentina. Optimizadas para campañas de Google Ads, captura de leads y ventas. Desde $800 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:title" content="Diseño de Landing Pages | SEO Growthers" />
        <meta property="og:description" content="Landing pages optimizadas para convertir visitantes en clientes. Diseño responsive, SEO y carga rápida." />
        <meta property="og:url" content="https://seogrowthers.com/services/landing-pages" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Landing+Pages&subtitle=Desde+%24800+USD+alta+conversi%C3%B3n&type=service" />
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
            Diseño web <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container">landing page</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed mb-10">
            Hacemos el diseño web de tu landing page para destacar y convertir visitantes en clientes. Optimizadas para campañas publicitarias y captura de leads.
          </p>

          <div className="space-y-4 mb-10">
            {["Diseño de 1 página de alta conversión", "Dominio y hosting por 1 año", "Certificado SSL incluido", "1 Correo corporativo"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-base font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <span className="text-on-surface-variant block mb-1 text-sm">Inversión desde:</span>
            <span className="text-4xl font-bold text-on-surface">$800 <span className="text-lg text-on-surface-variant">USD</span></span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5492995504783?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20landing%20page"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { trackWhatsAppClick('landing_pages_page'); trackCTAClick('landing_pages_hero_cta'); }}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Solicitar Presupuesto
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link
              to="/auditoria-seo-gratis"
              className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-all"
            >
              Auditoría SEO Gratis
            </Link>
          </div>
        </section>

        {/* About */}
        <section className="mb-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">Sobre el diseño web landing page</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Una landing page bien diseñada es la clave para captar la atención de tu audiencia objetivo y guiarlos hacia la acción que deseas que realicen.
            </p>
            <div className="space-y-6">
              {[
                { title: "Diseño atractivo y responsivo", desc: "Creamos landing pages visualmente impactantes y completamente adaptables a diferentes dispositivos para garantizar una experiencia óptima." },
                { title: "Contenido persuasivo", desc: "Desarrollamos contenido que destaque tus fortalezas con cada elemento estratégicamente ubicado para guiar a los usuarios hacia la conversión." },
                { title: "Optimización para conversiones", desc: "Implementamos técnicas de CRO: formularios efectivos, llamadas a la acción irresistibles y A/B testing para maximizar resultados." },
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
              <span className="material-symbols-outlined text-primary text-8xl">web</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">Características potentes</h2>
          <p className="text-on-surface-variant mb-12">Todos los beneficios incluidos en el diseño de tu landing page.</p>
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

        {/* Complete Service */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">Servicio completo</h2>
          <p className="text-on-surface-variant mb-12">No solo es diseño y características, te damos un servicio web completo.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, i) => (
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
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4 relative z-10">Obtené tu landing page</h2>
          <p className="text-on-surface-variant text-lg mb-8 relative z-10">Creamos tu página web personalizada, sin plantillas.</p>
          <a
            href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20cotizar%20una%20landing%20page"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('landing_pages_cta')}
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Contactanos <span className="material-symbols-outlined text-sm">arrow_forward</span>
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

export default LandingPagesPage;
