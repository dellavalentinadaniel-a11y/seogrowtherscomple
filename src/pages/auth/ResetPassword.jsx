import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase maneja la sesiÃ³n automÃ¡ticamente al llegar con el hash del correo
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Enlace invÃ¡lido o expirado",
          description: "Por favor solicita un nuevo enlace de recuperaciÃ³n.",
        });
        navigate('/auth/forgot-password');
      }
    };
    checkSession();
  }, [navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de validaciÃ³n",
        description: "Las contraseÃ±as no coinciden.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast({
        title: "Clave actualizada",
        description: "Tu contraseÃ±a ha sido restablecida correctamente. Iniciando sesiÃ³n...",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: error.message || "No pudimos actualizar tu contraseÃ±a.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-on-surface font-body neural-bg min-h-screen flex items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
      <Helmet>
        <title>Nueva Clave | SEO Growthers</title>
      </Helmet>

      <main className="relative w-full max-w-md">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-container opacity-10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container opacity-10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 backdrop-blur-3xl bg-surface-container-low/40 p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-headline font-bold text-white mb-2 uppercase tracking-tighter">Establecer Clave</h1>
            <p className="text-xs text-slate-500 font-label tracking-widest uppercase">ActualizaciÃ³n de Seguridad CuÃ¡ntica</p>
          </div>

          <form className="space-y-6" onSubmit={handleUpdatePassword}>
            <div className="space-y-2 group">
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-1">Nueva Clave CriptogrÃ¡fica</label>
              <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-primary/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-primary-container transition-colors">lock</span>
                <input 
                  className="w-full bg-transparent border-none py-5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-1">Confirmar Nueva Clave</label>
              <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-primary/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-primary-container transition-colors">lock_reset</span>
                <input 
                  className="w-full bg-transparent border-none py-5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="w-full group relative flex items-center justify-center py-5 bg-primary-container text-[#0d0e17] rounded-2xl font-headline font-bold text-sm tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98]" 
              type="submit"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-[#9cf0ff] to-primary-container group-hover:animate-shimmer"></div>
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? "ACTUALIZANDO NODO..." : "RESTABLECER ACCESO"}
                {!isLoading && <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">verified_user</span>}
              </span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;

