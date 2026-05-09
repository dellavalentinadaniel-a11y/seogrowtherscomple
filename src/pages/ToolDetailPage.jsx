import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import NewsletterForm from '@/components/shared/NewsletterForm';

const PRICE_LABELS = {
  free: 'Gratis',
  freemium: 'Freemium',
  paid: 'De pago',
};

const StarRating = ({ rating }) => {
  const stars = Math.round(rating || 0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-600'}`}>
          star
        </span>
      ))}
      {rating && <span className="text-sm text-gray-400 ml-1">{Number(rating).toFixed(1)}</span>}
    </div>
  );
};

const ToolDetailPage = () => {
  const { slug } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTool();
  }, [slug]);

  const fetchTool = async () => {
    setLoading(true);
    setNotFound(false);

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    let data = null;

    if (isUuid) {
      const { data: byId } = await supabase
        .from('tools')
        .select('*')
        .eq('id', slug)
        .single();
      data = byId;
    }

    if (!data) {
      const { data: byLink } = await supabase
        .from('tools')
        .select('*')
        .ilike('link', `%${slug}`)
        .limit(1);
      if (byLink && byLink.length > 0) data = byLink[0];
    }

    if (!data) {
      // Try by name slug match
      const { data: all } = await supabase.from('tools').select('*');
      if (all) {
        const normalized = slug.toLowerCase().replace(/-/g, ' ');
        data = all.find(t => t.name?.toLowerCase() === normalized) || null;
      }
    }

    if (data) {
      setTool(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <SkeletonLoader className="h-8 w-48 mb-8 rounded" />
        <SkeletonLoader className="h-12 w-3/4 mb-4 rounded" />
        <SkeletonLoader className="h-6 w-full mb-2 rounded" />
        <SkeletonLoader className="h-6 w-5/6 mb-8 rounded" />
        <SkeletonLoader className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <Helmet>
          <title>Herramienta no encontrada | SEO Growthers</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <span className="material-symbols-outlined text-6xl text-gray-600 mb-6">search_off</span>
        <h1 className="text-3xl font-bold text-white mb-4">Herramienta no encontrada</h1>
        <p className="text-gray-400 mb-8">La herramienta que buscas no existe o fue eliminada.</p>
        <Link to="/tools" className="bg-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-colors">
          Ver todas las herramientas
        </Link>
      </div>
    );
  }

  const canonicalUrl = `https://seogrowthers.com/tools/${slug}`;
  const description = tool.short_description || tool.description;
  const features = Array.isArray(tool.features) ? tool.features : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description,
    image: tool.image || tool.logo,
    url: tool.link,
    applicationCategory: tool.category || 'WebApplication',
    offers: tool.price
      ? {
          '@type': 'Offer',
          price: tool.price === 'free' ? '0' : undefined,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    aggregateRating:
      tool.rating && tool.reviews_count
        ? {
            '@type': 'AggregateRating',
            ratingValue: tool.rating,
            reviewCount: tool.reviews_count,
            bestRating: 5,
          }
        : undefined,
  };

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>{tool.name} | Herramientas SEO | SEO Growthers</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${tool.name} | SEO Growthers`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        {(tool.image || tool.logo) && <meta property="og:image" content={tool.image || tool.logo} />}
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content={`${tool.name} | SEO Growthers`} />
        <meta name="twitter:description" content={description} />
        {(tool.image || tool.logo) && <meta name="twitter:image" content={tool.image || tool.logo} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          {(tool.logo || tool.image) && (
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0 border border-white/10">
              <img
                src={tool.logo || tool.image}
                alt={`Logo ${tool.name}`}
                className="w-full h-full object-contain p-2"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {tool.category && (
                <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  {tool.category}
                </span>
              )}
              {tool.price && (
                <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
                  {PRICE_LABELS[tool.price] || tool.price}
                </span>
              )}
              {tool.featured && (
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">star</span>
                  Destacada
                </span>
              )}
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              {tool.name}
            </h1>
            {tool.rating && (
              <div className="flex items-center gap-3">
                <StarRating rating={tool.rating} />
                {tool.reviews_count && (
                  <span className="text-xs text-gray-500">{tool.reviews_count.toLocaleString()} reseñas</span>
                )}
                {tool.users_count && (
                  <span className="text-xs text-gray-500">· {tool.users_count.toLocaleString()} usuarios</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-2xl">
          {tool.description}
        </p>

        {/* Cover image */}
        {tool.image && tool.image !== tool.logo && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
            <img src={tool.image} alt={tool.name} className="w-full object-cover max-h-80" />
          </div>
        )}

        {/* CTA card */}
        <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-white/5 shadow-xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-headline text-xl font-bold text-white mb-1">Acceder a {tool.name}</h2>
            <p className="text-sm text-gray-400">
              {tool.price === 'free' ? 'Herramienta 100% gratuita' : tool.price === 'freemium' ? 'Plan gratuito disponible' : 'Herramienta de pago'}
            </p>
          </div>
          {tool.link && (
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/80 transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Ir a la herramienta
            </a>
          )}
        </div>

        {/* Features */}
        {features.length > 0 && (
          <section className="mb-12">
            <h2 className="font-headline text-2xl font-bold text-white mb-6">Características principales</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 bg-surface-container-low rounded-xl p-4 border border-white/5">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">check_circle</span>
                  <span className="text-on-surface-variant text-sm leading-relaxed">{typeof feature === 'string' ? feature : feature.name || JSON.stringify(feature)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back link */}
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-bold tracking-wider mb-16"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          VOLVER A HERRAMIENTAS
        </Link>

        {/* Newsletter */}
        <NewsletterForm variant="banner" source="tool_detail" className="mt-8" />
      </main>
    </div>
  );
};

export default ToolDetailPage;
