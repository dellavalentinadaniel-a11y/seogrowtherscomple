
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';

// Placeholder components — noindex to prevent Google from indexing thin content
const PlaceholderPage = ({ title, type }) => {
  const params = useParams();
  const displayTitle = params.slug ? `${title}: ${params.slug}` : title;

  return (
    <>
      <Helmet>
        <title>{displayTitle} | SEO Growthers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{displayTitle}</h1>
          <p className="text-gray-400 text-xl mb-8">Estamos preparando algo increible para ti.</p>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 underline">Volver al inicio</Link>
        </div>
      </div>
    </>
  );
};

export const SuccessCasesPage = () => <PlaceholderPage title="Casos de Éxito" type="Success List" />;
export const SuccessCaseDetailPage = () => <PlaceholderPage title="Caso de Éxito" type="Success Detail" />;
export const TestimonialsPage = () => <PlaceholderPage title="Testimonios" type="Testimonials" />;
export const ServiceDetailPage = () => <PlaceholderPage title="Servicio" type="Service Detail" />;
export const ResourceDetailPage = () => <PlaceholderPage title="Recurso" type="Resource Detail" />;
export const ToolDetailPage = () => <PlaceholderPage title="Herramienta" type="Tool Detail" />;
