
import React, { useEffect, useState } from 'react';
import { Calendar, Tag, Clock, ChevronRight, Hash, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ArticleSidebar = ({ article, relatedArticles = [], toc = [] }) => {
  const [activeId, setActiveId] = useState('');

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  return (
    <aside className="space-y-8 sticky top-24">
      {/* 1. Table of Contents */}
      {toc.length > 0 && (
        <div className="bg-[#111827] rounded-xl p-6 border border-slate-800">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Hash className="text-[#00d9ff]" size={20} /> En este artículo
          </h3>
          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block text-sm py-1.5 px-3 rounded-md transition-all border-l-2 ${
                  activeId === item.id 
                    ? 'text-[#00d9ff] bg-[#00d9ff]/10 border-[#00d9ff] font-medium' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800 border-transparent'
                } ${item.level === 3 ? 'ml-4' : ''}`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* 2. Article Info */}
      <div className="bg-[#111827] rounded-xl p-6 border border-slate-800">
        <h3 className="text-white font-bold text-lg mb-4">Detalles</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Calendar size={16} /> Publicado</span>
            <span className="text-white font-medium">{article.created_at ? format(new Date(article.created_at), 'd MMM yyy', { locale: es }) : 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Clock size={16} /> Lectura</span>
            <span className="text-white font-medium">5 min</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Tag size={16} /> Categoría</span>
            <Link to={`/articulos?category=${article.category}`} className="text-[#00d9ff] hover:underline font-medium">
              {article.category}
            </Link>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-gray-500 text-sm mb-2">Etiquetas:</p>
            <div className="flex flex-wrap gap-2">
              {(article.category ? [article.category, 'Gaming', 'Tech'] : ['Gaming']).map((tag, i) => (
                <span key={i} className="bg-slate-800 text-xs text-gray-300 px-2 py-1 rounded hover:bg-[#00d9ff]/20 hover:text-[#00d9ff] transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Author Card */}
      <div className="bg-gradient-to-br from-[#111827] to-[#0a0e27] rounded-xl p-6 border border-slate-800 text-center">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#00d9ff] mb-4 shadow-lg">
           <img 
             src={`https://ui-avatars.com/api/?name=${article.author_name || 'Admin'}&background=0D8ABC&color=fff`} 
             alt="Author" 
             className="w-full h-full object-cover"
            />
        </div>
        <h4 className="text-white font-bold text-lg">{article.author_name || 'Equipo SEO Growthers'}</h4>
        <p className="text-[#00d9ff] text-xs font-bold uppercase tracking-wider mb-3">Redactor Senior</p>
        <p className="text-gray-400 text-sm mb-4">Apasionado por la tecnología y los videojuegos. Analizando hardware y software desde 2015.</p>
        <div className="flex justify-center gap-3">
           {/* Social icons would go here */}
        </div>
      </div>

      {/* 4. Related Articles (Sidebar Version) */}
      {relatedArticles.length > 0 && (
        <div className="bg-[#111827] rounded-xl p-6 border border-slate-800">
           <h3 className="text-white font-bold text-lg mb-4">Relacionados</h3>
           <div className="space-y-4">
             {relatedArticles.slice(0, 3).map(related => (
               <Link key={related.id} to={`/articulos/${related.slug}`} className="group flex gap-3 items-start">
                 <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                   <img src={related.featured_image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div>
                   <span className="text-[10px] text-[#00d9ff] font-bold uppercase">{related.category}</span>
                   <h5 className="text-white text-sm font-semibold leading-tight group-hover:text-[#00d9ff] transition-colors line-clamp-2 mt-1">
                     {related.title}
                   </h5>
                 </div>
               </Link>
             ))}
           </div>
        </div>
      )}
    </aside>
  );
};

export default ArticleSidebar;
