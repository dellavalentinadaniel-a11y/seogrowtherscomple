
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, User, ArrowRight } from 'lucide-react';
import ImageOptimized from '@/components/shared/ImageOptimized';
import { generateJsonLd } from '@/lib/seoHelpers';
import { Helmet } from 'react-helmet-async';

const ArticleCard = ({ article, className }) => {
  if (!article) return null;

  const jsonLd = generateJsonLd('BlogPosting', {
    title: article.title,
    image: article.featured_image,
    datePublished: article.published_at || article.created_at,
    authorName: 'Equipo Editorial', // Needs author relation in real app
    description: article.excerpt,
    url: `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${(article.category || 'general').toLowerCase().replace(/\s+/g, '-')}/${article.slug}`
  });

  const categorySlug = (article.category || 'general').toLowerCase().replace(/\s+/g, '-');

  const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
  const imageUrl = article.featured_image && article.featured_image.trim() !== '' 
    ? article.featured_image 
    : fallbackImage;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
           {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <article className={`group flex flex-col h-full bg-[#111218]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.2)] ${className}`}>
        <Link to={`/blog/${categorySlug}/${article.slug}`} className="block relative h-52 overflow-hidden">
          <ImageOptimized 
            src={imageUrl}
            alt={article.featured_image_alt || article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={400}
            height={250}
          />
          <div className="absolute top-4 left-4 z-10 transition-transform duration-300 group-hover:translate-x-1">
             <span className="bg-cyan-500 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-xl tracking-wider uppercase">
                {article.category || 'Blog'}
             </span>
          </div>
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111218] via-transparent to-transparent opacity-60"></div>
        </Link>
        
        <div className="p-6 flex flex-col flex-grow">
          <header className="mb-4">
             <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
                <span className="flex items-center gap-1.5">
                   <Calendar size={12} className="text-cyan-500/70" />
                   {(article.published_at || article.created_at) ? format(new Date(article.published_at || article.created_at), 'd MMM yyyy', { locale: es }) : 'Borrador'}
                </span>
                <span className="flex items-center gap-1.5">
                   <User size={12} className="text-cyan-500/70" />
                   Redacción
                </span>
             </div>
             <Link to={`/blog/${categorySlug}/${article.slug}`}>
                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-snug">
                  {article.title}
                </h2>
             </Link>
          </header>
          
          <p className="text-sm text-slate-400 mb-6 line-clamp-3 flex-grow leading-relaxed font-light">
            {article.excerpt}
          </p>
          
          <footer className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
             <Link 
                to={`/blog/${categorySlug}/${article.slug}`}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 tracking-widest uppercase inline-flex items-center gap-2 group/link"
             >
                Leer más
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
             </Link>

             <div className="flex gap-1.5">
                {[1,2,3].map(i => (
                   <div key={i} className="w-1 h-1 rounded-full bg-slate-800"></div>
                ))}
             </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
