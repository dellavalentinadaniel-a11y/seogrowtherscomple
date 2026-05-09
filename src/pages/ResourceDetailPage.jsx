import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import NewsletterForm from '@/components/shared/NewsletterForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CATEGORY_ICONS = {
  guia: 'menu_book',
  ebook: 'menu_book',
  plantilla: 'token',
  asset: 'token',
  herramienta: 'build',
  tecnico: 'code',
  video: 'play_circle',
  webinar: 'play_circle',
};

const getCategoryIcon = (category = '') => {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(k)) return v;
  }
  return 'description';
};

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchResource();
  }, [slug]);

  const fetchResource = async () => {
    setLoading(true);
    setNotFound(false);

    // Try by UUID id first
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    let data = null;
    let error = null;

    if (isUuid) {
      ({ data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', slug)
        .single());
    }

    // Fallback: match by link field ending in slug
    if (!data) {
      const { data: byLink, error: linkError } = await supabase
        .from('resources')
        .select('*')
        .ilike('link', `%${slug}`)
        .limit(1);
      if (!linkError && byLink && byLink.length > 0) {
        data = byLink[0];
      }
    }

    if (data) {
      setResource(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const incrementDownloads = async () => {
    if (!resource?.id) return;
    await supabase
      .from('resources')
      .update({ downloads: (resource.downloads || 0) + 1 })
      .eq('id', resource.id);
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
          <title>Recurso no encontrado | SEO Growthers</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <span className="material-symbols-outlined text-6xl text-gray-600 mb-6">search_off</span>
        <h1 className="text-3xl font-bold text-white mb-4">Recurso no encontrado</h1>
        <p className="text-gray-400 mb-8">El recurso que buscas no existe o fue eliminado.</p>
        <Link to="/resources" className="bg-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-primary/80 transition-colors">
          Ver todos los recursos
        </Link>
      </div>
    );
  }

  const canonicalUrl = `https://seogrowthers.com/resources/${slug}`;
  const publishedDate = resource.published_at || resource.created_at;
  const icon = getCategoryIcon(resource.category);
  const isDownloadable = resource.file_type === 'zip' || resource.file_type === 'pdf';
  const externalLink = resource.link && !resource.link.startsWith('/') ? resource.link : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    image: resource.image ? [resource.image] : [],
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: resource.author || 'SEO Growthers',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO Growthers',
      logo: { '@type': 'ImageObject', url: 'https://seogrowthers.com/logo.webp' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>{resource.title} | SEO Growthers</title>
        <meta name="description" content={resource.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={resource.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {resource.image && <meta property="og:image" content={resource.image} />}
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={resource.description} />
        {resource.image && <meta name="twitter:image" content={resource.image} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Breadcrumbs className="mb-6" />

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          </div>
          {resource.category && (
            <span className="text-xs font-bold tracking-widest text-primary uppercase">{resource.category}</span>
          )}
          {publishedDate && (
            <span className="text-xs text-gray-500 ml-auto">
              {format(new Date(publishedDate), "d 'de' MMMM, yyyy", { locale: es })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {resource.title}
        </h1>

        {/* Description */}
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-2xl">
          {resource.description}
        </p>

        {/* Cover image */}
        {resource.image && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full object-cover max-h-80"
            />
          </div>
        )}

        {/* Action card */}
        <div className="bg-[#1a1c1e] rounded-2xl p-8 border border-white/5 shadow-xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-headline text-xl font-bold text-white mb-2">
              {isDownloadable ? 'Descargar recurso' : externalLink ? 'Acceder al recurso' : 'Recurso digital'}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {resource.file_size && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">folder</span>
                  {resource.file_size}
                </span>
              )}
              {resource.file_type && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">description</span>
                  {resource.file_type.toUpperCase()}
                </span>
              )}
              {resource.downloads != null && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">download</span>
                  {resource.downloads.toLocaleString()} descargas
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={incrementDownloads}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/80 transition-all"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Abrir
              </a>
            )}
            {isDownloadable && resource.link && (
              <a
                href={resource.link}
                download
                onClick={incrementDownloads}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/80 transition-all"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Descargar
              </a>
            )}
            {!externalLink && !isDownloadable && (
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Ver más recursos
              </Link>
            )}
          </div>
        </div>

        {/* Author */}
        {resource.author && (
          <div className="flex items-center gap-3 mb-12 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Publicado por</p>
              <p className="text-white font-medium">{resource.author}</p>
            </div>
          </div>
        )}

        {/* Back link */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-bold tracking-wider mb-16"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          VOLVER A RECURSOS
        </Link>

        {/* Newsletter */}
        <NewsletterForm variant="banner" source="resource_detail" className="mt-8" />
      </main>
    </div>
  );
};

export default ResourceDetailPage;
