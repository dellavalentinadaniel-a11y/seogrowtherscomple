import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomTabBar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Inicio', icon: 'home', path: '/' },
    { label: 'Blog', icon: 'article', path: '/blog' },
    { label: 'Foro', icon: 'forum', path: '/forum' },
    { label: 'Recursos', icon: 'grid_view', path: '/resources' },
    { label: 'Perfil', icon: 'person', path: '/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[100] flex justify-around items-center px-4 pb-4 pt-2 bg-[#0d0e17]/90 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                         (item.path !== '/' && location.pathname.startsWith(item.path));
        
        return (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-br from-[#00e5ff]/20 to-[#6f00be]/20 text-[#c3f5ff] rounded-xl px-4 py-2 border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                : 'text-white/40 px-4 py-2 hover:text-[#c3f5ff]'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-body text-[10px] font-bold uppercase mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
