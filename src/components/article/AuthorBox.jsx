
import React from 'react';
import { Twitter, Linkedin, Globe, Award, Zap, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthorBox = ({ author }) => {
  if (!author) return null;

  const getRankInfo = (xp = 0, role = '') => {
    if (role === 'owner') return { name: 'Desarrollador Elite', color: 'text-amber-400', border: 'border-amber-500/50', icon: <Trophy className="w-4 h-4" /> };
    if (xp >= 2001) return { name: 'Master Pathbreaker', color: 'text-amber-400', border: 'border-amber-500/50', icon: <Trophy className="w-4 h-4" /> };
    if (xp >= 501) return { name: 'Elite Explorer', color: 'text-fuchsia-400', border: 'border-fuchsia-500/50', icon: <Star className="w-4 h-4" /> };
    if (xp >= 101) return { name: 'Data Voyager', color: 'text-purple-400', border: 'border-purple-500/50', icon: <Zap className="w-4 h-4" /> };
    return { name: 'Novato Neural', color: 'text-cyan-400', border: 'border-cyan-500/50', icon: <Award className="w-4 h-4" /> };
  };

  const rank = getRankInfo(author.xp, author.role);
  const displayName = author.full_name || author.username || 'Autor';

  return (
    <div className="bg-[#0e0e15] border border-white/5 rounded-2xl p-6 my-12 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden group">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-all duration-700" />
      
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition duration-700" />
        <div className="relative w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden bg-slate-900 z-10">
          <img 
            src={author.avatar_url || "/images/iconos/guiaspersonaje.webp"} 
            alt={displayName} 
            className="w-full h-full object-cover scale-110"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
          <h4 className="text-xl font-bold text-white tracking-tight">{displayName}</h4>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border ${rank.border} ${rank.color} text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0`}>
            {rank.icon}
            {rank.name}
          </div>
        </div>
        
        {author.bio && (
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {author.bio}
          </p>
        )}

        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {author.twitter_url && (
            <a href={author.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
              <Twitter size={14} />
            </a>
          )}
          {author.linkedin_url && (
            <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-blue-500 hover:border-blue-500/30 transition-all">
              <Linkedin size={14} />
            </a>
          )}
          {author.website && (
            <a href={author.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-emerald-400 hover:border-emerald-400/30 transition-all">
              <Globe size={14} />
            </a>
          )}
          <Link to={`/profile`} className="ml-auto text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors">
            Ver Perfil Completo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
