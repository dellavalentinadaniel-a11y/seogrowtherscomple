
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ResourceCard = ({ resource }) => {
  const getCategoryColor = (cat) => {
    switch (cat?.toUpperCase()) {
      case 'GUÍAS': return 'text-cyan-400 border-cyan-400 bg-cyan-400/10';
      case 'PLANTILLAS': return 'text-orange-400 border-orange-400 bg-orange-400/10';
      case 'HERRAMIENTAS': return 'text-purple-400 border-purple-400 bg-purple-400/10';
      case 'CASOS DE ESTUDIO': return 'text-pink-400 border-pink-400 bg-pink-400/10';
      case 'WEBINARS': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'EBOOKS': return 'text-amber-400 border-amber-400 bg-amber-400/10';
      default: return 'text-blue-400 border-blue-400 bg-blue-400/10';
    }
  };

  const badgeStyle = getCategoryColor(resource.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-cyan-500/5"
    >
      {/* Image 4:3 */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img 
          src={resource.image || 'https://via.placeholder.com/600x450'} 
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${badgeStyle}`}>
            {resource.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
          {resource.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
          {resource.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-cyan-500" />
            {resource.author || 'Agency'}
          </div>
          {resource.published_at && (
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              {format(new Date(resource.published_at), 'd MMM yyyy', { locale: es })}
            </div>
          )}
          {(resource.file_type || resource.file_size) && (
             <div className="flex items-center gap-1.5 ml-auto">
               <FileText size={12} />
               {resource.file_type} {resource.file_size ? `• ${resource.file_size}` : ''}
             </div>
          )}
        </div>

        <Link to={resource.link || '#'} className="w-full mt-auto">
          <Button 
            className="w-full bg-slate-800 hover:bg-cyan-600 hover:text-black text-white border border-slate-700 hover:border-transparent transition-all duration-300 gap-2 group/btn"
          >
            Acceder al Recurso
            <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
