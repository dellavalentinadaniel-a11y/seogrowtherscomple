
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbs, generateJsonLd } from '@/lib/seoHelpers';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/lib/utils';

const Breadcrumbs = ({ className }) => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  // Don't render on home page
  if (breadcrumbs.length <= 1) return null;

  const jsonLd = generateJsonLd('BreadcrumbList', { items: breadcrumbs });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className={cn("py-4 overflow-x-auto", className)}>
        <ol className="flex items-center space-x-2 text-sm text-gray-400 whitespace-nowrap">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-600" />}
                
                {isLast ? (
                  <span className="text-cyan-400 font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.url}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="h-3 w-3" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
