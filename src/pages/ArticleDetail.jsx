
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Helmet } from 'react-helmet-async';
import { extractHeadings, injectHeadingIds, extractFAQSchema } from '@/lib/seoHelpers';
import { Calendar, User, Clock, Tag, Edit, Trash2, Share2, Facebook, Twitter, Linkedin, MessageCircle, Instagram, ArrowLeft, Heart, Sparkles, List, MessageSquare, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import AdUnit from '@/components/ads/AdUnit';
import AdSidebar from '@/components/ads/AdSidebar';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import BlogCommentsSection from '@/components/blog/BlogCommentsSection';
import InteractionBar from '@/components/article/InteractionBar';
import AuthorBox from '@/components/article/AuthorBox';
import InternalLinkingCTA, { RelatedServicesBlock } from '@/components/shared/InternalLinkingCTA';
import ArticleCard from '@/components/article/ArticleCard';





const ArticleDetail = () => {
  const { category, slug } = useParams();
  const fullSlug = category && !slug ? category : (category && slug ? `${category}/${slug}` : slug);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUserEmail(user.email);
    });
  }, []);

  const fetchArticle = useCallback(async () => {
    if (!slug && !category) return;
    
    setLoading(true);
    let current = null;
    
    // Preparar los términos de búsqueda
    const searchTerms = [];
    if (fullSlug) searchTerms.push(`slug.eq."${fullSlug}"`);
    if (slug) searchTerms.push(`slug.eq."${slug}"`);
    if (category && !slug) searchTerms.push(`slug.eq."${category}"`);

    const orFilter = searchTerms.join(',');

    try {
        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            author:profiles!author_id (
              id,
              username,
              full_name,
              avatar_url,
              bio,
              twitter_url,
              linkedin_url,
              website,
              xp,
              role
            )
          `)
          .or(orFilter)
          .maybeSingle(); // Usamos maybeSingle para evitar errores si no existe

        if (error) {
          console.error("Error de Supabase:", error);
        } else if (data) {
          current = data;
        }
      } catch (err) {
        console.error("Error crítico en fetchArticle:", err);
      }

    if (!current) {
      console.warn("No se encontró el artículo después de buscar por:", orFilter);
      toast({ title: "Error", description: "No se encontró el artículo.", variant: "destructive" });
      navigate('/blog');
      setLoading(false);
      return;
    }

    const mappedArticle = {
      ...current,
      content: current.content_html || current.content || "",
      seo_title: current.seo_title || current.title,
      seo_description: current.seo_description || current.summary || current.description || "",
      keywords: current.keywords || [],
      canonical_url: current.canonical_url,
      featured_image_alt: current.featured_image_alt
    };

    setArticle(mappedArticle);

    // Extract headings for TOC from Markdown or HTML
    const extractedHeadings = [];
    const contentToParse = mappedArticle.content || "";
    
    if (contentToParse.includes('<h2') || contentToParse.includes('<h3')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentToParse, 'text/html');
      const hTags = Array.from(doc.querySelectorAll('h2, h3'));
      hTags.forEach(h => {
        extractedHeadings.push({
          id: h.id || h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          text: h.textContent,
          level: h.tagName
        });
      });
    } else {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(contentToParse)) !== null) {
        const level = match[1].length === 2 ? 'H2' : 'H3';
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    }
    
    setToc(extractedHeadings);
    setLoading(false);

    // Fetch Likes/Comments Count & Recommended
    fetchStats(current.id, current.category, current.tags || []);
  }, [slug, category, fullSlug, navigate]);

  const fetchStats = async (articleId, articleCategory, articleTags) => {
    try {
        // Likes
        const { count: likes } = await supabase
            .from('article_likes')
            .select('id', { count: 'exact', head: true })
            .eq('article_id', articleId);
        setLikesCount(likes || 0);

        // Comments
        const { count: comments } = await supabase
            .from('blog_comments')
            .select('id', { count: 'exact', head: true })
            .eq('article_id', articleId);
        setCommentsCount(comments || 0);

        // Recommended
        const { data: recommended } = await supabase
            .from('articles')
            .select('*')
            .neq('id', articleId)
            .or(`category.eq.${articleCategory}`)
            .limit(3);
        setRecommendedArticles(recommended || []);

        // Forum Recent
        const { data: forumData } = await supabase
            .from('articles')
            .select('id, title, slug, category, created_at')
            .eq('category', 'Debates')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(5);
        setForumPosts(forumData || []);
    } catch (err) {
        console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug, fetchArticle]);

  if (loading) return <div className="min-h-screen bg-[#0C0D0D] pt-32 text-center text-white">Cargando artículo...</div>;
  if (!article) return null;

  // Simple ad injection logic (In-article)
  // Splits content by paragraphs and injects an ad after the 3rd paragraph
  const injectAds = (html) => {
    if (!html) return '';
    const parts = html.split('</p>');
    if (parts.length > 3) {
      // We can't render the React component directly into the HTML string safely without Portal or SSR.
      // For this frontend-only task, we will just return the HTML and place ads around it, 
      // or use a specific marker if we were processing it into an array of React elements.
      // However, to keep it simple and safe for dangerouslySetInnerHTML:
      // We will place the main ad outside the content flow or between distinct sections if possible.
      // OR, we assume content is just text and we can't inject mid-stream easily with React + dangerouslySetInnerHTML.
      // OPTION 2: We don't inject inside the HTML blob. We place it above/below.
      // As requested: "between paragraphs". 
      // To do this properly in React without parsing HTML to React nodes:
      return html; 
    }
    return html;
  };

  return (
    <>
      <Helmet>
        <title>{`${article.seo_title || article.title} | SEO Growthers`}</title>
        <meta name="description" content={article.seo_description || article.summary} />
        {article.keywords && article.keywords.length > 0 && <meta name="keywords" content={article.keywords.join(', ')} />}
        <link rel="canonical" href={article.canonical_url || `https://seogrowthers.com/blog/${article.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={article.seo_title || article.title} />
        <meta property="og:description" content={article.seo_description || article.summary} />
        <meta property="og:url" content={`https://seogrowthers.com/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="SEO Growthers" />
        <meta property="og:locale" content="es_AR" />
        {article.featured_image && <meta property="og:image" content={article.featured_image} />}
        {article.featured_image && <meta property="og:image:width" content="1200" />}
        {article.featured_image && <meta property="og:image:height" content="630" />}
        {article.featured_image && <meta property="og:image:type" content="image/webp" />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        {article.author?.twitter_url && (
          <meta name="twitter:creator" content={`@${article.author.twitter_url.split('/').pop()}`} />
        )}
        <meta name="twitter:title" content={article.seo_title || article.title} />
        <meta name="twitter:description" content={article.seo_description || article.summary} />
        {article.featured_image && <meta name="twitter:image" content={article.featured_image} />}

        {/* Article metadata */}
        {article.created_at && <meta property="article:published_time" content={new Date(article.created_at).toISOString()} />}
        {article.updated_at && <meta property="article:modified_time" content={new Date(article.updated_at).toISOString()} />}
        {article.category && <meta property="article:section" content={article.category} />}
        <meta property="article:author" content={article.author?.full_name || article.author?.username || "Equipo Editorial SEO Growthers"} />
        {article.keywords && article.keywords.length > 0 && article.keywords.map((kw, i) => (
          <meta key={i} property="article:tag" content={kw} />
        ))}

        {/* BlogPosting schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.seo_title || article.title,
            "description": article.seo_description || article.summary,
            "image": {
              "@type": "ImageObject",
              "url": article.featured_image || "https://seogrowthers.com/logo.webp",
              "width": 1200,
              "height": 630
            },
            "datePublished": article.created_at ? new Date(article.created_at).toISOString() : undefined,
            "dateModified": article.updated_at ? new Date(article.updated_at).toISOString() : (article.created_at ? new Date(article.created_at).toISOString() : undefined),
            "author": {
              "@type": "Person",
              "name": article.author?.full_name || article.author?.username || "Equipo Editorial SEO Growthers",
              "url": article.author?.website || "https://seogrowthers.com",
              ...(article.author?.twitter_url ? { "sameAs": [article.author.twitter_url] } : {})
            },
            "publisher": {
              "@type": "Organization",
              "name": "SEO Growthers",
              "logo": {
                "@type": "ImageObject",
                "url": "https://seogrowthers.com/logo.webp",
                "width": 600,
                "height": 60
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://seogrowthers.com/blog/${article.slug}`
            },
            "url": `https://seogrowthers.com/blog/${article.slug}`,
            "articleBody": article.content ? article.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 5000) : undefined,
            "wordCount": article.content ? article.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : undefined,
            ...(article.keywords && article.keywords.length > 0 ? { "keywords": article.keywords.join(", ") } : {}),
            ...(article.category ? { "articleSection": article.category } : {})
          })}
        </script>

        {/* BreadcrumbList schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://seogrowthers.com/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://seogrowthers.com/blog" },
              ...(article.category ? [{ "@type": "ListItem", "position": 3, "name": article.category, "item": `https://seogrowthers.com/blog/${article.category.toLowerCase().replace(/\s+/g, '-')}` }] : []),
              { "@type": "ListItem", "position": article.category ? 4 : 3, "name": article.seo_title || article.title, "item": `https://seogrowthers.com/blog/${article.slug}` }
            ]
          })}
        </script>

        {/* FAQPage schema — auto-detected from FAQ blocks in content */}
        {(() => {
          const faqSchema = extractFAQSchema(article.content);
          return faqSchema ? (
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
          ) : null;
        })()}
      </Helmet>

      <div className="min-h-screen pt-32 pb-20">
        {/* Floating Back Button */}
        <div className="fixed top-28 left-4 md:left-8 z-50 pointer-events-none lg:block hidden">
          <button 
              onClick={() => navigate(-1)}
              className="pointer-events-auto p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all group flex flex-col items-center gap-2"
          >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Volver</span>
          </button>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <main className="lg:col-span-8">
              <header className="mb-8">
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center lg:items-end">
                  <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium"
                    >
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                      {article.category || 'Noticias'}
                    </span>
                  </div>
                  
                  {currentUserEmail === 'dellavalentina.daniel@gmail.com' && (
                    <div className="flex gap-2">
                        <Button 
                            variant="select" 
                            size="sm" 
                            className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20"
                            onClick={() => navigate(`/blog/edit/${article.id}`)}
                        >
                            <Edit size={14} className="mr-2" /> Editar Artículo
                        </Button>
                        <Button 
                            variant="destructive" 
                            size="sm"
                            className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300"
                            onClick={async () => {
                                if(window.confirm('¿Estás SEGURO de que deseas borrar esta publicación? Esta acción NO se puede deshacer y sacará el artículo de producción permanentemente.')){
                                    const { error } = await supabase.from('articles').delete().eq('id', article.id);
                                    if(error){
                                        toast({ title: 'Error al borrar', description: error.message, variant: 'destructive' });
                                    } else {
                                        toast({ title: 'Éxito', description: 'El artículo ha sido eliminado' });
                                        navigate('/blog');
                                    }
                                }
                            }}
                        >
                            <Trash2 size={14} className="mr-2" /> Borrar
                        </Button>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/30 p-0.5">
                        <img 
                          src={article.author?.avatar_url || `https://ui-avatars.com/api/?name=${article.author?.full_name || 'Redaccion'}&background=06B6D4&color=fff`} 
                          alt={article.author?.full_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0C0D0D] rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{article.author?.full_name || article.author?.username || 'Equipo Editorial'}</span>
                        <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/20 font-bold uppercase tracking-wider">
                          {article.author?.role || 'Contributor'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-cyan-500/50" /> {new Date(article.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-cyan-500/50" /> {Math.max(1, Math.ceil((article.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200))} min lectura</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                      <button 
                        onClick={() => {
                            const section = document.getElementById('interactions-section');
                            if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <Heart size={16} />
                        <span className="text-xs font-bold">{likesCount}</span>
                      </button>
                      <div className="w-px h-3 bg-white/10"></div>
                      <button 
                         onClick={() => {
                            const section = document.getElementById('comments-section');
                            if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <MessageCircle size={16} />
                        <span className="text-xs font-bold">{commentsCount}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-1 hidden sm:inline">Compartir:</span>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(article.social_meta?.facebook || article.title)}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                      >
                        <Facebook size={18} />
                      </a>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.social_meta?.x || article.title)}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-black hover:border-black transition-all"
                      >
                        <Twitter size={18} />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent((article.social_meta?.whatsapp || article.title) + ' ' + window.location.href)}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                      >
                        <MessageCircle size={18} />
                      </a>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({ title: "Enlace copiado", description: "Listo para compartir en Instagram" });
                        }}
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent transition-all"
                        title="Copiar para Instagram"
                      >
                        <Instagram size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {article.featured_image && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800">
                  <img 
                    src={article.featured_image} 
                    alt={article.featured_image_alt || article.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* In-Article Ad (Mock placement) */}
              <div className="block lg:hidden mb-8">
                <AdUnit slotId="mobile-in-content" width="300px" height="250px" />
              </div>

              <div id="interactions-section">
                <InteractionBar 
                  contentId={article.id} 
                  contentType="article" 
                  commentsCount={commentsCount}
                  onLikeChange={(count) => setLikesCount(count)}
                />
              </div>

              <MarkdownRenderer content={article.content} />

              {/* Author Information */}
              <AuthorBox author={article.author} />

              {/* In-Article Ad (After content) */}
               <AdUnit 
                slotId="article-middle-rect" 
                width="300px" 
                height="250px" 
                className="my-12"
              />

              {article.keywords && article.keywords.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-800">
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Tag size={14} /> Temas relacionados:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map(kw => (
                      <span key={kw} className="text-sm bg-slate-800 text-gray-300 px-3 py-1 rounded hover:bg-slate-700 transition-colors cursor-pointer">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Leaderboard */}
              <AdUnit 
                slotId="article-bottom-leaderboard" 
                width="728px" 
                height="90px" 
                className="hidden md:flex mt-12"
              />

              {article.id && (
                <div id="comments-section">
                  <BlogCommentsSection articleId={article.id} />
                </div>
              )}

              {/* Recommended Articles Section */}
              {recommendedArticles.length > 0 && (
                <div className="mt-20 pt-10 border-t border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="text-cyan-400" size={24} /> Recomendados para ti
                    </h3>
                    <div className="h-px flex-1 bg-white/10 mx-6 hidden sm:block"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedArticles.map(rec => (
                      <ArticleCard key={rec.id} article={rec} />
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Linking — Servicios relacionados */}
              <InternalLinkingCTA variant="audit" />
              <RelatedServicesBlock currentPath={`/blog/${category}/${slug}`} />
            </main>

            <aside className="lg:col-span-4 space-y-8">
               <div className="sticky top-28 space-y-8">
                  {/* Sidebar Ad Component */}
                  <AdSidebar />
                  
                  {/* Table of Contents */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                       <List size={16} className="text-cyan-500" /> Tabla de Contenidos
                    </h3>
                    <nav>
                      <ul className="space-y-4">
                        {toc.length === 0 && <li className="text-gray-500 text-xs italic">Sin subtítulos identificados</li>}
                        {toc.map((heading) => (
                          <li key={heading.id} style={{ paddingLeft: (heading.level === 'H3' ? 16 : 0) }}>
                            <a 
                              href={`#${heading.id}`} 
                              className="text-sm text-gray-400 hover:text-cyan-400 transition-all block border-l-2 border-transparent hover:border-cyan-500/50 pl-3 -ml-px"
                              onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(heading.id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Forum Recent Posts */}
                  <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-3xl -mr-12 -mt-12 rounded-full"></div>
                    <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2 relative z-10">
                       <MessageSquare size={16} className="text-pink-500" /> Debates Recientes
                    </h3>
                    <div className="space-y-4 relative z-10">
                      {forumPosts.map(post => (
                        <Link 
                          key={post.id} 
                          to={`/blog/${post.category}/${post.slug}`}
                          className="flex flex-col gap-1 group/post"
                        >
                          <span className="text-xs text-gray-400 group-hover/post:text-white transition-colors line-clamp-2 font-medium leading-relaxed">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </Link>
                      ))}
                      <Link 
                        to="/forum" 
                        className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
                      >
                        Ver todo el foro <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
