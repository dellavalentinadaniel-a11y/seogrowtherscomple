import React from 'react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

/**
 * Componente de Internal Linking reutilizable.
 * Inserta CTAs contextuales hacia páginas de servicio y conversión.
 * Uso: <InternalLinkingCTA variant="audit" /> o <InternalLinkingCTA variant="services" />
 */

const variants = {
  audit: {
    title: '¿Tu web no aparece en Google?',
    description: 'Descubrí los errores invisibles que frenan tu posicionamiento. Auditoría SEO gratuita en 48hs.',
    cta: 'Solicitar Auditoría Gratis',
    link: '/auditoria-seo-gratis',
    icon: 'search_insights',
    color: 'primary',
  },
  services: {
    title: '¿Necesitás más que contenido?',
    description: 'Desarrollo web, SEO técnico y automatización con IA para escalar tu negocio digital.',
    cta: 'Ver Servicios',
    link: '/services',
    icon: 'rocket_launch',
    color: 'secondary',
  },
  seo: {
    title: 'Posicioná tu negocio en Neuquén',
    description: 'SEO local + estrategia de contenido para dominar las búsquedas en tu zona.',
    cta: 'Conocer SEO Local',
    link: '/services/seo-neuquen',
    icon: 'location_on',
    color: 'primary',
  },
  contact: {
    title: '¿Listo para crecer?',
    description: 'Hablemos sobre tu proyecto. Respuesta en menos de 24 horas.',
    cta: 'Contactar Ahora',
    link: '/contact',
    icon: 'chat',
    color: 'tertiary',
  },
  webdev: {
    title: '¿Necesitás un sitio web profesional?',
    description: 'Landing pages, sitios corporativos y tiendas online optimizados para conversión.',
    cta: 'Ver Desarrollo Web',
    link: '/services/desarrollo-web-argentina',
    icon: 'code',
    color: 'primary',
  },
};

const InternalLinkingCTA = ({ variant = 'audit', className = '' }) => {
  const v = variants[variant] || variants.audit;

  return (
    <div className={`my-12 p-6 md:p-8 rounded-2xl border border-${v.color}/20 bg-${v.color}/5 relative overflow-hidden ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className={`p-3 rounded-xl bg-${v.color}/10 flex-shrink-0`}>
          <span className={`material-symbols-outlined text-${v.color} text-3xl`}>{v.icon}</span>
        </div>
        <div className="flex-grow">
          <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface mb-1">{v.title}</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">{v.description}</p>
        </div>
        <Link
          to={v.link}
          onClick={() => trackCTAClick(`internal_linking_${variant}`, v.link)}
          className={`inline-flex items-center gap-2 px-6 py-3 bg-${v.color} text-on-${v.color} font-bold rounded-xl text-sm tracking-wide hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap flex-shrink-0`}
        >
          {v.cta}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-${v.color}/5 rounded-full blur-3xl pointer-events-none`}></div>
    </div>
  );
};

/**
 * Bloque de links relacionados para insertar al final de artículos.
 */
export const RelatedServicesBlock = ({ currentPath = '' }) => {
  const links = [
    { title: 'SEO en Neuquén', desc: 'Posicionamiento local para tu negocio', to: '/services/seo-neuquen', icon: 'location_on' },
    { title: 'Desarrollo Web', desc: 'Sitios rápidos y optimizados', to: '/services/desarrollo-web-argentina', icon: 'code' },
    { title: 'Automatización con IA', desc: 'Escala sin contratar', to: '/services/automatizacion-ia', icon: 'smart_toy' },
    { title: 'Auditoría SEO Gratis', desc: 'Análisis completo en 48hs', to: '/auditoria-seo-gratis', icon: 'search_insights' },
  ].filter(l => l.to !== currentPath);

  return (
    <div className="my-16 border-t border-outline-variant/20 pt-10">
      <h3 className="font-headline text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">link</span>
        Servicios relacionados
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => trackCTAClick('related_service', link.to)}
            className="p-5 rounded-xl border border-outline-variant/20 hover:border-primary/30 bg-surface-container-low hover:bg-surface-container transition-all group"
          >
            <span className="material-symbols-outlined text-primary mb-2 block group-hover:scale-110 transition-transform">{link.icon}</span>
            <h4 className="font-headline font-bold text-on-surface text-sm mb-1">{link.title}</h4>
            <p className="text-on-surface-variant text-xs">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinkingCTA;
