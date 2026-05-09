import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { FileText, Wrench, BookOpen, Tag, Plus, Eye, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <Link to={to} className="group block">
    <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 hover:border-${color}-500/40 transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-5 w-5 text-${color}-400`} />
        </div>
        <TrendingUp className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value ?? '—'}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ articles: null, tools: null, resources: null, categories: null });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [
        { count: articles },
        { count: tools },
        { count: resources },
        { count: categories },
        { data: recentArticles },
      ] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('tools').select('*', { count: 'exact', head: true }),
        supabase.from('resources').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('id, title, status, created_at, category').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({ articles, tools, resources, categories });
      setRecent(recentArticles || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Panel de administración</h1>
        <p className="text-slate-400 text-sm mt-1">
          {format(new Date(), "EEEE d 'de' MMMM, yyyy", { locale: es })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Artículos" value={loading ? null : stats.articles} color="cyan" to="/admin/articles" />
        <StatCard icon={Wrench} label="Herramientas" value={loading ? null : stats.tools} color="violet" to="/admin/tools" />
        <StatCard icon={BookOpen} label="Recursos" value={loading ? null : stats.resources} color="emerald" to="/admin/resources" />
        <StatCard icon={Tag} label="Categorías" value={loading ? null : stats.categories} color="amber" to="/admin/categories" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Artículos recientes
            </h2>
            <Link to="/admin/articles" className="text-xs text-cyan-400 hover:text-cyan-300">Ver todos</Link>
          </div>
          {loading ? (
            <p className="text-slate-500 text-sm">Cargando...</p>
          ) : recent.length === 0 ? (
            <p className="text-slate-500 text-sm">No hay artículos aún.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map(a => (
                <li key={a.id} className="flex items-center justify-between group">
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{a.title}</p>
                    <p className="text-xs text-slate-500">{a.category} · {format(new Date(a.created_at), 'd MMM yyyy', { locale: es })}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      {a.status === 'published' ? 'Publicado' : 'Borrador'}
                    </span>
                    <Link to={`/admin/articles/${a.id}/preview`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4 text-slate-400 hover:text-cyan-400" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Acciones rápidas</h2>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link to="/admin/articles/new"><Plus className="h-4 w-4 mr-2" />Nuevo artículo</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link to="/admin/tools/new"><Plus className="h-4 w-4 mr-2" />Nueva herramienta</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link to="/admin/resources/new"><Plus className="h-4 w-4 mr-2" />Nuevo recurso</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link to="/admin/seo-audit"><TrendingUp className="h-4 w-4 mr-2" />Auditoría SEO</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
