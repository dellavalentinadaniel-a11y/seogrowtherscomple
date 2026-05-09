
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ArticleHero = ({ article }) => {
  const shareUrl = window.location.href;

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(article.title + ' ' + shareUrl)}`;
        break;
      default:
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-end pb-20 overflow-hidden bg-[#0a0e27]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-full object-cover opacity-80"
          width="1280"
          height="720"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e27]/90 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 mb-6 uppercase"
          >
            <Link to="/" className="hover:text-white transition-colors">INICIO</Link>
            <span className="text-gray-500">/</span>
            <Link to="/articulos" className="hover:text-white transition-colors">NOTICIAS</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#00d9ff]">{article.category || 'GENERAL'}</span>
          </motion.nav>

          {/* Title & Description */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            {article.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl font-light leading-relaxed border-l-4 border-[#00d9ff] pl-6"
          >
            {article.summary}
          </motion.p>

          {/* Metadata & Author */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-slate-800/50 pt-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00d9ff] shadow-[0_0_15px_rgba(0,217,255,0.3)]">
                <img
                  src={`https://ui-avatars.com/api/?name=${article.author_name || 'Admin'}&background=0a0e27&color=00d9ff&size=48`}
                  alt={article.author_name}
                  className="w-full h-full object-cover"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Por {article.author_name || 'Equipo SEO Growthers'}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {article.created_at ? format(new Date(article.created_at), 'd MMM yyyy', { locale: es }) : 'Hoy'}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 5 min lectura</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="rounded-full border-slate-700 bg-slate-900/50 hover:bg-[#00d9ff] hover:text-black hover:border-[#00d9ff] transition-all" onClick={() => handleShare('twitter')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-slate-700 bg-slate-900/50 hover:bg-[#00d9ff] hover:text-black hover:border-[#00d9ff] transition-all" onClick={() => handleShare('facebook')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-slate-700 bg-slate-900/50 hover:bg-[#00d9ff] hover:text-black hover:border-[#00d9ff] transition-all" onClick={() => handleShare('whatsapp')}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
