
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Foro', href: '/forum' },
  { name: 'Recursos', href: '/resources' },
  { name: 'Servicios', href: '/services' },
  { name: 'Herramientas', href: '/tools' },
  { name: 'Contacto', href: '/contact' },
];

const MobileMenu = () => {
  const { isMenuOpen, closeMenu } = useMobileMenu();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-[#0a0b14]/80 backdrop-blur-sm z-[60] md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#0d0e17] border-l border-white/10 z-[70] p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-headline font-bold text-white">Menú</h2>
              <button
                onClick={closeMenu}
                className="p-2 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                                 (link.href !== '/' && location.pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={closeMenu}
                    className={`text-lg font-headline tracking-tight py-2 transition-colors ${
                      isActive
                        ? 'text-[#c3f5ff] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <Link
                to="/auditoria-seo-gratis"
                onClick={closeMenu}
                className="mt-4 px-6 py-4 bg-primary text-on-primary text-center font-headline font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              >
                Auditoría Gratis
              </Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
              <p className="text-xs text-slate-500 font-label uppercase tracking-widest mb-4">Síguenos</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
