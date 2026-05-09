import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Protocolo de Registro Completado",
        description: "Nodo activado. Bienvenido al ecosistema neural.",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error en Secuencia de Registro",
        description: error.message || "Fallo en la sincronizaciÃ³n de datos neurales.",
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
          redirectTo: window.location.origin + '/profile',
        },
      });
      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticaciÃ³n",
        description: error.message || "No se pudo sincronizar vÃ­a Google.",
      });
      setIsLoading(false);
    }
  };


  return (
    <div className="font-body text-on-background selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
      <Helmet>
        <title>SincronizaciÃ³n de Nodo | SEO Growthers</title>
      </Helmet>

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative">
        {/* Background Atmospheric Elements (Synced with Login) */}
        <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
        
        {/* Auth Container */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] relative z-10 border border-white/10 bg-surface-container-low/10 backdrop-blur-3xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20"></div>

          {/* Left Side: Visual Narrative & Branding */}
          <div className="hidden md:flex flex-col justify-between p-16 bg-[#0d0e17]/80 relative border-r border-white/5 overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-3 mb-20 group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">hub</span>
                </div>
                <span className="font-headline font-bold tracking-[0.3em] text-xl text-white">NEURAL_NET</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-headline text-6xl font-extrabold tracking-tighter text-white leading-[0.95] mb-8">
                  Inicia tu <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 animate-gradient-x">EvoluciÃ³n</span>
                </h1>
                <p className="text-slate-400 text-xl max-w-sm leading-relaxed font-light">
                  Sincroniza tu ADN digital con el nÃºcleo de inteligencia mÃ¡s avanzado de la red.
                </p>
              </motion.div>
            </div>

            <div className="relative z-10">
                <div className="p-8 rounded-[2.5rem] bg-cyan-950/20 backdrop-blur-3xl border border-cyan-500/10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></div>
                    <span className="font-label text-xs tracking-[0.4em] uppercase text-cyan-400 font-bold">Estado: Pendiente_SincronÃ­a</span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 leading-relaxed space-y-1">
                    <p><span className="text-cyan-500/60">&gt;</span> cargando_mÃ³dulos_biomÃ©tricos... [OK]</p>
                    <p><span className="text-cyan-500/60">&gt;</span> verificando_integridad_nodos... [OK]</p>
                    <p><span className="text-cyan-500/60">&gt;</span> esperando_input_alias_neural...</p>
                  </div>
                </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>

          {/* Right Side: Sign Up Form */}
          <div className="bg-[#0C0D0D]/40 p-8 md:p-20 flex flex-col justify-center backdrop-blur-4xl relative">
            {/* Mobile Header Branding (Visible only on mobile) */}
            <div className="mb-12 md:hidden text-center">
              <img 
                src="/images/iconos/ingresocomunidad.webp" 
                alt="Comunidad" 
                className="w-32 h-32 mx-auto rounded-3xl shadow-2xl border border-white/10 mb-6"
              />
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold">Registro de Nodo</span>
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-white">Crear Cuenta</h2>
            </div>

            <div className="hidden md:block space-y-3 mb-12">
              <h2 className="text-4xl font-headline font-extrabold text-white tracking-tighter">SincronizaciÃ³n de Alias</h2>
              <p className="text-slate-500 text-base font-light">Establece tus credenciales de acceso al ecosistema neural.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Alias Field */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 ml-1">Alias_Neural / ID_Entidad</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">fingerprint</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-5 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="name" 
                    placeholder="Escribe tu alias de ingeniero" 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 ml-1">Identificador_Red</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">alternate_email</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-5 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="email" 
                    placeholder="correo@protocolo.io" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 ml-1">Clave_CriptogrÃ¡phica</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-12 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="password" 
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute right-5 text-slate-600 hover:text-white transition-colors" type="button">
                    <span className="material-symbols-outlined text-xl">visibility_off</span>
                  </button>
                </div>
              </motion.div>

              {/* Terms */}
              <div className="flex items-center gap-4 py-3 px-2">
                <input className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0" id="terms" type="checkbox" required />
                <label className="text-xs text-slate-400 font-light" htmlFor="terms">
                  Acepto los <a className="text-cyan-400 hover:text-cyan-300 font-bold underline decoration-cyan-500/30" href="#">Protocolos de Servicio</a>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full group relative flex items-center justify-center py-6 bg-cyan-500 text-[#0d0e17] rounded-2xl font-headline font-black text-xs tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70" 
                type="submit"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-4">
                  {isLoading ? "SINCRONIZANDO..." : "EMPEZAR EVOLUCIÃ“N"}
                  {!isLoading && <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">rocket_launch</span>}
                </span>
              </button>

              {/* Separator */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                  <span className="bg-[#111218] px-4 text-slate-500">O Sincronizar vÃ­a</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl font-label text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-cyan-500/30 disabled:opacity-50"
              >
                <Chrome className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                SincronizaciÃ³n con Google
              </button>
            </form>

            {/* Footer Links (Synced with Login) */}
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-xs mb-4">
                Â¿Ya tienes una cuenta activa? 
              </p>
              <Link className="inline-block font-headline text-sm font-black text-cyan-400 hover:text-white transition-colors tracking-widest border-b-2 border-cyan-500/20 hover:border-cyan-500" to="/login">INICIAR SECUENCIA</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-10 text-center text-slate-700 text-[10px] font-mono tracking-[0.5em] uppercase">
        Â© 2026 NEURAL_WORKSPACE_ENGINEERING. SECURE_AUTH_V4.
      </footer>
    </div>
  );
};

export default RegisterPage;

