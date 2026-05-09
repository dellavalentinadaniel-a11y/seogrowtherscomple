import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Chrome } from 'lucide-react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "SesiÃ³n iniciada correctamente",
        description: "Bienvenido de nuevo al ecosistema neural.",
      });
      
      if (redirectPath === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticaciÃ³n",
        description: error.message || "Credenciales invÃ¡lidas. Por favor verifique sus datos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + (redirectPath === 'admin' ? '/admin' : '/profile'),
        },
      });
      
      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticaciÃ³n",
        description: error.message || "No se pudo conectar con el servidor de Google.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="text-on-surface font-body neural-bg min-h-screen flex items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container overflow-hidden">

      <Helmet>
        <title>Iniciar SesiÃ³n | SEO Growthers</title>
      </Helmet>

      <main className="relative w-full max-w-md">
        {/* Background Atmospheric Element */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-container opacity-10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container opacity-10 blur-[100px] rounded-full"></div>
        
        {/* Login Container */}
        <div className="relative z-10 backdrop-blur-3xl bg-surface-container-low/40 p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          {/* Logo/Community Brand Section */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center p-2">
              <div className="relative group">
                {/* Subtle outer glow that matches the image's vibrant green/cyan element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src="/images/iconos/ingresocomunidad.webp" 
                  alt="Comunidad SEO Growthers" 
                  className="relative w-48 h-auto rounded-[2rem] shadow-2xl border border-white/5 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
               <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                <p className="font-label text-[10px] tracking-[0.3em] text-slate-500 uppercase">Acceso Exclusivo Comunidad</p>
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
              </div>
            </div>
          </div>



          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* User Field */}
            <div className="space-y-2 group">
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-1">Identificador_Red</label>
              <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-primary/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-primary-container transition-colors">alternate_email</span>
                <input 
                  className="w-full bg-transparent border-none py-5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                  placeholder="ingeniero@neural.com" 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-500">Clave_CriptogrÃ¡fica</label>
                <Link className="text-[10px] font-label uppercase tracking-widest text-primary/40 hover:text-primary transition-colors" to="/auth/forgot-password">Â¿OlvidÃ³ Clave?</Link>
              </div>
              <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-primary/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-primary-container transition-colors">lock</span>
                <input 
                  className="w-full bg-transparent border-none py-5 pl-12 pr-12 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute right-4 text-slate-600 hover:text-white transition-colors" type="button">
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </button>
              </div>
            </div>

            {/* Biometric Section (Refined UI) */}
            <div className="py-2">
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-transparent group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 p-5 rounded-2xl bg-[#1A1B24]/60 backdrop-blur-xl border border-white/5">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                    <span className="material-symbols-outlined text-3xl text-primary-container animate-pulse">fingerprint</span>
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-white uppercase tracking-widest">ValidaciÃ³n BiomÃ©trica</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Sensor de Retina / Dactilar a la espera...</p>
                    </div>
                  </div>
                  <div className="ml-auto opacity-20">
                    <span className="material-symbols-outlined text-xl">security</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full group relative flex items-center justify-center py-5 bg-primary-container text-[#0d0e17] rounded-2xl font-headline font-bold text-sm tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100" 
              type="submit"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-[#9cf0ff] to-primary-container group-hover:animate-shimmer"></div>
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? "CARGANDO PROTOCOLO..." : "INICIAR SECUENCIA"}
                {!isLoading && <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </span>
            </button>

            {/* Separator */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                <span className="bg-[#12141d] px-4 text-slate-600">O Sincronizar vÃ­a</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              type="button"
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl font-label text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-primary/30 disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 text-primary-container group-hover:scale-110 transition-transform" />
              Acceso con Google Neural
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-slate-500">Â¿Nuevo en el ecosistema?</p>
            <Link className="inline-block mt-2 font-headline text-sm font-bold text-secondary hover:text-on-secondary-container transition-colors" to="/register">SOLICITAR ACCESO DE NODO</Link>
          </div>
        </div>

        {/* Decorative Info Card (Asymmetric) */}
        <div className="mt-8 px-6 opacity-40 flex items-start gap-4">
          <span className="material-symbols-outlined text-secondary">shield_person</span>
          <div className="space-y-1">
            <p className="text-[10px] font-label uppercase tracking-widest leading-none">Protocolo de Seguridad v4.2</p>
            <p className="text-[9px] text-slate-500">EncriptaciÃ³n cuÃ¡ntica de extremo a extremo habilitada para todas las sesiones de trabajo en el Workspace.</p>
          </div>
        </div>
      </main>

      {/* Aesthetic Decorative Image Overlays (Non-blocking) */}
      <div className="fixed top-10 right-10 w-32 h-32 opacity-20 pointer-events-none">
        <img alt="" className="w-full h-full object-contain mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRDKMetDIgKiZVVy8_yg_EVRjEJM5b5o0ID8vraMZMwC4Y_T3Kr4dkz0W92r9GLuYvlnFarNSa7nIN9G8GkgOECJXiIcIbO3x1bLLo9YP3bpjlJ4K1_XgMhfXwWHll2jBynfkZceljA-WQb2ShLV20xmesagd0l4a0eLxRVL2sLpLKtWwiqc4l0UJE0I8uqQLZc9-xulUy8Mg0CaHRKekYFRKIb7ULbxXncwOIifYGLXzlBW3Gf5U5zhOW88ypf_OpAUxz2E7kifA"/>
      </div>
      <div className="fixed bottom-10 left-10 w-48 h-48 opacity-10 pointer-events-none rotate-12">
        <img alt="" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxyKP05ACEup35hjul4NIDXuhqZ_yTX5KDLJccHqB55R8VS-0oei1qQhBrzMk0wlz5LGmsuPVxntxfcWY7EPbH5nfr0oo7ud0X4rnfubKzC3YLhxPVBYAtnalKd2cHoPbA3buq4kdespwakA0CCA_Wmw9gQsHpx1lf9ZV9ppdOR9GwumGftSigqBL6hq5EPuKAXTE1X9zvRADgE_PRiVYYQ0tDbULoT5mjuB8XfLtLyaHX8SX-z0OER2g-Pkp9zVWgsJ9YUhCM0rA"/>
      </div>
    </div>
  );
};

export default LoginPage;

