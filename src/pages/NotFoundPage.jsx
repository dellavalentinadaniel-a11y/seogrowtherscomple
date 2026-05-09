import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const popularLinks = [
  { name: 'Servicios', url: '/services', icon: 'design_services' },
  { name: 'SEO en Neuquén', url: '/services/seo-neuquen', icon: 'search' },
  { name: 'Desarrollo Web', url: '/services/desarrollo-web-argentina', icon: 'code' },
  { name: 'Automatización con IA', url: '/services/automatizacion-ia', icon: 'smart_toy' },
  { name: 'Blog', url: '/blog', icon: 'article' },
  { name: 'Auditoría SEO Gratis', url: '/auditoria-seo-gratis', icon: 'query_stats' },
];

const NotFoundPage = () => {
  return (
    <div className="text-on-surface font-body min-h-screen">
      <Helmet>
        <title>Página No Encontrada (404) | SEO Growthers</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="La página que buscás no existe. Explorá nuestros servicios de SEO, desarrollo web y automatización con IA." />
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <span className="text-[120px] sm:text-[180px] font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container leading-none">
              404
            </span>
            <div className="absolute -inset-8 bg-primary-container/5 blur-[80px] rounded-full pointer-events-none"></div>
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-4">
            Esta página no existe
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            El enlace que seguiste puede estar roto o la página fue movida.
            No te preocupes, te ayudamos a encontrar lo que buscás.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              to="/"
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Ir al Inicio
            </Link>
            <Link
              to="/contact"
              className="border border-outline-variant/20 text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:border-primary/30 transition-all"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              Contactanos
            </Link>
          </div>
        </div>

        {/* Popular Links */}
        <section>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-6 text-center">
            Páginas populares
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {popularLinks.map((link, i) => (
              <Link
                key={i}
                to={link.url}
                className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center gap-4 group hover:border-primary/20 transition-all"
              >
                <div className="w-10 h-10 bg-primary-container/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-xl">{link.icon}</span>
                </div>
                <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{link.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center p-10 rounded-3xl border border-primary-container/10 relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156,240,255,0.03))' }}>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-3 relative z-10">
            ¿Necesitás ayuda con tu proyecto?
          </h2>
          <p className="text-on-surface-variant mb-6 relative z-10">
            Hacé tu auditoría SEO gratuita y descubrí cómo mejorar tu sitio web.
          </p>
          <Link
            to="/auditoria-seo-gratis"
            className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-sm tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all relative z-10"
          >
            Auditoría SEO Gratis <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>
      </main>
    </div>
  );
};

export default NotFoundPage;
