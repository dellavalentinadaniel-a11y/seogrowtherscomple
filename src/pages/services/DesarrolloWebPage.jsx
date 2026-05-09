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
  { question: "¿Cuánto cuesta un sitio web profesional en Argentina?", answer: "Nuestras landing pages de alta conversión arrancan desde $800 USD. Sitios corporativos desde $1,500 USD y tiendas online (e-commerce) desde $2,500 USD. Todos incluyen diseño responsive, SEO on-page, hosting inicial y 30 días de soporte post-lanzamiento." },
  { question: "¿Cuánto tiempo tarda el desarrollo de un sitio web?", answer: "Una landing page toma entre 5 y 10 días hábiles. Un sitio corporativo entre 2 y 4 semanas. Tiendas online entre 4 y 8 semanas dependiendo del catálogo. Trabajamos con sprints semanales y te mostramos avances en cada etapa." },
  { question: "¿Mi sitio web va a estar optimizado para celulares?", answer: "Sí, todos nuestros desarrollos son mobile-first. Diseñamos primero para celulares y luego escalamos a tablet y desktop. Además, optimizamos Core Web Vitals para cumplir los estándares de Google y garantizar una experiencia rápida." },
  { question: "¿Incluyen SEO en el desarrollo web?", answer: "Sí. Cada sitio incluye SEO técnico de base: estructura de URLs, meta tags, schema markup, sitemap, robots.txt, compresión de imágenes en WebP y velocidad optimizada. Para un posicionamiento orgánico continuo, ofrecemos planes de SEO mensuales." },
  { question: "¿Puedo actualizar el contenido yo mismo?", answer: "Sí. Según el proyecto, implementamos paneles de administración con Supabase o CMS headless que te permiten editar textos, imágenes y publicar contenido sin necesidad de un programador. También ofrecemos capacitación incluida." },
  { question: "¿Qué tecnologías utilizan?", answer: "Trabajamos con React, Next.js, Vite, Tailwind CSS, Node.js y Supabase. Elegimos la stack según las necesidades de cada proyecto. Para e-commerce usamos Shopify o soluciones custom. Todo optimizado para rendimiento y SEO." },
];

const packages = [
  {
    name: "Landing Page",
    price: "800",
    desc: "Perfecta para campañas, lanzamientos y captura de leads.",
    features: ["Diseño responsive mobile-first", "Formulario de contacto", "SEO on-page básico", "Velocidad optimizada (WebP)", "1 revisión de diseño", "Hosting 3 meses incluido"],
    popular: false,
    icon: "web",
  },
  {
    name: "Sitio Corporativo",
    price: "1,500",
    desc: "Presencia digital profesional para empresas en crecimiento.",
    features: ["Hasta 8 secciones/páginas", "Blog integrado con CMS", "SEO técnico completo", "Schema markup estructurado", "Google Analytics configurado", "Panel de administración", "3 revisiones de diseño", "Soporte 30 días"],
    popular: true,
    icon: "domain",
  },
  {
    name: "Tienda Online",
    price: "2,500",
    desc: "E-commerce completo optimizado para vender desde el día 1.",
    features: ["Catálogo ilimitado", "Pasarela de pagos (MP, Stripe)", "Carrito y checkout optimizado", "Panel de gestión de pedidos", "SEO para productos", "Email de confirmación", "Integración con envíos", "Soporte 60 días"],
    popular: false,
    icon: "storefront",
  },
];

const DesarrolloWebPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Desarrollo Web en Argentina | Sitios Rápidos y Optimizados | SEO Growthers</title>
        <meta name="description" content="Desarrollo web profesional en Argentina. Landing pages, sitios corporativos y tiendas online con SEO incluido. Diseño responsive, velocidad optimizada y panel de administración. Desde $800 USD." />
        <link rel="canonical" href="https://seogrowthers.com/services/desarrollo-web-argentina" />
        <meta property="og:title" content="Desarrollo Web en Argentina | SEO Growthers" />
        <meta property="og:description" content="Sitios web profesionales con SEO incluido. Landing pages desde $800 USD. Diseño responsive y velocidad optimizada." />
        <meta property="og:url" content="https://seogrowthers.com/services/desarrollo-web-argentina" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="desarrollo web argentina, diseño web profesional, crear pagina web, tienda online argentina, landing page argentina" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Desarrollo Web Profesional",
          "description": "Servicio de desarrollo de sitios web, landing pages y tiendas online optimizados para conversión y SEO.",
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
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Planes de Desarrollo Web",
            "itemListElement": packages.map(p => ({
              "@type": "Offer",
              "name": p.name,
              "description": p.desc,
              "priceCurrency": "USD",
              "price": p.price.replace(",", "")
            }))
          }
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
          <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Desarrollo Web · Argentina</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Desarrollo Web</span> Profesional
          </h1>
          <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
            Creamos sitios web rápidos, seguros y optimizados para Google. Desde landing pages de alta conversión hasta tiendas online completas. Tecnología moderna con SEO incluido.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" onClick={() => trackCTAClick('webdev_hero', '/contact')} className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl text-sm tracking-wider hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
              Solicitar Presupuesto
            </Link>
            <a href="#planes" className="px-8 py-4 border border-primary/30 text-primary font-bold rounded-xl text-sm tracking-wider hover:bg-primary/10 transition-all">
              Ver Planes y Precios
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-12">
            Tecnología que impulsa resultados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "React", icon: "code" },
              { name: "Tailwind CSS", icon: "palette" },
              { name: "Node.js", icon: "dns" },
              { name: "Supabase", icon: "database" },
              { name: "Vite", icon: "bolt" },
              { name: "Vercel", icon: "cloud" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-center hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-primary text-2xl mb-2 block">{tech.icon}</span>
                <p className="text-on-surface text-sm font-bold">{tech.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-20" id="planes">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Planes de Desarrollo Web
          </h2>
          <p className="text-on-surface-variant text-center max-w-2xl mx-auto mb-12">
            Precios transparentes. Sin costos ocultos. Todos incluyen SEO técnico y diseño responsive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`p-8 rounded-2xl border flex flex-col relative ${pkg.popular ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'border-outline-variant/20 bg-surface-container-low'}`}>
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-on-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    Más elegido
                  </span>
                )}
                <span className="material-symbols-outlined text-primary text-3xl mb-4">{pkg.icon}</span>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{pkg.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{pkg.desc}</p>
                <p className="font-headline text-4xl font-bold text-primary mb-6">
                  <span className="text-lg text-on-surface-variant">USD</span> ${pkg.price}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  onClick={() => trackCTAClick(`webdev_plan_${pkg.name}`, '/contact')}
                  className={`w-full py-3 rounded-xl font-bold text-sm text-center tracking-wider transition-all ${pkg.popular ? 'bg-primary text-on-primary hover:shadow-lg' : 'border border-primary/30 text-primary hover:bg-primary/10'}`}
                >
                  Solicitar Presupuesto
                </Link>
              </div>
            ))}
          </div>
        </section>

        <InternalLinkingCTA variant="seo" />

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface text-center mb-4">
            Preguntas frecuentes sobre desarrollo web
          </h2>
          <p className="text-on-surface-variant text-center max-w-xl mx-auto mb-10">
            Todo lo que necesitás saber antes de arrancar tu proyecto web.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </section>

        <InternalLinkingCTA variant="audit" />
      </main>
    </div>
  );
};

export default DesarrolloWebPage;
