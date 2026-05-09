import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoComponent from '@/components/shared/LogoComponent';
import { supabase } from '@/lib/customSupabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';



const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Foro', href: '/forum' },
  { name: 'Recursos', href: '/resources' },
  { name: 'Servicios', href: '/services' },
  { name: 'Herramientas', href: '/tools' },
  { name: 'Contacto', href: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async (userId) => {
        const { data } = await supabase.from('profiles').select('avatar_url, role').eq('id', userId).single();
        if (data) setProfile(data);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    const handleProfileUpdate = (e) => {
      if (e.detail && e.detail.avatar_url) {
        setProfile(prev => ({ ...prev, avatar_url: e.detail.avatar_url }));
      }
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);

    // Clic fuera para cerrar dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Sesión cerrada",
        description: "Has salido del ecosistema de forma segura.",
      });
      setIsDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: error.message,
      });
    }
  };



  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0b14]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center px-6 md:px-8 h-20 w-full max-w-[1600px] mx-auto">
        
        {/* Brand */}
        <div className="flex items-center h-full">
          <LogoComponent size="md" />
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || 
                             (link.href !== '/' && location.pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`font-headline tracking-tight transition-colors ${
                  isActive 
                    ? 'text-[#c3f5ff] border-b-2 border-[#00e5ff] pb-1' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/auditoria-seo-gratis"
            className="ml-2 px-4 py-2 bg-primary text-on-primary text-xs font-headline font-bold uppercase tracking-wider rounded-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all whitespace-nowrap"
          >
            Auditoría Gratis
          </Link>
        </nav>

        {/* User / Profile Area */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {session ? (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 rounded-full border border-primary/30 overflow-hidden block hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <img alt="User profile avatar" className="w-full h-full object-cover" src={profile?.avatar_url || "/images/iconos/guiaspersonaje.webp"}/>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-3 w-56 p-2 bg-[#0d0e17]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[100]"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                      <p className="text-[10px] font-label uppercase tracking-widest text-slate-500">Nodo Activo</p>
                      <p className="text-xs font-bold text-on-surface truncate">{session.user.email}</p>
                    </div>

                    <Link 
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">person</span>
                      <span className="font-headline text-sm">Mi Perfil</span>
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group"
                    >
                      <span className="material-symbols-outlined text-xl group-hover:animate-pulse">logout</span>
                      <span className="font-headline text-sm">Cerrar Sesión</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            !['/login', '/register'].includes(location.pathname) && (
              <Link 
                to="/login" 
                className="px-6 py-2 bg-primary-container/10 border border-primary/20 text-primary-container rounded-full font-headline text-xs uppercase tracking-widest hover:bg-primary-container/20 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              >
                Acceder
              </Link>
            )
          )}
        </div>


      </div>
    </header>
  );
};

export default Header;
