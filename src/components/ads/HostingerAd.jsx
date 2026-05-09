import React, { useState } from 'react';
import { Globe, Cpu, Zap, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

const HostingerAd = () => {
  const [isHovered, setIsHovered] = useState(false);
  const referralUrl = "https://www.hostinger.com/ar?REFERRALCODE=7PEDELLAVNFV";

  return (
    <a 
      href={referralUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full h-full bg-[#16162a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden group transition-all duration-300 hover:border-violet-500/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo con gradientes y rejilla */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#673de6 1px, transparent 1px), linear-gradient(90deg, #673de6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#673de6] blur-[80px] rounded-full opacity-10"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#ff00c7] blur-[80px] rounded-full opacity-5"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between items-center text-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#673de6] to-[#ff00c7] rounded-lg flex items-center justify-center shadow-lg shadow-[#673de6]/40">
            <Globe size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">Hostinger</span>
        </div>

        {/* Content */}
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-medium text-cyan-400">
            <Sparkles size={10} />
            CONSTRUIDO CON IA
          </div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white">
            Todo lo que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#673de6] via-[#a855f7] to-[#ff00c7]">
              necesitas
            </span>
          </h1>
          <p className="text-gray-400 text-[11px] leading-snug max-w-[90%] mx-auto">
            Hosting de alto rendimiento y creadores con IA. Tu éxito online empieza aquí.
          </p>
        </div>

        {/* Features List (Shortened for space) */}
        <div className="grid grid-cols-1 gap-2 w-full my-4">
          {[
            { icon: <Zap size={14} />, label: "Velocidad Máxima", color: "text-yellow-400" },
            { icon: <Cpu size={14} />, label: "Creador IA", color: "text-cyan-400" },
            { icon: <ShieldCheck size={14} />, label: "Seguridad Total", color: "text-green-400" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <div className={`${item.color}`}>{item.icon}</div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-white">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full mt-auto">
          <div className="relative">
            <div className="w-full py-3 px-4 bg-gradient-to-r from-[#673de6] to-[#a855f7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(103,61,230,0.4)] text-white">
              EMPIEZA AHORA
              <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-3">
                {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-500 text-[8px]">★</span>
                ))}
          </div>
          <p className="text-[8px] text-gray-500 mt-1">4.8/5 valoración de usuarios</p>
        </div>
      </div>
    </a>
  );
};

export default HostingerAd;
