import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { 
  LayoutDashboard, FileText, Settings, LogOut, ExternalLink, 
  Megaphone, BarChart, Newspaper, Wrench, Library, Tags 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login?redirect=admin');
        return;
      }

      // Check if user has admin role in profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || profile?.role !== 'admin') {
        toast({
          variant: "destructive",
          title: "Acceso Denegado",
          description: "No tienes permisos para acceder al panel de administración.",
        });
        navigate('/login');
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (isLoading) return <div className="min-h-screen bg-[#0C0D0D] flex items-center justify-center text-cyan-400">Cargando panel...</div>;
  if (!isAuthenticated) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FileText, label: 'Artículos', path: '/admin/articles' },
    { icon: Newspaper, label: 'Noticias', path: '/admin/news' },
    { icon: Wrench, label: 'Herramientas', path: '/admin/tools' },
    { icon: Library, label: 'Recursos', path: '/admin/resources' },
    { icon: Tags, label: 'Categorías', path: '/admin/categories' },
    { icon: Megaphone, label: 'Gestión de Anuncios', path: '/admin/ads' },
    { icon: BarChart, label: 'Auditoría SEO', path: '/admin/seo-audit' },
  ];

  return (
    <div className="min-h-screen bg-[#0C0D0D] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-cyan-400">AGENCY CMS</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                location.pathname.startsWith(item.path) 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={18} />
            <span className="text-sm">Ver Sitio Web</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 justify-between md:hidden">
           <span className="font-bold">AGENCY ADMIN</span>
           <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut size={16}/></Button>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;