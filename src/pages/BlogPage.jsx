
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ArticleCard from '@/components/article/ArticleCard';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/input';
import { Search, Loader2, Plus, PenSquare, MessageSquare } from 'lucide-react';
import AdUnit from '@/components/ads/AdUnit';
import AdSidebar from '@/components/ads/AdSidebar';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/Pagination';
import RecentArticlesCarousel from '@/components/shared/RecentArticlesCarousel';

const PAGE_SIZE = 6;



const BlogPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('blog_categories').select('id, name, slug').eq('type', 'article');
    setCategories(data || []);
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    let dbArticles = [];
    try {
      let query = supabase
        .from('articles')
        .select('id, title, summary, featured_image, slug, category, created_at, status', { count: 'exact' })
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category) {
        // Match exacto por nombre de categoría (usa índice, no wildcard)
        const matchedCategory = categories.find(c => c.slug === category);
        if (matchedCategory) {
          query = query.eq('category', matchedCategory.name);
        } else {
          query = query.eq('category', category);
        }
      }

      if (searchTerm) {
        // textSearch usa el índice FTS (full-text search) si existe,
        // fallback a ilike si no hay columna fts
        query = query.ilike('title', `%${searchTerm}%`);
      }

      // Pagination range
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (!error && data) {
        dbArticles = data.map(item => {
          // Strip HTML tags for the excerpt
          const cleanExcerpt = (item.summary || '').replace(/<[^>]*>/g, '');
          return {
            ...item,
            description: cleanExcerpt,
            excerpt: cleanExcerpt
          };
        });
        setTotalCount(count || 0);
      }
    } catch (err) {
      console.warn("DB fetch failed:", err);
    }

    setArticles(dbArticles);
    setLoading(false);
  }, [category, searchTerm, currentPage, categories]);

  // Reset page when filtering changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
    };
    init();
  }, [fetchCategories]);

  useEffect(() => {
    // Solo ejecutamos fetchArticles si no hay categoría o si ya tenemos las categorías cargadas
    if (!category || (categories && categories.length > 0)) {
       fetchArticles();
    }
  }, [category, categories, fetchArticles]);

  // Logic moved to fetchArticles for server-side search and pagination
  const filteredArticles = articles;

  return (
    <>
      <Helmet>
        <title>{category ? `Blog de ${category} - Artículos y Guías | SEO Growthers` : "Blog de SEO, Marketing Digital y Desarrollo Web | SEO Growthers"}</title>
        <meta name="description" content={category ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.` : "Explora nuestros artículos sobre SEO, marketing digital, desarrollo web e inteligencia artificial para potenciar tu negocio."} />
        <link rel="canonical" href={category ? `https://seogrowthers.com/blog/${category}` : "https://seogrowthers.com/blog"} />
        {currentPage > 1 && (
          <link rel="prev" href={`https://seogrowthers.com${category ? `/blog/${category}` : '/blog'}?page=${currentPage - 1}`} />
        )}
        {currentPage * PAGE_SIZE < totalCount && (
          <link rel="next" href={`https://seogrowthers.com${category ? `/blog/${category}` : '/blog'}?page=${currentPage + 1}`} />
        )}

        {/* Open Graph */}
        <meta property="og:title" content={category ? `Blog de ${category} | SEO Growthers` : "Blog | SEO Growthers"} />
        <meta property="og:description" content={category ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.` : "Artículos sobre SEO, desarrollo web, IA y estrategias digitales para hacer crecer tu negocio."} />
        <meta property="og:url" content={category ? `https://seogrowthers.com/blog/${category}` : "https://seogrowthers.com/blog"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:image" content="https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content={category ? `Blog de ${category} | SEO Growthers` : "Blog | SEO Growthers"} />
        <meta name="twitter:description" content={category ? `Artículos y guías sobre ${category}.` : "Artículos sobre SEO, desarrollo web, IA y marketing digital."} />
        <meta name="twitter:image" content="https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" />

        {/* CollectionPage schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category ? `Blog de ${category} | SEO Growthers` : "Blog | SEO Growthers",
            "description": category
              ? `Artículos y guías sobre ${category}. Estrategias digitales para potenciar tu negocio.`
              : "Artículos sobre SEO, marketing digital, desarrollo web e inteligencia artificial.",
            "url": category ? `https://seogrowthers.com/blog/${category}` : "https://seogrowthers.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "SEO Growthers",
              "logo": { "@type": "ImageObject", "url": "https://seogrowthers.com/api/og?title=Blog&subtitle=SEO%2C+marketing+digital+e+IA&type=blog" }
            },
            "inLanguage": "es-AR",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://seogrowthers.com/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://seogrowthers.com/blog" },
                ...(category ? [{ "@type": "ListItem", "position": 3, "name": category, "item": `https://seogrowthers.com/blog/${category}` }] : [])
              ]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs className="mb-8" />
          
          {/* Recent Articles Hero Carousel */}
          {!category && !searchTerm && currentPage === 1 && (
            <RecentArticlesCarousel title="Destacados del Blog" subtitle="EXPLORA LO ÚLTIMO" />
          )}

          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
              Nuestro <span className="text-cyan-400">Blog</span>
            </h1>
            
            {session && (
              <div className="flex justify-center mb-6">
                <Link to="/forum">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold px-6 py-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all hover:scale-105 active:scale-95">
                    <MessageSquare size={20} />
                    Iniciar Debate en el Foro
                  </Button>
                </Link>
              </div>
            )}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ideas, tutoriales y noticias sobre el mundo del desarrollo de software y la transformación digital.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
             {/* Sidebar Filters & Ads */}
             <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                   <h3 className="font-bold text-white mb-4">Buscar</h3>
                   <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Buscar artículos..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-slate-800 border-slate-700 text-white"
                      />
                   </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                   <h3 className="font-bold text-white mb-4">Categorías</h3>
                   <nav className="flex flex-col gap-2">
                      <Link 
                        to="/blog" 
                        className={`text-sm py-2 px-3 rounded transition-colors ${!category ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
                      >
                        Todas
                      </Link>
                      {categories.map(cat => (
                         <Link 
                           key={cat.id} 
                           to={`/blog/${cat.slug}`}
                           className={`text-sm py-2 px-3 rounded transition-colors ${category === cat.slug ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
                         >
                           {cat.name}
                         </Link>
                      ))}
                   </nav>
                </div>
                
                {/* Sidebar Ads */}
                <div className="hidden md:block">
                  <AdSidebar />
                </div>
             </aside>

             {/* Grid */}
             <div className="flex-1">
                {loading ? (
                   <div className="flex justify-center py-20">
                      <Loader2 className="animate-spin h-10 w-10 text-cyan-500" />
                   </div>
                ) : filteredArticles.length > 0 ? (
                   <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredArticles.map(article => (
                             <ArticleCard key={article.id} article={article} />
                          ))}
                       </div>

                       <Pagination 
                          currentPage={currentPage}
                          totalItems={totalCount}
                          pageSize={PAGE_SIZE}
                          onPageChange={setCurrentPage}
                          className="mt-12"
                       />
                       
                       {/* Footer Leaderboard for Grid */}
                       <div className="mt-12">
                          <AdUnit 
                            slotId="blog-bottom-leaderboard" 
                            width="728px" 
                            height="90px" 
                            className="hidden md:flex justify-center"
                          />
                       </div>
                   </>
                ) : (
                   <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                      <p className="text-gray-400 text-lg">No se encontraron artículos.</p>
                      {category && <Link to="/blog" className="text-cyan-400 mt-2 inline-block hover:underline">Ver todos los artículos</Link>}
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
