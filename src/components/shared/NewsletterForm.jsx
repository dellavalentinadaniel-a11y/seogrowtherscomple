import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { trackFormSubmit } from '@/lib/analytics';

/**
 * Componente de suscripción a newsletter reutilizable.
 * Guarda en Supabase `newsletter_subscribers` y trackea en GA4.
 *
 * Variantes:
 * - "inline" (default): input + botón en fila (para footer, sidebars)
 * - "card": card completa con título y descripción
 * - "banner": banner horizontal full-width (para entre secciones)
 */

const NewsletterForm = ({ variant = 'inline', source = 'unknown', className = '' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({ title: "Email inválido", description: "Ingresá un email válido.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, status: 'active', source }]);

      if (error && error.code === '23505') {
        toast({
          title: "Ya estás suscripto",
          description: "Este email ya recibe nuestro newsletter.",
          className: "bg-blue-600 border-none text-white"
        });
        setEmail('');
        setLoading(false);
        return;
      }

      if (error) throw error;

      trackFormSubmit('newsletter', { source });
      setSubscribed(true);
      toast({
        title: "¡Suscripción exitosa!",
        description: "Vas a recibir las novedades de SEO, IA y marketing directo en tu email.",
        className: "bg-green-600 border-none text-white"
      });
      setEmail('');
    } catch (err) {
      toast({
        title: "Error",
        description: "No pudimos procesar tu suscripción. Intentá de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (subscribed && variant !== 'inline') {
    return (
      <div className={`text-center p-8 rounded-2xl border border-green-500/20 bg-green-500/5 ${className}`}>
        <span className="material-symbols-outlined text-green-400 text-4xl mb-3 block">check_circle</span>
        <p className="font-headline text-xl font-bold text-on-surface mb-1">¡Listo!</p>
        <p className="text-on-surface-variant text-sm">Te enviamos un email de confirmación.</p>
      </div>
    );
  }

  // ─── Inline (Footer / Sidebar) ──────────────────────────────
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-primary text-on-primary font-bold rounded-lg text-sm hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? '...' : subscribed ? '✓' : 'Suscribir'}
        </button>
      </form>
    );
  }

  // ─── Card (Sidebar) ─────────────────────────────────────────
  if (variant === 'card') {
    return (
      <div className={`p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 ${className}`}>
        <span className="material-symbols-outlined text-primary text-2xl mb-3 block">mail</span>
        <h4 className="font-headline font-bold text-on-surface mb-1">Newsletter SEO</h4>
        <p className="text-on-surface-variant text-xs mb-4 leading-relaxed">
          Recibí tips de SEO, novedades de IA y estrategias de marketing cada semana.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl text-sm tracking-wider hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Suscribiendo...' : 'Suscribirme Gratis'}
          </button>
        </form>
        <p className="text-[10px] text-on-surface-variant/50 mt-3 text-center">Sin spam. Cancelá cuando quieras.</p>
      </div>
    );
  }

  // ─── Banner (ResourcesPage, entre secciones) ────────────────
  if (variant === 'banner') {
    return (
      <section className={`p-8 md:p-12 rounded-3xl border border-primary-container/10 relative overflow-hidden ${className}`} style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(156, 240, 255, 0.03))' }}>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-2">
              Newsletter de SEO & IA
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base">
              Cada semana: tendencias SEO, novedades de inteligencia artificial y estrategias de crecimiento digital. Directo a tu inbox.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-6 py-3 text-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none w-full sm:w-80 font-mono tracking-tighter transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-background font-bold px-8 py-3 rounded-xl text-sm tracking-widest hover:bg-primary transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {loading ? 'ENVIANDO...' : 'SUSCRIBIRME'}
            </button>
          </form>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full pointer-events-none"></div>
      </section>
    );
  }

  return null;
};

export default NewsletterForm;
