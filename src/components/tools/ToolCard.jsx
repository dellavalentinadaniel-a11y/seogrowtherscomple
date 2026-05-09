
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ToolCard = ({ tool }) => {
  const getCategoryColor = (cat) => {
    switch (cat?.toUpperCase()) {
      case 'SEO': return 'bg-[#00d9ff]/10 text-[#00d9ff] border-[#00d9ff]/30';
      case 'ANÁLISIS': return 'bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/30';
      case 'PRODUCTIVIDAD': return 'bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/30';
      case 'MARKETING': return 'bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/30';
      case 'DISEÑO': return 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30';
      case 'DESARROLLO': return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30';
      case 'INTEGRACIONES': return 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const badgeStyle = getCategoryColor(tool.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-cyan-500/5"
    >
      {/* Image 4:3 */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-800">
        <img 
          src={tool.image || 'https://via.placeholder.com/600x450'} 
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${badgeStyle}`}>
            {tool.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {tool.name}
          </h3>
          {tool.logo && (
             <img src={tool.logo} alt="" className="w-8 h-8 rounded object-contain bg-white/5 p-1" />
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {tool.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
             <Star size={12} className="text-yellow-500 fill-yellow-500" />
             <span className="text-gray-300 font-medium">{tool.rating}</span>
             <span className="text-gray-600">({tool.reviews_count || 0})</span>
          </div>
          <div className="flex items-center gap-1">
             <Users size={12} className="text-cyan-500" />
             <span>{tool.users_count?.toLocaleString()} usuarios</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
           <span className="text-sm font-semibold text-white px-2 py-1 bg-slate-800 rounded">
             {tool.price || 'Consultar'}
           </span>
           <span className="text-xs text-gray-600 flex items-center gap-1">
             <Calendar size={10} />
             {tool.created_at && format(new Date(tool.created_at), 'd MMM yyyy', { locale: es })}
           </span>
        </div>

        <div className="mt-4">
          <Button 
            className="w-full bg-slate-800 hover:bg-cyan-600 hover:text-black text-white border border-slate-700 hover:border-transparent transition-all duration-300 gap-2 group/btn"
          >
            Acceder
            <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
