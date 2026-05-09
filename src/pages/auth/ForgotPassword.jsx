import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu clave.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al solicitar",
        description: error.message || "No pudimos enviar el correo de recuperaciÃ³n.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-on-surface font-body neural-bg min-h-screen flex items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
      <Helmet>
        <title>Recuperar Clave | SEO Growthers</title>
      </Helmet>

      <main className="relative w-full max-w-md">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-container opacity-10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container opacity-10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 backdrop-blur-3xl bg-surface-container-low/40 p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-headline font-bold text-white mb-2 uppercase tracking-tighter">Recuperar Acceso</h1>
            <p className="text-xs text-slate-500 font-label tracking-widest uppercase">Protocolo de RestauraciÃ³n Neural</p>
          </div>

          {!isSent ? (
            <form className="space-y-6" onSubmit={handleResetRequest}>
              <div className="space-y-2 group">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-1">Email del Nodo</label>
                <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-primary/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-primary-container transition-colors">alternate_email</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    placeholder="tu-email@neural.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="w-full group relative flex items-center justify-center py-5 bg-primary-container text-[#0d0e17] rounded-2xl font-headline font-bold text-sm tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98]" 
                type="submit"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-[#9cf0ff] to-primary-container group-hover:animate-shimmer"></div>
                <span className="relative z-10">
                  {isLoading ? "ENVIANDO SOLICITUD..." : "ENVIAR CORREO DE NODO"}
                </span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <span className="material-symbols-outlined text-primary text-3xl">mark_email_read</span>
              </div>
              <p className="text-sm text-slate-400">Hemos enviado las instrucciones a tu correo. Revisa tambiÃ©n tu carpeta de spam.</p>
              <Link to="/login" className="block text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">Volver al Portal</Link>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
            <Link className="font-headline text-[10px] font-bold text-slate-500 hover:text-white transition-colors tracking-[0.2em] uppercase" to="/login">Volver al Inicio de SesiÃ³n</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;

