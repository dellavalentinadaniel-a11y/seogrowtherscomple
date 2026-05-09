
import React from 'react';
import SEOHead from '@/components/shared/SEOHead';
import { useParams } from 'react-router-dom';

// Placeholder components to prevent route errors for requested pages
// These can be fleshed out later individually

const PlaceholderPage = ({ title, type }) => {
  const params = useParams();
  const displayTitle = params.slug ? `${title}: ${params.slug}` : title;
  
  return (
    <>
      <SEOHead title={displayTitle} description={`Página de ${displayTitle}`} />
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{displayTitle}</h1>
          <p className="text-gray-400 text-xl">Esta página está en construcción 🚧</p>
          <p className="text-gray-600 mt-4 text-sm font-mono">Route Type: {type}</p>
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
