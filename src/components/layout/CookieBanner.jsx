import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not overwhelm user immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handleMoreInfo = () => {
    navigate('/privacy-policy');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0">
                <Cookie size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Uso de Cookies</h3>
                <p className="text-gray-400 text-sm max-w-2xl">
                  Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies para personalizar contenido y analizar nuestro tráfico.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0">
               <Button 
                variant="ghost" 
                onClick={handleMoreInfo}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Más información
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReject}
                className="border-slate-700 text-gray-300 hover:text-white hover:bg-slate-800"
              >
                Rechazar
              </Button>
              <Button 
                onClick={handleAccept}
                className="bg-cyan-600 hover:bg-cyan-700 text-white min-w-[100px]"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;