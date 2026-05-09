
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 bg-[#0a0e27] border-t border-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <span className="w-1 h-8 bg-[#00d9ff] rounded-full"></span>
          Lecturas Recomendadas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#111827] rounded-xl overflow-hidden border border-slate-800 hover:border-[#00d9ff]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] flex flex-col h-full"
            >
              <Link to={`/articulos/${article.slug}`} className="block relative h-48 overflow-hidden">
                <img 
                  src={article.featured_image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#00d9ff] text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                    {article.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                  <Calendar size={12} />
                  {article.created_at ? format(new Date(article.created_at), 'd MMM yyyy', { locale: es }) : ''}
                </div>
                
                <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-[#00d9ff] transition-colors">
                  <Link to={`/articulos/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.summary}
                </p>
                
                <Link 
                  to={`/articulos/${article.slug}`} 
                  className="inline-flex items-center text-[#00d9ff] text-sm font-bold hover:gap-2 transition-all"
                >
                  Leer más <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
