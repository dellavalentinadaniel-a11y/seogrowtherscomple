import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/customSupabaseClient';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const ResourcesPage = () => {
  const [filter, setFilter] = useState('TODOS');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
    window.scrollTo(0, 0);
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const ssdGuide = {
        id: 'ssd-ps5-optimization-2026',
        title: 'Mejores SSD para PS5: Guía 2026',
        description: 'Todo lo que necesitas saber para ampliar el almacenamiento de tu consola: Gen4, Disipadores y DRAM.',
        category: 'GUÍAS',
        link: '/resources/ssd-ps5-optimization-2026',
        featured: true,
        image: '/images/seo_pillar.webp'
      };
      setResources([ssdGuide, ...data]);
    } else {
      setResources([{
        id: 'ssd-ps5-optimization-2026',
        title: 'Mejores SSD para PS5: Guía 2026',
        description: 'Todo lo que necesitas saber para ampliar el almacenamiento de tu consola: Gen4, Disipadores y DRAM.',
        category: 'GUÍAS',
        link: '/resources/ssd-ps5-optimization-2026',
        featured: true,
        image: '/images/seo_pillar.webp'
      }]);
    }
    setLoading(false);
  };

  const filteredResources = resources.filter(item => {
    if (filter === 'TODOS') return true;
    if (filter === 'GUÍAS') return item.category?.toLowerCase().includes('guia') || item.category?.toLowerCase() === 'ebook';
    if (filter === 'ACTIVOS') return item.category?.toLowerCase().includes('plantilla') || item.category?.toLowerCase() === 'asset';
    if (filter === 'TÉCNICO') return item.category?.toLowerCase().includes('herramienta') || item.category?.toLowerCase() === 'tecnico';
    if (filter === 'VÍDEO') return item.category?.toLowerCase().includes('webinar') || item.category?.toLowerCase() === 'video';
    return true;
  });

  const featured = filteredResources.find(r => r.featured) || filteredResources[0];
  const others = filteredResources.filter(r => r.id !== featured?.id);

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Recursos Neuronales | SEO Growthers</title>
        <meta name="description" content="Accede a recursos gratuitos de SEO, marketing digital y desarrollo web. Guías, plantillas y herramientas para potenciar tu estrategia digital." />
        <meta property="og:title" content="Recursos Neuronales | SEO Growthers" />
        <meta property="og:description" content="Biblioteca de recursos digitales: guías SEO, plantillas de marketing y documentación técnica avanzada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seogrowthers.com/resources" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://seogrowthers.com/resources" />
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Breadcrumbs className="mb-4" />
        {/* Hero Section & Filters */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-4 block">Capítulo 03</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight mb-6">
                BIBLIOTECA DE <span className="bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">RECURSOS_NEURALES</span>
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Accede a la arquitectura del conocimiento de 2026. Activos digitales, documentación técnica avanzada y simulaciones de entrenamiento para ingenieros de software.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['TODOS', 'GUÍAS', 'ACTIVOS', 'TÉCNICO', 'VÍDEO'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-6 py-2 rounded-full border text-sm transition-all focus:outline-none
                    ${filter === item
                      ? 'border-primary-container bg-primary-container/10 text-primary font-bold tracking-wide'
                      : 'border-outline-variant text-on-surface-variant font-medium hover:border-primary-container hover:text-primary'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Bento Grid Layout Dynamic */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
              <div className="md:col-span-6 lg:col-span-8 h-96">
                <SkeletonLoader className="h-full w-full rounded-xl" />
              </div>
              <div className="md:col-span-6 lg:col-span-4 h-96">
                <SkeletonLoader className="h-full w-full rounded-xl" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">

              {/* Featured Large Card */}
              {featured && (
                <div className="md:col-span-6 lg:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low border-t-2 border-primary-container shadow-xl transition-all hover:-translate-y-1">
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                    <img className="w-full h-full object-cover" alt={featured.title} src={featured.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0BWjczb6OyGb4urjZ5nZXPIT7FuyyOOK2fghNbbfnZ_c8gD9koJQv2mRFgmiY5tOU6duMEbI6CqBcfuGe2zurEsxpV1BIK3kt_YKeDIdY2uhkXmbgSN0HqUFMrLIUIu-OJAtmexPerDnz75PFZY6zD8MKKMvfTMVC1XeNZJlxWayGWtKKQkKy3Xnk7-qS3zYjaKaO_5gSzzsnVAsqD_GBed7Zhh36YKnw0FV8gDehSko5HUdzDr-W62YRnO6H6WOnjKJknQ7seOg'}/>
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-background via-background/40 to-transparent">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="p-2 rounded-lg bg-primary-container/20 backdrop-blur-md">
                        <span className="material-symbols-outlined text-primary-container">
                          {featured.category === 'video' ? 'play_circle' : 'auto_awesome'}
                        </span>
                      </span>
                      <span className="text-xs font-bold tracking-widest text-primary-container uppercase">{featured.category} destacados</span>
                    </div>
                    <h3 className="font-headline text-3xl font-bold mb-3">{featured.title}</h3>
                    <p className="text-on-surface-variant max-w-lg mb-6">{featured.description}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <Link to={featured.link || '#'} className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-bold text-sm tracking-wider flex items-center gap-2 transition-transform active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        {featured.category === 'video' ? 'VER AHORA' : 'EXPLORAR'}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Resources */}
              {others.map((item, idx) => {
                const isAsset = item.category?.toLowerCase().includes('plantilla') || item.category?.toLowerCase() === 'asset';
                const isVideo = item.category?.toLowerCase().includes('video') || item.category?.toLowerCase() === 'webinar';

                if (isAsset) {
                  return (
                    <div key={item.id} className="md:col-span-6 lg:col-span-4 p-8 rounded-xl bg-surface-container-high border-t-2 border-secondary-container flex flex-col justify-between hover:bg-surface-container-highest transition-colors">
                      <div>
                        <div className="mb-6 flex justify-between items-start">
                          <div className="p-4 rounded-2xl bg-secondary-container/20 shadow-[0_0_20px_rgba(111,0,190,0.2)]">
                            <span className="material-symbols-outlined text-secondary text-3xl">token</span>
                          </div>
                          <span className="text-[10px] font-bold text-secondary-fixed-dim bg-secondary-container/30 px-3 py-1 rounded-full uppercase">Asset Digital</span>
                        </div>
                        <h4 className="font-headline text-xl font-bold text-on-surface mb-3 uppercase tracking-tight">{item.title}</h4>
                        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-outline-variant/30 pt-6">
                        <span className="text-xs text-outline">{item.file_size || 'N/A'}</span>
                        <Link to={item.link || '#'} className="text-secondary font-bold text-xs tracking-widest hover:text-white transition-colors flex items-center gap-2">
                          {item.file_type === 'zip' ? 'DESCARGAR' : 'ABRIR'}
                          <span className="material-symbols-outlined text-sm">{item.file_type === 'zip' ? 'download' : 'open_in_new'}</span>
                        </Link>
                      </div>
                    </div>
                  );
                }

                if (isVideo) {
                  return (
                    <Link key={item.id} to={item.link || '#'} className="md:col-span-6 lg:col-span-6 rounded-xl overflow-hidden glass-panel border border-white/5 group cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" alt={item.title} src={item.image || 'https://lh3.googleusercontent.com/placeholder-video'}/>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10"></div>
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary-container/80 transition-colors">
                            <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h5>
                        </div>
                        <p className="text-sm text-on-surface-variant line-clamp-2">{item.description}</p>
                      </div>
                    </Link>
                  );
                }

                // Default: Tech Doc / Guide
                return (
                  <div key={item.id} className="md:col-span-3 lg:col-span-4 p-6 rounded-xl bg-surface-container-low border border-white/5 group hover:border-primary/20 transition-all">
                    <div className="mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        {item.category?.toLowerCase().includes('guia') ? 'menu_book' : 'description'}
                      </span>
                    </div>
                    <h5 className="font-headline font-bold mb-2">{item.title}</h5>
                    <p className="text-xs text-on-surface-variant mb-6 line-clamp-3">{item.description}</p>
                    <Link
                      to={item.link && item.link.startsWith('/') ? item.link : `/resources/${item.id}`}
                      className="text-primary text-[10px] font-bold tracking-[0.2em] flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      LEER MÁS <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Tonal Divide Section: Newsletter/Access */}
        <section className="mt-24 p-8 md:p-12 rounded-3xl border border-primary-container/10 relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156, 240, 255, 0.03))' }}>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="font-headline text-3xl font-bold mb-4">SUSCRÍBETE AL FLUJO DE DATOS</h3>
              <p className="text-on-surface-variant">Recibe notificaciones inmediatas cuando se liberen nuevos activos de nivel industrial y parches de documentación crítica.</p>
            </div>
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
              <input className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-6 py-3 text-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none w-full sm:w-80 font-mono tracking-tighter transition-colors" placeholder="tu@email.com" type="email"/>
              <button className="bg-white text-background font-bold px-8 py-3 rounded-xl text-sm tracking-widest hover:bg-primary transition-colors whitespace-nowrap">CONECTAR</button>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage;
