import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { motion } from 'framer-motion';

const values = [
  {
    icon: "insights",
    title: "Datos, no intuición",
    desc: "Cada decisión estratégica que tomamos está respaldada por métricas reales. No adivinamos: medimos, analizamos y optimizamos."
  },
  {
    icon: "handshake",
    title: "Socios, no proveedores",
    desc: "No somos una agencia que entrega reportes y desaparece. Nos involucramos en tu negocio como si fuera el nuestro."
  },
  {
    icon: "speed",
    title: "Velocidad de ejecución",
    desc: "En el mundo digital, la velocidad importa. Implementamos rápido, iteramos constantemente y entregamos resultados visibles desde el primer mes."
  },
  {
    icon: "psychology",
    title: "IA como ventaja competitiva",
    desc: "Integramos inteligencia artificial en cada servicio: desde automatización de procesos hasta generación de contenido y análisis predictivo."
  },
  {
    icon: "visibility",
    title: "Transparencia total",
    desc: "Acceso completo a métricas, dashboards en tiempo real y comunicación directa. Sabés exactamente qué estamos haciendo y por qué."
  },
  {
    icon: "rocket_launch",
    title: "Crecimiento sostenible",
    desc: "No buscamos picos temporales. Construimos fundaciones sólidas de SEO, contenido y autoridad que crecen mes a mes."
  }
];

const stats = [
  { number: "150%", label: "Aumento promedio de tráfico orgánico en 6 meses" },
  { number: "50+", label: "Auditorías SEO realizadas" },
  { number: "48h", label: "Tiempo de respuesta garantizado" },
  { number: "3x-10x", label: "ROI promedio en el primer año" },
];

const timeline = [
  { year: "2024", title: "Fundación", desc: "SEO Growthers nace en Neuquén, Argentina, con la misión de democratizar el marketing digital de calidad para PyMEs." },
  { year: "2025", title: "Expansión", desc: "Incorporamos automatización con IA y desarrollo web a nuestro portafolio. Primeros clientes en Buenos Aires y España." },
  { year: "2026", title: "Innovación", desc: "Lanzamiento de herramientas propias, plataforma de recursos y sistema de auditoría SEO automatizada con agentes de IA." },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Sobre Nosotros - Agencia SEO y Desarrollo Web | SEO Growthers</title>
        <meta name="description" content="Conocé al equipo de SEO Growthers: agencia de SEO, desarrollo web y automatización con IA en Neuquén, Argentina. Nuestra misión, valores y trayectoria." />
        <link rel="canonical" href="https://seogrowthers.com/about" />
        <meta property="og:title" content="Sobre Nosotros | SEO Growthers" />
        <meta property="og:description" content="Agencia de SEO, desarrollo web y automatización con IA. Conocé nuestra misión y valores." />
        <meta property="og:url" content="https://seogrowthers.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "SEO Growthers",
            "url": "https://seogrowthers.com",
            "description": "Agencia de marketing digital especializada en SEO, Desarrollo Web y Automatización con IA.",
            "foundingDate": "2024",
            "foundingLocation": {
              "@type": "Place",
              "address": { "@type": "PostalAddress", "addressLocality": "Neuquén", "addressCountry": "AR" }
            },
            "areaServed": [
              { "@type": "Country", "name": "Argentina" },
              { "@type": "Country", "name": "España" }
            ],
            "sameAs": [
              "https://x.com/SEOGrowthers",
              "https://www.linkedin.com/company/seogrowthers",
              "https://www.instagram.com/seogrowthers/",
              "https://www.youtube.com/@seogrowthers-s4r"
            ]
          }
        })}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <Breadcrumbs className="mb-4" />
        </div>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Nuestra Historia</span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface tracking-tight mb-6">
              Construimos el <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">futuro digital</span> de tu negocio
            </h1>
            <p className="max-w-3xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed">
              Somos una agencia de marketing digital nacida en Neuquén, Argentina. Combinamos
              estrategia SEO, desarrollo web de alto rendimiento y automatización con inteligencia
              artificial para ayudar a empresas a crecer de forma sostenible.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface-variant/10 border border-outline/10 text-center"
              >
                <span className="font-headline text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mb-2">
                  {stat.number}
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-4 block">Nuestra Misión</span>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface tracking-tight mb-6">
                Democratizar el crecimiento digital
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                Creemos que toda empresa, sin importar su tamaño, merece acceso a estrategias
                digitales de élite. No vendemos humo ni promesas vacías: trabajamos con datos,
                ejecutamos con velocidad y medimos cada resultado.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Nuestro enfoque combina lo mejor del SEO técnico, el desarrollo web moderno
                y la inteligencia artificial para crear ventajas competitivas reales y duraderas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/auditoria-seo-gratis"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
                >
                  Auditoría gratis
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-variant border border-outline/20 text-on-surface font-headline font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-surface-variant/80 transition-all"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl rounded-full opacity-30"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-primary-container/10 border border-primary-container/20">
                    <span className="material-symbols-outlined text-primary text-3xl mb-3 block">search</span>
                    <h3 className="font-headline text-sm font-bold text-on-surface">SEO Técnico</h3>
                  </div>
                  <div className="p-6 rounded-2xl bg-secondary-container/10 border border-secondary-container/20">
                    <span className="material-symbols-outlined text-secondary text-3xl mb-3 block">code</span>
                    <h3 className="font-headline text-sm font-bold text-on-surface">Desarrollo Web</h3>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="p-6 rounded-2xl bg-tertiary-container/10 border border-tertiary-container/20">
                    <span className="material-symbols-outlined text-tertiary text-3xl mb-3 block">smart_toy</span>
                    <h3 className="font-headline text-sm font-bold text-on-surface">IA & Automatización</h3>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface-variant/20 border border-outline/10">
                    <span className="material-symbols-outlined text-primary text-3xl mb-3 block">analytics</span>
                    <h3 className="font-headline text-sm font-bold text-on-surface">Analytics & Datos</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">Lo que nos define</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-surface-variant/10 border border-outline/10 hover:border-primary/20 transition-all group"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{value.icon}</span>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{value.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-4 block">Trayectoria</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
              Nuestra Historia
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-outline/20"></div>
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center relative z-10">
                    <span className="font-headline text-sm font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{item.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="rounded-[2.5rem] p-12 md:p-16 text-center bg-surface-variant/10 border border-outline/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-5xl mb-6 block">groups</span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4">
                ¿Listo para crecer?
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-8">
                Empezá con una auditoría SEO gratuita y descubrí todo el potencial de tu presencia digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auditoria-seo-gratis"
                  className="px-8 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-sm rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all inline-flex items-center justify-center gap-2"
                >
                  Auditoría Gratis
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <a
                  href="https://wa.me/5492995504783?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] text-white font-headline font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#20bd5a] transition-all inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
